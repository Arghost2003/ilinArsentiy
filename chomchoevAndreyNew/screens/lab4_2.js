import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useSelector } from 'react-redux';

const Lab4_2 = () => {
    const count = useSelector((state) => state.counter.value);
    const scaleValue = new Animated.Value(0); // Инициализация анимации

    // Анимация при обновлении счетчика
    React.useEffect(() => {
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    }, [count]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Текущее значение счетчика:</Text>
            <Animated.Text style={[styles.countText, { transform: [{ scale: scaleValue }] }]}>
                {count}
            </Animated.Text>
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
        fontSize: 24,
        marginBottom: 15,
        color: '#fff', // Белый цвет для заголовка
        fontWeight: '600',
        textShadowColor: '#aaa', // Легкая тень для текста заголовка
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    countText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#4CAF50', // Зеленый цвет для счетчика
        elevation: 5, // Тень для текста
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
});

export default Lab4_2;