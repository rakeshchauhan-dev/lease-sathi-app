import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';

interface Customer {
  id: number;
  name: string;
  mobile: string;
  address: string;
  email: string;
  appointmentDate?: string;
  appointmentTime?: string;
  employeeId?: string;
}

const customers: Customer[] = [
  { id: 1, name: 'John Doe', mobile: '1234567890', address: '123 Main St', email: 'john.doe@example.com', appointmentDate: '2024-08-10', appointmentTime: '10:00 AM', employeeId: 'E123' },
  { id: 2, name: 'Jane Smith', mobile: '0987654321', address: '456 Elm St', email: 'jane.smith@example.com', appointmentDate: '2024-08-12', appointmentTime: '02:00 PM', employeeId: 'E124' },
  { id: 3, name: 'Sam Johnson', mobile: '5555555555', address: '789 Oak St', email: 'sam.johnson@example.com' }
];

const CustomerDetailsPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as { id: number };
  const customer = customers.find(c => c.id === id);

  if (!customer) {
    return (
      <View style={styles.container}>
        <Title style={styles.title}>Customer not found</Title>
      </View>
    );
  }

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
        </Card.Content>
      </Card>

      {customer.appointmentDate && (
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Appointment Details</Title>
            <Paragraph style={styles.label}>Appointment Date:</Paragraph>
            <Paragraph style={styles.value}>{customer.appointmentDate}</Paragraph>
            <Paragraph style={styles.label}>Appointment Time:</Paragraph>
            <Paragraph style={styles.value}>{customer.appointmentTime}</Paragraph>
            <Paragraph style={styles.label}>Employee ID:</Paragraph>
            <Paragraph style={styles.value}>{customer.employeeId}</Paragraph>
          </Card.Content>
        </Card>
      )}

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => console.log('Edit Customer Details')}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Edit Customer
        </Button>

        {customer.appointmentDate && (
          <Button
            mode="contained"
            onPress={() => navigation.navigate('EditAppointment', {
              appointmentDate: customer.appointmentDate,
              appointmentTime: customer.appointmentTime,
              employeeId: customer.employeeId,
            })}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Edit Appointment
          </Button>
        )}
      </View>
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
    flexDirection: 'row',  // Align buttons horizontally
    justifyContent: 'space-between',  // Space out the buttons
    marginTop: 20,
  },
  button: {
    flex: 1,  // Make buttons equal width
    marginHorizontal: 5,  // Add some spacing between buttons
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 6,  // Adjust padding for a smaller button height
  },
});

export default CustomerDetailsPage;
