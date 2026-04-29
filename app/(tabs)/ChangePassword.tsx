import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function Dashboard() {
  return (
    // 1. FULL SCREEN BACKGROUND GRADIENT
    <LinearGradient 
      colors={['#FFDDE1', '#EE9CA7']} 
      style={styles.backgroundGradient}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* HEADER SECTION */}
        <View style={styles.header}>
          <View>
            <Text style={styles.todayText}>Today</Text>
            <Text style={styles.dateText}>28 April</Text>
          </View>
          <TouchableOpacity style={styles.profileCircle}>
             {/* Profile icon placeholder */}
             <View style={styles.innerProfile} />
          </TouchableOpacity>
        </View>

        {/* 2. REMINDER CARD (Glass Style) */}
        <View style={styles.glassCard}>
          <View style={styles.reminderRow}>
            <View>
               <Text style={styles.reminderTitle}>OINK! REMINDER</Text>
               <Text style={styles.reminderSub}>Farrowing Date: April 25-27</Text>
            </View>
            <TouchableOpacity style={styles.openBtn}>
              <Text style={styles.btnText}>Open</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. CAMERA FEED CARDS */}
        <View style={styles.cameraCard}>
          <Image source={{ uri: 'https://via.placeholder.com/400x200' }} style={styles.cameraImage} />
          <View style={styles.badge}><Text style={styles.badgeText}>Farrowing Area</Text></View>
        </View>

        <View style={styles.cameraCard}>
          <Image source={{ uri: 'https://via.placeholder.com/400x200' }} style={styles.cameraImage} />
          <View style={styles.badge}><Text style={styles.badgeText}>Brooding Area</Text></View>
        </View>

        {/* 4. REAL-TIME TEMPERATURE CARD */}
        <LinearGradient colors={['#FFD200', '#F7971E']} style={styles.tempCard}>
          <View style={styles.tempRow}>
            <Text style={styles.tempLabel}>Real Time Temperature</Text>
            <Text style={styles.tempValue}>40°</Text>
          </View>
          <TouchableOpacity style={styles.overrideBtn}>
            <Text style={styles.overrideText}>Override</Text>
          </TouchableOpacity>
        </LinearGradient>
        
        {/* BOTTOM SPACING */}
        <View style={{ height: 100 }} /> 
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  backgroundGradient: {
    flex: 1,
  },
  container: { 
    flex: 1, 
    paddingHorizontal: 20 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 20, 
    marginTop: 50 
  },
  todayText: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  dateText: { color: '#666', fontSize: 16 },
  profileCircle: { 
    width: 45, 
    height: 45, 
    borderRadius: 22.5, 
    backgroundColor: '#fff',
    padding: 3,
    elevation: 3
  },
  innerProfile: { flex: 1, borderRadius: 20, backgroundColor: '#FFDDE1' },
  
  // Glassmorphism card for the reminder
  glassCard: { 
    padding: 20, 
    borderRadius: 25, 
    marginBottom: 20, 
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Transparent white
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)'
  },
  
  reminderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  reminderTitle: { fontSize: 18, fontWeight: '900', color: '#D81B60' },
  reminderSub: { color: '#82103e', marginTop: 2, fontWeight: '500' },
  openBtn: { backgroundColor: '#D81B60', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  btnText: { color: '#fff', fontWeight: 'bold' },
  
  cameraCard: { 
    borderRadius: 25, 
    overflow: 'hidden', 
    marginBottom: 20, 
    elevation: 8,
    backgroundColor: '#000' 
  },
  cameraImage: { width: '100%', height: 210, opacity: 0.9 },
  badge: { 
    position: 'absolute', 
    top: 15, 
    right: 15, 
    backgroundColor: 'rgba(0,0,0,0.6)', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 15 
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  
  tempCard: { 
    padding: 25, 
    borderRadius: 25, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    elevation: 10 
  },
  tempLabel: { color: '#fff', fontSize: 18, fontWeight: 'bold', width: '50%' },
  tempValue: { fontSize: 55, fontWeight: 'bold', color: '#fff' },
  overrideBtn: { 
    backgroundColor: 'rgba(255,255,255,0.3)', 
    paddingHorizontal: 15, 
    paddingVertical: 10, 
    borderRadius: 15,
    position: 'absolute',
    bottom: 15,
    right: 15
  },
  overrideText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
});