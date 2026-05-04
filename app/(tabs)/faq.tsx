import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';
import { useFonts } from 'expo-font';

// 1. Import your custom theme hook!
import { useTheme } from '../../context/ThemeContext';

// --- FAQ DATA ---
const faqData = [
  { 
    id: '1', 
    question: 'How to Piggy', 
    answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged." 
  },
  { id: '2', question: 'How to Piggy', answer: "Here is another explanation for how to piggy." },
  { id: '3', question: 'How to Do Piggy', answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus." },
  { id: '4', question: 'How to Piggy', answer: "More details about this specific question." },
  { id: '5', question: 'How to Piggy', answer: "Even more dummy text for your final question." },
];

export default function FAQScreen() {
  const router = useRouter();
  
  // 2. We changed this from a single string to an ARRAY of strings! 
  // This allows multiple IDs to be stored as "open" at the same time.
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // 3. Pull your dynamic variables from the global context
  const { isDarkModeEnabled, theme } = useTheme();

  const [fontsLoaded] = useFonts({
    'SF-Pro-Regular': require('../../assets/images/fonts/SFPRODISPLAYREGULAR.otf'),
    'SF-Pro-Bold': require('../../assets/images/fonts/SFPRODISPLAYBOLD.otf'),
  });

  if (!fontsLoaded) {
    return null; 
  }

  // Toggle the accordion open/close logic for multiple items
  const toggleExpand = (id: string) => {
    setExpandedIds((prevIds) => 
      prevIds.includes(id) 
        ? prevIds.filter((prevId) => prevId !== id) // Remove it if it's already open
        : [...prevIds, id] // Add it to the array if it's closed
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{ headerShown: false }} /> 
      <StatusBar barStyle={isDarkModeEnabled ? "light-content" : "dark-content"} />

      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: theme.sectionBg }]} onPress={() => router.replace('/Account')}>
          <Ionicons name="chevron-back" size={24} color={theme.icon} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.headerText }]}>Frequently Asked{'\n'}Questions</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Center Pig Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={require('./MainLogo.png')} 
            style={styles.pigImage} 
            resizeMode="contain" 
          />
        </View>

        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: theme.sectionBg }]}>
          <Ionicons name="search" size={20} color={theme.icon} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="What do you want to ask?"
            placeholderTextColor={isDarkModeEnabled ? '#888' : '#FCEBF0'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Accordion List */}
        <View style={styles.faqList}>
          {faqData.map((item) => {
            // Check if the current ID exists in our array of open IDs
            const isExpanded = expandedIds.includes(item.id);

            return (
              <View key={item.id} style={styles.faqItemWrapper}>
                {/* Clickable Header */}
                <TouchableOpacity 
                  style={[
                    styles.faqHeader, 
                    { backgroundColor: theme.sectionBg },
                    isExpanded && styles.faqHeaderExpanded // Flat bottom corners when open
                  ]} 
                  onPress={() => toggleExpand(item.id)}
                  activeOpacity={0.8}
                >
                  {/* Kept text contrasting with the button background */}
                  <Text style={[styles.questionText, { color: isDarkModeEnabled ? theme.text : '#FCEBF0' }]}>
                    {item.question}
                  </Text>
                  <Ionicons 
                    name={isExpanded ? "chevron-down" : "chevron-forward"} 
                    size={24} 
                    color={isDarkModeEnabled ? theme.icon : '#FCEBF0'} 
                  />
                </TouchableOpacity>

                {/* Expandable Content */}
                {isExpanded && (
                  <View style={[styles.faqContent, { backgroundColor: theme.itemBg }]}>
                    <Text style={[styles.answerText, { color: theme.text }]}>{item.answer}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 20,
    marginBottom: 10,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    marginRight: 15,
  },
  headerTitle: {
    fontFamily: 'SF-Pro-Bold',
    fontSize: 22,
    lineHeight: 26,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  pigImage: {
    width: 140,
    height: 140,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 25,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'SF-Pro-Regular',
    fontSize: 16,
  },
  faqList: {
    flex: 1,
  },
  faqItemWrapper: {
    marginBottom: 15,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  faqHeaderExpanded: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  questionText: {
    fontFamily: 'SF-Pro-Regular',
    fontSize: 16,
  },
  faqContent: {
    padding: 20,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  answerText: {
    fontFamily: 'SF-Pro-Regular',
    fontSize: 13,
    lineHeight: 22,
  },
});