import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

export const HiredWorkers = () => {
  const [hiredWorkers, setHiredWorkers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchHiredWorkers();
  }, []);

  const fetchHiredWorkers = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const workers = userData.hiredWorkers || [];

        const updatedWorkers = await Promise.all(
          workers.map(async (worker) => {
            const storedImage = await AsyncStorage.getItem(`worker_image_${worker.id}`);
            return {
              id: worker.id || Date.now().toString(),
              name: worker.name || "Unknown",
              state: worker.State || "Unknown State",
              district: worker.District || "Unknown District",
              charge: worker.charge || "Unknown Charge",
              image: storedImage || worker.image || "https://via.placeholder.com/100",
            };
          })
        );

        setHiredWorkers(updatedWorkers);
      }
    } catch (error) {
      console.error("Error fetching hired workers:", error);
    }
  };

  const confirmRemoveWorker = (workerId) => {
    Alert.alert(
      "Cancel Worker?",
      "Are you sure you want to cancel this laborer?",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: () => removeWorker(workerId) }
      ]
    );
  };

  const removeWorker = async (workerId) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const updatedWorkers = userData.hiredWorkers.filter(worker => worker.id !== workerId);

        await updateDoc(userDocRef, { hiredWorkers: updatedWorkers });
        await AsyncStorage.removeItem(`worker_image_${workerId}`);
        setHiredWorkers(updatedWorkers);
      }
    } catch (error) {
      console.error("Error removing worker:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hired Workers</Text>
      {hiredWorkers.length === 0 ? (
        <Text style={styles.noData}>No workers hired yet.</Text>
      ) : (
        <FlatList
          data={hiredWorkers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.workerCard}>
              <Image source={{ uri: item.image }} style={styles.workerImage} />
              <View style={styles.workerInfoContainer}>
                <Text style={styles.workerName}>{item.name}</Text>
                <Text style={[styles.workerInfo,]}>{item.state}</Text>
                <Text style={[styles.workerInfo,]}>{item.district}</Text>
                <Text style={styles.workerInfo}>💰 {item.charge}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("ComplaintScreen", { worker: item })} style={styles.complainButton}>
                  <Text style={styles.complainButtonText}>Complain</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => confirmRemoveWorker(item.id)} style={styles.removeButton}>
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", padding: 20, paddingTop: 50 },
  title: { fontSize: 26, fontWeight: "bold", color: "#FFD700", textAlign: "center", marginBottom: 20 },
  noData: { textAlign: "center", fontSize: 16, color: "#AAA", marginTop: 20 },
  workerCard: { 
    flexDirection: "row", 
    backgroundColor: "#FAF3E0", 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 12, 
    elevation: 4, 
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    borderColor: "#D4A017", 
    borderWidth: 1,
  },
  workerImage: { width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: "#FFD700", marginRight: 14 },
  workerInfoContainer: { flex: 1 },
  workerName: { fontSize: 16, fontWeight: "bold", color: "#333" },
  workerInfo: { fontSize: 14, color: "#666", marginTop: 2 },
  buttonContainer: { alignItems: "center", justifyContent: "space-between" },
  complainButton: { backgroundColor: "red", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, marginBottom: 6 },
  complainButtonText: { color: "#FFF", fontWeight: "bold", fontSize: 14 },
  removeButton: { backgroundColor: "#D4A017", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
  removeButtonText: { color: "#FFF", fontWeight: "bold", fontSize: 14 },
});
