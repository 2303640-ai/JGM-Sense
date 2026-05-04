import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemeProvider } from '../../context/ThemeContext'; 

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#FFF', 
          tabBarInactiveTintColor: '#C4A4A4', 
          tabBarStyle: {
            backgroundColor: '#000', 
            height: 60,
            borderTopWidth: 0,
            ...Platform.select({
              ios: { position: 'absolute' }, 
              default: {},
            }),
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