import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration, SafeAreaView, StatusBar } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);
  const [targetGoal, setTargetGoal] = useState(33);
  const [activePhrase, setActivePhrase] = useState("سُبْحَانَ اللَّهِ");

  const handleIncrement = () => {
    const nextVal = count + 1;
    setCount(nextVal);
    Vibration.vibrate(40);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0D0B" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.tagline}>أصالة • تجديد • أثر</Text>
        <Text style={styles.title}>اذْكُرْ (Izkur)</Text>
        <Text style={styles.phraseText}>{activePhrase}</Text>
      </View>

      {/* Main Glowing Counter Button */}
      <TouchableOpacity 
        activeOpacity={0.8}
        onPress={handleIncrement}
        style={styles.counterCircle}
      >
        <Text style={styles.counterBrand}>اذْكُرْ</Text>
        <Text style={styles.counterValue}>{count}</Text>
        <Text style={styles.targetText}>{count} / {targetGoal}</Text>
      </TouchableOpacity>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
          <Text style={styles.resetText}>إعادة ضبط العداد</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0D0B',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
  },
  tagline: {
    color: '#D4AF37',
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 4,
  },
  title: {
    color: '#D4AF37',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  phraseText: {
    color: '#E2E8F0',
    fontSize: 22,
  },
  counterCircle: {
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(11, 59, 44, 0.6)',
    borderWidth: 4,
    borderColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  counterBrand: {
    color: '#D4AF37',
    fontSize: 28,
    fontWeight: 'bold',
  },
  counterValue: {
    color: '#FFFFFF',
    fontSize: 54,
    fontWeight: '900',
    marginVertical: 4,
  },
  targetText: {
    color: 'rgba(212, 175, 55, 0.8)',
    fontSize: 14,
  },
  actionsContainer: {
    alignItems: 'center',
  },
  resetButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  resetText: {
    color: 'rgba(212, 175, 55, 0.7)',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
