import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';

interface Enquiry {
  id: number;
  name: string;
  mobile: string;
  address: string;
  tenure: string;
  rent: string;
  deposit: string;
  increment?: string;
  extraService?: string;
  quoted?: string;
}

const enquiries: Enquiry[] = [
  { id: 1, name: 'Michael Scott', mobile: '1111111111', address: '123 Scranton Ave', tenure: '12 months', rent: '1200 USD', deposit: '2400 USD' },
  { id: 2, name: 'Dwight Schrute', mobile: '2222222222', address: '456 Beet Rd', tenure: '6 months', rent: '800 USD', deposit: '1600 USD' },
  { id: 3, name: 'Jim Halpert', mobile: '3333333333', address: '789 Pam Dr', tenure: '18 months', rent: '1400 USD', deposit: '2800 USD' }
];

const EnquiryDetailsPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as { id: number };
  const enquiry = enquiries.find(e => e.id === id);

  if (!enquiry) {
    return (
      <View style={styles.container}>
        <Title style={styles.title}>Enquiry not found</Title>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Enquiry Details</Title>
          <Paragraph style={styles.label}>Name:</Paragraph>
          <Paragraph style={styles.value}>{enquiry.name}</Paragraph>
          <Paragraph style={styles.label}>Mobile No:</Paragraph>
          <Paragraph style={styles.value}>{enquiry.mobile}</Paragraph>
          <Paragraph style={styles.label}>Address:</Paragraph>
          <Paragraph style={styles.value}>{enquiry.address}</Paragraph>
          <Paragraph style={styles.label}>Tenure:</Paragraph>
          <Paragraph style={styles.value}>{enquiry.tenure}</Paragraph>
          <Paragraph style={styles.label}>Rent:</Paragraph>
          <Paragraph style={styles.value}>{enquiry.rent}</Paragraph>
          <Paragraph style={styles.label}>Deposit:</Paragraph>
          <Paragraph style={styles.value}>{enquiry.deposit}</Paragraph>
          {enquiry.increment && (
            <>
              <Paragraph style={styles.label}>Increment:</Paragraph>
              <Paragraph style={styles.value}>{enquiry.increment}</Paragraph>
            </>
          )}
          {enquiry.extraService && (
            <>
              <Paragraph style={styles.label}>Extra Service:</Paragraph>
              <Paragraph style={styles.value}>{enquiry.extraService}</Paragraph>
            </>
          )}
          {enquiry.quoted && (
            <>
              <Paragraph style={styles.label}>Quoted:</Paragraph>
              <Paragraph style={styles.value}>{enquiry.quoted}</Paragraph>
            </>
          )}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Convert Enquiry to Customer</Title>
          <Paragraph style={styles.description}>Would you like to convert this enquiry into a customer by scheduling an appointment?</Paragraph>
        </Card.Content>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('CreateDraft', { enquiryId: enquiry.id })}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Convert to Customer
        </Button>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginVertical: 20,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    color: '#777',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    margin: 16,
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 10,
  },
});

export default EnquiryDetailsPage;
