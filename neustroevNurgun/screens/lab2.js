import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { publicColors, publicStyles } from "../public/styles";

function useTranslateText(text) {
  const [ruText, setRuText] = useState(null);
  const [error, setError] = useState(null);
  const calls = useRef(0);

  useEffect(() => {
    const translateText = async () => {
      calls.current++;
      setRuText(null);
      setError(null);
      if (text !== null) {
        try {
          const response = await fetch(
            `https://ftapi.pythonanywhere.com/translate?dl=ru&text=${encodeURI(
              text
            )}`
          );
          if (!response.ok) throw new Error(response.statusText);
          const data = await response.json();
          if (calls.current === 1) setRuText(data["destination-text"]);
        } catch (error) {
          if (calls.current === 1) setError(error.message);
        }
      }
      calls.current--;
    };
    translateText();
  }, [text]);

  return { ruText, error };
}

function TranslatableText({ title, text, error, children }) {
  const [translate, setTranslate] = useState(true);
  const { ruText, error: translateError } = useTranslateText(text);
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={publicStyles.H5}>{title}</Text>
        <TouchableOpacity
          style={[
            styles.translate,
            {
              backgroundColor: translate ? publicColors.primary : "transparent",
            },
          ]}
          onPress={() => setTranslate((value) => !value)}
        >
          <Image
            source={require("../assets/icons/Translate.png")}
            style={{
              width: 24,
              height: 24,
              tintColor: translate ? "white" : publicColors.textDark,
            }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scroll}>
        {error ? (
          <Text style={styles.error}>Произошла ошибка: {error}</Text>
        ) : (
          <Text style={styles.text}>{translate && ruText ? ruText : text}</Text>
        )}
      </ScrollView>
      {!error && translateError && (
        <Text style={styles.error}>Не удалось перевести: {translateError}</Text>
      )}
      {children}
    </View>
  );
}

export default function Lab2() {
  const [randomLoading, setRandomLoading] = useState(true);
  const [randomFact, setRandomFact] = useState(null);
  const [todayFact, setTodayFact] = useState(null);
  const [randomError, setRandomError] = useState(null);
  const [todayError, setTodayError] = useState(null);

  const getRandomFact = async () => {
    setRandomLoading(true);
    setRandomError(null);
    try {
      const response = await fetch(
        "https://uselessfacts.jsph.pl/api/v2/facts/random"
      );
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      setRandomFact(data.text);
    } catch (e) {
      setRandomError(e.message);
      setRandomFact(null);
    }
    setRandomLoading(false);
  };
  const getTodayFact = async () => {
    setTodayError(null);
    try {
      const response = await fetch(
        "https://uselessfacts.jsph.pl/api/v2/facts/today"
      );
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      setTodayFact(data.text);
    } catch (e) {
      setTodayError(e.message);
      setTodayFact(null);
    }
  };
  useEffect(() => {
    getRandomFact();
    getTodayFact();
  }, []);

  return (
    <>
      <TranslatableText
        title="Случайный бесполезный факт"
        text={randomFact}
        error={randomError}
      >
        <TouchableOpacity
          style={[styles.button, randomLoading && styles.disabledButton]}
          disabled={randomLoading}
          onPress={getRandomFact}
        >
          <Text
            style={[
              styles.buttonText,
              randomLoading && styles.disabledButtonText,
            ]}
          >
            {randomLoading ? "Загрузка…" : "Следующий"}
          </Text>
        </TouchableOpacity>
      </TranslatableText>
      <TranslatableText
        title="Сегодняшний бесполезный факт"
        text={todayFact}
        error={todayError}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  translate: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    marginVertical: 10,
    height: 96,
  },
  text: {
    ...publicStyles.H6,
    color: publicColors.textLight,
  },
  error: {
    ...publicStyles.H6,
    color: publicColors.error,
  },
  button: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    backgroundColor: publicColors.primary,
    borderRadius: 50,
    marginVertical: 25,
  },
  buttonText: {
    ...publicStyles.H4,
    color: "white",
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: publicColors.textLight,
  },
  disabledButtonText: {
    color: publicColors.textLight,
  },
});
