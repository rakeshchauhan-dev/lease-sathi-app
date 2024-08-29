import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config'; // Adjust the path as necessary

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter both email and password.');
      return;
    }
  
    try {
      console.log('Email:', email);
      console.log('Password:', password);
  
      const response = await axios.post(config.LOGIN_URL, {
        email,
        password,
      });
  
      console.log('API Response:', response.data);
  
      if (response.data && response.data.token) {
        const { token } = response.data;
        await AsyncStorage.setItem('authToken', token);
  
        // Navigate to the main app
        navigation.replace('MainApp');
      } else {
        Alert.alert('Login Failed', 'Invalid login credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Login Failed', 'An error occurred during login.');
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
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
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
});

export default LoginScreen;
