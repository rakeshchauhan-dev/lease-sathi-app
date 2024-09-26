import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config'; // Adjust the path as necessary
import {useNavigation} from '@react-navigation/native';

const LoginScreen = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation<any>();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      console.log('Attempting login with Email:', email);

      const response = await axios.post(config.LOGIN_URL, {
        email,
        password,
      });

      console.log('API Response:', response.data);

      if (response.data && response.data.token) {
        const {token} = response.data;
        await AsyncStorage.setItem('authToken', token);

        // Navigate to the main app
        console.log('Login successful, navigating to DashboardMain');
        navigation.replace('DashboardMain'); // Make sure this matches the screen name
      } else {
        Alert.alert('Login Failed', 'Invalid login credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert(
        'Login Failed',
        'An error occurred during login. Please check your network and try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.togglePassword}
          onPress={() => setShowPassword(!showPassword)}>
          <Text>{showPassword ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  togglePassword: {
    position: 'absolute',
    right: 10,
    height: 40,
    justifyContent: 'center',
  },
});

export default LoginScreen;
