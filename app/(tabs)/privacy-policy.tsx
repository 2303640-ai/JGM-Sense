import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';

// Import your custom theme hook
import { useTheme } from '../../context/ThemeContext';

// --- PRIVACY POLICY DATA ---
const privacyData = [
  { 
    id: '1', 
    title: 'What information do we collect about you?', 
    content: "We collect personal information that you provide when you register or use JGM-Sense, such as your name, email address, and account credentials. In addition, we collect data from the connected IoT hardware, including real-time temperature and humidity readings (from DHT22 sensors), live video feed data (from the ESP32-CAM), and 5V relay status logs. We may also collect technical data such as device ID, IP address, and usage activity to help improve system performance and ensure proper synchronization." 
  },
  { 
    id: '2', 
    title: 'How do we use your information?', 
    content: "Your data is primarily used to facilitate the automated thermal management and remote monitoring system. Environmental data is used to trigger heat lamps to prevent piglet hypothermia, while camera data allows you to remotely observe farrowing. We also use your data to send instant push notifications to your mobile dashboard regarding critical pen conditions." 
  },
  { 
    id: '3', 
    title: 'Camera Feed & Video Privacy', 
    content: "The ESP32-CAM module provides a live video feed strictly intended for observing livestock (sows and newborn piglets) to identify high-risk nesting behaviors or huddling. We prioritize your privacy; video feeds are securely routed to your personal dashboard and are not publicly accessible, recorded without consent, or shared with third parties." 
  },
  { 
    id: '4', 
    title: 'Data Storage and Security', 
    content: "Data collected from your farm's micro-climate is securely transmitted through our cloud-based communication layer to your mobile app. We implement standard security measures to protect your account and IoT data. However, you are responsible for maintaining the confidentiality of your mobile dashboard login credentials." 
  },
  { 
    id: '5', 
    title: 'Sharing of Information', 
    content: "We do not sell, trade, or rent your personal information or farm monitoring data to external entities. Data collected is solely used to empower your operational efficiency and proactive risk management for your livestock." 
  },
];

export default function PrivacyPolicyScreen() {
  const router = useRouter();
  
  // Using the exact same array logic from the FAQ screen!
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const { isDarkModeEnabled, theme } = useTheme();

  const toggleExpand = (id: string) => {
    setExpandedIds((prevIds) => 
      prevIds.includes(id) 
        ? prevIds.filter((prevId) => prevId !== id) 
        : [...prevIds, id] 
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{ headerShown: false }} /> 
      <StatusBar barStyle={isDarkModeEnabled ? "light-content" : "dark-content"} />

      {/* Top Floating Back Button */}
      <View style={styles.header}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: theme.sectionBg }]} onPress={() => router.replace('/settings')}>
          <Ionicons name="chevron-back" size={24} color={theme.icon} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Center Pig Image & Title */}
        <View style={styles.titleContainer}>
          <Image 
            source={require('./MainLogo.png')} 
            style={styles.pigImage} 
            resizeMode="contain" 
          />
          <Text style={[styles.mainTitle, { color: theme.headerText }]}>Privacy Policy</Text>
        </View>

        {/* Accordion List */}
        <View style={styles.policyList}>
          {privacyData.map((item) => {
            const isExpanded = expandedIds.includes(item.id);

            return (
              <View key={item.id} style={styles.policyItemWrapper}>
                {/* Clickable Header */}
                <TouchableOpacity 
                  style={[
                    styles.policyHeader, 
                    { backgroundColor: theme.sectionBg },
                    isExpanded && styles.policyHeaderExpanded 
                  ]} 
                  onPress={() => toggleExpand(item.id)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.policyTitleText, { color: isDarkModeEnabled ? theme.text : '#FCEBF0' }]}>
                    {item.title}
                  </Text>
                  <Ionicons 
                    name={isExpanded ? "chevron-down" : "chevron-forward"} 
                    size={24} 
                    color={isDarkModeEnabled ? theme.icon : '#FCEBF0'} 
                  />
                </TouchableOpacity>

                {/* Expandable Content */}
                {isExpanded && (
                  <View style={[styles.policyContent, { backgroundColor: theme.itemBg }]}>
                    <Text style={[styles.contentText, { color: theme.text }]}>{item.content}</Text>
                  </View>
                )}
              </View>
            );
          })}
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
    alignItems: 'flex-start',
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: -10, // Pulls it slightly up to balance the back button
  },
  pigImage: {
    width: 140,
    height: 140,
  },
  mainTitle: {
    fontFamily: 'SF-Pro-Bold',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },
  policyList: {
    flex: 1,
  },
  policyItemWrapper: {
    marginBottom: 15,
  },
  policyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  policyHeaderExpanded: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  policyTitleText: {
    fontFamily: 'SF-Pro-Regular',
    fontSize: 15,
    flex: 1, // Ensures long text wraps properly without pushing the icon off screen
    paddingRight: 10,
  },
  policyContent: {
    padding: 20,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  contentText: {
    fontFamily: 'SF-Pro-Regular',
    fontSize: 13,
    lineHeight: 22,
  },
});