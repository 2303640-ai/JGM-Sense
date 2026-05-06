import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Alert, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../../firebaseConfig';

import { useTheme } from '../../context/ThemeContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(auth.currentUser?.displayName || 'User');

  useEffect(() => {
    if (auth.currentUser?.displayName) {
      setName(auth.currentUser.displayName);
    }
  }, []);

  const handleUpdateProfile = async () => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { 
          displayName: name 
        });
        setIsEditing(false);
        Alert.alert('Success', 'Your username has been updated!');
      }
    } catch (error: any) { // <--- Fixes the 'unknown' error
      Alert.alert('Update Failed', error.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" />
      
      <View style={[styles.topHeader, { backgroundColor: theme.sectionBg }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.replace('/Account')} style={[styles.backButton, { backgroundColor: theme.itemBg }]}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.headerText }]}>My Profile</Text>
        </View>

        <View style={styles.avatarContainer}>
          <View style={styles.imageWrapper}>
            <Image 
              source={require('./MrBautista.jpg')}
              style={styles.avatar} 
              resizeMode="contain"
            />
          </View>

          <View style={styles.nameRow}>
            {isEditing ? (
              <TextInput
                style={styles.nameInput}
                value={name}
                onChangeText={setName}
                autoFocus={true}
                returnKeyType="done"
                onSubmitEditing={handleUpdateProfile} 
              />
            ) : (
              <Text style={[styles.userName, { color: theme.headerText }]}>{name}</Text>
            )}
            
            <TouchableOpacity onPress={() => {
              if (isEditing) {
                handleUpdateProfile(); 
              } else {
                setIsEditing(true); 
              }
            }}>
              <Ionicons 
                name={isEditing ? "checkmark-circle" : "pencil"} 
                size={20} 
                color={isEditing ? "#4CAF50" : "#000"} 
                style={[styles.editIcon, { color: theme.headerText }]} 
              />
            </TouchableOpacity>
          </View>
          
          <Text style={[styles.userEmail, { color: theme.sectionTitle }]}>{auth.currentUser?.email || "User@email.com"}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: theme.itemBg }]}
          onPress={() => router.push('/ChangePassword')} 
        >
          <Text style={[styles.actionText, { color: theme.text }]}>Change Password</Text>
          <Ionicons name="pencil" size={18} color="white" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: theme.itemBg }]}
          onPress={() => router.replace('/recovery-email')}
        >
          <Text style={[styles.actionText, { color: theme.text }]}>Add Recovery Email</Text>
          <Ionicons name="pencil" size={18} color="white" />
        </TouchableOpacity>
        <View style={styles.footer}>
            {/* The entire row is now one clickable link */}
            <TouchableOpacity style={styles.termsRow} onPress={() => router.push('/terms-and-conditions')}>
                <View style={styles.line} />
                    <Text style={[styles.termsText, { color: theme.sectionTitle }]}>Terms & Agreement</Text>
                <View style={styles.line} />
            </TouchableOpacity>
  
        <TouchableOpacity style={[styles.confirmButton, {backgroundColor: theme.itemBg}]} onPress={handleUpdateProfile}>
            <Text style={[styles.confirmText, {color: theme.text}]}>CONFIRM CHANGE</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// THIS SECTION MUST BE PRESENT AT THE BOTTOM OF THE FILE
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FCEBF0' },
  topHeader: { 
    backgroundColor: '#E5D1D6', 
    paddingTop: 60, 
    paddingBottom: 30, 
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: 'center',
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', width: '100%', paddingHorizontal: 25, marginBottom: 20 },
  backButton: { backgroundColor: '#C4A4A4', padding: 8, borderRadius: 20, marginRight: 15 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#000' },
  avatarContainer: { alignItems: 'center' },
  imageWrapper: {
    width: 130, height: 130, borderRadius: 70, backgroundColor: '#FFF',
    justifyContent: 'center', alignItems: 'center', marginBottom: 10, overflow: 'hidden',
  },
  avatar: { width: 220, height: 220, marginBottom: -30, marginRight: 8 },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  userName: { fontSize: 24, fontWeight: 'bold', color: '#000' },
  nameInput: { 
    fontSize: 24, fontWeight: 'bold', color: '#B63A55', 
    borderBottomWidth: 1, borderBottomColor: '#B63A55',
    minWidth: 100, textAlign: 'center'
  },
  editIcon: { marginLeft: 10 },
  userEmail: { fontSize: 14, color: '#555', marginTop: 5 },
  content: { flex: 1, paddingHorizontal: 30, paddingTop: 40 },
  actionButton: { 
    backgroundColor: '#B68A8A', flexDirection: 'row', justifyContent: 'space-between', 
    alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20, borderRadius: 15, marginBottom: 15 
  },
  actionText: { color: 'white', fontSize: 16, fontWeight: '600', padding: 5 },
  footer: { flex: 1, justifyContent: 'flex-end', marginBottom: 40 },
  termsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  line: { flex: 1, height: 1, backgroundColor: '#999' },
  termsText: { marginHorizontal: 15, color: '#3b3b3b', fontSize: 14, marginVertical: 10 },
  confirmButton: { backgroundColor: '#B68A8A', paddingVertical: 18, borderRadius: 30, alignItems: 'center', marginBottom: 50 },
  confirmText: { color: 'white', fontWeight: 'bold', fontSize: 16, letterSpacing: 1, padding: 5 },
});