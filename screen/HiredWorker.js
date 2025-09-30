import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button } from "react-native";
import { db } from "../firebaseConfig";
import { collection, getDocs, doc, updateDoc, arrayRemove } from "firebase/firestore";

export const HiredWorker = () => {
  const [loading, setLoading] = useState(true);
  const [hiredWorkers, setHiredWorkers] = useState([]);

  useEffect(() => {
    // Fetch hired workers for all users
    const fetchHiredWorkers = async () => {
      try {
        // Get all users from the Firestore collection
        const usersSnapshot = await getDocs(collection(db, "users"));

        let workers = [];
        // Loop through users and add their hired workers to the array
        usersSnapshot.forEach((userDoc) => {
          const userData = userDoc.data();
          if (userData.hiredWorkers) {
            workers = [...workers, ...userData.hiredWorkers];  // Concatenate all hired workers
          }
        });

        setHiredWorkers(workers);  // Set all hired workers in state
      } catch (error) {
        console.error("Error fetching hired workers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHiredWorkers();
  }, []);

  const handleDelete = async (workerId) => {
    try {
      // Get the user document that contains this worker
      const usersSnapshot = await getDocs(collection(db, "users"));
      
      usersSnapshot.forEach(async (userDoc) => {
        const userData = userDoc.data();
        if (userData.hiredWorkers) {
          // Check if the hired worker is in the user's hired workers list
          const workerIndex = userData.hiredWorkers.findIndex(worker => worker.id === workerId);
          if (workerIndex !== -1) {
            // Remove worker from the user's hired workers array
            const userRef = doc(db, "users", userDoc.id);  // reference to the user document
            await updateDoc(userRef, {
              hiredWorkers: arrayRemove(userData.hiredWorkers[workerIndex])  // remove worker from array
            });
          }
        }
      });

      // Update the state by removing the worker from the UI
      setHiredWorkers((prevWorkers) => prevWorkers.filter(worker => worker.id !== workerId));
    } catch (error) {
      console.error("Error deleting worker:", error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#D4A017" />; // Golden yellow
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hired Workers</Text>
      {hiredWorkers.length === 0 ? (
        <Text>No workers hired yet.</Text>
      ) : (
        <FlatList
          data={hiredWorkers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.workerCard}>
              <Text style={styles.workerName}>{item.name}</Text>
              <Text style={styles.workerDetails}>State: {item.State}</Text>
              <Text style={styles.workerDetails}>Charge: ${item.charge} / day</Text>
              <Text style={styles.workerDetails}>Experience: {item.experience}</Text>
              <Button
                title="Delete"
                color="#D4A017" // Golden yellow button color
                onPress={() => handleDelete(item.id)}  // Delete worker when pressed
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#D4A017",textAlign: "center", marginBottom: 20,marginTop: 20 }, // Golden yellow title
  workerCard: {
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 8,
    elevation: 5,
  },
  workerName: { fontSize: 18, fontWeight: "bold", color: "#333" },
  workerDetails: { fontSize: 16, color: "#444" },
});


