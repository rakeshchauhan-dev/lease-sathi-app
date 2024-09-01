import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import config from '../../config'; // Adjust the path as necessary
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddEnquiryPage = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [tenure, setTenure] = useState('');
  const [rent, setRent] = useState('');
  const [deposit, setDeposit] = useState('');
  const [increment, setIncrement] = useState('');
  const [extraService, setExtraService] = useState('');
  const [quoted, setQuoted] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddEnquiry = async () => {
    setLoading(true);
    const newEnquiry = {
      name,
      mobile,
      address,
      tenure,
      rent,
      deposit,
      increment,
      extraService,
      quoted,
    };

    try {
      // Retrieve the token from AsyncStorage
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'Authentication token not found. Please log in again.');
        setLoading(false);
        return;
      }

      // Make API call to create a new enquiry, passing the token in the headers
      const response = await axios.post(config.ENQUIRIES_URL, newEnquiry, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token as a Bearer token
        },
      });

      if (response.status === 201 || response.status === 200) {
        Alert.alert('Success', 'Enquiry created successfully.');
        navigation.navigate('EnquiryPage'); // Redirect to EnquiryPage
      } else {
        Alert.alert('Error', 'Failed to create enquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error creating enquiry:', error);
      Alert.alert('Error', 'An error occurred while creating the enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Add Enquiry</Title>
          <Paragraph style={styles.subtitle}>Please fill in the details below:</Paragraph>
          <TextInput
            label="Name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
            placeholder="Enter name"
          />
          <TextInput
            label="Mobile No"
            value={mobile}
            onChangeText={setMobile}
            mode="outlined"
            style={styles.input}
            keyboardType="phone-pad"
            placeholder="Enter mobile number"
          />
          <TextInput
            label="Address"
            value={address}
            onChangeText={setAddress}
            mode="outlined"
            style={styles.input}
            multiline
            numberOfLines={3}
            placeholder="Enter address"
          />
          <TextInput
            label="Tenure"
            value={tenure}
            onChangeText={setTenure}
            mode="outlined"
            style={styles.input}
            placeholder="Enter tenure"
          />
          <TextInput
            label="Rent"
            value={rent}
            onChangeText={setRent}
            mode="outlined"
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter rent amount"
          />
          <TextInput
            label="Deposit"
            value={deposit}
            onChangeText={setDeposit}
            mode="outlined"
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter deposit amount"
          />
          <TextInput
            label="Increment"
            value={increment}
            onChangeText={setIncrement}
            mode="outlined"
            style={styles.input}
            placeholder="Enter increment"
          />
          <TextInput
            label="Extra Service/Visit"
            value={extraService}
            onChangeText={setExtraService}
            mode="outlined"
            style={styles.input}
            placeholder="Enter extra service/visit"
          />
          <TextInput
            label="Quoted"
            value={quoted}
            onChangeText={setQuoted}
            mode="outlined"
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter quoted amount"
          />
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Button
              mode="contained"
              onPress={handleAddEnquiry}
              style={styles.button}
              contentStyle={styles.buttonContent}
            >
              Add Enquiry
            </Button>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginVertical: 20,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    color: '#666',
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

export default AddEnquiryPage;
