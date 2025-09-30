import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

export const AdminDashboard = ({ navigation }) => {
  const handleLogout = () => {
    // Add your logout logic here (Firebase Auth signOut or navigation reset)
    navigation.navigate('Login'); // assuming you have a Login screen
  };

  return (
    <View style={styles.container}>
      {/* Logout button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Admin Dashboard</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LaborProfile')}>
        <Text style={styles.buttonText}>➕ Create Labor Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ViewAndEditProfiles')}>
        <Text style={styles.buttonText}>👀 View & Edit Profiles</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HiredWorker')}>
        <Text style={styles.buttonText}>👷‍♂️ View Hired Workers</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#FFF8E1', // Soft golden-yellow background
  },
  logoutButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#FFB300',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 4,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    marginTop: 190,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    alignSelf: 'center',
    color: '#FFC107',
  },
  button: {
    width: '100%',
    padding: 18,
    backgroundColor: '#FFB300',
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
