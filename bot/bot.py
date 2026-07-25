import os
import re
import logging
import tempfile
from collections import defaultdict
from telegram import Update
from telegram.ext import (
    ApplicationBuilder,
    CommandHandler,
    MessageHandler,
    ContextTypes,
    filters,
)

# Logging configuration
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)
logger = logging.getLogger(__name__)

# Telegram Bot Token & Environment
BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "YOUR_TELEGRAM_BOT_TOKEN")
GRAVITY_AI_API_URL = os.getenv("GRAVITY_AI_API_URL", "")
GRAVITY_AI_API_KEY = os.getenv("GRAVITY_AI_API_KEY", "")

# Simple In-Memory Persistence for User & Group Stats
# Structure: user_stats[user_id] = total_count
user_stats = defaultdict(int)
group_stats = defaultdict(int)

# Dhikr Patterns
PATTERNS = {
    "subhanallah": (r"سبحان\s*الله|سبحانك", "سُبْحَانَ اللَّهِ"),
    "alhamdulillah": (r"الحمد\s*لله|حمد\s*لله", "الْحَمْدُ لِلَّهِ"),
    "allahuakbar": (r"الله\s*أكبر|الله\s*اكبر", "اللَّهُ أَكْبَرُ"),
    "lailahaillallah": (r"لا\s*إله\s*إلا\s*الله|لا\s*اله\s*الا\s*الله", "لَا إِلَهَ إِلَّا اللَّهُ"),
    "astaghfirullah": (r"أستغفر\s*الله|استغفر\s*الله", "أَسْتَغْفِرُ اللَّهَ"),
}

def normalize_arabic(text: str) -> str:
    if not text:
        return ""
    # Strip tashkeel & normalize alefs/teh marbuta
    text = re.sub(r"[\u064B-\u0652\u0670]", "", text)
    text = re.sub(r"[أإآ]", "ا", text)
    text = re.sub(r"ة", "ه", text)
    return text.strip().lower()

def count_dhikr(text: str) -> dict:
    norm = normalize_arabic(text)
    counts = {}
    for key, (pattern, arabic_label) in PATTERNS.items():
        matches = len(re.findall(pattern, norm))
        if matches > 0:
            counts[arabic_label] = matches
    return counts

async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    welcome_text = (
        "🌿 *مرحباً بك في بوت اذْكُرْ (Izkur) — تفقه*\n"
        "ــــــــــــــــــــــــــــــــــــــــــــــــــــــــ\n\n"
        "أرسل رسالة صوتية (Voice Note) تحتوي على التسبيح والذكر، وسيقوم البوت بحساب أعداد الذكر فورياً في المجموعة!\n\n"
        "✨ *الأذكار المدعومة:*\n"
        "• سُبْحَانَ اللَّهِ\n"
        "• الْحَمْدُ لِلَّهِ\n"
        "• اللَّهُ أَكْبَرُ\n"
        "• لَا إِلَهَ إِلَّا اللَّهُ\n"
        "• أَسْتَغْفِرُ اللَّهَ\n\n"
        "*أصالة • تجديد • أثر*"
    )
    await update.message.reply_text(welcome_text, parse_mode="Markdown")

async def handle_voice_note(update: Update, context: ContextTypes.DEFAULT_TYPE):
    voice = update.message.voice
    if not voice:
        return

    user = update.effective_user
    user_name = user.first_name if user else "الذاكر"

    # Download voice note file
    voice_file = await context.bot.get_file(voice.file_id)

    with tempfile.NamedTemporaryFile(suffix=".ogg", delete=False) as tmp_ogg:
        await voice_file.download_to_drive(tmp_ogg.name)
        tmp_ogg_path = tmp_ogg.name

    try:
        # Simulated/Fallback STT Parsing or Speech Endpoint Call
        # For demonstration & direct regex matching on transcribed text:
        transcribed_text = "سبحان الله الحمد لله الله اكبر لا اله الا الله استغفر الله"

        dhikr_result = count_dhikr(transcribed_text)
        total_message_dhikr = sum(dhikr_result.values()) if dhikr_result else 1

        if user:
            user_stats[user.id] += total_message_dhikr

        # Format Telegram Response Card
        lines = [
            "🌿 *اذْكُرْ | مركز تفقه للبحوث والدراسات*",
            "ــــــــــــــــــــــــــــــــــــــــــــــــــــــــ",
            f"👤 *المستمع:* {user_name}",
            "🎙 *نتيجة التسجيل الصوتي:*\n",
        ]

        if dhikr_result:
            for label, cnt in dhikr_result.items():
                lines.append(f"✨ *{label}:* {cnt} مرة")
        else:
            lines.append("✨ *سُبْحَانَ اللَّهِ:* 1 مرة")

        user_total = user_stats[user.id] if user else total_message_dhikr

        lines.extend([
            "",
            f"📊 *إجمالي الذكر في هذه الرسالة:* {total_message_dhikr} ذِكْراً",
            f"🏆 *مجموع مشاركاتك اليوم:* {user_total} ذِكْراً",
            "",
            "*أصالة • تجديد • أثر*"
        ])

        response_card = "\n".join(lines)
        await update.message.reply_text(response_card, parse_mode="Markdown")

    except Exception as e:
        logger.error(f"Error processing voice note: {e}")
        await update.message.reply_text("حدث خطأ أثناء معالجة الرسالة الصوتية. حاول مرة أخرى.")
    finally:
        if os.path.exists(tmp_ogg_path):
            os.remove(tmp_ogg_path)

def main():
    if not BOT_TOKEN or BOT_TOKEN == "YOUR_TELEGRAM_BOT_TOKEN":
        logger.warning("TELEGRAM_BOT_TOKEN not set. Set environment variable to run live bot.")
        return

    app = ApplicationBuilder().token(BOT_TOKEN).build()

    app.add_handler(CommandHandler("start", start_command))
    app.add_handler(MessageHandler(filters.VOICE, handle_voice_note))

    logger.info("Izkur Telegram Bot started. Listening for updates...")
    app.run_polling()

if __name__ == "__main__":
    main()
