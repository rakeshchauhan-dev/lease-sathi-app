import React, { useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axiosInstance from '../../axiosInstance';
import config from '../../config';
import CustomerInfo from './CustomerInfo';
import CreateTokenForm from './CreateTokenForm';

interface Customer {
  id: number;
  name: string;
  mobile: string;
  address: string;
  email: string;
  created_at: string;
  updated_at: string;
}

const CustomerDetailsPage = () => {
  const route = useRoute(); // Extract the route parameters
  const { customer_id } = route.params as { customer_id: number }; // Get customer_id from params

  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axiosInstance.get(`${config.CUSTOMERS_URL}/${customer_id}`);
        setCustomer(response.data);
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };

    fetchCustomerDetails();
  }, [customer_id]);

  if (!customer) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView>
      {/* Display Customer Information */}
      <CustomerInfo customer={customer} />
    <CreateTokenForm customerID={customer.id} />
    </ScrollView>
  );
};

export default CustomerDetailsPage;
