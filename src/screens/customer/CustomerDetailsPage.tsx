import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, Text } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';

interface Customer {
  id: number;
  name: string;
  mobile: string;
  address: string;
  email: string;
  appointmentDate?: string;
  appointmentTime?: string;
  employeeId?: string;
  status: 'Awaiting Feedback' | 'Under Revision' | 'Approved';
}

const CustomerDetailsPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { customer } = route.params as { customer: Customer };
  
  const [comment, setComment] = useState('');
  const [draftFile, setDraftFile] = useState<any>(null);

  const handleDocumentPick = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setDraftFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the upload');
      } else {
        throw err;
      }
    }
  };

  const handleSubmit = () => {
    const updatedCustomer = { ...customer, status: 'Under Revision' };
    navigation.setParams({ customer: updatedCustomer });
  };

  const handleApprove = () => {
    const updatedCustomer = { ...customer, status: 'Approved' };
    navigation.setParams({ customer: updatedCustomer });
    navigation.navigate('AddAppointmentPage');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Customer Details</Title>
          <Paragraph style={styles.label}>Name:</Paragraph>
          <Paragraph style={styles.value}>{customer.name}</Paragraph>
          <Paragraph style={styles.label}>Mobile No:</Paragraph>
          <Paragraph style={styles.value}>{customer.mobile}</Paragraph>
          <Paragraph style={styles.label}>Email Address:</Paragraph>
          <Paragraph style={styles.value}>{customer.email}</Paragraph>
          <Paragraph style={styles.label}>Address:</Paragraph>
          <Paragraph style={styles.value}>{customer.address}</Paragraph>
          
          {customer.status === 'Approved' && customer.appointmentDate && (
            <>
              <Paragraph style={styles.label}>Appointment Date:</Paragraph>
              <Paragraph style={styles.value}>{customer.appointmentDate}</Paragraph>
              <Paragraph style={styles.label}>Appointment Time:</Paragraph>
              <Paragraph style={styles.value}>{customer.appointmentTime}</Paragraph>
              <Paragraph style={styles.label}>Employee ID:</Paragraph>
              <Paragraph style={styles.value}>{customer.employeeId}</Paragraph>
            </>
          )}
        </Card.Content>
      </Card>

      {customer.status === 'Awaiting Feedback' && (
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Awaiting Feedback</Title>
            <TextInput
              placeholder="Enter your comments"
              value={comment}
              onChangeText={setComment}
              style={styles.input}
            />
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.button}
                contentStyle={styles.buttonContent}
              >
                Submit
              </Button>
              <Button
                mode="contained"
                onPress={handleApprove}
                style={[styles.button, styles.approveButton]}
                contentStyle={styles.buttonContent}
              >
                Approve
              </Button>
            </View>
          </Card.Content>
        </Card>
      )}

      {customer.status === 'Under Revision' && (
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Under Revision</Title>
            <Button
              mode="outlined"
              onPress={handleDocumentPick}
              style={styles.uploadButton}
              contentStyle={styles.buttonContent}
            >
              {draftFile ? 'Change Revised Draft' : 'Upload Revised Draft'}
            </Button>
            {draftFile && (
              <Text style={styles.fileName}>
                {draftFile.name}
              </Text>
            )}
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.button}
                contentStyle={styles.buttonContent}
              >
                Submit
              </Button>
              <Button
                mode="contained"
                onPress={handleApprove}
                style={[styles.button, styles.approveButton]}
                contentStyle={styles.buttonContent}
              >
                Approve
              </Button>
            </View>
          </Card.Content>
        </Card>
      )}
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  approveButton: {
    backgroundColor: '#4CAF50',  // Green shade for Approve button
  },
  buttonContent: {
    paddingVertical: 6,
  },
  uploadButton: {
    marginBottom: 16,
  },
  fileName: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginVertical: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default CustomerDetailsPage;
