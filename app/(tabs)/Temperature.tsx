import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TemperatureScreen() {
  // State to manage the temperature dynamically
  const [temperature, setTemperature] = useState(32);

  const increaseTemp = () => setTemperature(prev => prev + 1);
  const decreaseTemp = () => setTemperature(prev => prev - 1);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.container}>
        {/* Top Header */}
        <Text style={styles.title}>Temperature</Text>
        
        {/* --- BROODING AREA SECTION --- */}
        <Text style={styles.sectionHeader}>Brooding Area 1</Text>
        <LinearGradient
          // Adjusted gradient colors to match the warmer, reddish-orange vibe of the image
          colors={['#FF7A6A', '#FF956C', '#FFB77B']} 
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientCard}
        >
          {/* Main Temperature */}
          <Text style={styles.temperatureDisplay}>{temperature}°</Text>
          
          {/* Status Pill */}
          <View style={styles.statusPill}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Status: Optimal</Text>
          </View>

          {/* Humidity Indicator */}
          <View style={styles.humidityContainer}>
            <Ionicons name="water" size={16} color="#FFF" style={styles.waterIcon} />
            <Text style={styles.humidityText}>Humidity: 65%</Text>
          </View>
        </LinearGradient>

        {/* --- MANUAL OVERRIDE SECTION --- */}
        <Text style={styles.sectionHeader}>Manual Override</Text>
        
        <View style={styles.overrideCard}>
          <Text style={styles.overrideTitle}>Target Temperature</Text>
          
          <View style={styles.controlsRow}>
            {/* Decrease Button */}
            <TouchableOpacity 
              style={styles.minusButton} 
              onPress={decreaseTemp}
              activeOpacity={0.7}
            >
              <Ionicons name="remove" size={28} color="#A0A0A0" />
            </TouchableOpacity>

            {/* Target Display */}
            <View style={styles.targetDisplay}>
              <Text style={styles.targetValue}>{temperature}°C</Text>
              <Text style={styles.targetLabel}>Target Temp</Text>
            </View>

            {/* Increase Button */}
            <TouchableOpacity 
              style={styles.plusButton} 
              onPress={increaseTemp}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={28} color="#FF6B81" />
            </TouchableOpacity>
          </View>

          {/* Today's Range Indicator */}
          <View style={styles.rangeContainer}>
            {/* Visual Dotted Line Placeholder */}
            <View style={styles.rangeBarContainer}>
              <View style={styles.rangeDot} />
              <View style={styles.rangeLine} />
              <View style={styles.rangeDot} />
            </View>
            <Text style={styles.rangeText}>Today's Range: 31° – 33°</Text>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF7F7', // Soft off-white to match the background vibe
  },
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  title: {
    fontFamily: 'SF-Pro-Bold', 
    fontSize: 34,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 25, 
  },
  sectionHeader: {
    fontFamily: 'SF-Pro-Regular',
    fontSize: 16,
    color: '#1A1A1A', 
    marginBottom: 12, 
    marginLeft: 4,
  },

  // --- Brooding Area Card Styles ---
  gradientCard: {
    width: '100%',
    height: 260, 
    borderRadius: 28,
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 35,
    
    shadowColor: '#FF7A6A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 10,
  },
  temperatureDisplay: {
    fontFamily: 'SF-Pro-Bold',
    fontSize: 96,
    fontWeight: 'bold',
    color: '#FFF', // Changed to white
    letterSpacing: -2,
    marginBottom: 10,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Translucent white pill
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 15,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00D26A', // Bright green dot
    marginRight: 8,
    shadowColor: '#00D26A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  statusText: {
    fontFamily: 'SF-Pro-Regular',
    color: '#1A1A1A',
    fontSize: 14,
    fontWeight: '500',
  },
  humidityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  waterIcon: {
    marginRight: 6,
  },
  humidityText: {
    fontFamily: 'SF-Pro-Regular',
    color: '#FFF',
    fontSize: 15,
    opacity: 0.9,
  },

  // --- Manual Override Card Styles ---
  overrideCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 4,
  },
  overrideTitle: {
    fontFamily: 'SF-Pro-Regular',
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 20,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  minusButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5F5F5', // Soft grey
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  plusButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    // Pinkish/Red shadow for the plus button
    shadowColor: '#FF6B81',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  targetDisplay: {
    alignItems: 'center',
  }, 
  targetValue: {
    fontFamily: 'SF-Pro-Bold',
    fontSize: 38,
    fontWeight: 'bold',
    color: '#2C2C2E',
  },
  targetLabel: {
    fontFamily: 'SF-Pro-Regular',
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  
  // --- Range Indicator Styles ---
  rangeContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  rangeBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    width: 60,
    justifyContent: 'center',
  },
  rangeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D1D6',
  },
  rangeLine: {
    flex: 1,
    height: 3,
    backgroundColor: '#FFB77B', // Soft orange line
    marginHorizontal: 4,
    borderRadius: 2,
    opacity: 0.6,
  },
  rangeText: {
    fontFamily: 'SF-Pro-Regular',
    fontSize: 13,
    color: '#333333',
  },
});