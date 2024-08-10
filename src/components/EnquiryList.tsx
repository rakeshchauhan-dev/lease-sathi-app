import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Divider, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

interface Enquiry {
  id: number;
  name: string;
  tenure: string;
  rent: string;
  deposit: string;
  status: string;
}

interface EnquiryListProps {
  type: string;
}

const enquiries: Enquiry[] = [
  { id: 1, name: 'Alice Johnson', tenure: '12 months', rent: '2000', deposit: '5000', status: 'Pending' },
  { id: 2, name: 'Bob Brown', tenure: '6 months', rent: '1500', deposit: '3000', status: 'Confirmed' },
  { id: 3, name: 'Charlie Davis', tenure: '9 months', rent: '2500', deposit: '4000', status: 'Cancelled' },
];

const EnquiryList: React.FC<EnquiryListProps> = ({ type }) => {
  const navigation = useNavigation();
  const filteredEnquiries = enquiries.filter(enquiry => enquiry.status.toLowerCase() === type);

  return (
    <View>
      {filteredEnquiries.map(enquiry => (
        <View key={enquiry.id}>
          <List.Item
            title={enquiry.name}
            description={`Tenure: ${enquiry.tenure}, Rent: ${enquiry.rent}, Deposit: ${enquiry.deposit}`}
            onPress={() => navigation.navigate('EnquiryDetails', { id: enquiry.id })}
            right={() => <Text style={styles.status}>{enquiry.status}</Text>}
          />
          <Divider />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  status: {
    alignSelf: 'center',
    marginRight: 10,
    color: 'gray',
  },
});

export default EnquiryList;
