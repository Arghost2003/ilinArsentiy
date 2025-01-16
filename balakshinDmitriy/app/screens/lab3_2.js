import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useCartStore } from '../store';

const Lab3Screen_2 = () => {
  const cart = useCartStore((state) => state.cart);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);

  const renderCartItem = ({ item }) => (
    <View className="flex-row justify-between items-center mb-4 p-4 border rounded">
      <View>
        <Text className="font-bold">{item.name}</Text>
        <Text className="text-gray-500">${item.price}</Text>
        <Text className="text-gray-700">Quantity: {item.quantity}</Text>
      </View>
      <View className="flex-row">
        <TouchableOpacity
          className="bg-green-500 px-3 py-1 rounded mr-2"
          onPress={() => incrementQuantity(item.id)}
        >
          <Text className="text-white">+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-red-500 px-3 py-1 rounded"
          onPress={() => decrementQuantity(item.id)}
        >
          <Text className="text-white">-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-lg font-bold mb-4">Cart</Text>
      {cart.length === 0 ? (
        <Text>Empty</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCartItem}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
    </View>
  );
};

export default Lab3Screen_2;
