import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../ThemeContext.js";

const ThemeToggle = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: isDarkTheme ? "#333" : "#F5FCFF" }}>
      <Text style={{ color: isDarkTheme ? "white" : "black" }}>
        {isDarkTheme ? "Темная тема" : "Светлая тема"}
      </Text>
      <TouchableOpacity style={[styles.button, { backgroundColor: isDarkTheme ? '#555' : 'blue' }]} onPress={toggleTheme}>
        <Text style={ styles.buttonText }>Переключить тему</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
},
buttonText: {
    fontSize: 16,
    color: '#fff',
},
});

export default ThemeToggle;