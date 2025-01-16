import { useMemo, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { publicColors, publicStyles } from "../public/styles";

const factorial = (n) => {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
};

const calcPermutations = (arr) => {
  let result = factorial(arr.reduce((a, b) => a + b, 0));
  for (const k of arr) result /= factorial(k);
  return result;
};

const permutate = (text, seqNumber) => {
  let result = "";
  for (const i in text) {
    const [chars, counts] = charsCounts(text);
    for (const j in chars) {
      counts[j]--;
      let amount = calcPermutations(counts);
      if (amount > seqNumber) {
        result += chars[j];
        text = text.replace(chars[j], "");
        break;
      } else {
        seqNumber -= amount;
        counts[j]++;
      }
    }
  }

  return result;
};

const charsCounts = (text) => {
  const chars = [];
  const counts = [];
  for (const c of text) {
    let idx = chars.indexOf(c);
    if (idx < 0) {
      idx = chars.push(c) - 1;
      counts.push(0);
    }
    counts[idx]++;
  }
  return [chars, counts];
};

function OutputText({ inputText, visible }) {
  const textRef = useRef();
  if (visible) textRef.current = inputText;
  const outputText = useMemo(() => {
    console.log(inputText);
    const arr = [];
    let n = calcPermutations(charsCounts(inputText)[1]);
    for (let i = 0; i < n; i++) arr.push(permutate(inputText, i));
    return arr.join(" ");
  }, [textRef.current]);
  return (
    <ScrollView style={[styles.scroll, !visible && styles.hidden]}>
      <Text style={styles.text}>{outputText}</Text>
    </ScrollView>
  );
}

export default function Lab3() {
  const [inputText, setInputText] = useState("");
  const [visible, setVisible] = useState(true);
  const count = useMemo(() => {
    return calcPermutations(charsCounts(inputText)[1]);
  }, [inputText]);

  const onChangeText = (value) => {
    setInputText(value);
  };
  const toggleVisible = () => {
    setVisible((value) => !value);
  };

  return (
    <>
      <View style={styles.input}>
        <Text style={publicStyles.H5}>Набор символов</Text>
        <TextInput
          style={styles.field}
          onChangeText={onChangeText}
          placeholder="XXXXXXXX"
          placeholderTextColor={publicColors.textLight}
          value={inputText}
          maxLength={8}
        />
      </View>
      <View style={styles.output}>
        <View style={styles.title}>
          <Text style={publicStyles.H4}>
            Результат{inputText !== "" ? ` (${count})` : ""}
          </Text>
          <TouchableOpacity onPress={toggleVisible}>
            <Image
              source={
                visible
                  ? require("../assets/icons/Eye.png")
                  : require("../assets/icons/Eye Slash.png")
              }
              style={styles.eye}
            />
          </TouchableOpacity>
        </View>
        <OutputText inputText={inputText} visible={visible} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 20,
    gap: 8,
  },
  field: {
    height: 43,
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 33,
    ...publicStyles.H5,
  },
  output: {
    flex: 1,
    padding: 20,
    marginTop: 5,
    gap: 12,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  eye: {
    width: 24,
    height: 22,
    tintColor: publicColors.textDark,
  },
  scroll: {
    backgroundColor: "white",
    borderRadius: 16,
  },
  hidden: {
    position: "absolute",
    top: "-100%",
    maxHeight: "100%",
    opacity: 0,
  },
  text: {
    ...publicStyles.H5,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
