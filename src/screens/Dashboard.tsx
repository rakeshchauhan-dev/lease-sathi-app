import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Title, Divider, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import CustomerList from '../components/CustomerList';

const Dashboard = () => {
  const [selectedList, setSelectedList] = useState<'new' | 'upcoming'>('new');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Dashboard</Title>
        <IconButton
          icon="plus-circle-outline"
          size={30}
          color="blue"
          onPress={() => navigation.navigate('NewCustomer')}
          style={styles.addButton}
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
