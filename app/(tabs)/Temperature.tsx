import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TemperatureScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.container}>
        {/* Top Header */}
        <Text style={styles.title}>Temperature</Text>
        
        {/* --- BROODING AREA CARD --- */}
        <View style={styles.cardWrapper}>
          <Text style={styles.subtitle}>Brooding Area</Text>
          
          <TouchableOpacity 
            activeOpacity={0.8} 
            // FIXED: Matches your "BroodingTemp.tsx" file name
            onPress={() => router.push('/BroodingTemp')} 
          >
            <LinearGradient
              colors={['#FFCF54', '#FFA36C', '#F79C9C']} 
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.gradientCard}
            >
              <Text style={styles.temperatureDisplay}>32°</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* --- FARROWING AREA CARD --- */}
        <View style={styles.cardWrapper}>
          <Text style={styles.subtitle}>Farrowing Area</Text>
          
          <TouchableOpacity 
            activeOpacity={0.8} 
            // FIXED: Matches your "FarrowingTemp.tsx" file name
            onPress={() => router.push('/FarrowingTemp')} 
          >
            <LinearGradient
              colors={['#FFCF54', '#FFA36C', '#F79C9C']} 
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.gradientCard}
            >
              <Text style={styles.temperatureDisplay}>32°</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FCF7F7', 
  },
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  title: {
    fontFamily: 'SF-Pro-Bold', 
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 35, 
  },
  cardWrapper: {
    marginBottom: 25,
    width: '100%',
  },
  subtitle: {
    fontFamily: 'SF-Pro-Regular',
    fontSize: 16,
    color: '#8E8E93', 
    marginBottom: 8, 
    marginLeft: 5, 
  },
  gradientCard: {
    width: '100%',
    height: 180, 
    borderRadius: 24,
    justifyContent: 'center', 
    alignItems: 'center',
    
    shadowColor: '#F79C9C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  temperatureDisplay: {
    fontFamily: 'SF-Pro-Bold',
    fontSize: 72,
    fontWeight: 'bold',
    color: '#FFB833', 
    textShadowColor: 'rgba(255, 184, 51, 0.4)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
  },
});