import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { db, auth } from "../firebaseConfig";
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore";

export const ComplaintScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { worker } = route.params || {};
  const [complaint, setComplaint] = useState("");

  useEffect(() => {
    console.log("Worker Data:", worker);
  }, [worker]);

  const submitComplaint = async () => {
    if (!complaint.trim()) {
      alert("Please enter a valid complaint.");
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        alert("You must be logged in to submit a complaint.");
        return;
      }

      const workerDocRef = doc(db, "workers", worker.id);
      const workerDocSnap = await getDoc(workerDocRef);

      if (!workerDocSnap.exists()) {
        await setDoc(workerDocRef, { complaints: [] }, { merge: true });
      }

      await updateDoc(workerDocRef, {
        complaints: arrayUnion({
          hirerId: user.uid,
          workerName: worker.name,
          complaintText: complaint,
          date: new Date().toISOString(),
        }),
      });

      alert("Your complaint has been successfully submitted.");
      setComplaint("");
      navigation.goBack();
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Failed to submit complaint. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {worker?.name ? (
        <View style={styles.profileContainer}>
          <Image source={{ uri: worker.image }} style={styles.workerImage} />
          <Text style={styles.workerName}>{worker.name}</Text>

          <Text style={styles.workerDetails}>
            {worker.state || "Location not available"}  ₹{worker.charge || "Charge not specified"}
          </Text>

          <Text style={styles.district}>
            District: {worker.district || "District not available"}
          </Text>
        </View>
      ) : (
        <Text style={styles.errorText}>Worker data unavailable</Text>
      )}

      <Text style={styles.label}>Describe Your Complaint</Text>
      <TextInput
        style={styles.input}
        placeholder="Write your complaint here..."
        placeholderTextColor="#666"
        multiline
        onChangeText={setComplaint}
        value={complaint}
      />

      <TouchableOpacity onPress={submitComplaint} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit Complaint</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#F5F5F5", padding: 20, justifyContent: "center" },
  profileContainer: { alignItems: "center", marginBottom: 20 },
  workerImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10, borderWidth: 2, borderColor: "#DAA520" },
  workerName: { fontSize: 22, fontWeight: "600", color: "#333", marginBottom: 5 },
  workerDetails: { color: "#555", fontSize: 16, marginBottom: 5 },
  skills: { color: "#777", fontSize: 14, textAlign: "center", paddingHorizontal: 10 },
  district: { color: "#777", fontSize: 14, textAlign: "center", paddingHorizontal: 10, marginTop: 5 },
  errorText: { color: "red", textAlign: "center", fontSize: 16 },
  label: { color: "#DAA520", fontSize: 16, marginBottom: 5, fontWeight: "500", textAlign: "center", fontSize: 20 },
  input: {
    backgroundColor: "#FFF",
    color: "#333",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    minHeight: 100,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#DAA520",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  submitButton: { backgroundColor: "#DAA520", padding: 15, borderRadius: 8, alignItems: "center", elevation: 3 },
  submitButtonText: { fontWeight: "bold", color: "#FFF", fontSize: 16 },
});
