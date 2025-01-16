import React, { useMemo, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const Lab3 = () => {
    const [numWithoutMemo, setNumWithoutMemo] = useState(0);
    const [numWithMemo, setNumWithMemo] = useState(0);
    
    // Создаем отдельные анимационные значения для каждой кнопки
    const scaleValueWithoutMemo = useRef(new Animated.Value(1)).current;
    const scaleValueWithMemo = useRef(new Animated.Value(1)).current;

    const expensiveFunction = () => {
        let i = 0;
        while (i < 123456789) {
            i++;
        }
        return true;
    };

    const memoizedFunction = useMemo(expensiveFunction, []);

    const handleWithoutMemo = () => {
        expensiveFunction();
        setNumWithoutMemo(numWithoutMemo + 1);
    };

    const handleWithMemo = () => {
        memoizedFunction; // Здесь должно быть вызвано значение функции
        setNumWithMemo(numWithMemo + 1);
    };

    const handlePressAnimation = (scaleValue) => {
        Animated.sequence([
            Animated.timing(scaleValue, {
                toValue: 1.1,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            })
        ]).start();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Без использования useMemo: {numWithoutMemo}</Text>
            <TouchableOpacity
                onPress={() => {
                    handlePressAnimation(scaleValueWithoutMemo);
                    handleWithoutMemo();
                }}
                style={styles.button}
            >
                <Animated.Text style={[styles.buttonText, { transform: [{ scale: scaleValueWithoutMemo }] }]}>Нажми без useMemo</Animated.Text>
            </TouchableOpacity>

            <Text style={styles.header}>С использованием useMemo: {numWithMemo}</Text>
            <TouchableOpacity
                onPress={() => {
                    handlePressAnimation(scaleValueWithMemo);
                    handleWithMemo();
                }}
                style={styles.button}
            >
                <Animated.Text style={[styles.buttonText, { transform: [{ scale: scaleValueWithMemo }] }]}>Нажми с useMemo</Animated.Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2f3136', // Темный фон, похожий на Discord
        padding: 20,
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
        color: '#fff', // Белый цвет для текста заголовка
        fontWeight: 'bold',
        textShadowColor: '#aaa', // Легкая тень для текста
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    button: {
        backgroundColor: '#7289da', // Синий цвет для кнопки, как в Discord
        padding: 15,
        borderRadius: 15,
        marginBottom: 20,
        width: '80%',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
    },
    buttonText: {
        color: '#fff', // Белый текст на кнопке
        fontSize: 18,
        fontWeight: '600',
    },
});

export default Lab3;