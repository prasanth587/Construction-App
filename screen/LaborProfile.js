import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Speech from "expo-speech";
import { db } from "../firebaseConfig";
import { collection, addDoc, updateDoc } from "firebase/firestore";
import { RadioButton } from "react-native-paper";
import RNPickerSelect from 'react-native-picker-select';

export const LaborProfile = ({ route, navigation }) => {
  const editing = route?.params?.profile;
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [skill, setSkill] = useState("");
  const [experience, setExperience] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [charge, setCharge] = useState("");
  const [availability, setAvailability] = useState("");
  const [hiredCount, setHiredCount] = useState(0);
  const [gender, setGender] = useState("");

  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setSkill(editing.skill);
      setExperience(editing.experience);
      setPhone(editing.phone);
      setAddress(editing.address);
      setState(editing.state);
      setDistrict(editing.district);
      setCharge(editing.charge);
      setAvailability(editing.availability);
      setHiredCount(editing.hiredCount);
      setGender(editing.gender);
      setImage(editing.image);
    }
  }, []);

  const calculateRating = (hiredCount) => {
    if (hiredCount <= 5) return 3.0;
    if (hiredCount <= 10) return 3.5;
    if (hiredCount <= 15) return 4.0;
    return 4.5;
  };

  const pickImage = async () => {
    Speech.speak("कृपया अपनी तस्वीर अपलोड करें।", { language: "hi-IN" });
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!name || !skill || !experience || !phone || !address || !state || !district || !charge || !availability || !gender) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    const rating = calculateRating(hiredCount);

    let category;
    const skillLower = skill.toLowerCase();
    if (skillLower.includes("painter")) category = "Painters";
    else if (skillLower.includes("carpenter")) category = "Carpenters";
    else if (skillLower.includes("electrician")) category = "Electricians";
    else if (skillLower.includes("plumber")) category = "Plumbers";
    else if (skillLower.includes("mason")) category = "Masons";
    else if (skillLower.includes("welder")) category = "Welders";
    else if (skillLower.includes("gardener")) category = "Gardeners";
    else if (skillLower.includes("mechanic")) category = "Mechanics";
    else if (skillLower.includes("roofer")) category = "Roofers";
    else if (skillLower.includes("tile")) category = "Tile Fitters";
    else if (skillLower.includes("hvac")) category = "HVAC";
    else if (skillLower.includes("plasterer")) category = "Plasterers";
    else if (skillLower.includes("scaffolder")) category = "Scaffolders";
    else if (skillLower.includes("glass")) category = "Glass Fitters";
    else category = "Other";

    try {
      const data = {
        name,
        skill,
        experience,
        phone,
        address,
        state,
        district,
        charge,
        availability,
        hiredCount,
        rating,
        category,
        gender,
        image: image || "No Image",
        createdAt: new Date(),
      };

      if (editing && editing.docRef) {
        await updateDoc(editing.docRef, data);
        Alert.alert("Success", "Profile Updated Successfully");
      } else {
        await addDoc(collection(db, "labour", category, "profiles"), data);
        Speech.speak("आपकी प्रोफाइल सफलतापूर्वक जमा हो गई है।", { language: "hi-IN" });
        Alert.alert("Success", "Profile Submitted Successfully!");
      }

      navigation.goBack();
    } catch (error) {
      console.error("Error saving profile:", error);
      Alert.alert("Error", "Failed to save profile.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{editing ? "Edit" : "Add"} Labor Profile</Text>

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <Text style={styles.imageText}>Upload Image</Text>
        )}
      </TouchableOpacity>

      <View style={styles.form}>
        <TextInput placeholder="Your Name" style={styles.input} value={name} onChangeText={setName} />
        <RNPickerSelect
          onValueChange={(value) => setSkill(value)}
          value={skill}
          placeholder={{ label: "Select Your Skill", value: null }}
          items={[
            { label: "Carpenters", value: "Carpenters" },
            { label: "Electricians", value: "Electricians" },
            { label: "Plumbers", value: "Plumbers" },
            { label: "Painters", value: "Painters" },
            { label: "Masons", value: "Masons" },
            { label: "Welders", value: "Welders" },
            { label: "Gardeners", value: "Gardeners" },
            { label: "Mechanics", value: "Mechanics" },
            { label: "Roofers", value: "Roofers" },
            { label: "Tile Fitters", value: "Tile Fitters" },
            { label: "HVAC", value: "HVAC" },
            { label: "Plasterers", value: "Plasterers" },
            { label: "Scaffolders", value: "Scaffolders" },
            { label: "Glass Fitters", value: "Glass Fitters" },
          ]}
          style={{ inputIOS: styles.input, inputAndroid: styles.input }}
        />
        <TextInput placeholder="Experience (in years)" style={styles.input} keyboardType="numeric" value={experience} onChangeText={setExperience} />
        <TextInput placeholder="Phone Number" style={styles.input} keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
        <TextInput placeholder="Address" style={styles.input} value={address} onChangeText={setAddress} />
        <TextInput placeholder="State" style={styles.input} value={state} onChangeText={setState} />
        <TextInput placeholder="District" style={styles.input} value={district} onChangeText={setDistrict} />
        <TextInput placeholder="Charge (per day)" style={styles.input} keyboardType="numeric" value={charge} onChangeText={setCharge} />
        <TextInput placeholder="Availability (e.g., Full-time, Part-time)" style={styles.input} value={availability} onChangeText={setAvailability} />

       <Text style={styles.label}>Gender:</Text>
<View style={styles.genderContainer}>
  <TouchableOpacity
    style={styles.genderOption}
    onPress={() => setGender("Male")}
  >
    <RadioButton
      value="Male"
      status={gender === "Male" ? "checked" : "unchecked"}
      onPress={() => setGender("Male")}
    />
    <Text>Male</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.genderOption}
    onPress={() => setGender("Female")}
  >
    <RadioButton
      value="Female"
      status={gender === "Female" ? "checked" : "unchecked"}
      onPress={() => setGender("Female")}
    />
    <Text>Female</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.genderOption}
    onPress={() => setGender("Other")}
  >
    <RadioButton
      value="Other"
      status={gender === "Other" ? "checked" : "unchecked"}
      onPress={() => setGender("Other")}
    />
    <Text>Other</Text>
  </TouchableOpacity>
</View>

      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>{editing ? "Update" : "Submit"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#FFFDF5",
    flexGrow: 1,
  },
  title: {
    fontSize: 38,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
    color: "#B8860B", // rich golden
    marginTop: 20,
  },

  // 📸 Upload Image Section (PRO LOOK)
  imagePicker: {
    alignItems: "center",
    marginBottom: 20,
  padding: 16,
  borderRadius: 16,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: "#FFD700",
 
    marginBottom: 10,
  },
  imageText: {
  
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
  },

  form: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
    marginHorizontal: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#444",
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#FFD700",
    backgroundColor: "#FFFBEA",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
    marginBottom: 20,
  },
  genderOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  submitText: {
    color: "#333",
    fontWeight: "700",
    fontSize: 18,
    letterSpacing: 0.5,
  },
});



