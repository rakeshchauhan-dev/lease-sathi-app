import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Title, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

import EnquiryList from '../components/EnquiryList';

const EnquiryPage = () => {
  const [selectedList, setSelectedList] = useState<'pending' | 'confirmed'>('pending');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Enquiry Dashboard</Title>
        <Feather
          name="plus-circle"
          size={30}  // Adjust the size if needed
          color="purple"  // Adjust the color to ensure visibility
          onPress={() => navigation.navigate('AddEnquiryPage')}
        />
      </View>
      <Divider />
      <View style={styles.buttonContainer}>
        <Button
          mode={selectedList === 'pending' ? 'contained' : 'outlined'}
          onPress={() => setSelectedList('pending')}
          style={styles.button}
        >
          Pending
        </Button>
        <Button
          mode={selectedList === 'confirmed' ? 'contained' : 'outlined'}
          onPress={() => setSelectedList('confirmed')}
          style={styles.button}
        >
          Confirmed
        </Button>
      </View>
      <Divider />
      <EnquiryList type={selectedList} />
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

export default EnquiryPage;
