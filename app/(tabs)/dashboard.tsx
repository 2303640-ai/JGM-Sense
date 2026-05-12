import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { auth } from '../../firebaseConfig';

// Mock data for notifications
const notificationsData = [
  { id: 1, name: 'Temperature', action: ' Regulating sudden temperature spike.', time: '12:04 pm', isNew: true },
  { id: 2, name: 'Tobia Rodic', action: ' commented on your last video', time: '11:10 am', isNew: false },
  { id: 3, name: 'Nathan Bruner', action: ' posted 2 new links', time: '09:00 am', isNew: false },
];

export default function Dashboard() {
  const theme = useTheme();
  const router = useRouter();
  const userName = auth.currentUser?.displayName || "User";
  const [showNotifications, setShowNotifications] = useState(false);

  // --- TEMPERATURE LOGIC ---
  const currentTemp = 40; // This would eventually come from your sensor/database

  const getTempStatus = (temp: number) => {
    if (temp <= 29 || temp >= 39) {
      return { 
        label: 'CRITICAL', 
        color: '#FF3B30', 
        // Add 'as const' here to satisfy the LinearGradient requirements
        gradient: ['#FF3B30', '#8B0000'] as const 
      };
    }
    if ((temp >= 30 && temp <= 31) || (temp >= 36 && temp <= 38)) {
      return { 
        label: 'WARNING', 
        color: '#FF9500', 
        gradient: ['#FF9500', '#FF7B00'] as const 
      };
    }
    return { 
      label: 'OPTIMAL', 
      color: '#00D26A', 
      gradient: ['#00D26A', '#008000'] as const 
    };
  };

  const status = getTempStatus(currentTemp);

  const displayDate = useMemo(() => {
    const today = new Date();
    return today.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    });
  }, []);

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Area */}
        <View style={styles.header}>
          <Text style={[styles.todayText, { color: theme.headerText }]}>
            Today{" "}
            <Text style={styles.dateHighlight}>{displayDate}</Text>
          </Text>

          <View style={styles.bellWrapper}>
            <TouchableOpacity 
              style={[styles.bellCircle, { backgroundColor: '#F7A8B8' }]} 
              onPress={() => setShowNotifications(!showNotifications)}
            >
              <Image source={require('./bell.png')} style={styles.bellIcon} resizeMode="contain" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>3</Text>
              </View>
            </TouchableOpacity>

            {showNotifications && (
              <View style={styles.dropdownContainer}>
                <View style={styles.dropdownTriangle} />
                <View style={styles.dropdownHeader}>
                  <Text style={styles.dropdownHeaderText}>NOTIFICATIONS</Text>
                </View>
                <View style={styles.dropdownContent}>
                  {notificationsData.map((notif, index) => (
                    <View key={notif.id} style={[styles.notifItem, index !== notificationsData.length - 1 && styles.notifBorder]}>
                      <View style={styles.notifAvatar} />
                      <View style={styles.notifTextContainer}>
                        {notif.isNew && (
                          <View style={styles.newTag}>
                            <Text style={styles.newTagText}>NEW</Text>
                          </View>
                        )}
                        <Text style={styles.notifMainText}>
                          <Text style={styles.notifName}>{notif.name} </Text> 
                          <Text style={styles.notifAction}>{notif.action}</Text>
                        </Text>
                        <Text style={styles.notifTime}>{notif.time}</Text>
                      </View>
                    </View>
                  ))}
                </View>
                <TouchableOpacity style={styles.seeAllButton}>
                  <Text style={styles.seeAllText}>See all notifications</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
 
        {/* 1. Reminder Card */}
        <LinearGradient colors={['#a87d8d', '#e0b5c1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.reminderCard}>
          <Image source={require('@/assets/images/JGMLogo.png')} style={styles.pigImage} />          
          <View style={styles.reminderContent}>
            <Text style={styles.reminderTitle}>OINK! REMINDER</Text>
            <View style={styles.nameContainer}>
              <Text style={styles.nameText}>{userName}</Text>
            </View>
            <View style={styles.datePill}>
              <Text style={styles.datePillText}>Farrowing Date:{'\n'} April 25-27</Text>
            </View>
            <TouchableOpacity style={styles.openBtn} onPress={() => router.replace('/(tabs)/GestationManagement')}>
              <Text style={styles.btnText}>Open</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
    
        {/* 2. Camera Feeds */}
        <TouchableOpacity style={styles.cameraCard} onPress={() => router.replace('/(tabs)/LiveFeed')}>
          <Image source={require('@/assets/images/littlepigs.jpg')} style={styles.cameraImage} />
          <View style={styles.badge}><Text style={styles.badgeText}>Farrowing Area</Text></View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cameraCard} onPress={() => router.replace('/(tabs)/LiveFeed')}>
          <Image source={require('@/assets/images/littlepigs.jpg')} style={styles.cameraImage} />
          <View style={styles.badge}><Text style={styles.badgeText}>Brooding Area</Text></View>
        </TouchableOpacity>

        {/* 3. Dynamic Temperature Card */}
        <LinearGradient 
          colors={status.gradient} 
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 1 }} 
          style={styles.tempCard}
        >
          <View style={styles.tempLeft}>
             <Text style={styles.thermoIcon}>🌡️</Text>
          </View>
          <View style={styles.tempRight}>
            <Text style={styles.tempLabel}>Real Time{'\n'}Temperature</Text>
            <Text style={styles.tempValue}>{currentTemp}°</Text>
            <Text style={styles.statusLabel}>{status.label}</Text>
          </View>
          <TouchableOpacity style={styles.overrideBtn} onPress={() => router.replace('/(tabs)/Temperature')}>
            <Text style={styles.overrideText}>Override</Text>
          </TouchableOpacity>
        </LinearGradient>
        
        <View style={{ height: 100 }} /> 
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#FCF3F5' },
  scrollContent: { padding: 20, paddingTop: 55 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, zIndex: 10 },
  todayText: { fontSize: 40, fontWeight: '700', marginTop: 13, lineHeight: 45 },
  dateHighlight: { fontWeight: '700', fontSize: 22 },
  bellWrapper: { position: 'relative', zIndex: 100 },
  bellCircle: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', elevation: 2, marginTop: 15 },
  bellIcon: { width: 40, height: 40 },
  notificationBadge: { position: 'absolute', top: -5, right: -5, backgroundColor: '#D9534F', borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' },
  notificationBadgeText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  dropdownContainer: { position: 'absolute', top: 65, right: 0, width: 320, backgroundColor: '#FFF', borderRadius: 15, elevation: 8, zIndex: 1000 },
  dropdownTriangle: { position: 'absolute', top: -10, right: 15, width: 0, height: 0, borderLeftWidth: 10, borderRightWidth: 10, borderBottomWidth: 10, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#F7A8B8' }, 
  dropdownHeader: { backgroundColor: '#F7A8B8', paddingVertical: 12, paddingHorizontal: 15, borderTopLeftRadius: 15, borderTopRightRadius: 15 },
  dropdownHeaderText: { color: '#FFF', fontWeight: '600', fontSize: 14, letterSpacing: 0.5 },
  dropdownContent: { paddingHorizontal: 15 },
  notifItem: { flexDirection: 'row', paddingVertical: 15 },
  notifBorder: { borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  notifAvatar: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#F0F2F5', marginRight: 15 },
  notifTextContainer: { flex: 1, position: 'relative' },
  newTag: { position: 'absolute', right: 0, top: 0, backgroundColor: '#95C14F', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  newTagText: { color: '#FFF', fontSize: 9, fontWeight: 'bold' },
  notifMainText: { fontSize: 14, lineHeight: 20, paddingRight: 40, marginBottom: 5 },
  notifName: { fontWeight: 'bold', color: '#333' },
  notifAction: { color: '#888' },
  notifTime: { color: '#A0A0A0', fontSize: 12, textAlign: 'right' },
  seeAllButton: { paddingVertical: 12, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  seeAllText: { color: '#F7A8B8', fontSize: 14, fontWeight: '700' },
  reminderCard: { flexDirection: 'row', borderRadius: 25, marginBottom: 15, padding: 15, alignItems: 'center' },
  pigImage: { width: 80, height: 80, borderRadius: 40, marginRight: 15 },
  reminderContent: { flex: 1 },
  reminderTitle: { fontSize: 25, fontWeight: '800', color: '#FFF' },
  datePill: { backgroundColor: '#F7A8B8', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 15, marginBottom: 5 },
  datePillText: { color: '#FFF', fontSize: 15, fontWeight: '700' },
  nameContainer: { marginBottom: 5 },
  nameText: { color: '#FFF', fontWeight: '800', fontSize: 20 },
  openBtn: { alignItems: 'center', backgroundColor: '#F7A8B8', paddingVertical: 10, borderRadius: 15 },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
  cameraCard: { borderRadius: 25, overflow: 'hidden', marginBottom: 15 },
  cameraImage: { width: '100%', height: 200 },
  badge: { position: 'absolute', top: 15, right: 15, backgroundColor: 'rgba(255,255,255,0.6)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15 },
  badgeText: { color: '#444', fontSize: 12, fontWeight: 'bold' },
  tempCard: { borderRadius: 25, flexDirection: 'row', padding: 15, position: 'relative' },
  tempLeft: { justifyContent: 'center', marginRight: 15 },
  thermoIcon: { fontSize: 65 },
  tempRight: { flex: 1, justifyContent: 'center' },
  tempLabel: { color: '#FFF', fontSize: 20, fontWeight: '700' },
  tempValue: { fontSize: 65, fontWeight: '800', color: '#FFF', marginTop: -5 },
  statusLabel: { color: '#FFF', fontWeight: 'bold', fontSize: 14, marginTop: -5 },
  overrideBtn: { position: 'absolute', bottom: 20, right: 15, backgroundColor: 'rgba(255, 255, 255, 0.3)', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 15 },
  overrideText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 }
});