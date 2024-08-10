import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Divider, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

interface Customer {
  id: number;
  name: string;
  type: string; // "new" or "upcoming"
  status: string;
  appointmentDate: string;
  reason: string;
}

interface CustomerListProps {
  type: string;
}

const customers: Customer[] = [
  { id: 1, name: 'John Doe', type: 'new', status: 'Pending', appointmentDate: '2024-08-10', reason: 'Consultation' },
  { id: 2, name: 'Jane Smith', type: 'upcoming', status: 'Confirmed', appointmentDate: '2024-08-12', reason: 'Follow-up' },
  { id: 3, name: 'Sam Johnson', type: 'new', status: 'Cancelled', appointmentDate: '2024-08-15', reason: 'Routine Check' }
];

const CustomerList: React.FC<CustomerListProps> = ({ type }) => {
  const navigation = useNavigation();
  const filteredCustomers = customers.filter(customer => customer.type === type);

  return (
    <View>
      {filteredCustomers.map(customer => (
        <View key={customer.id}>
          <List.Item
            title={customer.name}
            description={`${customer.appointmentDate} - ${customer.reason}`}
            onPress={() => navigation.navigate('CustomerDetailsPage', { id: customer.id })}
            right={() => <Text style={styles.status}>{customer.status}</Text>}
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
