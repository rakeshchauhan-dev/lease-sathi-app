// EnquiryList.tsx
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
  enquiries?: Enquiry[]; // Marking enquiries as optional
}

const EnquiryList: React.FC<EnquiryListProps> = ({ enquiries }) => {
  const navigation = useNavigation();

  // Debugging logs to inspect data
  console.log('EnquiryList enquiries:', enquiries);

  if (!enquiries || enquiries.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No enquiries found.</Text>
      </View>
    );
  }

  return (
    <View>
      {enquiries.map(enquiry => (
        <View key={enquiry.id}>
          <List.Item
            title={enquiry.name}
            description={`Tenure: ${enquiry.tenure}, Rent: ${enquiry.rent}, Deposit: ${enquiry.deposit}`}
            onPress={() => navigation.navigate('EnquiryDetailsPage', { id: enquiry.id })}
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
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: 'gray',
    fontSize: 16,
  },
});

export default EnquiryList;
