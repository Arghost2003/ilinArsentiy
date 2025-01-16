import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, ActivityIndicator, StyleSheet, Switch } from 'react-native';

export default function Lab2({ isDarkTheme, setIsDarkTheme }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDogImage = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const result = await response.json();
      if (response.ok) {
        setImage(result.message);
      } else {
        throw new Error('Не удалось получить изображение');
      }
    } catch (err) {
      setError('Ошибка загрузки изображения');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDogImage();
  }, []);

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, isDarkTheme ? styles.darkText : styles.lightText]}>
        Случайная фотография собаки
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color={isDarkTheme ? "#fff" : "#000"} />
      ) : error ? (
        <Text style={[styles.error, isDarkTheme ? styles.darkText : styles.lightText]}>{error}</Text>
      ) : (
        <Image source={{ uri: image }} style={styles.image} />
      )}

      {}
      <View style={styles.switchContainer}>
        <Text style={[styles.switchText, isDarkTheme ? styles.darkText : styles.lightText]}>
          {isDarkTheme ? 'Темная тема' : 'Светлая тема'}
        </Text>
        <Switch
          value={isDarkTheme}
          onValueChange={() => setIsDarkTheme(!isDarkTheme)}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkTheme ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
        />
      </View>

      {}
      <Button title="Обновить" onPress={fetchDogImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightContainer: {
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  lightText: {
    color: 'black',
  },
  darkText: {
    color: 'white',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  error: {
    color: 'red',
    fontSize: 18,
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchText: {
    fontSize: 18,
    marginRight: 10,
  },
});
