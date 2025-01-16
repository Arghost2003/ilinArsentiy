import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useTheme } from '../ThemeContext';

export default function Lab1() {
    const { isDarkTheme } = useTheme();
    const [color, setColor] = useState("skyblue");

    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const changeColor = () => {
        setColor(getRandomColor());
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: isDarkTheme ? '#333' : '#F5FCFF' }]}>
            <View style={[styles.colorBlock, { backgroundColor: color }]} />
            <TouchableOpacity 
                style={[styles.button, { backgroundColor: isDarkTheme ? '#555' : 'blue' }]} 
                onPress={changeColor}
            >
                <Text style={styles.buttonText}>Сменить цвет</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    colorBlock: {
        width: 200,
        height: 200,
        marginBottom: 20,
        borderRadius: 20,
    },
    button: {
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
});
