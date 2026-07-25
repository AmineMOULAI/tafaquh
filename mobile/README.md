# 📱 Izkur Mobile App — Play Store Guide

The native mobile implementation of **Izkur (اذْكُرْ)** for Android and iOS.

## Features & Permissions
- Android Audio Recording Permission: `RECORD_AUDIO`
- Native Vibration / Haptic Feedback: `VIBRATE`
- Tafaqquh Theme: `#0B3B2C` Emerald Green & `#D4AF37` Gold accents

## Development Setup
```bash
cd mobile
npm install
npx expo start
```

## Play Store Build Generation (.aab / APK)
```bash
# Generate Android Application Bundle (.aab)
npx eas build -p android --profile production
```
