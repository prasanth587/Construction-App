import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";

const auth = getAuth();

const categories = [
  { name: "Carpenters", icon: "hammer" },
  { name: "Electricians", icon: "flash" },
  { name: "Plumbers", icon: "water" },
  { name: "Painters", icon: "color-palette" },
  { name: "Masons", icon: "construct" },
  { name: "Welders", icon: "bonfire" },
  { name: "Gardeners", icon: "leaf" },
  { name: "Mechanics", icon: "car" },
  { name: "Roofers", icon: "home" },
  { name: "Tile Fitters", icon: "grid" },
  { name: "HVAC", icon: "snow" },
  { name: "Plasterers", icon: "layers" },
  { name: "Scaffolders", icon: "construct" },
  { name: "Glass Fitters", icon: "aperture" },
];

export const Home = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const isSearching = searchText.length > 0;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#D4A017" />
          <TextInput
            placeholder="Search for workers..."
            style={styles.searchInput}
            placeholderTextColor="#666"
            value={searchText}
            onChangeText={setSearchText}
          />
          {isSearching && (
            <TouchableOpacity onPress={() => setSearchText("")}>
              <Ionicons name="close" size={20} color="#D4A017" />
            </TouchableOpacity>
          )}
        </View>

        {/* Admin Panel Shortcut */}
    

        {/* Header Image */}
        {!isSearching && (
          <View style={styles.headerContainer}>
            <Image
              source={{
                uri: "https://i.pinimg.com/474x/3a/a2/09/3aa2093ae124d72c42e8b5411d396f6c.jpg",
              }}
              style={styles.headerImage}
              resizeMode="cover"
            />
          </View>
        )}

        {/* Categories */}
        <Text style={styles.sectionTitle}>CATEGORIES</Text>
        <View style={styles.categoryGrid}>
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryBox}
                onPress={() =>
                  navigation.navigate("WorkersList", {
                    category: category.name,
                  })
                }
              >
                <Ionicons name={category.icon} size={40} color="#D4A017" />
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noResults}>No workers found</Text>
          )}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, isSearching && styles.disabledNav]}>
        <TouchableOpacity disabled={isSearching}>
          <Ionicons
            name="home"
            size={30}
            color={isSearching ? "#aaa" : "#D4A017"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          disabled={isSearching}
          onPress={() => {
            const userId = auth.currentUser ? auth.currentUser.uid : null;
            if (userId) {
              navigation.navigate("CreateProfileScreen", { userId });
            } else {
              Alert.alert("Error", "User is not logged in.");
            }
          }}
        >
          <Ionicons
            name="person"
            size={30}
            color={isSearching ? "#aaa" : "#D4A017"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("HiredWorkers")}>
          <Ionicons name="briefcase" size={30} color="#D4A017" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 50,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    borderRadius: 25,
    padding: 12,
    borderWidth: 1,
    borderColor: "#D4A017",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginHorizontal: 10,
  },
  adminButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D4A017",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 15,
  },
  adminText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  headerContainer: {
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  headerImage: {
    width: "100%",
    height: 200,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#D4A017",
    textAlign: "center",
    marginBottom: 10,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryBox: {
    width: "47%",
    backgroundColor: "#fff",
    paddingVertical: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D4A017",
    elevation: 3,
  },
  categoryText: {
    marginTop: 10,
    fontWeight: "bold",
    color: "#333",
    fontSize: 15,
    textAlign: "center",
  },
  noResults: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 25,
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    borderWidth: 1,
    borderColor: "#D4A017",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  disabledNav: {
    opacity: 0.4,
  },
});

export default Home;
