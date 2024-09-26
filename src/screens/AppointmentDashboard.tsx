import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {Divider} from 'react-native-paper';
import AppointmentList from '../components/AppointmentList';

const AppointmentDashboard = () => {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {}, 500); // Debounce search input
    return () => clearTimeout(timeoutId);
  }, [searchText]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Appointments..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <Divider />
      {/* Pass searchText as a prop to AppointmentList */}
      <AppointmentList searchText={searchText} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
    marginVertical: 16,
  },
});

export default AppointmentDashboard;
