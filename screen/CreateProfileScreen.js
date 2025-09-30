import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const db = getFirestore();

export const CreateProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userId = route.params?.userId;

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const [laneNumber, setLaneNumber] = useState("");
  const [area, setArea] = useState("");
  const [isProfileExist, setIsProfileExist] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        Alert.alert("Error", "User ID is missing.");
        setLoading(false);
        return;
      }
      try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setName(data.name || "");
          setMobile(data.mobile || "");
          setState(data.state || "");
          setDistrict(data.district || "");
          setPincode(data.pincode || "");
          setLaneNumber(data.laneNumber || "");
          setArea(data.area || "");
          setIsProfileExist(true);
        } else {
          setIsProfileExist(false);
        }
      } catch (error) {
        Alert.alert("Error", "Failed to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleSaveProfile = async () => {
    if (!name || !mobile || !state || !district || !pincode || !laneNumber || !area) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    try {
      await setDoc(
        doc(db, "users", userId),
        { name, mobile, state, district, pincode, laneNumber, area, role: "Hirer" },
        { merge: true }
      );
      Alert.alert("Success", "Profile saved successfully!");
      setIsEditing(false);
      setIsProfileExist(true);
      navigation.replace("Home");
    } catch (error) {
      Alert.alert("Error", "Failed to save profile.");
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
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>
        {isProfileExist ? "Your Profile" : "Create Your Profile"}
      </Text>
      <View style={styles.card}>
        <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Mobile Number" keyboardType="phone-pad" value={mobile} onChangeText={setMobile} />
        <TextInput style={styles.input} placeholder="State" value={state} onChangeText={setState} />
        <TextInput style={styles.input} placeholder="District" value={district} onChangeText={setDistrict} />
        <TextInput style={styles.input} placeholder="Lane Number" value={laneNumber} onChangeText={setLaneNumber} />
        <TextInput style={styles.input} placeholder="Area" value={area} onChangeText={setArea} />
        <TextInput style={styles.input} placeholder="Pincode" keyboardType="numeric" value={pincode} onChangeText={setPincode} />

        <View style={styles.buttonContainer}>
          {!isProfileExist ? (
            <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
              <Text style={styles.buttonText}>Save Profile</Text>
            </TouchableOpacity>
          ) : (
            <>
              {!isEditing && (
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#F2B600" }]}
                  onPress={() => setIsEditing(true)}
                >
                  <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
              )}
              {(isEditing || !isProfileExist) && (
                <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
                  <Text style={styles.buttonText}>Save Profile</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7CF69",
    alignItems: "center",
    justifyContent: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    width: "90%",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#111",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
