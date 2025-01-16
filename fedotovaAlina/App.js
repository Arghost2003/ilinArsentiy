import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Switch } from 'react-native';
import React from 'react';
import Lab1 from './screens/Lab1.js';
import Lab2 from './screens/Lab2.js';
import Lab3 from './screens/Lab3.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const AppContent = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
      <View style={styles.themeSwitcher}>
        <Ionicons name="sunny" size={24} color={isDarkTheme ? '#fff' : '#000'} />
        <Switch
          value={isDarkTheme}
          onValueChange={toggleTheme}
          trackColor={{ false: '#ccc', true: '#444' }}
          thumbColor={isDarkTheme ? '#fff' : '#000'}
        />
        <Ionicons name="moon" size={24} color={isDarkTheme ? '#fff' : '#000'} />
      </View>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: isDarkTheme ? '#444' : '#fff', 
          },
          headerTintColor: isDarkTheme ? '#fff' : '#000', 
          tabBarStyle: {
            backgroundColor: isDarkTheme ? '#444' : '#ffffff', 
          },
          tabBarActiveTintColor: isDarkTheme ? '#fff' : '#000',
          tabBarInactiveTintColor: isDarkTheme ? '#aaa' : '#888',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Lab1') {
              iconName = focused ? 'flask' : 'flask-outline';
            } 
            else if (route.name === 'Lab2') {
              iconName = focused ? 'calculator' : 'calculator-outline';
            } 
            else if (route.name === 'Lab3') {
              iconName = focused ? 'school' : 'school-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Lab1" component={Lab1} />
        <Tab.Screen name="Lab2" component={Lab2} />
        <Tab.Screen name="Lab3" component={Lab3} />
      </Tab.Navigator>
    </View>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  darkContainer: {
    backgroundColor: '#1E1E1E',
  },
  lightContainer: {
    backgroundColor: '#F8F9FA',
  },
  themeSwitcher: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 10,
  },
});
