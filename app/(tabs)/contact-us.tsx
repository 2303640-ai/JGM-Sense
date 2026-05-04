import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';

// Import your custom theme hook
import { useTheme } from '../../context/ThemeContext';

// --- CONTACT DATA ---
const contactData = [
  { 
    id: '1', 
    name: 'Bautista, Sigmund Lance N.', 
    email: '1700310@ub.edu.ph',
    phone: '+63 999 869 3888',
    image: require('./MrBautista.jpg') 
  },
  { 
    id: '2', 
    name: 'Lumanglas, Kristina Ashley C.', 
    email: '2303640@ub.edu.ph',
    phone: '+63 994 470 7502',
    image: require('./MsLumanglas.jpg') 
  },
  { 
    id: '3', 
    name: 'Dela Cruz, Keith Emmanuel D.', 
    email: '1802057@ub.edu.ph',
    phone: '+63 993 811 5266',
    image: require('./MrDelaCruz.jpg') 
  },
];

export default function ContactUsScreen() {
  const router = useRouter();
  const { isDarkModeEnabled, theme } = useTheme();

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const placeholderColor = isDarkModeEnabled ? '#888888' : '#A0A0A0';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{ headerShown: false }} /> 
      <StatusBar barStyle={isDarkModeEnabled ? "light-content" : "dark-content"} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: theme.sectionBg }]} 
          onPress={() => router.replace('/settings')}
        >
          <Ionicons name="chevron-back" size={28} color={theme.icon} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.headerText }]}>Contact Us</Text>
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* SECTION: Meet the Team */}
          <Text style={[styles.sectionHeading, { color: theme.headerText }]}>Meet the Team</Text>
          
          {contactData.map((contact) => (
            <View key={contact.id} style={styles.cardContainer}>
              <View style={[styles.imageWrapper, { backgroundColor: theme.sectionBg }]}>
                <Image 
                  source={contact.image} 
                  style={styles.profileImage} 
                  resizeMode="cover" 
                />
              </View>
              <Text style={[styles.nameText, { color: theme.headerText }]}>
                {contact.name}
              </Text>
              <Text style={[styles.subText, { color: isDarkModeEnabled ? '#AAA' : '#777' }]}>
                {contact.email}
              </Text>
              <Text style={[styles.subText, { color: isDarkModeEnabled ? '#AAA' : '#777' }]}>
                {contact.phone}
              </Text>
            </View>
          ))}

          {/* SECTION: Divider */}
          <View style={[styles.divider, { backgroundColor: theme.sectionBg }]} />

          {/* SECTION: Message Us Form */}
          <Text style={[styles.sectionHeading, { color: theme.headerText }]}>Send us a Message</Text>
          
          <TextInput
            style={[styles.input, { backgroundColor: theme.itemBg, color: theme.text }]}
            placeholder="Your Name"
            placeholderTextColor={placeholderColor}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={[styles.input, { backgroundColor: theme.itemBg, color: theme.text }]}
            placeholder="Your Email"
            placeholderTextColor={placeholderColor}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={[styles.textArea, { backgroundColor: theme.itemBg, color: theme.text }]}
            placeholder="How can we help you?"
            placeholderTextColor={placeholderColor}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            value={message}
            onChangeText={setMessage}
          />
          
          <TouchableOpacity style={styles.submitButton} activeOpacity={0.8}>
            <Text style={styles.submitButtonText}>Send Message</Text>
            <Ionicons name="paper-plane" size={18} color="#FFF" style={{ marginLeft: 8 }} />
          </TouchableOpacity>

          {/* SECTION: Socials */}
          <View style={styles.socialSection}>
            <Text style={[styles.socialTitle, { color: theme.text }]}>Connect with us</Text>
            <View style={styles.socialRow}>
              <TouchableOpacity style={[styles.socialIcon, { backgroundColor: theme.itemBg }]}>
                <Ionicons name="logo-facebook" size={24} color={theme.icon} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialIcon, { backgroundColor: theme.itemBg }]}>
                <Ionicons name="logo-twitter" size={24} color={theme.icon} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialIcon, { backgroundColor: theme.itemBg }]}>
                <Ionicons name="logo-instagram" size={24} color={theme.icon} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialIcon, { backgroundColor: theme.itemBg }]}>
                <Ionicons name="mail" size={24} color={theme.icon} />
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 20,
    marginBottom: 10,
  },
  backButton: {
    padding: 8,
    borderRadius: 25,
    marginRight: 15,
  },
  headerTitle: {
    fontFamily: 'SF-Pro-Bold',
    fontSize: 26,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingBottom: 50,
  },
  sectionHeading: {
    fontFamily: 'SF-Pro-Bold',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 20,
    textAlign: 'center',
  },
  cardContainer: {
    alignItems: 'center',
    marginBottom: 35,
  },
  imageWrapper: {
    width: 200,
    height: 200,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  nameText: {
    fontFamily: 'SF-Pro-Bold',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  subText: {
    fontFamily: 'SF-Pro-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 4,
    fontWeight: '600',
  },
  divider: {
    height: 2,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 1,
    marginVertical: 10,
  },
  input: {
    fontFamily: 'SF-Pro-Regular',
    fontSize: 16,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 15,
  },
  textArea: {
    fontFamily: 'SF-Pro-Regular',
    fontSize: 16,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    height: 120,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#FF6B6B', // A nice accent color, feel free to change!
    flexDirection: 'row',
    borderRadius: 16,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  submitButtonText: {
    fontFamily: 'SF-Pro-Bold',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  socialTitle: {
    fontFamily: 'SF-Pro-Bold',
    fontSize: 16,
    marginBottom: 15,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  socialIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});