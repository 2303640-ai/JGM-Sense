import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>
      {/* Header Area */}
      <View style={styles.header}>
        <View>
          <Text style={styles.todayText}>Today</Text>
          <Text style={styles.dateText}>28 April</Text>
        </View>
        <View style={styles.profileCircle} />
      </View>

      {/* 1. Pink Reminder Card */}
      <LinearGradient colors={['#FFDDE1', '#EE9CA7']} style={styles.reminderCard}>
        <View style={styles.reminderRow}>
          <Text style={styles.reminderTitle}>OINK! REMINDER</Text>
          <TouchableOpacity style={styles.openBtn}><Text style={styles.btnText}>Open</Text></TouchableOpacity>
        </View>
        <Text style={styles.reminderSub}>Farrowing Date: April 25-27</Text>
      </LinearGradient>

      {/* 2. Camera Feeds */}
      <View style={styles.cameraCard}>
        <Image source={{ uri: 'https://via.placeholder.com/400x200' }} style={styles.cameraImage} />
        <View style={styles.badge}><Text style={styles.badgeText}>Farrowing Area</Text></View>
      </View>

      <View style={styles.cameraCard}>
        <Image source={{ uri: 'https://via.placeholder.com/400x200' }} style={styles.cameraImage} />
        <View style={styles.badge}><Text style={styles.badgeText}>Brooding Area</Text></View>
      </View>

      {/* 3. Orange/Yellow Temp Card */}
      <LinearGradient colors={['#FFD200', '#F7971E']} style={styles.tempCard}>
        <View style={styles.tempRow}>
          <Text style={styles.tempLabel}>Real Time Temperature</Text>
          <Text style={styles.tempValue}>40°</Text>
        </View>
        <TouchableOpacity style={styles.overrideBtn}>
          <Text style={styles.overrideText}>Override</Text>
        </TouchableOpacity>
      </LinearGradient>
      
      {/* Extra space at bottom for scrolling */}
      <View style={{ height: 50 }} /> 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F1F1', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 40 },
  todayText: { fontSize: 28, fontWeight: 'bold' },
  dateText: { color: '#888', fontSize: 16 },
  profileCircle: { width: 45, height: 45, borderRadius: 25, backgroundColor: '#FFDDE1' },
  reminderCard: { padding: 20, borderRadius: 25, marginBottom: 20 },
  reminderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  reminderTitle: { fontSize: 18, fontWeight: '900', color: '#D81B60' },
  reminderSub: { color: '#D81B60', marginTop: 5, fontWeight: '500' },
  openBtn: { backgroundColor: '#FF85A1', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20 },
  btnText: { color: '#fff', fontWeight: 'bold' },
  cameraCard: { borderRadius: 25, overflow: 'hidden', marginBottom: 20, elevation: 4 },
  cameraImage: { width: '100%', height: 200 },
  badge: { position: 'absolute', top: 15, right: 15, backgroundColor: 'rgba(0,0,0,0.5)', padding: 8, borderRadius: 12 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  tempCard: { padding: 25, borderRadius: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tempRow: {flexDirection: 'row', alignItems: 'baseline'},
  tempLabel: { color: '#fff', fontSize: 16, fontWeight: 'bold', width: '60%' },
  tempValue: { fontSize: 50, fontWeight: 'bold', color: '#fff' },
  overrideBtn: { backgroundColor: 'rgba(255,255,255,0.4)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 15 },
  overrideText: { color: '#fff', fontWeight: 'bold' },
});