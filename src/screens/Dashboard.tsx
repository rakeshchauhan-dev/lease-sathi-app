import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Title, Divider, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';


import CustomerList from '../components/CustomerList';

const Dashboard = () => {
  const [selectedList, setSelectedList] = useState<'new' | 'upcoming'>('new');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Dashboard</Title>
        <Feather
          name="plus-circle"
          size={30}  // You can adjust the size if needed
          color="purple"  // Adjust the color to ensure visibility
          onPress={() => navigation.navigate('NewCustomer')}
        />
      </View>
      <Divider />
      <View style={styles.buttonContainer}>
        <Button
          mode={selectedList === 'new' ? 'contained' : 'outlined'}
          onPress={() => setSelectedList('new')}
          style={styles.button}
        >
          New
        </Button>
        <Button
          mode={selectedList === 'upcoming' ? 'contained' : 'outlined'}
          onPress={() => setSelectedList('upcoming')}
          style={styles.button}
        >
          Upcoming
        </Button>
      </View>
      <Divider />
      <CustomerList type={selectedList} />
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
  addButton: {
    marginRight: -10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default Dashboard;
