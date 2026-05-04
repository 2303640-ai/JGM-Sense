import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// updatePassword handles the secure credential change in Firebase Auth
import { updatePassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

import { useTheme } from '../../context/ThemeContext';

export default function ChangePasswordScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * CHANGE PASSWORD LOGIC:
   * Validates matching fields and interacts with Firebase Auth.
   */
  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setLoading(true);
    const user = auth.currentUser;

    if (user) {
      try {
        await updatePassword(user, newPassword);
        Alert.alert("Success", "Your JGM-Sense password has been updated!", [
          { text: "OK", onPress: () => router.replace('/(tabs)/profile')}
        ]);
      } catch (error: any) {
        // Firebase often requires a 'recent login' for sensitive changes
        Alert.alert("Action Failed", error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Back Button matching your Profile UI */}
      <TouchableOpacity onPress={() => router.replace('/(tabs)/profile')} style={[styles.backButton, { backgroundColor: theme.itemBg }]}>
        <Ionicons name="chevron-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Logo/Avatar Section */}
              <View>
                  <Image
                    source={require('./Lock.png')} 
                    style={styles.logoImage}
                    resizeMode="contain"
                  />
                </View>

        <Text style={[styles.title, {alignSelf:'center'}, {fontSize: 30}, { color: theme.headerText } ]}>Change Password</Text>
        <Text style={[styles.subtitle, { color: theme.sectionTitle }]}>
          Want a fresh start? Update your JGM-Sense password.
        </Text>

        {/* Form Fields Section */}
        <TextInput 
          style={[styles.input, { backgroundColor: theme.sectionBg }]}
          placeholder="Current Password" 
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholderTextColor="#888"
        />

        <TextInput 
          style={[styles.input, { backgroundColor: theme.sectionBg }]}
          placeholder="New Password" 
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
          placeholderTextColor="#888"
        />

        <TextInput 
          style={[styles.input, { backgroundColor: theme.sectionBg }]}
          placeholder="Confirm Password" 
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor="#888"
        />

        {/* Footer Action */}
        <TouchableOpacity 
          style={[styles.confirmButton, { backgroundColor: theme.itemBg }]} 
          onPress={handleChangePassword}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.confirmText}>CONFIRM CHANGE</Text>
          )}
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FCEBF0', padding: 30 },
  backButton: { 
    backgroundColor: '#C4A4A4', width: 40, height: 40, 
    borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: 30 
  },
  logoImage: { 
    width: 250, 
    height: 250,
    marginBottom: 10,
    alignSelf: 'center',
  },
  content: { alignItems: 'center', marginTop: 10 },
  imagePlaceholder: { width: 150, height: 150, marginBottom: 10, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#000' },
  subtitle: { 
    textAlign: 'center', color: '#555', marginVertical: 15, 
    paddingHorizontal: 20, fontSize: 14, fontWeight: '500' 
  },
  input: { 
    backgroundColor: '#ffffff', width: '100%', height: 55, 
    borderRadius: 15, paddingHorizontal: 20, marginBottom: 15, elevation: 2 
  },
  confirmButton: { 
    backgroundColor: '#B68A8A', width: '100%', height: 60, 
    borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginTop: 20 
  },
  confirmText: { color: 'white', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 }
});