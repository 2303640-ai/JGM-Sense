// IMPORTS & CONFIGURATION
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import * as AuthSession from "expo-auth-session";
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

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: '864904306291-arr0d17ls2s1j1qnnl195gr9mkvtvg4m.apps.googleusercontent.com',
    iosClientId: '864904306291-arr0d17ls2s1j1qnnl195gr9mkvtvg4m.apps.googleusercontent.com',
    androidClientId: '864904306291-5um28d2fkv94uuh7susu7otvv6cpppif.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({
      native: "jgmsense://redirect",
    }),
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
      <View style={styles.topSection}>
        <Image 
          source={require('./JGMLogo.png')} 
          style={styles.logoImage} 
          resizeMode="contain"
        />
        <Text style={styles.welcomeText}>Hello!</Text>
        <Text style={styles.subText}>Welcome to JGM-Sense</Text>
      </View>

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

        {/* --- GOOGLE SIGN IN BUTTON --- */}
        <TouchableOpacity 
          style={styles.googleButton} 
          disabled={!request}
          onPress={() => { 
            promptAsync({ showInRecents: true }); 
          }}>
          {/* Use require directly here to avoid TypeScript module errors */}
          <Image source={require('./GoogleIcon.png')} style={styles.googleIcon} /> 
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

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#EE9CA7' },
  topSection: { height: height * 0.38, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 },
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
  logoImage: { width: 150, height: 150, marginBottom: 10 },
  welcomeText: { fontSize: 36, fontWeight: 'bold', color: '#fff' },
  subText: { fontSize: 16, color: '#fff', opacity: 0.8 },
  loginHeader: { fontSize: 24, fontWeight: 'bold', color: '#EE9CA7', marginBottom: 20 },
  input: { backgroundColor: '#fff', height: 55, borderRadius: 15, paddingHorizontal: 20, marginBottom: 15, borderWidth: 1, borderColor: '#ffd7d7' },
  forgotText: { textAlign: 'right', color: '#EE9CA7', marginBottom: 20, fontWeight: '500' },
  loginButton: { backgroundColor: '#EE9CA7', height: 55, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  loginButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  
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
  googleButtonText: { color: '#555', fontSize: 16, fontWeight: '600' },
  googleIcon: { 
    width: 24, 
    height: 24, 
    marginRight: 12,
    resizeMode: 'contain'
  },

  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  line: { flex: 1, height: 1, backgroundColor: '#DDD' },
  orText: { marginHorizontal: 10, color: '#999', fontSize: 14 },
  signupRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
  noAccountText: { color: '#666' },
  signupText: { color: '#EE9CA7', fontWeight: 'bold' },
});