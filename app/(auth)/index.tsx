// IMPORTS & CONFIGURATION
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// FIREBASE & AUTH PROVIDERS
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

WebBrowser.maybeCompleteAuthSession();

const { height } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // GOOGLE SIGN-IN LOGIC
  const [request, response, promptAsync] = Google.useAuthRequest({
    // Keep your Web Client ID from Firebase
    webClientId: '73095207538-ecmjc246vijc6tb0s2shavfjrt7i32es.apps.googleusercontent.com',

    // Add the iOS Client ID specifically for your mobile device
    iosClientId: '626334293602-e5us5lmqfa3vs7qfsd1ck2kq1ioop08c.apps.googleusercontent.com',
    
    // Add the Android Client ID specifically for your mobile device
    androidClientId: '626334293602-98v608vdin0jmel65gl9tnc24r5n5cvf.apps.googleusercontent.com',

    // Uses the 'jgmsense' scheme from your app.json
    redirectUri: AuthSession.makeRedirectUri({
      scheme: 'jgmsense'}),

  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => router.replace('/(tabs)/dashboard'))
        .catch((error) => Alert.alert("Google Sign-In Error", error.message));
    }
  }, [response]);

  // EMAIL/PASSWORD LOGIN
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter both email and password.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/(tabs)/dashboard'); 
    } catch (error: any) {
      Alert.alert("Login Error", error.message);
    }
  };

  return (
    <View style={styles.mainContainer}>
      {/* HEADER SECTION */}
      <View style={styles.topSection}>
        <Image 
          source={require('./JGMLogo.png')} 
          style={styles.logoImage} 
          resizeMode="contain"
        />
        <Text style={styles.welcomeText}>Hello!</Text>
        <Text style={styles.subText}>Welcome to JGM-Sense</Text>
      </View>

      {/* INTERACTION CARD */}
      <View style={styles.whiteCard}>
        <Text style={styles.loginHeader}>Login</Text>

        <TextInput 
          style={styles.input} 
          placeholder="Email" 
          placeholderTextColor="#999" 
          autoCapitalize="none" 
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail} 
        />

        <TextInput 
          style={styles.input} 
          placeholder="Password" 
          secureTextEntry 
          placeholderTextColor="#999" 
          value={password}
          onChangeText={setPassword} 
        />

        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity 
          style={styles.googleButton} 
          disabled={!request}
          onPress={() => promptAsync()} 
        >
          <View style={styles.googleIconPlaceholder} /> 
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>

        <View style={styles.signupRow}>
          <Text style={styles.noAccountText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/Registration')}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// --- ORGANIZED STYLESHEET ---
const styles = StyleSheet.create({
  // 1. LAYOUT CONTAINERS
  mainContainer: { 
    flex: 1, 
    backgroundColor: '#EE9CA7' 
  },
  topSection: { 
    height: height * 0.38, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 30 
  },
  whiteCard: { 
    flex: 1, 
    backgroundColor: '#FFF', 
    borderTopLeftRadius: 40, 
    borderTopRightRadius: 40, 
    padding: 30,
    marginTop: -20, 
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  // 2. HEADER & BRANDING
  logoImage: { 
    width: 150, 
    height: 150,
    marginBottom: 10 
  },
  welcomeText: { 
    fontSize: 36, 
    fontWeight: 'bold', 
    color: '#fff' 
  },
  subText: { 
    fontSize: 16, 
    color: '#fff', 
    opacity: 0.8 
  },
  loginHeader: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#EE9CA7', 
    marginBottom: 20 
  },

  // 3. FORM INPUTS
  input: { 
    backgroundColor: '#fff', 
    height: 55, 
    borderRadius: 15, 
    paddingHorizontal: 20, 
    marginBottom: 15, 
    borderWidth: 1, 
    borderColor: '#ffd7d7' 
  },
  forgotText: { 
    textAlign: 'right', 
    color: '#EE9CA7', 
    marginBottom: 20, 
    fontWeight: '500' 
  },

  // 4. BUTTONS (PRIMARY & SOCIAL)
  loginButton: { 
    backgroundColor: '#EE9CA7', 
    height: 55, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  loginButtonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  googleButton: { 
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    height: 55, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#DDD' 
  },
  googleButtonText: { 
    color: '#555', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  googleIconPlaceholder: { 
    width: 20, 
    height: 20, 
    backgroundColor: '#DB4437', 
    marginRight: 10, 
    borderRadius: 4 
  },

  // 5. DIVIDERS & FOOTER
  dividerRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 20 
  },
  line: { 
    flex: 1, 
    height: 1, 
    backgroundColor: '#DDD' 
  },
  orText: { 
    marginHorizontal: 10, 
    color: '#999', 
    fontSize: 14 
  },
  signupRow: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginTop: 25 
  },
  noAccountText: { 
    color: '#666' 
  },
  signupText: { 
    color: '#EE9CA7', 
    fontWeight: 'bold' 
  },
});