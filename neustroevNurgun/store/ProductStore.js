import { createContext, useContext } from "react";
import { observer, useLocalObservable } from "mobx-react-lite";

const Context = createContext(null);

export const ProductStoreProvider = observer(({ children, ...props }) => {
  const store = useLocalObservable(() => createProductStore(props));
  return <Context.Provider value={store}>{children}</Context.Provider>;
});

export const useProductStore = () => {
  const store = useContext(Context);
  if (!store) throw new Error("Используйте ProductStore внутри провайдера!");
  return store;
};

export const createProductStore = (props) => {
  const products = {};
  for (let i = 1; i <= 10; i++)
    products[i] = {
      name: `Товар №${i}`,
      price: 5 * i,
    };
  return {
    products: products,
    cart: {},
    addToCart(id) {
      let count = (typeof this.cart[id] == "number" ? this.cart[id] : 0) + 1;
      if (count > 99) count = 99;
      this.cart[id] = count;
    },
    decrementItem(id) {
      let count = this.cart[id] - 1;
      if (count < 1) count = 1;
      this.cart[id] = count;
    },
    removeFromCart(id) {
      delete this.cart[id];
    },
  };
};
