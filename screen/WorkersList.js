import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const WorkersList = ({ navigation, route }) => {
  const { category } = route.params;
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkers = async () => {
    try {
      const snapshot = await getDocs(collection(db, "labour", category, "profiles"));
      const workersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWorkers(workersData);
    } catch (error) {
      console.error("Error fetching workers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#D4A017" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category} Workers</Text>
      <FlatList
        data={workers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("WorkerProfile", { worker: item })}
          >
            <View style={styles.card}>
              <Image
                source={{ uri: item.image || "https://via.placeholder.com/100" }}
                style={styles.image}
              />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.label}>
                  Skill: <Text style={styles.value}>{item.skill}</Text>
                </Text>
                <Text style={styles.label}>
                  Experience: <Text style={styles.value}>{item.experience} yrs</Text>
                </Text>
                <Text style={styles.label}>
                  Charge: <Text style={styles.value}>₹{item.charge}/day</Text>
                </Text>
                <Text style={styles.label}>
                  Rating: <Text style={styles.value}>⭐ {item.rating}</Text>
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFCFB",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#D4A017",
    textAlign: "center",
    marginBottom: 15,
    marginTop: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff8e7",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 4,
    borderLeftWidth: 5,
    borderLeftColor: "#D4A017",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#D4A017",
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginTop: 3,
  },
  value: {
    fontWeight: "600",
    color: "#222",
  },
});
