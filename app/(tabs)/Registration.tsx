import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// Import the auth object from your config file
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const { height } = Dimensions.get('window');

export default function SignupScreen() {
  const router = useRouter();

  // 1. STATE HOOKS: To store what the user types
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // For the loading spinner

  // 2. THE REGISTRATION FUNCTION
  const handleRegister = async () => {
    // Basic Validation
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setLoading(true); // Start loading

    try {
      // Connect to the "Parent Source" (Firebase)
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      
      Alert.alert("Success!", "Account created successfully.");
      router.replace('/(tabs)'); // Navigate to dashboard
    } catch (error: any) {
      // Handle Firebase errors (e.g., email already in use)
      Alert.alert("Registration Failed", error.message);
    } finally {
      setLoading(false); // Stop loading regardless of outcome
    }
  };

  return (
    <View style={styles.mainContainer}>
      {/* TOP SECTION */}
      <View style={styles.topSection}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back to login</Text>
        </TouchableOpacity>
      </View>

      {/* WHITE CARD */}
      <View style={styles.whiteCard}>
        <Text style={styles.header}>Sign Up</Text>

        <TextInput 
          style={styles.input} 
          placeholder="Email" 
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        
        <TextInput 
          style={styles.input} 
          placeholder="Password" 
          secureTextEntry 
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
        />

        <TextInput 
          style={styles.input} 
          placeholder="Confirm Password" 
          secureTextEntry 
          placeholderTextColor="#999"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {/* Note: In a real app, you'd save Phone to Firestore, not Auth */}
        <TextInput 
          style={styles.input} 
          placeholder="Phone" 
          keyboardType="phone-pad" 
          placeholderTextColor="#999" 
        />

        <TouchableOpacity 
          style={styles.signupButton} 
          onPress={handleRegister}
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <ActivityIndicator color="#fff" /> // Show spinner
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#EE9CA7' },
  topSection: { height: height * 0.25, justifyContent: 'center', paddingLeft: 30 },
  backButton: { marginTop: 20 },
  backText: { color: '#fff', fontSize: 16, opacity: 0.9 },
  whiteCard: { 
    flex: 1, 
    backgroundColor: '#FFDDE1', 
    borderTopLeftRadius: 40, 
    borderTopRightRadius: 40, 
    padding: 30 
  },
  header: { fontSize: 32, fontWeight: 'bold', color: '#EE9CA7', marginBottom: 30 },
  input: { 
    backgroundColor: '#fff', 
    height: 55, 
    borderRadius: 15, 
    paddingHorizontal: 20, 
    marginBottom: 15,
    elevation: 2 
  },
  signupButton: { 
    backgroundColor: '#EE9CA7', 
    height: 55, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});