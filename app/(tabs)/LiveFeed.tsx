import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// If you don't have Expo vector icons installed, you can replace these with text emojis like '👤' and '↗️'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LiveFeedScreen() {
  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Area */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Live Feed</Text>
        </View>

        {/* 1. Farrowing Area Card */}
        <View style={styles.feedCard}>
          <Text style={styles.cardTitle}>Farrowing Area</Text>
          
          <View style={styles.imageContainer}>
            <Image 
              source={require('@/assets/images/littlepigs.jpg')} 
              style={styles.feedImage} 
            />
            
            {/* Expand Icon */}
            <TouchableOpacity style={styles.expandIcon}>
              <MaterialCommunityIcons name="arrow-expand-all" size={25} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 2. Brooding Area Card */}
        <View style={styles.feedCard}>
          <Text style={styles.cardTitle}>Brooding Area</Text>
          
          <View style={styles.imageContainer}>
            <Image 
              source={require('@/assets/images/littlepigs.jpg')} 
              style={styles.feedImage} 
            />
            
            {/* Expand Icon */}
            <TouchableOpacity style={styles.expandIcon}>
              <MaterialCommunityIcons name="arrow-expand-all" size={25} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Extra space at bottom to prevent nav bar overlap */}
        <View style={{ height: 10 }} /> 
      </ScrollView>
    </View>
    
  );
}

const styles = StyleSheet.create({
  mainContainer: { 
    flex: 1,
    backgroundColor: '#FCF3F5', // Light background matching the design
  },
  scrollContent: {
    padding: 20,
    paddingTop: 50, // Pushes content down from the top notch
  },

  // --- Header ---
  header: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: { 
    fontFamily: 'SF-Pro-Bold',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20, // Pulls it slightly up to balance the space below
    marginLeft: 20,
  },

  // --- Feed Cards ---
  feedCard: { 
    backgroundColor: '#F9D1D8', // Light pink card background
    borderRadius: 20,
    padding: 15,
    marginBottom: 25,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    marginLeft: 5,
  },
  imageContainer: {
    position: 'relative', // Allows the expand icon to sit on top of the image
  },
  feedImage: {
    width: '100%',
    height: 220,
    borderRadius: 15, // Rounds the corners of the image itself
  },
  expandIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    // Optional: Add a slight background shadow/tint so it's visible on light images
    backgroundColor: 'rgba(0,0,0,0.2)', 
    padding: 6,
    borderRadius: 15,
  },

  // --- Bottom Navigation ---
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#EAC8CE',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 10,
  },
  navIcon: {
    fontSize: 24,
    opacity: 0.6,
  },
  navIconActive: {
    fontSize: 28,
    opacity: 1,
  }
});