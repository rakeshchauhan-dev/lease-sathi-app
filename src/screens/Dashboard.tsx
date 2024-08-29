import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { Button, Title, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../axiosInstance'; // Adjust the path if necessary
import CustomerList from '../components/CustomerList';
import config from '../config'; // Adjust the path as necessary
import axios from 'axios';

const Dashboard = () => {
  const [selectedList, setSelectedList] = useState<'new' | 'upcoming'>('new');
  const [customerList, setCustomerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCustomerList = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) {
          setError('Authentication token not found.');
          return;
        }

        const response = await axios.get(config.CUSTOMERS_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data)

        setCustomerList(response.data);
      } catch (err) {
        console.error('Failed to fetch customer list:', err);
        setError('Failed to load customer list.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerList();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken'); // Remove the token from storage
    navigation.replace('Login'); // Navigate back to the login screen
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading customers...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Dashboard</Title>
        <Button mode="contained" onPress={handleLogout} style={styles.logoutButton}>
          Logout
        </Button>
      </View>
      <Divider />
      <View style={styles.buttonContainer}>
        <Button
          mode={selectedList === 'new' ? 'contained' : 'outlined'}
          onPress={() => setSelectedList('new')}
          style={styles.button}
        >
          New
        </Button>
        <Button
          mode={selectedList === 'upcoming' ? 'contained' : 'outlined'}
          onPress={() => setSelectedList('upcoming')}
          style={styles.button}
        >
          Upcoming
        </Button>
      </View>
      <Divider />
      <CustomerList type={selectedList} customers={customerList} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
  },
  logoutButton: {
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Dashboard;
