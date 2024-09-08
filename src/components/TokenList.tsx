import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../axiosInstance';
import config from '../config';

interface Token {
  token_id: number;
  token_no: string;
  status: string;
  created_at: string;
  updated_at: string;
  customer_id: number;
  customer_name: string;
  customer_mobile: string;
}

interface Meta {
  limit: number;
  page: number;
  total: number;
}

interface TokenListProps {
  searchText: string;
}

const TokenList: React.FC<TokenListProps> = ({ searchText }) => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<Meta>({ limit: 10, page: 1, total: 0 });
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<any>();

  const fetchTokens = async (pageNum: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`${config.TOKENS_URL}/list`, {
        params: { page: pageNum, limit: 10, searchText },
      });

      const data = response.data;

      if (data.tokens && data.tokens.length > 0) {
        setTokens(prev => (pageNum === 1 ? data.tokens : [...prev, ...data.tokens])); // reset tokens if it's a new search
        setMeta(data.meta);
        setNoData(false);
      } else if (pageNum === 1) {
        setNoData(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.error('Error fetching tokens:', error.message);
      } else {
        // Handle unexpected errors
        setError('An unexpected error occurred');
        console.error('Unknown error fetching tokens:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTokens([]); // reset tokens on new search
    fetchTokens(1); // fetch first page
  }, [searchText]);

  useEffect(() => {
    if (page > 1) fetchTokens(page);
  }, [page]);

  const handleLoadMore = () => {
    if (!loading && meta.page * meta.limit < meta.total) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {noData && page === 1 ? (
        <View style={styles.noDataView}>
          <Text style={styles.noDataText}>No data found</Text>
        </View>
      ) : (
        <FlatList
          data={tokens}
          keyExtractor={item => item.token_id.toString()}
          renderItem={({ item }) => (
            <View key={item.token_id}>
              <List.Item
                title={item.customer_name}
                description={`Token No: ${item.token_no}`}
                onPress={() => navigation.navigate('TokenDetailsPage', { token_id: item.token_id })}
                right={() => (
                  <Text style={styles.status}>
                    {item.status}
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

export default TokenList;
