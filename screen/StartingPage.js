import React, { useEffect } from "react";
import { View, StyleSheet,Image } from "react-native";
import { useNavigation } from "@react-navigation/native";


export const StartingPage = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("UserSelection");
    }, 3000); // Navigate after 3 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/1.png")} // Lottie JSON animation
        autoPlay
        loop
        style={styles.animation}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  animation: { width: "100%", height: "100%" }
  
});

export default StartingPage;