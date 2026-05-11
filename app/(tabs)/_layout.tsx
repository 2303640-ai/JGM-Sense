import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemeProvider } from '../../context/ThemeContext'; 
import { Inter_400Regular, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen'; // Fix: Import as *

// Keep splash screen visible while loading fonts
SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, error] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#F7A8B8', 
          tabBarInactiveTintColor: '#C4A4A4', 
          tabBarStyle: {
            backgroundColor: '#FFFFFF', 
            position: 'absolute', 
            height: 60,
            borderTopWidth: 0,
            elevation: 0, 
            shadowOpacity: 0, 
          },
          headerShown: false,
          tabBarButton: (props) => <HapticTab {...props} />, // Ensure this is a function returning a component
        }}>
        <Tabs.Screen
          name="LiveFeed"
          options={{
            title: 'Live',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="tv" color={color} />,
          }}
        />
        <Tabs.Screen
          name="GestationManagement"
          options={{
            title: 'Gestation',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="heart.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="dashboard"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="Temperature"
          options={{
            title: 'Temp',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="thermometer" color={color} />,
          }}
        />
        <Tabs.Screen
          name="Account"
          options={{
            title: 'Account',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.circle" color={color} />,
          }}
        />
        {/* Hidden Screens */}
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