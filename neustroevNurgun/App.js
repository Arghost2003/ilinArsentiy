import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { ProductStoreProvider } from "./store/ProductStore";
import Lab1 from "./screens/lab1";
import Lab2 from "./screens/lab2";
import Lab3 from "./screens/lab3";
import Lab4a from "./screens/lab4a";
import Lab4b from "./screens/lab4b";
import { Text, Image, StyleSheet, View } from "react-native";
import { DMSans_500Medium } from "@expo-google-fonts/dm-sans";
import {
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { publicColors, publicStyles } from "./public/styles";

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_500Medium,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });
  if (!fontsLoaded) return null;
  return (
    <View style={styles.container}>
      <ProductStoreProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let icon;
                switch (route.name) {
                  case "Лаб. работа 1":
                    icon = require("./assets/icons/Password Check.png");
                    break;
                  case "Лаб. работа 2":
                    icon = require("./assets/icons/Microscope.png");
                    break;
                  case "Лаб. работа 3":
                    icon = require("./assets/icons/Shuffle.png");
                    break;
                  case "Лаб. работа 4а":
                    icon = require("./assets/icons/Shop.png");
                    break;
                  case "Лаб. работа 4б":
                    icon = require("./assets/icons/Shopping Cart.png");
                    break;
                }
                return (
                  <>
                    <View
                      style={[
                        styles.tabBarIconBox,
                        {
                          borderTopWidth: focused ? 2 : 0,
                          borderColor: color,
                        },
                      ]}
                    />
                    <Image
                      source={icon}
                      style={[
                        styles.tabBarIcon,
                        {
                          tintColor: color,
                          width: size,
                          height: size,
                        },
                      ]}
                    />
                  </>
                );
              },
              tabBarStyle: styles.tabBar,
              tabBarActiveTintColor: publicColors.primary,
              tabBarInactiveTintColor: publicColors.textLight,
              tabBarLabel: ({ focused, color, position, children }) => (
                <Text
                  style={[
                    styles.tabBarLabel,
                    {
                      color: color,
                    },
                  ]}
                >
                  {children}
                </Text>
              ),
              headerTransparent: true,
              headerTitleStyle: publicStyles.H1,
            })}
            sceneContainerStyle={styles.sceneContainer}
          >
            <Tab.Screen name="Лаб. работа 1" component={Lab1} />
            <Tab.Screen name="Лаб. работа 2" component={Lab2} />
            <Tab.Screen name="Лаб. работа 3" component={Lab3} />
            <Tab.Screen name="Лаб. работа 4а" component={Lab4a} />
            <Tab.Screen name="Лаб. работа 4б" component={Lab4b} />
          </Tab.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </ProductStoreProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: publicColors.background,
  },
  tabBar: {
    height: 96,
    backgroundColor: "white",
    boxShadow: "0px 2px 15px rgba(184, 184, 210, 0.5)",
    borderWidth: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: "3.33%",
  },
  tabBarIconBox: {
    position: "absolute",
    width: "47.14%",
    height: "100%",
  },
  tabBarIcon: {
    bottom: 22,
  },
  tabBarLabel: {
    position: "absolute",
    width: 60,
    bottom: 20,
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
    lineHeight: 14,
    textAlign: "center",
  },
  sceneContainer: {
    backgroundColor: "transparent",
    paddingTop: 86,
    alignItems: "stretch",
  },
});
