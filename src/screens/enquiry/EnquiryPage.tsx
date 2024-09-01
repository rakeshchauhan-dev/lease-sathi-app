import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { Title, Divider } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import EnquiryList from '../../components/EnquiryList';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../axiosInstance';
import config from '../../config'; // Adjust the path to your config file

const EnquiryPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchEnquiries = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) {
          setError('Authentication token not found.');
          return;
        }

        const response = await axiosInstance.get(config.ENQUIRIES_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        console.log('Fetched enquiries:', response.data); // Debugging log
        setEnquiries(response.data);
      } catch (err) {
        console.error('Failed to fetch enquiries:', err);
        setError('Failed to load enquiries.');
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading enquiries...</Text>
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
        <Title style={styles.title}>Enquiry Dashboard</Title>
        <Feather
          name="plus-circle"
          size={30}
          color="purple"
          onPress={() => navigation.navigate('AddEnquiryPage')}
        />
      </View>
      <Divider />
      <EnquiryList type="pending" enquiries={enquiries} />
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

export default EnquiryPage;
