import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  StatusBar,
  Switch
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';
import { useFonts } from 'expo-font';

// 1. Import your custom theme hook
import { useTheme } from '../../context/ThemeContext';

export default function SettingsScreen() {
  const router = useRouter();
  
  // 2. Pull all dynamic variables from the global context
  const { isDarkModeEnabled, toggleDarkMode, theme } = useTheme();

  // Keep notifications local since it doesn't affect the app's colors
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const toggleNotification = () => setIsNotificationEnabled(previous => !previous);

  const [fontsLoaded] = useFonts({
    'SF-Pro-Regular': require('../../assets/images/fonts/SFPRODISPLAYREGULAR.otf'),
    'SF-Pro-Bold': require('../../assets/images/fonts/SFPRODISPLAYBOLD.otf'),
  });

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{ headerShown: false }} /> 
      <StatusBar barStyle={isDarkModeEnabled ? "light-content" : "dark-content"} />

      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/Account')}>
          <Ionicons name="chevron-back" size={32} color={theme.icon} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.headerText }]}>Settings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Section 1: Performance and Display */}
        <View style={[styles.sectionContainer, { backgroundColor: theme.sectionBg }]}>
          <Text style={[styles.sectionTitle, { color: theme.sectionTitle }]}>Performance and Display</Text>
          
          <TouchableOpacity 
            style={[styles.itemRow, { backgroundColor: theme.itemBg }]} 
            activeOpacity={0.8}
            onPress={toggleNotification}
          >
            <View style={styles.itemLeft}>
              <Ionicons name="notifications" size={22} color={theme.icon} style={styles.icon} />
              <Text style={[styles.itemText, { color: theme.text }]}>Notification</Text>
            </View>
            <Switch
              style={{ transform: [{ scale: 0.8 }] }}
              trackColor={{ false: '#767577', true: theme.isDark ? '#34C759' : '#000000' }}
              thumbColor={'#FFFFFF'}
              ios_backgroundColor="#767577"
              onValueChange={toggleNotification}
              value={isNotificationEnabled}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.itemRow, { backgroundColor: theme.itemBg }]}
            activeOpacity={0.8}
            onPress={toggleDarkMode}
          >
            <View style={styles.itemLeft}>
              <Ionicons name={isDarkModeEnabled ? "moon" : "contrast"} size={22} color={theme.icon} style={styles.icon} />
              <Text style={[styles.itemText, { color: theme.text }]}>Dark Mode</Text>
            </View>
            <Switch
              style={{ transform: [{ scale: 0.8 }] }}
              trackColor={{ false: '#767577', true: theme.isDark ? '#34C759' : '#000000' }}
              thumbColor={'#FFFFFF'}
              ios_backgroundColor="#767577"
              onValueChange={toggleDarkMode}
              value={isDarkModeEnabled}
            />
          </TouchableOpacity>
        </View>

        {/* Section 2: Information Support */}
        <View style={[styles.sectionContainer, { backgroundColor: theme.sectionBg }]}>
          <Text style={[styles.sectionTitle, { color: theme.sectionTitle }]}>Information Support</Text>
          
          <TouchableOpacity 
            style={[styles.itemRow, { backgroundColor: theme.itemBg }]}
            onPress={() => router.push('/privacy-policy')}
          >
            <View style={styles.itemLeft}>
              <Ionicons name="shield-checkmark" size={22} color={theme.icon} style={styles.icon} />
              <Text style={[styles.itemText, { color: theme.text }]}>Privacy Policy</Text>
            </View>
          </TouchableOpacity>

          {/* --- NAVIGATION FOR TERMS AND CONDITIONS --- */}
          <TouchableOpacity 
            style={[styles.itemRow, { backgroundColor: theme.itemBg }]}
            onPress={() => router.push('/terms-and-conditions')}
          >
            <View style={styles.itemLeft}>
              <Ionicons name="document-text" size={22} color={theme.icon} style={styles.icon} />
              <Text style={[styles.itemText, { color: theme.text }]}>Terms and Conditions</Text>
            </View>
          </TouchableOpacity>

          {/* --- NAVIGATION FOR CONTACT US --- */}
          <TouchableOpacity 
            style={[styles.itemRow, { backgroundColor: theme.itemBg }]}
            onPress={() => router.push('/contact-us')}
          >
            <View style={styles.itemLeft}>
              <Ionicons name="headset" size={22} color={theme.icon} style={styles.icon} />
              <Text style={[styles.itemText, { color: theme.text }]}>Contact Us</Text>
            </View>
          </TouchableOpacity>

          {/* --- UPDATED NAVIGATION FOR FEEDBACK --- */}
          <TouchableOpacity 
            style={[styles.itemRow, { backgroundColor: theme.itemBg }]}
            onPress={() => router.push('/feedback')}
          >
            <View style={styles.itemLeft}>
              <Ionicons name="chatbox-ellipses" size={22} color={theme.icon} style={styles.icon} />
              <Text style={[styles.itemText, { color: theme.text }]}>Feedback</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Section 3: Account Management */}
        <View style={[styles.sectionContainer, { backgroundColor: theme.sectionBg }]}>
          <Text style={[styles.sectionTitle, { color: theme.sectionTitle }]}>Account Management</Text>
          
          <TouchableOpacity style={[styles.itemRow, { backgroundColor: theme.itemBg }]}>
            <View style={styles.itemLeft}>
              <Ionicons name="trash" size={22} color="#FF3B30" style={styles.icon} />
              <Text style={[styles.itemText, { color: '#FF3B30' }]}>Delete Account</Text>
            </View>
          </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingTop: 15,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontFamily: 'SF-Pro-Bold',
    fontSize: 28,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  sectionContainer: {
    borderRadius: 24, 
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'SF-Pro-Bold',
    fontSize: 14,
    marginBottom: 16,
    marginLeft: 5,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16, 
    paddingVertical: 14,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  itemText: {
    fontFamily: 'SF-Pro-Bold',
    fontSize: 18,
  },
});