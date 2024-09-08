import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Divider, FAB } from 'react-native-paper';
import EnquiryList from '../components/EnquiryList';
import { useNavigation } from '@react-navigation/native';

const EnquiryDashboard = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation<any>();

  useEffect(() => {
    const timeoutId = setTimeout(() => {}, 500); // Debounce search input
    return () => clearTimeout(timeoutId);
  }, [searchText]);

  const handleAddEnquiry = () => {
    navigation.navigate('AddEnquiryPage'); // Navigate to the AddEnquiryPage
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Enquiries..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <Divider />
      {/* Pass searchText as a prop to EnquiryList */}
      <EnquiryList searchText={searchText} />
      {/* Floating Action Button to add new enquiry */}
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={handleAddEnquiry}
        label="Add Enquiry"
      />
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default EnquiryDashboard;
