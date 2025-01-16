import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useCartStore } from '../store';
import { URL, API_KEY, API_SECRET } from '@env';

const apiClient = axios.create({
  baseURL: `https://${URL}/wp-json/wc/v3`,
  auth: {
    username: API_KEY,
    password: API_SECRET,
  },
});

function Lab3Screen_1() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/products', {
          params: {
            per_page: 20, // Загружаем 20 продуктов за раз
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        alert('Failed to fetch products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const renderProduct = ({ item }) => (
    <View className="flex-col justify-between items-center mb-4 p-4 border rounded">
      <View>
        <Text className="font-bold">{item.name}</Text>
        <Text className="text-gray-500">${item.price}</Text>
      </View>
      <TouchableOpacity
        className="bg-blue-500 px-4 py-2 rounded"
        onPress={() => addToCart(item)}
      >
        <Text className="text-white">Add to cart</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-4 text-gray-700">Loading products...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-lg font-bold mb-4">Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        contentContainerStyle={{ paddingBottom: 16 }}
        ListEmptyComponent={<Text>No products</Text>}
      />
    </View>
  );
}

export default Lab3Screen_1;
