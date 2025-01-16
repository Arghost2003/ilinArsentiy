import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import store from './redux/store';
import Lab1 from './screens/lab1';
import Lab2 from './screens/lab2';
import { Ionicons } from '@expo/vector-icons'; // Иконки
import Lab3 from './screens/lab3';
import Lab4 from './screens/lab4';

const Tab = createBottomTabNavigator();

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName="Lab1"
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Lab1') {
                                iconName = focused ? 'ios-home' : 'ios-home-outline';
                            } else if (route.name === 'Lab2') {
                                iconName = focused ? 'ios-timer' : 'ios-timer-outline';
                            } else if (route.name === 'Lab3') {
                                iconName = focused ? 'ios-list' : 'ios-list-outline';
                            } else if (route.name === 'Lab4') {
                                iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
                            } else if (route.name === 'Lab4_2') {
                                iconName = focused ? 'ios-eye' : 'ios-eye-outoff';
                            }

                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: '#1E90FF',
                        tabBarInactiveTintColor: 'gray',
                        headerStyle: {
                            backgroundColor: '#1E90FF',
                        },
                        headerTintColor: '#fff',
                        tabBarStyle: {
                            backgroundColor: '#fff',
                            borderTopColor: '#1E90FF',
                            height: 60,
                            paddingBottom: 5,
                        },
                        tabBarLabelStyle: {
                            fontSize: 12,
                        },
                    })}
                >
                    <Tab.Screen name="Lab1" component={Lab1} options={{ title: 'Счетчик' }} />
                    <Tab.Screen name="Lab2" component={Lab2} options={{ title: 'Таймер' }} />
                    <Tab.Screen name="Lab3" component={Lab3} options={{ title: 'Список' }} />
                    <Tab.Screen name="Lab4" component={Lab4} options={{ title: 'Redux' }} />
                    <Tab.Screen name="Lab4_2" component={Lab4_2} options={{ title: 'Просмотр' }} />
                </Tab.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
