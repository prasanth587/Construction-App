import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Speech from "expo-speech";

export const InterestScreen = () => {
  const navigation = useNavigation();

  const speakHindi = () => {
    const hindiText =
      "क्या आप हमारी कंपनी में शामिल होने में रुचि रखते हैं? यदि हाँ, तो नीचे दिए गए हाँ बटन पर क्लिक करें। यदि नहीं, तो वापस जाने के लिए नहीं बटन दबाएँ।";
    Speech.speak(hindiText, { language: "hi-IN" });
  };

  useEffect(() => {
    speakHindi(); // Automatically starts speaking when the screen loads

    return () => {
      Speech.stop(); // Stop speaking when user leaves the screen
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.text}>Are you interested in joining our company?</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            await Speech.stop();
            navigation.navigate("RegisterWorker");
          }}
        >
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.noButton]}
          onPress={async () => {
            await Speech.stop();
            navigation.goBack();
          }}
        >
          <Text style={styles.buttonText}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
    resizeMode: "contain",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#222",
    marginBottom: 20,
    lineHeight: 28,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#D4A017",
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  noButton: {
    backgroundColor: "#8B0000",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default InterestScreen;
