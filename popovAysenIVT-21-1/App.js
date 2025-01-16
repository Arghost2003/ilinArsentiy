import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import Lab1 from "./screen/lab1";
import Lab2 from "./screen/lab2";
import Lab3 from "./screen/lab3";

const Tab = createBottomTabNavigator();

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false); 

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: isDarkTheme ? "#fff" : "#000", 
          tabBarInactiveTintColor: isDarkTheme ? "#666" : "#ccc", 
          tabBarStyle: {
            backgroundColor: isDarkTheme ? "#333" : "#fff", 
            borderTopWidth: 0, 
          },
        }}
      >
        <Tab.Screen
          name="Lab1"
          children={() => <Lab1 isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Lab2"
          children={() => <Lab2 isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cogs" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Lab3"
          children={() => <Lab3 isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="school" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
