import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from "react-native";

export const WorkerProfile = ({ route, navigation }) => {
  const { worker } = route.params;

  const handleHireNow = () => {
    // Navigate to the HireForm page and pass worker details as params
    navigation.navigate("HireForm", { worker });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: worker.image || "https://via.placeholder.com/150" }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{worker.name}</Text>
          <View style={styles.detailsSection}>
            <Text style={styles.details}>Skill: {worker.skill}</Text>
            <Text style={styles.details}>Experience: {worker.experience} years</Text>
            <Text style={styles.details}>Charge: ₹{worker.charge} /day</Text>
            <Text style={styles.details}>Rating: ⭐ {worker.rating}</Text>
            <Text style={styles.details}>Category: {worker.category}</Text>
            <Text style={styles.details}>District: {worker.district}</Text>
            <Text style={styles.details}>State: {worker.state}</Text>
            <Text style={styles.details}>Availability: {worker.availability}</Text>
            <Text style={styles.details}>Address: {worker.address || "Not Provided"}</Text>
            {/* Phone number hidden */}
            <Text style={styles.detailText}><Text style={styles.bold}>Phone:</Text> {"********" + worker.phone.slice(-4)}</Text>
          </View>
        </View>

        {/* Hire Button */}
        <Pressable style={styles.hireButton} onPress={handleHireNow}>
          <Text style={styles.hireButtonText}>Hire Now</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9F6", // Light background color
    paddingTop: 100,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#fff", // White background for profile section
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 15,
    borderWidth: 4, // Added border thickness for better emphasis
    borderColor: "#D4A017", // Golden Yellow Border
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  detailsSection: {
    marginTop: 10,
    width: "100%",
    paddingHorizontal: 20,
  },
  details: {
    fontSize: 16,
    color: "#444",
    marginBottom: 10,
  },
  hireButton: {
    backgroundColor: "#D4A017", // Golden Yellow Button
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",

    marginBottom: 20,
    width: "100%",
    elevation: 4,
    
  },
  hireButtonText: {
    color: "#fff", // White text
    fontSize: 18,
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
  },
  detailText: {
    fontSize: 16,
    color: "#444",
    marginBottom: 10,
  },
});

export default WorkerProfile;
