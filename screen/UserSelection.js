import React, { useEffect, useState } from "react";
import { 
  View, Text, ImageBackground, TouchableOpacity, 
  StyleSheet, ActivityIndicator 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Speech from "expo-speech"; 

export const UserSelection = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    speakText();
    setLoading(false);
  }, []);

  const speakText = () => {
    const message = "क्या आप मजदूर हैं? अगर हाँ, तो पीले बटन पर क्लिक करें।";
    Speech.speak(message, {
      language: "hi-IN",
      rate: 0.9,
      pitch: 1.0,
    });
  };

  const handleSelectRole = (selectedRole) => {
    if (selectedRole === "Labour") {
      navigation.navigate("InterestScreen"); // Use navigation.navigate
    } else {
      navigation.navigate("Signup");
    }
  };
  

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#E1A500" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/select.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.labourButton]} onPress={() => handleSelectRole("Labour")}>
          <Text style={styles.buttonText}>LABOUR</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.hirerButton]} onPress={() => handleSelectRole("Hirer")}>
          <Text style={styles.buttonText}>HIRER</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginHorizontal: 19,
  },
  labourButton: {
    backgroundColor: "#E1A500",
  },
  hirerButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
