import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function Lab1() {
  const [message, setMessage] = useState('Нажми!');
  const [bgColor, setBgColor] = useState('#fff');

  const changeBackgroundColor = () => {
    setMessage('Ок');
    const colors = ['#FFB3B3', '#FFCCB3', '#FFE5B3', '#D4E5FF', '#B3D1FF', '#E2C8FF'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.text}>{message}</Text>
      <Pressable style={styles.button} onPress={changeBackgroundColor}>
        <Text style={styles.buttonText}>Кнопка</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#e75480',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    shadowColor: '#7A7F80',
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});
