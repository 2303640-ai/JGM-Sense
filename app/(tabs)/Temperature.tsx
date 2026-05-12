import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatePresence, MotiView } from 'moti';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TemperatureScreen() {
  const [currentTemp, setCurrentTemp] = useState(32); 
  const [targetTemp, setTargetTemp] = useState(32);   
  const [hasChanges, setHasChanges] = useState(false);

  // --- DYNAMIC STATUS LOGIC ---
  const getStatus = (temp: number) => {
    if (temp <= 29) {
      return { label: 'Critical', color: '#FF3B30' }; // Red
    } else if (temp >= 30 && temp <= 31) {
      return { label: 'Warning', color: '#FF9500' }; // Orange
    } else if (temp >= 32 && temp <= 35) {
      return { label: 'Optimal', color: '#00D26A' }; // Green
    } else if (temp >= 36 && temp <= 38) {
      return { label: 'Warning', color: '#FF9500' }; // Orange
    } else {
      return { label: 'Critical', color: '#FF3B30' }; // Red (39+)
    }
  };

  const status = getStatus(currentTemp);

  const handleAdjust = (type: 'up' | 'down') => {
    setTargetTemp(prev => (type === 'up' ? prev + 1 : prev - 1));
    setHasChanges(true);
  };

  const confirmOverride = () => {
    setCurrentTemp(targetTemp);
    setHasChanges(false);
  };

  const cancelChanges = () => {
    setTargetTemp(currentTemp);
    setHasChanges(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Temperature</Text>
        
        <Text style={styles.sectionHeader}>Brooding Area 1</Text>
        <LinearGradient
          colors={['#FF7A6A', '#FF956C', '#FFB77B']} 
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientCard}
        >
          <Text style={styles.temperatureDisplay}>{currentTemp}°</Text>
          
          {/* Status Pill with Dynamic Data */}
          <View style={styles.statusPill}>
            <View style={[styles.statusDot, { backgroundColor: status.color, shadowColor: status.color }]} />
            <Text style={styles.statusText}>Status: {status.label}</Text>
          </View>

          <View style={styles.humidityContainer}>
            <Ionicons name="water" size={16} color="#FFF" style={styles.waterIcon} />
            <Text style={styles.humidityText}>Humidity: 65%</Text>
          </View>
        </LinearGradient>

        <Text style={styles.sectionHeader}>Manual Override</Text>
        
        <View style={styles.overrideCard}>
          <Text style={styles.overrideTitle}>Adjust Target Temperature</Text>
          
          <View style={styles.controlsRow}>
            <TouchableOpacity style={styles.minusButton} onPress={() => handleAdjust('down')}>
              <Ionicons name="remove" size={28} color="#A0A0A0" />
            </TouchableOpacity>

            <View style={styles.targetDisplay}>
              <Text style={styles.targetValue}>{targetTemp}°C</Text>
              <Text style={styles.targetLabel}>New Target</Text>
            </View>

            <TouchableOpacity style={styles.plusButton} onPress={() => handleAdjust('up')}>
              <Ionicons name="add" size={28} color="#FF6B81" />
            </TouchableOpacity>
          </View>

          <View style={styles.rangeContainer}>
            <View style={styles.rangeBarContainer}>
              <View style={styles.rangeDot} />
              <View style={styles.rangeLine} />
              <View style={styles.rangeDot} />
            </View>
            <Text style={styles.rangeText}>Today's Range: 31° – 33°</Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Safety Confirmation Bar */}
      <AnimatePresence>
        {hasChanges && (
          <MotiView 
            from={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 50 }}
            style={styles.confirmContainer}
          >
            <TouchableOpacity style={styles.cancelBtn} onPress={cancelChanges}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.confirmBtn} onPress={confirmOverride}>
              <LinearGradient
                colors={['#FF6B81', '#FF956C']}
                style={styles.confirmGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.confirmBtnText}>Confirm Change</Text>
              </LinearGradient>
            </TouchableOpacity>
          </MotiView>
        )}
      </AnimatePresence>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAF7F7' },
  scrollContainer: { 
    paddingHorizontal: 25, 
    paddingTop: 20, 
    paddingBottom: 180 
  },
  title: { fontSize: 34, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 25 },
  sectionHeader: { fontSize: 16, color: '#1A1A1A', marginBottom: 12, marginLeft: 4 },
  gradientCard: {
    width: '100%',
    height: 220, 
    borderRadius: 28,
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 30,
    elevation: 10,
  },
  temperatureDisplay: { fontSize: 96, fontWeight: 'bold', color: '#FFF', letterSpacing: -2 },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 15,
  },
  statusDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#00D26A', marginRight: 8 },
  statusText: { color: '#1A1A1A', fontSize: 14, fontWeight: '500' },
  humidityContainer: { flexDirection: 'row', alignItems: 'center' },
  waterIcon: { marginRight: 6 },
  humidityText: { color: '#FFF', fontSize: 15, opacity: 0.9 },
  overrideCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    elevation: 4,
  },
  overrideTitle: { fontSize: 16, color: '#1A1A1A', marginBottom: 20 },
  controlsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  minusButton: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#e6e5e5', justifyContent: 'center', alignItems: 'center' },
  plusButton: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#e6e5e5', justifyContent: 'center', alignItems: 'center', elevation: 4 },
  targetDisplay: { alignItems: 'center' }, 
  targetValue: { fontSize: 38, fontWeight: 'bold', color: '#2C2C2E' },
  targetLabel: { fontSize: 12, color: '#8E8E93', marginTop: 2 },
  rangeContainer: { alignItems: 'center', marginTop: 10 },
  rangeBarContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, width: 60, justifyContent: 'center' },
  rangeDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#D1D1D6' },
  rangeLine: { flex: 1, height: 3, backgroundColor: '#FFB77B', marginHorizontal: 4, borderRadius: 2 },
  rangeText: { fontSize: 13, color: '#333333' },

  confirmContainer: {
    position: 'absolute',
    bottom: 110, 
    left: 25,
    right: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 25,
    elevation: 25,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    zIndex: 999, // Ensures it stays on top of tabs and other UI
  },
  cancelBtn: {
    paddingHorizontal: 20,
  },
  cancelBtnText: {
    color: '#8E8E93',
    fontWeight: '600',
  },
  confirmBtn: {
    flex: 1,
    marginLeft: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  confirmGradient: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  }
});