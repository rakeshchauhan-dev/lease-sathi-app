import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import config from '../../config';
import axiosInstance from '../../axiosInstance';

interface Address {
  id: number;
  address: string;
  created_at: string;
  updated_at: string;
}

interface Enquiry {
  id: number;
  name: string;
  mobile: string;
  address: Address;
  tenure: string;
  rent: string;
  deposit: string;
  increment?: string;
  extraService?: string;
  quoted?: string;
}

const EnquiryDetailsPage = () => {
  const route = useRoute();
  const navigation = useNavigation<any>(); // Typed useNavigation
  const { id } = route.params as { id: number };
  
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log(`Fetching details for Enquiry ID: ${id}`);
    const fetchEnquiryDetails = async () => {
      console.log('ENQUIRIES_URL:', config.ENQUIRIES_URL);
      try {
        const response = await axiosInstance.get(`${config.ENQUIRIES_URL}/${id}`);
        setEnquiry(response.data);
      } catch (error) {
        console.error('Error fetching enquiry details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiryDetails();
  }, [id]);

  const handleConvertToCustomer = async () => {
    try {
      const url = `${config.ENQUIRIES_URL}/${id}/customers`;
      console.log('Making request to:', url);

      await axiosInstance.post(url);
      navigation.navigate('CustomerPage');
    } catch (error) {
      console.error('Error converting enquiry to customer:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!enquiry) {
    return (
      <View style={styles.container}>
        <Title style={styles.title}>Enquiry not found</Title>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Enquiry Details</Title>
          <Paragraph style={styles.label}>Name:</Paragraph>
          <Paragraph style={styles.value}>{enquiry.name}</Paragraph>
          <Paragraph style={styles.label}>Mobile No:</Paragraph>
          <Paragraph style={styles.value}>{enquiry.mobile}</Paragraph>
          <Paragraph style={styles.label}>Address:</Paragraph>
          <Paragraph style={styles.value}>{enquiry.address.address}</Paragraph>
          <Paragraph style={styles.label}>Tenure:</Paragraph>
          <Paragraph style={styles.value}>{enquiry.tenure}</Paragraph>
          <Paragraph style={styles.label}>Rent:</Paragraph>
          <Paragraph style={styles.value}>{enquiry.rent}</Paragraph>
          <Paragraph style={styles.label}>Deposit:</Paragraph>
          <Paragraph style={styles.value}>{enquiry.deposit}</Paragraph>
          {enquiry.increment && (
            <>
              <Paragraph style={styles.label}>Increment:</Paragraph>
              <Paragraph style={styles.value}>{enquiry.increment}</Paragraph>
            </>
          )}
          {enquiry.extraService && (
            <>
              <Paragraph style={styles.label}>Extra Service:</Paragraph>
              <Paragraph style={styles.value}>{enquiry.extraService}</Paragraph>
            </>
          )}
          {enquiry.quoted && (
            <>
              <Paragraph style={styles.label}>Quoted:</Paragraph>
              <Paragraph style={styles.value}>{enquiry.quoted}</Paragraph>
            </>
          )}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Convert Enquiry to Customer</Title>
          <Paragraph style={styles.description}>Would you like to convert this enquiry into a customer by scheduling an appointment?</Paragraph>
        </Card.Content>
        <Button
          mode="contained"
          onPress={handleConvertToCustomer}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Convert to Customer
        </Button>
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    color: '#777',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    margin: 16,
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 10,
  },
});

export default EnquiryDetailsPage;
