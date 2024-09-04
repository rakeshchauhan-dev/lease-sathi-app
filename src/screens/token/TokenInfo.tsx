import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';

interface TokenInfoProps {
  token: {
    token_no: string;
    customer_name: string;
    customer_mobile: string;
    status: string;
  };
}

const TokenInfo: React.FC<TokenInfoProps> = ({ token }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>Token Information</Title>
        <View style={styles.infoContainer}>
          <Paragraph style={styles.label}>Token No:</Paragraph>
          <Paragraph style={styles.value}>{token.token_no}</Paragraph>
        </View>
        <View style={styles.infoContainer}>
          <Paragraph style={styles.label}>Customer Name:</Paragraph>
          <Paragraph style={styles.value}>{token.customer_name}</Paragraph>
        </View>
        <View style={styles.infoContainer}>
          <Paragraph style={styles.label}>Customer Mobile:</Paragraph>
          <Paragraph style={styles.value}>{token.customer_mobile}</Paragraph>
        </View>
        <View style={styles.infoContainer}>
          <Paragraph style={styles.label}>Status:</Paragraph>
          <Paragraph style={styles.value}>{token.status}</Paragraph>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginHorizontal: 10, // Adds margin on the left and right for a form-like appearance
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

export default TokenInfo;
