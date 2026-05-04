import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator, Alert, Dimensions,
    KeyboardAvoidingView, Platform,
    ScrollView,
    StyleSheet, Text, TextInput,
    TouchableOpacity, View
} from 'react-native';
import { auth } from '../../firebaseConfig';

/** * FIREBASE IMPORTS:
 * createUserWithEmailAndPassword: Creates the account in Firebase Auth.
 * sendEmailVerification: Sends the "Click here to verify" email.
 */
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

const { height } = Dimensions.get('window');

export default function SignupScreen() {
  const router = useRouter();

  /**
   * 1. STATE MANAGEMENT:
   * These variables store the data the user types into the input fields.
   * 'setLoading' is used to show a spinner during the network request.
   */
  const [firstname, setFname] = useState('');
  const [lastname, setLname] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * 2. MAIN REGISTRATION LOGIC:
   * This function handles the "backend" connection.
   */
  const handleRegister = async () => {
    // Basic Client-Side Validation
    if (!firstname || !lastname || !phone ||!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setLoading(true); // Show the loading spinner

    try {
      /**
       * STEP A: Create the Auth Account
       * We use trim() to remove any accidental spaces in the email.
       */
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      
      /**
       * STEP B: Send Verification Email
       * This sends the automated email from Firebase so the user can prove they own the email.
       */
      await sendEmailVerification(userCredential.user);
      
      // Notify the user and redirect to the Login screen
      Alert.alert(
        "Verify Your Email", 
        "Account created! We've sent a verification link to your email. Please verify before logging in.",
        [{ text: "OK", onPress: () => router.replace('/') }] 
      );
      
    } catch (error: any) {
      // Map technical Firebase error codes to user-friendly messages
      let errorMessage = "An error occurred during registration.";
      if (error.code === 'auth/email-already-in-use') errorMessage = "That email is already registered.";
      if (error.code === 'auth/invalid-email') errorMessage = "Please enter a valid email address.";
      if (error.code === 'auth/weak-password') errorMessage = "Password should be at least 6 characters.";

      Alert.alert("Registration Failed", errorMessage);
    } finally {
      setLoading(false); // Hide the spinner
    }
  };

  return (
    /**
     * 3. KEYBOARD AVOIDING VIEW:
     * Ensures that the keyboard doesn't cover the input fields when it pops up.
     */
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1 }}
    >
      {/**
       * 4. SCROLLVIEW:
       * Allows the user to scroll through all input fields on smaller screens.
       */}
      <ScrollView 
        style={styles.mainContainer} 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER SECTION: Back button and Pink background */}
        <View style={styles.topSection}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>← Back to login</Text>
          </TouchableOpacity>
        </View>

        {/* INPUT CARD: The main container for user data entry */}
        <View style={styles.whiteCard}>
          <Text style={styles.header}>Sign Up</Text>

          {/* Form Fields: Each TextInput updates a state variable */}
          <TextInput 
            style={styles.input} 
            placeholder="First Name" 
            placeholderTextColor="#999"
            value={firstname}
            onChangeText={setFname}
          />

          <TextInput 
            style={styles.input} 
            placeholder="Last Name" 
            placeholderTextColor="#999"
            value={lastname}
            onChangeText={setLname}
          />

          <TextInput 
            style={styles.input} 
            placeholder="Phone Number" 
            keyboardType="phone-pad" 
            placeholderTextColor="#999" 
            value={phone}
          />

          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

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

          {/**
           * 5. ACTION BUTTON:
           * If 'loading' is true, it shows an ActivityIndicator (spinner).
           * If 'loading' is false, it shows the "Sign Up" text.
           */}
          <TouchableOpacity 
            style={styles.signupButton} 
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>
          
          {/* Extra spacing at the bottom to ensure the last field is fully scrollable */}
          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/**
 * 6. STYLING:
 * Defines the UI look (colors, borders, and layouts).
 */
const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#EE9CA7' },
  topSection: { height: height * 0.20, justifyContent: 'center', paddingLeft: 30 },
  backButton: { marginTop: 20 },
  backText: { color: '#fff', fontSize: 16, opacity: 0.9 },
  whiteCard: { 
    flex: 1, 
    backgroundColor: '#FFDDE1', 
    borderTopLeftRadius: 40, 
    borderTopRightRadius: 40, 
    padding: 30,
    minHeight: height * 0.8 // Ensures the pink card occupies enough height to look clean
  },
  header: { fontSize: 32, fontWeight: 'bold', color: '#EE9CA7', marginBottom: 25 },
  input: { 
    backgroundColor: '#fff', 
    height: 55, 
    borderRadius: 15, 
    paddingHorizontal: 20, 
    marginBottom: 15,
    elevation: 2 // Adds a subtle shadow on Android
  },
  signupButton: { 
    backgroundColor: '#EE9CA7', 
    height: 55, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});