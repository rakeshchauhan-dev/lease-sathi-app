import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Divider, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

interface Customer {
  id: number;
  name: string;
  type: string; // "new" or "upcoming"
  status: 'Awaiting Feedback' | 'Under Revision' | 'Approved';
  appointmentDate: string;
  reason: string;
  mobile: string;
  address: string;
  email: string;
  appointmentTime?: string;
  employeeId?: string;
}

interface CustomerListProps {
  type: string;
}

const customers: Customer[] = [
  { 
    id: 1, 
    name: 'John Doe', 
    type: 'new', 
    status: 'Awaiting Feedback', 
    appointmentDate: '2024-08-10', 
    reason: 'Rent date are not proper',
    mobile: '1234567890',
    address: '123 Main St',
    email: 'john.doe@example.com',
    appointmentTime: '10:00 AM',
    employeeId: 'E123',
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    type: 'upcoming', 
    status: 'Approved', 
    appointmentDate: '2024-08-12', 
    reason: 'Follow-up',
    mobile: '0987654321',
    address: '456 Elm St',
    email: 'jane.smith@example.com',
    appointmentTime: '02:00 PM',
    employeeId: 'E124',
  },
  { 
    id: 3, 
    name: 'Sam Johnson', 
    type: 'new', 
    status: 'Under Revision', 
    appointmentDate: '2024-08-15', 
    reason: 'Naming issue ',
    mobile: '5555555555',
    address: '789 Oak St',
    email: 'sam.johnson@example.com',
  },
  {
    id: 4,
    name: 'Alice Brown',
    type: 'upcoming',
    status: 'Approved',
    appointmentDate: '2024-08-18',
    reason: 'Consultation',
    mobile: '7777777777',
    address: '101 Pine St',
    email: 'alice.brown@example.com',
  }
];

const CustomerList: React.FC<CustomerListProps> = ({ type }) => {
  const navigation = useNavigation();
  const filteredCustomers = customers.filter(customer => {
    if (type === 'upcoming') {
      return customer.status === 'Approved';
    }
    return customer.status !== 'Approved';
  });

  return (
    <View>
      {filteredCustomers.map(customer => (
        <View key={customer.id}>
          <List.Item
            title={customer.name}
            description={`${customer.appointmentDate} - ${customer.reason}`}
            onPress={() => navigation.navigate('CustomerDetailsPage', { customer })}
            right={() => (
              <Text style={styles.status}>
                {customer.status}
              </Text>
            )}
          />
          <Divider />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  status: {
    alignSelf: 'center',
    marginRight: 10,
    color: 'gray',
  },
});

export default CustomerList;
