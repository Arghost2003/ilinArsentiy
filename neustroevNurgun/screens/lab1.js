import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import { publicColors, publicStyles } from "../public/styles";

export default function Lab1() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [secureText1, setSecureText1] = useState(true);
  const [secureText2, setSecureText2] = useState(true);
  const isValid = text1.length >= 8 && text1 === text2;
  const onChangeText1 = (value) => {
    setText1(value);
  };
  const onChangeText2 = (value) => {
    setText2(value);
  };
  const showText1 = () => {
    setSecureText1(false);
  };
  const hideText1 = () => {
    setSecureText1(true);
  };
  const showText2 = () => {
    setSecureText2(false);
  };
  const hideText2 = () => {
    setSecureText2(true);
  };
  return (
    <>
      <View style={styles.container}>
        <View>
          <View style={styles.input}>
            <TextInput
              style={styles.field}
              onChangeText={onChangeText1}
              secureTextEntry={secureText1}
              value={text1}
              placeholder="Пароль"
              placeholderTextColor={publicColors.textLight}
            />
            <Pressable onPressIn={showText1} onPressOut={hideText1}>
              {({ pressed }) => (
                <Image
                  source={require("../assets/icons/Eye.png")}
                  style={[
                    styles.eye,
                    {
                      tintColor: pressed
                        ? publicColors.primary
                        : publicColors.textLight,
                    },
                  ]}
                />
              )}
            </Pressable>
          </View>
          <Text style={[styles.warning, { opacity: text1.length < 8 ? 1 : 0 }]}>
            Должно содержать не менее 8 символов
          </Text>
        </View>
        <View>
          <View style={styles.input}>
            <TextInput
              style={styles.field}
              onChangeText={onChangeText2}
              secureTextEntry={secureText2}
              value={text2}
              placeholder="Пароль для проверки"
              placeholderTextColor={publicColors.textLight}
            />
            <Pressable onPressIn={showText2} onPressOut={hideText2}>
              {({ pressed }) => (
                <Image
                  source={require("../assets/icons/Eye.png")}
                  style={[
                    styles.eye,
                    {
                      tintColor: pressed
                        ? publicColors.primary
                        : publicColors.textLight,
                    },
                  ]}
                />
              )}
            </Pressable>
          </View>
          <Text style={[styles.warning, { opacity: text1 !== text2 ? 1 : 0 }]}>
            Должны совпасть оба пароля
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.valid,
          { backgroundColor: isValid ? "#00FF00" : "#FF0000" },
        ]}
      >
        <Image
          source={
            isValid
              ? require("../assets/icons/Yes.png")
              : require("../assets/icons/No.png")
          }
          style={styles.validIcon}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 97,
    padding: 20,
    gap: 9,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#CFD1D4",
  },
  field: {
    flex: 1,
    height: 48,
    ...publicStyles.H4,
  },
  eye: {
    marginHorizontal: 12,
    marginVertical: 12,
    width: 24,
    height: 24,
    objectFit: "contain",
  },
  warning: {
    marginTop: 6,
    ...publicStyles.H6,
    color: publicColors.error,
  },
  valid: {
    marginTop: 97,
    width: 125,
    height: 125,
    borderRadius: 63,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  validIcon: {
    height: 62.5,
    objectFit: "contain",
    tintColor: "white",
  },
});
