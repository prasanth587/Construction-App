import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import * as Speech from "expo-speech";
import { useNavigation } from "@react-navigation/native";

export const RegisterWorker = () => {
  const navigation = useNavigation();
  const phoneNumber = "9362196294";
  const whatsappURL = `https://wa.me/${phoneNumber}`;

  const handleWhatsApp = () => {
    Speech.stop(); // Stop any ongoing speech before new one
    Speech.speak("व्हाट्सएप के माध्यम से संपर्क करने के लिए बटन दबाएं।", { language: "hi-IN" });
    Linking.openURL(whatsappURL);
  };

  const handleProfileNavigation = () => {
    Speech.stop();
    Speech.speak("अगर आपको फॉर्म भरना आता है, तो प्रोफाइल बनाने के लिए आगे बढ़ें।", { language: "hi-IN" });
    navigation.navigate("LaborProfile");
  };

  useEffect(() => {
    const hindiText =
      "कृपया कार्यकर्ता के रूप में पंजीकरण करने के लिए हमसे संपर्क करें। आप दिए गए नंबर पर कॉल कर सकते हैं या व्हाट्सएप पर संपर्क कर सकते हैं।";
    Speech.speak(hindiText, { language: "hi-IN" });

    return () => {
      Speech.stop(); // Stop speech when leaving the screen
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          Speech.stop();
          Speech.speak("वापस जाने के लिए बटन दबाएं।", { language: "hi-IN" });
          navigation.navigate("UserSelection");
        }}
      >
        <Text style={styles.backButtonText}>⬅️ Back to Selection</Text>
      </TouchableOpacity>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Worker Registration</Text>
        <Text style={styles.subtitle}>
          To register as a worker, please contact us:
        </Text>

        <Text style={styles.contact}>📞 Contact: {phoneNumber}</Text>

        <TouchableOpacity style={styles.hireButton} onPress={handleWhatsApp}>
          <Text style={styles.hireButtonText}>💬 Contact via WhatsApp</Text>
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
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#D4A017",
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  formContainer: {
    backgroundColor: "#fff",
    width: "90%",
    maxWidth: 400,
    padding: 25,
    borderRadius: 12,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 15,
  },
  contact: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  hireButton: {
    backgroundColor: "#D4A017",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  hireButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  profileButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  profileButtonText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
});

export default RegisterWorker;
