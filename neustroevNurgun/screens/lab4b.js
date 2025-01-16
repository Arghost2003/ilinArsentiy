import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useProductStore } from "../store/ProductStore";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { publicColors, publicStyles } from "../public/styles";

function CartProduct({ number, name, price, count }) {
  const [numberStyle, setNumberStyle] = useState(null);
  const onNumberLayout = ({ nativeEvent }) => {
    if (numberStyle) return;
    setNumberStyle({
      fontSize:
        (styles.number.fontSize * 40) /
        Math.max(nativeEvent.layout.width, nativeEvent.layout.height),
      width: 40,
      height: 40,
    });
  };
  const store = useProductStore();
  const increment = () => store.addToCart(number);
  const decrement = () => store.decrementItem(number);
  const removeFromCart = () => store.removeFromCart(number);
  return (
    <View style={styles.product}>
      <Text style={[styles.number, numberStyle]} onLayout={onNumberLayout}>
        {parseInt(number / 10)}
        {number % 10}
      </Text>
      <View style={styles.content}>
        <Text style={publicStyles.H5}>{name}</Text>
        <Text style={styles.price}>{`$${price}`}</Text>
      </View>
      <View style={styles.countControl}>
        <TouchableOpacity style={styles.indecrementButton} onPress={decrement}>
          <Image
            source={require("../assets/icons/Minus.png")}
            style={styles.indecrementImage}
          />
        </TouchableOpacity>
        <Text style={styles.counter}>{count}</Text>
        <TouchableOpacity style={styles.indecrementButton} onPress={increment}>
          <Image
            source={require("../assets/icons/Plus.png")}
            style={styles.indecrementImage}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={removeFromCart}>
        <Image source={require("../assets/icons/X.png")} style={styles.cross} />
      </TouchableOpacity>
    </View>
  );
}

const Lab4b = observer(() => {
  const store = useProductStore();
  return (
    <>
      <Text style={styles.title}>
        Корзина ({Object.keys(store.cart).length})
      </Text>
      <ScrollView style={styles.scroll}>
        <View style={styles.products}>
          {Object.entries(store.cart).map(([number, count]) => (
            <CartProduct
              number={number}
              name={store.products[number].name}
              price={store.products[number].price}
              count={count}
              key={number}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.stats}>
        <View style={styles.statsItem}>
          <Text style={publicStyles.H5}>Всего товаров:</Text>
          <Text style={styles.totalItems}>
            {Object.values(store.cart).reduce((a, b) => a + b, 0)}
          </Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={publicStyles.H4}>Итого:</Text>
          <Text style={styles.totalPrice}>
            $
            {Object.entries(store.products)
              .filter(([id]) => id in store.cart)
              .reduce(
                (prev, [id, { price }]) => prev + price * store.cart[id],
                0
              )}
          </Text>
        </View>
      </View>
    </>
  );
});
export default Lab4b;

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    paddingHorizontal: 20,
    ...publicStyles.H4,
  },
  scroll: {
    marginVertical: 10,
  },
  products: {
    paddingHorizontal: 20,
  },
  product: {
    flexDirection: "row",
    marginVertical: 10,
    padding: 14,
    height: 68,
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
    backgroundColor: "white",
    boxShadow: "0px 8px 12px -4px rgba(184, 184, 210, 0.2)",
    borderRadius: 12,
  },
  number: {
    fontFamily: "Poppins_500Medium",
    fontSize: 29.86,
    textAlign: "center",
    textAlignVertical: "center",
    color: publicColors.textDark,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    gap: 4,
  },
  price: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: publicColors.primary,
  },
  countControl: {
    flexDirection: "row",
    boxSizing: "border-box",
    borderWidth: 0.5,
    borderColor: publicColors.textLight,
    borderRadius: 20,
    padding: 5,
  },
  indecrementButton: {
    width: 30,
    height: 30,
    backgroundColor: publicColors.primary,
    borderRadius: 15,
  },
  indecrementImage: {
    objectFit: "contain",
    width: 30,
    height: 30,
    tintColor: "white",
  },
  counter: {
    width: 30,
    height: 30,
    fontFamily: "Poppins_500Medium",
    fontSize: 14.4,
    lineHeight: 22,
    textAlign: "center",
    textAlignVertical: "center",
    color: publicColors.textDark,
  },
  cross: {
    width: 24,
    height: 24,
  },
  stats: {
    padding: 20,
    paddingTop: 0,
    gap: 6,
  },
  statsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalItems: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14.4,
    letterSpacing: -0.01,
    color: publicColors.textDark,
  },
  totalPrice: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 17.28,
    color: publicColors.textDark,
  },
});
