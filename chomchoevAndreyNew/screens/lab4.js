import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../redux/counterSlice';

const Lab4 = () => {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();
    
    // Создаем анимационные значения для каждой кнопки
    const scaleIncrement = React.useRef(new Animated.Value(1)).current;
    const scaleDecrement = React.useRef(new Animated.Value(1)).current;
    const scaleReset = React.useRef(new Animated.Value(1)).current;

    // Функция для анимации нажатия на кнопку
    const handlePress = (scaleValue) => {
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
            }),
        ]).start();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Счетчик: {count}</Text>
            <View style={styles.buttonContainer}>
                <Animated.View style={{ transform: [{ scale: scaleIncrement }] }}>
                    <TouchableOpacity
                        style={[styles.button, styles.incrementButton]}
                        onPress={() => {
                            handlePress(scaleIncrement);
                            dispatch(increment());
                        }}
                    >
                        <Text style={styles.buttonText}>Увеличить</Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={{ transform: [{ scale: scaleDecrement }] }}>
                    <TouchableOpacity
                        style={[styles.button, styles.decrementButton]}
                        onPress={() => {
                            handlePress(scaleDecrement);
                            dispatch(decrement());
                        }}
                    >
                        <Text style={styles.buttonText}>Уменьшить</Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={{ transform: [{ scale: scaleReset }] }}>
                    <TouchableOpacity
                        style={[styles.button, styles.resetButton]}
                        onPress={() => {
                            handlePress(scaleReset);
                            dispatch(reset());
                        }}
                    >
                        <Text style={styles.buttonText}>Сбросить</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2f3136', // Темный фон, как у Discord
        padding: 20,
    },
    title: {
        fontSize: 28,
        marginBottom: 30,
        color: '#fff', // Белый цвет для текста
        fontWeight: '600',
        textShadowColor: '#aaa', // Легкая тень для текста заголовка
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        width: '80%',
        paddingVertical: 12,
        borderRadius: 25,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5,
    },
    incrementButton: {
        backgroundColor: '#005D8A', // Темно-синий для кнопки увеличения
    },
    decrementButton: {
        backgroundColor: '#D32F2F', // Темно-красный для кнопки уменьшения
    },
    resetButton: {
        backgroundColor: '#FF5722', // Оранжевый для кнопки сброса
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '600',
    },
});

export default Lab4;