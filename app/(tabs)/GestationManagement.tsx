import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function GestationManagement() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState('list'); 
  const [expandedPig, setExpandedPig] = useState<number | null>(null);

  const pigRecords = [
    { id: 1, name: "Pig 1", insemination: "01/10/26", status: "Confirmed", movement: "05/01/26", farrowing: "05/08/26" },
    { id: 2, name: "Pig 2", insemination: "02/15/26", status: "Confirmed", movement: "06/07/26", farrowing: "06/14/26" },
    { id: 3, name: "Pig 3", insemination: "03/01/26", status: "Pending", movement: "06/21/26", farrowing: "06/28/26" },
    { id: 4, name: "Pig 4", insemination: "04/24/26", status: "Confirmed", movement: "08/13/26", farrowing: "08/20/26" },
  ];

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" />
      
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sow Gestation{"\n"}Management</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Image 
          source={require('./Pig.png')} 
          style={styles.mainIllustration}
          resizeMode="contain"
        />

        {viewMode === 'input' ? (
          /* --- ADD NEW RECORD FORM --- */
          <View style={styles.formContainer}>
            <View style={styles.formHeader}>
              <Text style={styles.formHeaderText}>Add New Record</Text>
            </View>
            <View style={styles.inputBody}>
              <TextInput placeholder="Name" style={styles.input} placeholderTextColor="#999" />
              <TextInput placeholder="Insemination Date (MM/DD/YY)" style={styles.input} placeholderTextColor="#999" />
              <TouchableOpacity style={styles.saveButtonInner} onPress={() => setViewMode('list')}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          /* --- RECORDS LIST --- */
          <View style={styles.listContainer}>
            {pigRecords.map((pig) => (
              <View key={pig.id} style={styles.accordionItem}>
                <TouchableOpacity 
                  style={styles.accordionHeader} 
                  onPress={() => setExpandedPig(expandedPig === pig.id ? null : pig.id)}
                >
                  <Text style={styles.accordionTitle}>{pig.name}</Text>
                  <Ionicons 
                    name={expandedPig === pig.id ? "chevron-up" : "chevron-down"} 
                    size={24} 
                    color="#FFF" 
                  />
                </TouchableOpacity>

                {expandedPig === pig.id && (
                  <View style={styles.accordionBody}>
                    <View style={styles.dataRow}><Text style={styles.label}>Name:</Text><Text style={styles.value}>{pig.name}</Text></View>
                    <View style={styles.dataRow}><Text style={styles.label}>Insemination Date:</Text><Text style={styles.valueHighlight}>{pig.insemination}</Text></View>
                    <View style={styles.dataRow}><Text style={styles.label}>Pregnancy Status:</Text><Text style={styles.valueHighlight}>{pig.status}</Text></View>
                    <View style={styles.dataRow}><Text style={styles.label}>Movement Date:</Text><Text style={styles.valueHighlight}>{pig.movement}</Text></View>
                    <View style={styles.dataRow}><Text style={styles.label}>Farrowing Date:</Text><Text style={styles.valueFarrowing}>{pig.farrowing}</Text></View>
                  </View>
                )}
              </View>
            ))}
            <View style={{ height: 50 }} />
          </View>
        )}
      </ScrollView>

      {/* --- FLOATING ACTION BUTTON --- */}
      <TouchableOpacity 
        style={styles.viewToggleBtn} 
        onPress={() => setViewMode(viewMode === 'input' ? 'list' : 'input')}
      >
        <Text style={styles.buttonText}>
          {viewMode === 'input' ? "View All Records" : "Add New Record"}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // 1. MAIN LAYOUT
  container: { 
    flex: 1, 
    backgroundColor: '#FDE9EF' 
  },
  scrollContent: { 
    paddingHorizontal: 25,
    alignItems: 'center',
    paddingBottom: 250 // Ensures content clears the floating button
  },
  mainIllustration: { 
    width: '100%',
    height: 260,
    marginVertical: 2 
  },

  // 2. HEADER STYLES
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 25,
    marginBottom: 10 
  },
  headerTitle: { 
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 15,
    marginTop: 28,
    lineHeight: 28 
  },

  // 3. LIST & ACCORDION STYLES
  listContainer: { 
    width: '100%' 
  },
  accordionItem: { 
    backgroundColor: '#B68A8A',
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 20,
    paddingVertical: 15 
  },
  accordionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  accordionTitle: { 
    color: '#ffffff', 
    fontSize: 20, 
    fontWeight: 'bold' 
  },
  accordionBody: { 
    backgroundColor: '#FFF', 
    borderRadius: 20, 
    marginTop: 10, 
    padding: 15 
  },
  dataRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 5 
  },
  label: { color: '#666', fontSize: 14 },
  value: { color: '#B68A8A', fontWeight: 'bold' },
  valueHighlight: { color: '#8B4513', fontWeight: 'bold' },
  valueFarrowing: { color: '#2E8B57', fontWeight: 'bold' },

  // 4. FORM STYLES
  formContainer: { 
    width: '100%', 
    backgroundColor: '#B68A8A', 
    borderRadius: 30, 
    overflow: 'hidden' 
  },
  formHeader: { 
    paddingVertical: 20, 
    alignItems: 'center' 
  },
  formHeaderText: { 
    color: '#FFF', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  inputBody: { 
    padding: 20, 
    alignItems: 'center' 
  },
  input: { 
    backgroundColor: '#FFF', 
    width: '100%', 
    height: 50, 
    borderRadius: 15, 
    paddingHorizontal: 15, 
    marginBottom: 15 
  },
  saveButtonInner: { 
    backgroundColor: '#C4A4A4', 
    paddingVertical: 10, 
    paddingHorizontal: 40, 
    borderRadius: 20 
  },
  saveButtonText: { 
    color: '#FFF', 
    fontWeight: 'bold' 
  },

  // 5. FLOATING TOGGLE BUTTON
  viewToggleBtn: { 
    backgroundColor: '#B68A8A',
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 95, 
    left: 25,
    right: 25,
    // Android Shadow
    elevation: 5, 
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: { 
    color: '#FFF', 
    fontWeight: 'bold', 
    fontSize: 16 
  }
});