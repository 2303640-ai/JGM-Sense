import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { height } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.mainContainer}>
      {/* TOP SECTION */}
      <View style={styles.topSection}>
        <View style={styles.logoCircle}>
          <Image 
            // Matches your new filename exactly
            source={require('./../../assets/JGMLogo.png')} 
            style={styles.logoImage} 
            resizeMode="contain"
          />
        </View>
        <Text style={styles.welcomeText}>Hello!</Text>
        <Text style={styles.subText}>Welcome to JGM-Sense</Text>
      </View>

      {/* WHITE CARD */}
      <View style={styles.whiteCard}>
        <Text style={styles.loginHeader}>Login</Text>

        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#999" autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry placeholderTextColor="#999" />

        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={() => router.push('/dashboard')} 
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* GOOGLE SIGN-IN SECTION */}
        <View style={styles.dividerRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity style={styles.googleButton}>
          <View style={styles.googleIconPlaceholder} /> 
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>

        <View style={styles.signupRow}>
          <Text style={styles.noAccountText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/Registration')}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#006D5B' },
  topSection: { height: height * 0.38, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 },
  logoCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 5,
  },
  logoImage: { width: '85%', height: '85%' },
  welcomeText: { fontSize: 36, fontWeight: 'bold', color: '#fff' },
  subText: { fontSize: 16, color: '#fff', opacity: 0.8 },
  whiteCard: { flex: 1, backgroundColor: '#F3F7F6', borderTopLeftRadius: 40, borderTopRightRadius: 40, padding: 30 },
  loginHeader: { fontSize: 24, fontWeight: 'bold', color: '#006D5B', marginBottom: 20 },
  input: { backgroundColor: '#fff', height: 55, borderRadius: 15, paddingHorizontal: 20, marginBottom: 15, borderWidth: 1, borderColor: '#E0E0E0' },
  forgotText: { textAlign: 'right', color: '#006D5B', marginBottom: 20, fontWeight: '500' },
  loginButton: { backgroundColor: '#006D5B', height: 55, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  loginButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  line: { flex: 1, height: 1, backgroundColor: '#DDD' },
  orText: { marginHorizontal: 10, color: '#999', fontSize: 14 },
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
  googleIconPlaceholder: { width: 20, height: 20, backgroundColor: '#DB4437', marginRight: 10, borderRadius: 4 },
  googleButtonText: { color: '#555', fontSize: 16, fontWeight: '600' },
  signupRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
  noAccountText: { color: '#666' },
  signupText: { color: '#006D5B', fontWeight: 'bold' },
});