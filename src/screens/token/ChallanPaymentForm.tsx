import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Card, Title, Button, Paragraph } from 'react-native-paper';

interface ChallanPaymentFormProps {
  amount: string;
  governmentFee: string;
  setAmount: (text: string) => void;
  setGovernmentFee: (text: string) => void;
  handleSubmit: () => void;
}

const ChallanPaymentForm: React.FC<ChallanPaymentFormProps> = ({
  amount,
  governmentFee,
  setAmount,
  setGovernmentFee,
  handleSubmit,
}) => {
  const calculateTotal = () => {
    const total = parseFloat(amount) + parseFloat(governmentFee);
    return isNaN(total) ? '0.00' : total.toFixed(2);
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>Challan Payment</Title>

        <View style={styles.inputContainer}>
          <Paragraph style={styles.label}>Amount:</Paragraph>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Paragraph style={styles.label}>Government Fee:</Paragraph>
          <TextInput
            style={styles.input}
            placeholder="Enter government fee"
            value={governmentFee}
            onChangeText={setGovernmentFee}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Paragraph style={styles.label}>Total:</Paragraph>
          <Paragraph style={styles.total}>{calculateTotal()}</Paragraph>
        </View>

        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Submit Payment
        </Button>
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
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    marginTop: 10,
    borderRadius: 6,
  },
});

export default ChallanPaymentForm;
