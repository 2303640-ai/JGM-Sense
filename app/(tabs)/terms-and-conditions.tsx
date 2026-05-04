import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

// --- TERMS AND CONDITIONS DATA ---
// Tailored specifically for the JGM-Sense IoT App
const termsData = [
  {
    id: '1',
    title: '1. Acceptance of Terms',
    content: 'By registering and using the JGM-Sense application and its connected IoT hardware (ESP32 microcontrollers, DHT22 sensors, and ESP32-CAM), you agree to these Terms and Conditions. If you do not agree, please do not use the system.'
  },
  {
    id: '2',
    title: '2. Purpose of the System',
    content: 'JGM-Sense is designed to assist farm owners and livestock managers in monitoring sow farrowing and managing piglet brooding temperatures. It provides remote observation and automated thermal triggers. It is intended to be a supplementary tool, not a complete replacement for physical farm management, human oversight, or professional veterinary care.'
  },
  {
    id: '3',
    title: '3. Hardware & Connectivity Dependency',
    content: 'The real-time accuracy of JGM-Sense depends entirely on your local infrastructure. We are not responsible for delayed notifications, missing video feeds, or failed heat lamp automation caused by local power outages, internet connectivity drops, or hardware degradation in the pen environment.'
  },
  {
    id: '4',
    title: '4. Limitation of Liability',
    content: 'Due to the unpredictable nature of livestock farrowing and hardware dependencies, JGM-Sense and its developers shall not be held liable for any loss of livestock, pre-weaning mortality, or damages to property (e.g., relay or heat lamp malfunctions). The farmer assumes all risks associated with animal welfare.'
  },
  {
    id: '5',
    title: '5. Data & Privacy',
    content: 'The system streams live video and collects environmental data (temperature/humidity logs) strictly for your dashboard viewing and automated triggers. We do not distribute your live camera feeds to third parties. Please refer to our Privacy Policy for full details.'
  },
  {
    id: '6',
    title: '6. User Responsibilities',
    content: 'You are responsible for keeping your account credentials secure, ensuring the DHT22 sensors are placed safely away from physical damage by livestock, and verifying that all 5V relays and heat lamps are wired by a qualified technician to prevent fire hazards.'
  }
];

export default function TermsAndConditionsScreen() {
  const router = useRouter();
  const { isDarkModeEnabled, theme } = useTheme();
  
  // State to track which accordion section is open
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

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
        <Text style={[styles.headerTitle, { color: theme.headerText }]}>Terms & Conditions</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <Text style={[styles.introText, { color: isDarkModeEnabled ? '#CCC' : '#555' }]}>
          Last Updated: May 2026{'\n\n'}
          Please read these terms carefully before using the JGM-Sense IoT System and Mobile Application.
        </Text>

        {/* Accordion List */}
        {termsData.map((item) => {
          const isExpanded = expandedSection === item.id;
          
          return (
            <View key={item.id} style={[styles.card, { backgroundColor: theme.sectionBg }]}>
              <TouchableOpacity 
                style={styles.cardHeader} 
                activeOpacity={0.7}
                onPress={() => toggleSection(item.id)}
              >
                <Text style={[styles.cardTitle, { color: theme.headerText }]}>
                  {item.title}
                </Text>
                <Ionicons 
                  name={isExpanded ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color={theme.icon} 
                />
              </TouchableOpacity>

              {/* --- UPDATED: Lighter Background for Explanation Body --- */}
              {isExpanded && (
                <View style={[
                  styles.cardBody, 
                  { 
                    backgroundColor: isDarkModeEnabled ? '#2C2C2E' : '#F5EBEB', // Light beige for light mode, soft gray for dark mode
                    borderTopColor: isDarkModeEnabled ? '#444' : 'rgba(0,0,0,0.05)' 
                  }
                ]}>
                  <Text style={[styles.cardContentText, { color: theme.text }]}>
                    {item.content}
                  </Text>
                </View>
              )}
            </View>
          );
        })}

        {/* Footer Note */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: isDarkModeEnabled ? '#888' : '#999' }]}>
            JGM-Sense: Precision Livestock Farming
          </Text>
        </View>

      </ScrollView>
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  introText: {
    fontFamily: 'SF-Pro-Regular',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  card: {
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
  },
  cardTitle: {
    fontFamily: 'SF-Pro-Bold',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    paddingRight: 10,
  },
  cardBody: {
    padding: 18, // Fixed padding so the color fills evenly
    borderTopWidth: 1,
  },
  cardContentText: {
    fontFamily: 'SF-Pro-Regular',
    fontSize: 15,
    lineHeight: 22,
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'SF-Pro-Regular',
    fontSize: 12,
  }
});