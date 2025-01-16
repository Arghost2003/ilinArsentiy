import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function FactorialComparison() {
  const { isDarkTheme } = useTheme();
  const [inputWithMemo, setInputWithMemo] = useState('');
  const [inputWithoutMemo, setInputWithoutMemo] = useState('');
  const [factorialWithMemo, setFactorialWithMemo] = useState(null);
  const [factorialWithoutMemo, setFactorialWithoutMemo] = useState(null);
  const [timeWithMemo, setTimeWithMemo] = useState(null);
  const [timeWithoutMemo, setTimeWithoutMemo] = useState(null);

  const memoizedFactorials = useMemo(() => ({}), []);

  const calculateFactorial = (num) => {
    if (num < 0) return null; 
    if (num === 0 || num === 1) return 1;
    return num * calculateFactorial(num - 1);
  };

  const TimeWithoutMemo = (num, iterations) => {
    let startTime, endTime;
    startTime = performance.now();
    for (let i = 0; i < iterations; i++) {
      calculateFactorial(num);
    }
    endTime = performance.now();
    const timeWithoutMemo = endTime - startTime;
    setTimeWithoutMemo(timeWithoutMemo);
  }

  const TimeWithMemo = (num, iterations) => {
    let startTime, endTime;

    startTime = performance.now();
    for (let i = 0; i < iterations; i++) {
      if (memoizedFactorials[num] === undefined) {
        memoizedFactorials[num] = calculateFactorial(num);
      }
    }
    endTime = performance.now();
    const timeWithMemo = endTime - startTime;
    setTimeWithMemo(timeWithMemo);
  };

  const handleCalculateWithMemo = () => {
    const number = parseFloat(inputWithMemo.trim());
    if (!isNaN(number)) {
      if (memoizedFactorials[number] !== undefined) {
        setFactorialWithMemo(memoizedFactorials[number]);
      } else {
        console.log('Пересчитываем факториал для числа (useMemo):', number);
        const factorial = calculateFactorial(number);
        memoizedFactorials[number] = factorial;
        setFactorialWithMemo(factorial);
      }
      TimeWithMemo(number, 100000); 
    }
  };

  const handleCalculateWithoutMemo = () => {
    const number = parseFloat(inputWithoutMemo.trim());
    if (!isNaN(number)) {
      const result = calculateFactorial(number);
      console.log('Пересчитываем факториал для числа (без useMemo):', number); 
      setFactorialWithoutMemo(result);
      TimeWithoutMemo(number, 100000); 
    }
  };

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, isDarkTheme ? styles.darkText : styles.lightText]}>
        Введите число для вычисления факториала:
      </Text>

      <TextInput
        style={[styles.input, isDarkTheme ? styles.darkInput : styles.lightInput]}
        value={inputWithMemo}
        onChangeText={(newText) => setInputWithMemo(newText)}
        placeholder="С useMemo (например: 5)"
        placeholderTextColor={isDarkTheme ? '#aaa' : '#888'}
        keyboardType="numeric"
      />
      <TouchableOpacity style={[styles.button, isDarkTheme ? styles.darkButton : styles.lightButton]} onPress={handleCalculateWithMemo}>
        <Text style={[styles.buttonText, isDarkTheme ? styles.darkButtonText : styles.lightButtonText]}>
          Вычислить (useMemo)
        </Text>
      </TouchableOpacity>
      <Text style={[styles.factorial, isDarkTheme ? styles.darkText : styles.lightText]}>
        (useMemo): {factorialWithMemo !== null ? factorialWithMemo : 'Введите число и нажмите "Вычислить"'}
      </Text>
      {timeWithMemo !== null && (
        <Text style={[styles.timeText, isDarkTheme ? styles.darkText : styles.lightText]}>
          Время (useMemo): {timeWithMemo.toFixed(2)} мс
        </Text>
      )}

      <TextInput
        style={[styles.input, isDarkTheme ? styles.darkInput : styles.lightInput]}
        value={inputWithoutMemo}
        onChangeText={(newText) => setInputWithoutMemo(newText)}
        placeholder="Без useMemo (например: 5)"
        placeholderTextColor={isDarkTheme ? '#aaa' : '#888'}
        keyboardType="numeric"
      />
      <TouchableOpacity style={[styles.button, isDarkTheme ? styles.darkButton : styles.lightButton]} onPress={handleCalculateWithoutMemo}>
        <Text style={[styles.buttonText, isDarkTheme ? styles.darkButtonText : styles.lightButtonText]}>
          Вычислить (без useMemo)
        </Text>
      </TouchableOpacity>
      <Text style={[styles.factorial, isDarkTheme ? styles.darkText : styles.lightText]}>
        (без useMemo): {factorialWithoutMemo !== null ? factorialWithoutMemo : 'Введите число и нажмите "Вычислить"'}
      </Text>
      {timeWithoutMemo !== null && (
        <Text style={[styles.timeText, isDarkTheme ? styles.darkText : styles.lightText]}>
          Время (без useMemo): {timeWithoutMemo.toFixed(2)} мс
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  darkContainer: {
    backgroundColor: '#1E1E1E',
  },
  lightContainer: {
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  darkText: {
    color: '#FFFFFF',
  },
  lightText: {
    color: '#333333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 18,
  },
  darkInput: {
    borderColor: '#555555',
    backgroundColor: '#2A2A2A',
    color: '#FFFFFF',
  },
  lightInput: {
    borderColor: '#DDD',
    backgroundColor: '#FFFFFF',
    color: '#333333',
  },
  button: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  darkButton: {
    backgroundColor: '#333333',
  },
  lightButton: {
    backgroundColor: '#e75480',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
  },
  darkButtonText: {
    color: '#FFFFFF',
  },
  lightButtonText: {
    color: '#FFFFFF',
  },
  factorial: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 20,
    textAlign: 'center',
  },
  timeText: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
    paddingBottom: 20,
  },
});
