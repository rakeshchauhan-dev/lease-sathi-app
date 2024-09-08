import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../axiosInstance';
import config from '../config';

interface Enquiry {
  id: number;
  name: string;
  tenure: string;
  rent: string;
  deposit: string;
  status: string;
}

interface Meta {
  limit: number;
  page: number;
  total: number;
}

interface EnquiryListProps {
  searchText: string;  // Prop from parent component
}

const EnquiryList: React.FC<EnquiryListProps> = ({ searchText }) => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<Meta | null>(null); // Initialize meta as null
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<any>();

  const fetchEnquiries = async (pageNum: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`${config.ENQUIRIES_URL}`, {
        params: { page: pageNum, limit: 10, searchText }, // Using searchText
      });

      const data = response.data;

      if (data.enquiries && data.enquiries.length > 0) {
        setEnquiries(prev => (pageNum === 1 ? data.enquiries : [...prev, ...data.enquiries]));
        setMeta(data.meta);
        setNoData(false);
      } else if (pageNum === 1) {
        setNoData(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.error('Error fetching enquiries:', error.message);
      } else {
        setError('An unexpected error occurred');
        console.error('Unknown error fetching enquiries:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setEnquiries([]); // reset enquiries on new search
    fetchEnquiries(1); // fetch first page
  }, [searchText]); // Fetch data when searchText changes

  useEffect(() => {
    if (page > 1) fetchEnquiries(page);
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
          <Text style={styles.noDataText}>No enquiries found</Text>
        </View>
      ) : (
        <FlatList
          data={enquiries}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View key={item.id}>
              <List.Item
                title={item.name}
                description={`Tenure: ${item.tenure}, Rent: ${item.rent}, Deposit: ${item.deposit}`}
                onPress={() => navigation.navigate('EnquiryDetailsPage', { id: item.id })}
                right={() => <Text style={styles.status}>{item.status}</Text>}
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
  status: {
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

export default EnquiryList;
