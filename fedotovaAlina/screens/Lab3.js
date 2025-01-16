import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, Text, FlatList, ActivityIndicator, Alert, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useTheme } from '../context/ThemeContext'; 

const UniversityList = () => {
  const { isDarkTheme } = useTheme(); 
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [country, setCountry] = useState('Kazakhstan'); 

  useEffect(() => {
    const fetchUniversities = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://universities.hipolabs.com/search?country=${country}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUniversities(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, [country]);

  const handleCountryChange = (itemValue) => {
    setCountry(itemValue);
  };

  if (loading) {
    return (
      <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
        <ActivityIndicator size="large" color={isDarkTheme ? '#FFD700' : '#6200EE'} />
      </View>
    );
  }

  if (error) {
    Alert.alert('Error', error);
    return null;
  }

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, isDarkTheme ? styles.darkText : styles.lightText]}>Университеты</Text>
      <Text style={[styles.label, isDarkTheme ? styles.darkText : styles.lightText]}>Выбрать страну:</Text>
      <Picker
        selectedValue={country}
        style={[styles.picker, isDarkTheme ? styles.darkPicker : styles.lightPicker]}
        onValueChange={handleCountryChange}
      >
        <Picker.Item label="Казахстан" value="Kazakhstan" />
        <Picker.Item label="США" value="USA" />
        <Picker.Item label="Германия" value="Germany" />
        <Picker.Item label="Франция" value="France" />
      </Picker>
      <FlatList
        data={universities}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => Linking.openURL(item.web_pages[0])} 
            style={[
              styles.universityCard, 
              isDarkTheme ? styles.darkCard : styles.lightCard
            ]}
          >
            <Text style={[styles.universityName, isDarkTheme ? styles.darkText : styles.lightText]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  darkContainer: {
    backgroundColor: '#1E1E1E',
  },
  lightContainer: {
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  darkText: {
    color: '#FFFFFF', 
  },
  lightText: {
    color: '#333333', 
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  darkPicker: {
    backgroundColor: '#2A2A2A',
    color: '#FFFFFF',
  },
  lightPicker: {
    backgroundColor: '#FFFFFF',
    color: '#333333',
  },
  universityCard: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  darkCard: {
    backgroundColor: '#333333',
    borderColor: '#555555',
    borderWidth: 1,
  },
  lightCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DDD',
    borderWidth: 1,
  },
  universityName: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default UniversityList;

