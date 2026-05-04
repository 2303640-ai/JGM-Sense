import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function RecoveryEmailScreen() {
  const router = useRouter();
  
  // State 1: Email Entry | State 2: OTP Verification
  const [step, setStep] = useState(1); 
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const handleEmailSubmit = () => {
    if (!email.includes('@')) {
      Alert.alert("Error", "Please enter a valid email.");
      return;
    }
    setStep(2);
  };

  const handleVerifyCode = () => {
    const fullCode = code.join('');
    if (fullCode.length < 6) {
      Alert.alert("Error", "Please enter the 6-digit code.");
      return;
    }
    Alert.alert("Success", "Recovery email verified!");
    router.back();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      
      {/* Top Header Row for the Back Button */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => step === 1 ? router.back() : setStep(1)} 
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {step === 1 ? (
        /* --- SCREEN 1: ADD RECOVERY EMAIL --- */
        <View style={styles.content}>
          {/* Using the Pig Logo consistent with JGM-Sense branding */}
          <Image 
            source={require('./Mail.png')} 
            style={styles.illustration}
            resizeMode="contain"
          />
          
          <Text style={styles.title}>Add Recovery Email</Text>
          <Text style={styles.description}>
            Need to add recovery email? You can do it here.
          </Text>
          
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#999"
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity style={styles.mainButton} onPress={handleEmailSubmit}>
            <Text style={styles.buttonText}>CONFIRM CHANGE</Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* --- SCREEN 2: VERIFICATION --- */
        <View style={styles.content}>
          <Image 
            source={require('./Mail.png')} 
            style={styles.illustration}
            resizeMode="contain"
          />
          <Text style={styles.title}>Verification</Text>
          <Text style={styles.description}>
            Please enter the code we sent to{"\n"}
            <Text style={{ fontWeight: 'bold' }}>{email}</Text>
          </Text>
          
          <View style={styles.otpRow}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                maxLength={1}
                keyboardType="number-pad"
                onChangeText={(val) => {
                  let newCode = [...code];
                  newCode[index] = val;
                  setCode(newCode);
                }}
              />
            ))}
          </View>

          <TouchableOpacity onPress={() => Alert.alert("Resent", "New code sent.")}>
            <Text style={styles.resendText}>I didn't receive a code</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.mainButton} onPress={handleVerifyCode}>
            <Text style={styles.buttonText}>ENTER CODE</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // Matches the full-screen light pink background from your screenshot
  container: { 
    flex: 1, 
    backgroundColor: '#FDE9EF', 
    paddingHorizontal: 25 
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    width: 45,
    height: 45,
    backgroundColor: '#C4A4A4', // Matching the muted brown circle back button
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: { 
    flex: 1, 
    alignItems: 'center', 
    paddingTop: 20 
  },
  illustration: { 
    width: 250, 
    height: 250, 
    marginBottom: 25 
  }, 
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#000', 
    marginBottom: 2 
  },
  description: { 
    textAlign: 'center', 
    color: '#555', 
    marginVertical: 20, 
    paddingHorizontal: 20, 
    fontSize: 14, 
    fontWeight: '500'
  },
  // White input box with rounded corners as seen in the image
  inputWrapper: { 
    width: '100%', 
    backgroundColor: '#FFF', 
    borderRadius: 15, 
    height: 55, 
    justifyContent: 'center', 
    paddingHorizontal: 20,
    marginBottom: 50,
    // Soft shadow to match the floating input look
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  textInput: { 
    fontSize: 18,
    color: '#000'
  },
  otpRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    marginBottom: 30 
  },
  otpInput: { 
    width: 48, 
    height: 60, 
    backgroundColor: '#FFF', 
    borderRadius: 15, 
    textAlign: 'center', 
    fontSize: 22, 
    fontWeight: 'bold',
    elevation: 2
  },
  resendText: { 
    color: '#666', 
    fontSize: 15, 
    marginBottom: 40,
    textDecorationLine: 'underline'
  },
  // The large, wide button from the bottom of your screenshot
  mainButton: { 
    backgroundColor: '#B68A8A', 
    width: '100%', 
    height: 60, 
    borderRadius: 30, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 20
  },
  buttonText: { 
    color: '#FFF', 
    fontWeight: 'bold', 
    fontSize: 16,
    letterSpacing: 1
  },
});

