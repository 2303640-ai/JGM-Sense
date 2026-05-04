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
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';

// Import your custom theme hook
import { useTheme } from '../../context/ThemeContext';

export default function FeedbackScreen() {
  const router = useRouter();
  const { isDarkModeEnabled, theme } = useTheme();

  // State for the feedback form
  const [rating, setRating] = useState<number>(0);
  const [feedbackText, setFeedbackText] = useState<string>('');

  const handleSubmit = () => {
    if (rating === 0 && feedbackText.trim() === '') {
      Alert.alert('Empty Feedback', 'Please provide a rating or some text before submitting.');
      return;
    }
    
    // Here you would normally send the data to your backend/database
    Alert.alert(
      'Thank You!', 
      'Your feedback helps us improve JGM-Sense for all farmers.',
      [{ text: 'OK', onPress: () => router.replace('/settings') }]
    );
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
        <Text style={[styles.headerTitle, { color: theme.headerText }]}>Feedback</Text>
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Image 
              source={require('./MainLogo.png')} 
              style={styles.logoImage} 
              resizeMode="contain" 
            />
          </View>

          {/* Intro Text */}
          <View style={styles.textContainer}>
            <Text style={[styles.titleText, { color: theme.headerText }]}>
              How are we doing?
            </Text>
            <Text style={[styles.subtitleText, { color: isDarkModeEnabled ? '#CCC' : '#666' }]}>
              We are constantly looking for ways to improve the JGM-Sense monitoring experience. Let us know how the app is working for you and your livestock.
            </Text>
          </View>

          {/* Star Rating Section */}
          <View style={[styles.card, { backgroundColor: theme.sectionBg }]}>
            <Text style={[styles.cardLabel, { color: theme.text }]}>Rate your experience</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity 
                  key={star} 
                  onPress={() => setRating(star)}
                  activeOpacity={0.7}
                  style={styles.starButton}
                >
                  <Ionicons 
                    name={star <= rating ? "star" : "star-outline"} 
                    size={36} 
                    color={star <= rating ? "#FFD700" : (isDarkModeEnabled ? "#555" : "#CCC")} 
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Text Input Section */}
          <View style={[styles.card, { backgroundColor: theme.sectionBg }]}>
            <Text style={[styles.cardLabel, { color: theme.text }]}>Tell us more</Text>
            <TextInput
              style={[
                styles.textInput, 
                { 
                  backgroundColor: isDarkModeEnabled ? '#2C2C2E' : '#F5EBEB', // Matches your lighter background style from previous screens
                  color: theme.text 
                }
              ]}
              placeholder="What do you love? What could be better? Are the heat lamps triggering correctly?"
              placeholderTextColor={isDarkModeEnabled ? '#888' : '#999'}
              multiline={true}
              numberOfLines={6}
              textAlignVertical="top"
              value={feedbackText}
              onChangeText={setFeedbackText}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity 
            style={[styles.submitButton, { backgroundColor: isDarkModeEnabled ? '#4A4A4C' : '#D1B3B3' }]} // Soft themed colors for the button
            activeOpacity={0.8}
            onPress={handleSubmit}
          >
            <Text style={[styles.submitButtonText, { color: theme.headerText }]}>
              Send Feedback
            </Text>
          </TouchableOpacity>

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
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  titleText: {
    fontFamily: 'SF-Pro-Bold',
    fontSize: 22,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitleText: {
    fontFamily: 'SF-Pro-Regular',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
  },
  cardLabel: {
    fontFamily: 'SF-Pro-Bold',
    fontSize: 16,
    marginBottom: 15,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  starButton: {
    padding: 5,
  },
  textInput: {
    fontFamily: 'SF-Pro-Regular',
    fontSize: 15,
    borderRadius: 12,
    padding: 15,
    minHeight: 120,
  },
  submitButton: {
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    fontFamily: 'SF-Pro-Bold',
    fontSize: 16,
  }
});