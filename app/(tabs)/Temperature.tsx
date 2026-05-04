import { StyleSheet, Text, View } from 'react-native';

export default function TemperatureScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Temperature</Text>
      <Text style={styles.subtitle}>Real-time temperature monitoring</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
