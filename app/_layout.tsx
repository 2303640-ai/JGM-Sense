import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Prevent the splash screen from auto-hiding until we are ready
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: '(auth)', 
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // 1. Simulate a delay for initialization
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 2. Hide the splash screen
      await SplashScreen.hideAsync();
      
      // 3. Redirect based on login status
      if (!isLoggedIn) {
        // FIXED: Removed the trailing slash to match valid route types
        router.replace('/(auth)'); 
      } else {
        router.replace('/(tabs)/dashboard');
      }
    };

    checkAuth();
  }, [isLoggedIn]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ animation: 'fade' }} />
        <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}