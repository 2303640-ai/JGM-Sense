import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// Make sure this path matches your folder structure!
import { useTheme } from '../../context/ThemeContext';

export default function AccountScreen() {
  const router = useRouter();
  const { theme, isDarkModeEnabled } = useTheme();

  const [fontsLoaded] = useFonts({
    'SF-Pro-Regular': require('../../assets/images/fonts/SFPRODISPLAYREGULAR.otf'),
    'SF-Pro-Bold': require('../../assets/images/fonts/SFPRODISPLAYBOLD.otf'),
  });

  const menuItems = [
    { id: '1', title: 'My Profile', icon: 'person', path: '/profile' },
    { id: '2', title: 'Notification', icon: 'notifications', path: null },
    { id: '3', title: 'Report', icon: 'bar-chart', path: null },
    { id: '4', title: 'Settings', icon: 'settings', path: '/settings' },
    { id: '5', title: 'FAQ', icon: 'chatbubbles-outline', path: '/faq' },
    { id: '6', title: 'About', icon: 'information-circle-outline', path: '/about' },
    { id: '7', title: 'Logout', icon: 'log-out-outline', path: null },
  ] as const;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/(auth)'); 
    } catch (error: any) {
      Alert.alert("Logout Error", error.message);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDarkModeEnabled ? "light-content" : "dark-content"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={[styles.topSection, { backgroundColor: theme.sectionBg }]}>
          <Text style={[styles.headerTitle, { color: theme.headerText }]}>Account</Text>
          <View>
            <Image 
              source={require('./MainLogo.png')} 
              style={styles.pigImage} 
              resizeMode="contain" 
            />      
          </View>
        </View>

        <View style={[styles.menuBg, { backgroundColor: theme.sectionBg }]} >
          <View style={styles.menuContainer}>
            {menuItems.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={[styles.menuItem, { backgroundColor: theme.itemBg }]}
                activeOpacity={0.8}
                onPress={() => {
                  if (item.title === 'Logout') {
                  // Show confirmation screen before logging out
                    Alert.alert("Logout", "Are you sure you want to log out of JGM-Sense?",
                     [{text: "Cancel", style: "cancel"}, {text: "Log Out", style: "destructive", onPress: () => handleLogout()}]);
                       } else if (item.path) {
                        router.push(item.path as any);
                       } else {
                       console.log(`${item.title} pressed - Route not built yet`);}}}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name={item.icon as any} size={24} color={theme.icon} />
                  <Text style={[styles.menuText, { color: theme.text }]}>{item.title}</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color={theme.icon} />
              </TouchableOpacity>
            ))}
          </View> 
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    paddingHorizontal: 20,
    paddingTop: 160, // Keeping your height exactly as it is
    paddingBottom: 40,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    marginBottom: 20,
    marginTop: -10, // Pulls the section up to create the overlap effect
    position: 'relative', // Ensure the container is the reference point
    alignItems: 'center', // Center the content horizontally
  },
  headerTitle: {
    fontFamily: 'SF-Pro-Bold',
    fontSize: 30,
    
    // Move the title to the top
    position: 'absolute', 
    top: 70,  // Adjust this value to clear the iOS notch/status bar
    left: 40, // Aligns it to the left side
  },
  pigImage: {
    width: 170,
    height: 170,
  },
  menuBg: {
    paddingBottom: 20,
    marginTop: 20,
    backgroundColor: '#d3afaf',
    borderRadius: 30,
    marginHorizontal: 20,
  },
  menuContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    marginTop: 40,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 22,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 12,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontFamily: 'SF-Pro-Bold',
    fontSize: 16,
    marginLeft: 15,
  },
});