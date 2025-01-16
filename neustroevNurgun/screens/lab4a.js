import {
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

function Product({ number, name, price }) {
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
  const addToCart = () => store.addToCart(number);
  return (
    <View style={styles.product}>
      <Text style={[styles.number, numberStyle]} onLayout={onNumberLayout}>
        {parseInt(number / 10)}
        {number % 10}
      </Text>
      <View style={styles.content}>
        <Text style={publicStyles.H5}>{name}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
      <TouchableOpacity style={styles.addToCart} onPress={addToCart}>
        <Text style={styles.addToCartText}>В корзину</Text>
      </TouchableOpacity>
    </View>
  );
}

const Lab4a = observer(() => {
  const store = useProductStore();
  return (
    <>
      <Text style={styles.title}>
        Магазин ({Object.keys(store.products).length})
      </Text>
      <ScrollView style={styles.scroll}>
        <View style={styles.products}>
          {Object.entries(store.products).map(([number, { name, price }]) => (
            <Product number={number} name={name} price={price} key={number} />
          ))}
        </View>
      </ScrollView>
    </>
  );
});
export default Lab4a;

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
  addToCart: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10.5,
    backgroundColor: publicColors.primary,
    borderRadius: 20,
  },
  addToCartText: {
    ...publicStyles.H5,
    textAlign: "center",
    color: "white",
  },
});
