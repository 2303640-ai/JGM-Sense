import { Tabs } from 'expo-router';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemeProvider } from '../../context/ThemeContext'; 

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
        'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
      });
      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#F7A8B8', // Changed to match your app's pink theme, but you can change this back to '#FFF' if you prefer
          tabBarInactiveTintColor: '#C4A4A4', 
          tabBarStyle: {
            backgroundColor: '#FFFFFF', // Makes the background transparent instead of black
            position: 'absolute', // Forces the tab bar to float over the screen content on all platforms
            height: 60,
            borderTopWidth: 0,
            elevation: 0, // Removes the drop shadow on Android
            shadowOpacity: 0, // Removes the drop shadow on iOS
          },
          headerShown: false,
          tabBarButton: HapticTab,
        }}>

        {/* --- SCREEN 1: LIVE --- */}
        <Tabs.Screen
          name="LiveFeed"
          options={{
            title: 'Live',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="tv" color={color} />,
          }}
        />

        {/* --- SCREEN 2: GESTATION --- */}
        <Tabs.Screen
          name="GestationManagement"
          options={{
            title: 'Gestation',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="heart.fill" color={color} />,
          }}
        />

        {/* --- SCREEN 3: HOME (CENTER) --- */}
        <Tabs.Screen
          name="dashboard"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />

        {/* --- SCREEN 4: TEMP --- */}
        <Tabs.Screen
          name="Temperature"
          options={{
            title: 'Temp',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="thermometer" color={color} />,
          }}
        />

        {/* --- SCREEN 5: ACCOUNT --- */}
        <Tabs.Screen
          name="Account"
          options={{
            title: 'Account',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.circle" color={color} />,
          }}
        />

        {/* --- HIDDEN SUB-PAGES (NO ICONS) --- */}
        <Tabs.Screen name="index" options={{ href: null }} />
        <Tabs.Screen name="Registration" options={{ href: null }} />
        <Tabs.Screen name="ProfileScreen" options={{ href: null }} />
        <Tabs.Screen name="recovery-email" options={{ href: null }} />
        <Tabs.Screen name="ChangePassword" options={{ href: null }} />
        <Tabs.Screen name="ThemedContext" options={{ href: null }} />
        <Tabs.Screen name="about" options={{ href: null }} />
        <Tabs.Screen name="contact-us" options={{ href: null }} />
        <Tabs.Screen name="faq" options={{ href: null }} />
        <Tabs.Screen name="feedback" options={{ href: null }} />
        <Tabs.Screen name="privacy-policy" options={{ href: null }} />
        <Tabs.Screen name="profile" options={{ href: null }} />
        <Tabs.Screen name="settings" options={{ href: null }} />
        <Tabs.Screen name="terms-and-conditions" options={{ href: null }} />

      </Tabs>
    </ThemeProvider>
  );
}