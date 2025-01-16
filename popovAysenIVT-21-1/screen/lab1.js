import React, { useState } from 'react'; 
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'; 
import Icon from 'react-native-vector-icons/MaterialIcons'; 
 
export default function Lab1({ isDarkTheme, setIsDarkTheme }) { 
  const [count, setCount] = useState(0); 
 
  return ( 
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}> 
      <Text style={[styles.text, isDarkTheme ? styles.darkText : styles.lightText]}>Счётчик: {count}</Text> 
      
      <View style={styles.buttonContainer}>
        <Button title="Увеличить" onPress={() => setCount(count + 1)} /> 
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Сбросить" onPress={() => setCount(0)} /> 
      </View>

      <TouchableOpacity 
        style={[styles.switchButton, isDarkTheme ? styles.darkButton : styles.lightButton]} 
        onPress={() => setIsDarkTheme(!isDarkTheme)} 
      > 
        <Icon 
          name={isDarkTheme ? "wb-sunny" : "nights-stay"} 
          size={30} 
          color={isDarkTheme ? '#fff' : '#333'} 
        /> 
      </TouchableOpacity> 
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
  lightContainer: { 
    backgroundColor: '#f5f5f5', 
  }, 
  darkContainer: { 
    backgroundColor: '#333', 
  }, 
  text: { 
    fontSize: 24, 
    marginBottom: 20, 
  }, 
  lightText: { 
    color: 'black', 
  }, 
  darkText: { 
    color: 'white', 
  }, 
  switchButton: { 
    width: 60, 
    height: 60, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 30, 
    backgroundColor: '#333', 
    marginTop: 20, 
  }, 
  buttonContainer: {
    marginBottom: 15, 
  },
});
