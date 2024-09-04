import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, FlatList, ActivityIndicator, Text } from 'react-native';
import { Title, Divider } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import CustomerList from '../../components/CustomerList'; // Assuming your CustomerList component is in this path
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../../axiosInstance'; // Assuming you're using Axios for API calls
import config from '../../config';

const CustomerPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [noDataFound, setNoDataFound] = useState(false); // New state for no data found

  const navigation = useNavigation();

  useEffect(() => {
    if (searchQuery.length >= 3) {
      setPage(1);
      fetchCustomers(true);
    } else if (searchQuery.length === 0) {
      setPage(1);
      fetchCustomers(true);
    }
  }, [searchQuery]);

  const fetchCustomers = async (reset = false) => {
    if (loading || !hasMore) return;
    setLoading(true);
    setNoDataFound(false); // Reset no data found status before fetch
    try {
      const response = await axiosInstance.get(config.CUSTOMERS_URL, {
        params: {
          page,
          query: searchQuery,
        },
      });

      const newCustomers = response.data.customers;

      if (newCustomers.length === 0) {
        setHasMore(false);
        if (reset) {
          setCustomers([]);
          setNoDataFound(true); // No data found, show appropriate message
        }
      } else {
        setCustomers(prevCustomers => (reset ? newCustomers : [...prevCustomers, ...newCustomers]));
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchCustomers();
    }
  };

  const renderFooter = () => {
    if (noDataFound) {
      return <Text style={styles.noDataText}>No customers found.</Text>;
    }
    if (loading) {
      return <ActivityIndicator style={{ color: '#000' }} />;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Customer Dashboard</Title>
        <Feather
          name="plus-circle"
          size={30}
          color="purple"
          onPress={() => navigation.navigate('AddCustomerPage')}
        />
      </View>
      <TextInput
        style={styles.searchBox}
        placeholder="Search customers..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <Divider />
      <FlatList
        data={customers}
        renderItem={({ item }) => <CustomerList customer={item} />}
        keyExtractor={item => item.id.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
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
    marginBottom: 8,
  },
  title: {
    flex: 1,
  },
  searchBox: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  noDataText: {
    textAlign: 'center',
    padding: 10,
    color: 'gray',
  },
});

export default CustomerPage;
