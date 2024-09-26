import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import {List, Divider} from 'react-native-paper';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import axiosInstance from '../axiosInstance';
import config from '../config';

interface Appointment {
  id: number;
  token_id: number;
  appointment_date: string;
  appointment_time: string;
  employee_id: number;
  address_id: number;
  role: string;
  customer_name: string;
  appointment_address: string;
  created_at: string;
  updated_at: string;
}

interface Meta {
  limit: number;
  page: number;
  total: number;
}

interface AppointmentListProps {
  searchText: string; // Prop from parent component
}

const AppointmentList: React.FC<AppointmentListProps> = ({searchText}) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<Meta | null>(null); // Initialize meta as null
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<any>();

  const fetchAppointments = async (pageNum: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`${config.APPOINTMENTS_URL}`, {
        params: {page: pageNum, limit: 10, searchText}, // Using searchText
      });

      const data = response.data;

      if (data.appointments && data.appointments.length > 0) {
        setAppointments(prev =>
          pageNum === 1 ? data.appointments : [...prev, ...data.appointments],
        );
        setMeta(data.meta);
        setNoData(false);
      } else if (pageNum === 1) {
        setNoData(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.error('Error fetching appointments:', error.message);
      } else {
        // Handle unexpected errors
        setError('An unexpected error occurred');
        console.error('Unknown error fetching appointments:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Reset appointments and fetch first page when screen is focused
      setAppointments([]);
      fetchAppointments(1);
    }, [searchText]), // Add dependencies if necessary, like searchText
  );

  useEffect(() => {
    if (page > 1) {
      fetchAppointments(page);
    }
  }, [page]);

  const handleLoadMore = () => {
    if (!loading && meta && meta.page * meta.limit < meta.total) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <View style={{flex: 1}}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {noData && page === 1 ? (
        <View style={styles.noDataView}>
          <Text style={styles.noDataText}>No appointments found</Text>
        </View>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View key={item.id}>
              <List.Item
                title={item.customer_name}
                description={`Appointment Date: ${item.appointment_date}`}
                onPress={() =>
                  navigation.navigate('AppointmentDetailsPage', {
                    appointment_id: item.id,
                  })
                }
                right={() => <Text style={styles.role}>{item.role}</Text>}
              />
              <Divider />
            </View>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? <ActivityIndicator size="small" color="gray" /> : null
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  role: {
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

export default AppointmentList;
