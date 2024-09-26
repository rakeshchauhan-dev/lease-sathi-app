import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Paragraph, Title} from 'react-native-paper';

interface CustomerInfoProps {
  customer: {
    name: string;
    mobile: string;
    address: string;
    email: string;
  };
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({customer}) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>Customer Information</Title>
        <View style={styles.infoContainer}>
          <Paragraph style={styles.label}>Name:</Paragraph>
          <Paragraph style={styles.value}>{customer.name}</Paragraph>
        </View>
        <View style={styles.infoContainer}>
          <Paragraph style={styles.label}>Mobile:</Paragraph>
          <Paragraph style={styles.value}>{customer.mobile}</Paragraph>
        </View>
        <View style={styles.infoContainer}>
          <Paragraph style={styles.label}>Address:</Paragraph>
          <Paragraph style={styles.value}>{customer.address}</Paragraph>
        </View>
        <View style={styles.infoContainer}>
          <Paragraph style={styles.label}>Email:</Paragraph>
          <Paragraph style={styles.value}>{customer.email}</Paragraph>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#777',
  },
});

export default CustomerInfo;
