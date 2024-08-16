import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Divider, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

interface Customer {
  id: number;
  name: string;
  type: string; // "new" or "upcoming"
  status: 'Awaiting Feedback' | 'Under Revision' | 'Approved' | 'Biometric done' | 'Challan paid';
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
    reason: 'Rent dates are not proper',
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
    reason: 'Naming issue',
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
  },
  {
    id: 5,
    name: 'Mark Taylor',
    type: 'new',
    status: 'Biometric done',
    appointmentDate: '2024-08-20',
    reason: 'Identity verification',
    mobile: '6666666666',
    address: '202 Cedar St',
    email: 'mark.taylor@example.com',
    appointmentTime: '11:00 AM',
    employeeId: 'E125',
  },
  {
    id: 6,
    name: 'Emily Davis',
    type: 'new',
    status: 'Challan paid',
    appointmentDate: '2024-08-25',
    reason: 'Fee payment',
    mobile: '8888888888',
    address: '303 Birch St',
    email: 'emily.davis@example.com',
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
