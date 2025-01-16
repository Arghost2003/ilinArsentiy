import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const Lab2 = () => {
    const [count, setCount] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10); // Таймер на 10 секунд
    const scaleValue = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        let timer;

        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false); // Останавливаем таймер
        }

        return () => clearInterval(timer); // Очистка таймера при размонтировании или изменении состояния
    }, [isRunning, timeLeft]);

    const handleClick = () => {
        if (isRunning) {
            setCount(count + 1);
        }
    };

    const startTimer = () => {
        setCount(0);
        setTimeLeft(10);
        setIsRunning(true);
    };

    const handlePressAnimation = () => {
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
            <Text style={styles.header}>Lab Two - Таймер</Text>
            <Text style={styles.timerText}>Оставшееся время: {timeLeft} секунд</Text>
            <Text style={styles.counterText}>Количество кликов: {count}</Text>

            <TouchableOpacity 
                style={[styles.button, { backgroundColor: isRunning ? '#7289da' : '#40444b' }]} // Цвет кнопки в зависимости от состояния
                onPress={() => {
                    handlePressAnimation();
                    handleClick();
                }}
                disabled={!isRunning} // Блокируем кнопку, если таймер не запущен
            >
                <Animated.Text style={[styles.buttonText, { transform: [{ scale: scaleValue }] }]}>
                    Кликни меня!
                </Animated.Text>
            </TouchableOpacity>

            {!isRunning && (
                <TouchableOpacity 
                    style={styles.restartButton} 
                    onPress={() => {
                        handlePressAnimation();
                        startTimer();
                    }}
                >
                    <Animated.Text style={[styles.buttonText, { transform: [{ scale: scaleValue }] }]}>
                        Начать заново
                    </Animated.Text>
                </TouchableOpacity>
            )}
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
        fontSize: 26,
        marginBottom: 20,
        color: '#fff', // Белый цвет для текста заголовка
        fontWeight: '600',
        textShadowColor: '#aaa', // Легкая тень для текста
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    timerText: {
        fontSize: 22,
        color: '#99aab5', // Светло-серый для текста таймера
        marginBottom: 10,
        fontWeight: '500',
        textShadowColor: '#2C2F34', // Тень для текста
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    counterText: {
        fontSize: 22,
        color: '#99aab5', // Светло-серый для текста счётчика
        marginBottom: 30,
        fontWeight: '500',
        textShadowColor: '#2C2F34', // Тень для текста
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    button: {
        backgroundColor: '#7289da', // Синий цвет для кнопки
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
    restartButton: {
        backgroundColor: '#43b581', // Зеленый цвет для кнопки перезапуска
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
});

export default Lab2;