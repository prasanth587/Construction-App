import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";

export const ViewAndEditProfiles = ({ navigation }) => {
  const [profiles, setProfiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");  // To store selected category

  const categories = [
    "Carpenters", "Electricians", "Plumbers", "Painters", "Masons",
    "Welders", "Gardeners", "Mechanics", "Roofers", "Tile Fitters",
    "HVAC", "Plasterers", "Scaffolders", "Glass Fitters", "Other"
  ];

  const fetchProfiles = async (category) => {
    try {
      const profilesRef = collection(db, "labour", category, "profiles");
      const snapshot = await getDocs(profilesRef);
      const allProfiles = [];

      snapshot.forEach((doc) => {
        allProfiles.push({ ...doc.data(), docRef: doc.ref });
      });

      setProfiles(allProfiles);
    } catch (error) {
      console.error("❌ Error fetching profiles:", error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchProfiles(category); // Fetch profiles for selected category
  };

  const handleEditProfile = (profile) => {
    navigation.navigate("LaborProfile", { profile });
  };

  const renderProfile = ({ item }) => (
    <TouchableOpacity style={styles.profileContainer} onPress={() => handleEditProfile(item)}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.profileImage} />
      ) : (
        <View style={styles.noImage}>
          <Text style={styles.noImageText}>No Image</Text>
        </View>
      )}
      <View style={styles.profileText}>
        <Text style={styles.profileName}>{item.name}</Text>
        <Text>{item.skill}</Text>
        <Text>{item.phone}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Labor Profile</Text>

      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={styles.categoryButton}
            onPress={() => handleCategoryClick(category)}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.selectedCategoryText}>
        {selectedCategory ? `Showing labor profiles for: ${selectedCategory}` : "Select a category"}
      </Text>

      <FlatList
        data={profiles}
        renderItem={renderProfile}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 30, fontSize: 16, color: "#999" }}>
            No profiles found.
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFF8E1", // Soft golden-yellow background color
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#FFC107", // Golden color for title
    textTransform: "uppercase",
    marginTop: 20,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: "#FFB300", // Golden yellow button color
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    width: "48%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  categoryText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  selectedCategoryText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#FF9800", // Darker gold for contrast
  },
  profileContainer: {
    flexDirection: "row",
    marginBottom: 20,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FF9800", // Border color to match theme
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  noImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    color: "#666",
    fontSize: 12,
  },
  profileText: {
    justifyContent: "center",
  },
  profileName: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
  },
});

export default ViewAndEditProfiles;
