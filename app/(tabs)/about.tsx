import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// 1. Import your custom theme hook!
import { useTheme } from '../../context/ThemeContext';

const { width, height } = Dimensions.get('window');

// --- SLIDE DATA WITH YOUR NEW IMAGES ---
const slides = [
  {
    id: '1',
    title: 'Smart IoT monitoring for\ntemperature and\nfarrowing in one app',
    description: 'Stay connected to your farm with simple\nand reliable tracking.',
    image: require('./P1.png'), 
  },
  {
    id: '2',
    title: 'Track live temperature\nand receive instant\nupdates anytime',
    description: 'Access accurate data directly from your\nconnected device.',
    image: require('./P2.png'),
  },
  {
    id: '3',
    title: 'Monitor farrowing\nactivity and improve\nlivestock care with ease.',
    description: 'Get timely insights to support better\ndecision making.',
    image: require('./P3.png'), 
  }
];

export default function AboutScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // 2. Pull your dynamic variables from the global context
  const { isDarkModeEnabled, theme } = useTheme();

  const [fontsLoaded] = useFonts({
    'SF-Pro-Regular': require('../../assets/images/fonts/SFPRODISPLAYREGULAR.otf'),
    'SF-Pro-Bold': require('../../assets/images/fonts/SFPRODISPLAYBOLD.otf'),
  });

  if (!fontsLoaded) {
    return null; 
  }

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace('/Account');
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.slideContainer}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
        <View style={styles.textContainer}>
          {/* Dynamically swap title color */}
          <Text style={[styles.title, { color: theme.headerText }]}>{item.title}</Text>
          {/* Use theme.text but with opacity to keep that muted grey look from your original design */}
          <Text style={[styles.description, { color: theme.text, opacity: 0.7 }]}>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    // Dynamically swap main background
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{ headerShown: false }} /> 
      {/* Swap the status bar so you can see your clock/wifi icons in Dark Mode */}
      <StatusBar barStyle={isDarkModeEnabled ? "light-content" : "dark-content"} />
      
      {/* Top Header */}
      <View style={styles.header}>
        {currentIndex === slides.length - 1 ? (
          // Swap button background and chevron icon color
          <TouchableOpacity style={[styles.backButton, { backgroundColor: theme.sectionBg }]} onPress={() => router.replace('/Account')}>
            <Ionicons name="chevron-back" size={24} color={theme.icon} />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} /> 
        )}

        {currentIndex !== slides.length - 1 ? (
          <TouchableOpacity onPress={() => router.replace('/Account')}>
            {/* Dynamically swap skip text */}
            <Text style={[styles.skipText, { color: theme.text }]}>Skip</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} /> 
        )}
      </View>

      {/* Swipeable Carousel */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />

      {/* Footer / Pagination / Next Button */}
      <View style={styles.footer}>
        <View style={styles.paginationContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index 
                  ? [styles.activeDot, { backgroundColor: theme.text }] // Active dot matches text color
                  : [styles.inactiveDot, { backgroundColor: theme.text, opacity: 0.3 }], // Inactive is faded text color
              ]}
            />
          ))}
        </View>

        {/* Change button color based on dark mode vs light mode */}
        <TouchableOpacity 
          style={[styles.nextButton, { backgroundColor: isDarkModeEnabled ? theme.sectionBg : '#BD858B' }]} 
          onPress={handleNext}
        >
          <Text style={[styles.nextButtonText, { color: isDarkModeEnabled ? theme.text : '#FCEBF0' }]}>
            {currentIndex === slides.length - 1 ? 'Finish' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 20, 
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  skipText: {
    fontFamily: 'SF-Pro-Bold',
    fontSize: 16,
  },
  placeholder: {
    width: 40,
    height: 40,
  },
  slideContainer: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.7,
    height: height * 0.35,
    marginBottom: 40,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'SF-Pro-Bold',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 15,
  },
  description: {
    fontFamily: 'SF-Pro-Regular',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 25,
    paddingBottom: 40,
    alignItems: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  activeDot: {
    width: 25,
  },
  inactiveDot: {
    width: 8,
  },
  nextButton: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    fontFamily: 'SF-Pro-Bold',
    fontSize: 16,
  },
});