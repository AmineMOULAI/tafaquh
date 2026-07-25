# 🤖 @izkur_tafaqquh_bot — Telegram Group Dhikr Bot

The Telegram companion bot for **Izkur (اذْكُرْ)** and the **Tafaqquh (@center_tafaquh)** ecosystem.

## Features
- Listens for Telegram `.ogg` Voice Notes in groups or DMs.
- Parses spoken Dhikr ("سُبْحَانَ اللَّهِ", "الْحَمْدُ لِلَّهِ", "اللَّهُ أَكْبَرُ", "لَا إِلَهَ إِلَّا اللَّهُ", "أَسْتَغْفِرُ اللَّهَ").
- Returns branded Markdown cards with individual and group Dhikr statistics.

## Environment Variables
- `TELEGRAM_BOT_TOKEN`: Token obtained from Telegram `@BotFather`.
- `GRAVITY_AI_API_URL`: Optional Speech-to-Text endpoint URL.
- `GRAVITY_AI_API_KEY`: Optional Speech-to-Text API Key.

## Local Setup
```bash
cd bot
pip install -r requirements.txt
export TELEGRAM_BOT_TOKEN="your_token_here"
python bot.py
```

## Docker Deployment (Railway / Render / VPS)
```bash
docker build -t izkur-bot .
docker run -d -e TELEGRAM_BOT_TOKEN="your_token_here" izkur-bot
```
