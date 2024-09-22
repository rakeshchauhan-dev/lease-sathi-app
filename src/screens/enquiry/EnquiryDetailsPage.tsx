import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Alert, View, ActivityIndicator, StyleSheet } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker'; // Import Document Picker
import axiosInstance from '../../axiosInstance';
import config from '../../config';

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
  const { id } = route.params as { id: number };
  const navigation = useNavigation<any>();

  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [file, setFile] = useState<any>(null); // State to store the selected file

  useEffect(() => {
    const fetchEnquiryDetails = async () => {
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

  // File Picker Function
  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      setFile(result);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        Alert.alert('Cancelled', 'No file selected');
      } else {
        console.error('File picker error:', error);
      }
    }
  };

  const handleConvertToCustomer = async () => {
    const formData = new FormData();
    formData.append('enquiry_id', id);

    if (file) {
      formData.append('files', {
        uri: file.uri,
        type: file.type,
        name: file.name,
      });
    }

    try {
      await axiosInstance.post(`${config.ENQUIRIES_URL}/${id}/customers`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Success', 'Enquiry converted to customer successfully!');
      navigation.navigate('EnquiryDashboard');
    } catch (error) {
      console.error('Error converting enquiry to customer:', error);
      Alert.alert('Error', 'Failed to convert enquiry to customer. Please try again.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!enquiry) {
    return (
      <View style={styles.container}>
        <Text>Enquiry not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Enquiry Details</Title>
          <Paragraph>Name: {enquiry.name}</Paragraph>
          <Paragraph>Mobile No: {enquiry.mobile}</Paragraph>
          <Paragraph>Address: {enquiry.address.address}</Paragraph>
          <Paragraph>Tenure: {enquiry.tenure}</Paragraph>
          <Paragraph>Rent: {enquiry.rent}</Paragraph>
          <Paragraph>Deposit: {enquiry.deposit}</Paragraph>
          {enquiry.increment && <Paragraph>Increment: {enquiry.increment}</Paragraph>}
          {enquiry.extraService && <Paragraph>Extra Service: {enquiry.extraService}</Paragraph>}
          {enquiry.quoted && <Paragraph>Quoted: {enquiry.quoted}</Paragraph>}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Convert Enquiry to Customer</Title>
          <Paragraph>Would you like to convert this enquiry into a customer by scheduling an appointment?</Paragraph>
        </Card.Content>
        
        <Button mode="outlined" onPress={handleFilePick} style={styles.button}>
          {file ? `Selected File: ${file.name}` : 'Attach File'}
        </Button>

        <Button mode="contained" onPress={handleConvertToCustomer} style={styles.button}>
          Convert to Customer
        </Button>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    padding: 16,
  },
  button: {
    marginTop: 16,
    borderRadius: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EnquiryDetailsPage;
