import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import React, { useState, useMemo, useEffect } from "react";

const Lab3 = () => {
  const [size, setSize] = useState(100);
  const [elapsedTime, setElapsedTime] = useState(0); 
  const [isRunning, setIsRunning] = useState(false);

  const circleStyle = useMemo(() => {
    for (let i = 0; i < 100000000; i++) {}
    return {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: "#4682B4",
      justifyContent: "center",
      alignItems: "center",
    };
  }, [size]);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 10); 
      }, 10);
    } else if (!isRunning && interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (time) => {
    const seconds = Math.floor(time / 1000);
    const milliseconds = time % 1000;
    return `${seconds}.${milliseconds.toString().padStart(3, "0")}`;
  };

  return (
    <View style={styles.container}>
      <View style={{ height: 50, marginTop: 50, marginBottom: 60 }}>
        <Text style={styles.countText}>
          Timer: <Text style={styles.countNumber}>{formatTime(elapsedTime)}</Text>
        </Text>

        <Text style={styles.countText}>
          Circle size: <Text style={styles.countNumber}>{size}</Text>
        </Text>
      </View>

      <View style={styles.boxContainer}>
        <View style={circleStyle}></View>
      </View>

      <View style={{ marginTop: 40 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsRunning((prev) => !prev)}
        >
          <Text style={styles.buttonText}>
            {isRunning ? "Pause Timer" : "Start Timer"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { marginTop: 10 }]}
          onPress={() => {
            setElapsedTime(0);
            setIsRunning(false);
          }}
        >
          <Text style={styles.buttonText}>Reset Timer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { marginTop: 10 }]}
          onPress={() => setSize((size + 13) % 100 + 50)}
        >
          <Text style={styles.buttonText}>Change Circle Size</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  boxContainer: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#2260FF",
    paddingBottom: 2,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  countText: {
    fontSize: 15,
  },
  countNumber: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Lab3;