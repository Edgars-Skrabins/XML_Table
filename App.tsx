import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Payments from "./src/components/payments/payments";

const App = () => {
  return (
    <View style={styles.container}>
      <Payments/>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#626262',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;