import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ThemeProvider, useTheme } from "./ThemeContext.js";
import Lab1 from "./layouts/lab1";
import Lab2 from "./layouts/lab2-3";
import Lab4 from "./layouts/lab4";

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  const { isDarkTheme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDarkTheme ? "#333" : "#fff",
        },
        tabBarActiveTintColor: isDarkTheme ? "#fff" : "#000",
        tabBarInactiveTintColor: isDarkTheme ? "#aaa" : "#555",
      }}
    >
      <Tab.Screen name="Lab1" component={Lab1} />
      <Tab.Screen name="Lab2" component={Lab2} />
      <Tab.Screen name="Lab4" component={Lab4} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppTabs />
      </NavigationContainer>
    </ThemeProvider>
  );
}