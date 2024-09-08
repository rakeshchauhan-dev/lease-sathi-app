import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axiosInstance from '../axiosInstance';
import config from '../config';

interface Customer {
  id: number;
  enquiry_id: number | null;
  name: string;
  mobile: string;
  address_id: number;
  created_at: string;
  updated_at: string;
}

interface Meta {
  limit: number;
  page: number;
  total: number;
}

interface CustomerListProps {
  searchText: string;  // Prop from parent component
}

const CustomerList: React.FC<CustomerListProps> = ({ searchText }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<Meta | null>(null); // Initialize meta as null
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<any>();

  const fetchCustomers = async (pageNum: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`${config.CUSTOMERS_URL}`, {
        params: { page: pageNum, limit: 10, searchText }, // Using searchText
      });

      const data = response.data;

      if (data.customers && data.customers.length > 0) {
        setCustomers(prev => (pageNum === 1 ? data.customers : [...prev, ...data.customers]));
        setMeta(data.meta);
        setNoData(false);
      } else if (pageNum === 1) {
        setNoData(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.error('Error fetching customers:', error.message);
      } else {
        // Handle unexpected errors
        setError('An unexpected error occurred');
        console.error('Unknown error fetching customers:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Reset customers and fetch the first page when the screen is focused
      setCustomers([]);
      fetchCustomers(1);
    }, [searchText]) // Add dependencies if necessary, like searchText
  );

  useEffect(() => {
    if (page > 1) fetchCustomers(page);
  }, [page]);

  const handleLoadMore = () => {
    if (!loading && meta && meta.page * meta.limit < meta.total) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {noData && page === 1 ? (
        <View style={styles.noDataView}>
          <Text style={styles.noDataText}>No customers found</Text>
        </View>
      ) : (
        <FlatList
          data={customers}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View key={item.id}>
              <List.Item
                title={item.name}
                description={`Mobile: ${item.mobile}`}
                onPress={() => navigation.navigate('CustomerDetailsPage', { customer_id: item.id })}
                right={() => (
                  <Text style={styles.enquiryId}>
                    {item.enquiry_id ? `Enquiry ID: ${item.enquiry_id}` : 'No Enquiry'}
                  </Text>
                )}
              />
              <Divider />
            </View>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator size="small" color="gray" /> : null}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  enquiryId: {
    alignSelf: 'center',
    marginRight: 10,
    color: 'gray',
  },
  noDataView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: 'gray',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    margin: 10,
  },
});

export default CustomerList;
