import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Title, Divider } from 'react-native-paper';
import TokenList from '../components/TokenList';

const Dashboard = () => {
  const [searchText, setSearchText] = useState('');

  // Debounce search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Debounced searchText will be used in TokenList
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [searchText]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Dashboard</Title>
      </View>
      <Divider />
      <TextInput
        style={styles.searchBar}
        placeholder="Search Customers..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <Divider />
      <TokenList searchText={searchText} />
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
  },
  title: {
    flex: 1,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
    marginVertical: 16,
  },
});

export default Dashboard;
