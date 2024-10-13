import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Text, Alert} from 'react-native';
import {Card, Title, Button, Paragraph, RadioButton} from 'react-native-paper';
import axiosInstance from '../../axiosInstance';
import config from '../../config';

interface ChallanPaymentFormProps {
  tokenID: number;
  amount: string;
  governmentFee: string;
  setAmount: (text: string) => void;
  setGovernmentFee: (text: string) => void;
  setCurrentForm: (form: string) => void;
}

const ChallanPaymentForm: React.FC<ChallanPaymentFormProps> = ({
  tokenID,
  amount,
  governmentFee,
  setAmount,
  setGovernmentFee,
  setCurrentForm,
}) => {
  const [amountReceived, setAmountReceived] = useState<string>('No'); // State for Amount Received

  const calculateTotal = () => {
    const total = parseFloat(amount) - (parseFloat(governmentFee) || 0); // Ensure 0 is used if governmentFee is empty
    return isNaN(total) ? '0.00' : total.toFixed(2);
  };

  const handleSubmitPayment = async () => {
    const parsedAmount = parseFloat(amount);
    const parsedGovernmentFee = parseFloat(governmentFee) || 0; // Default to 0 if governmentFee is empty

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Amount is required and must be a valid number');
      return;
    }

    try {
      const response = await axiosInstance.post(`${config.PAYMENTS_URL}`, {
        token_id: tokenID,
        amount: parsedAmount,
        government_fee: parsedGovernmentFee, // Ensure government_fee is sent as 0 if it's empty or invalid
        amount_received: amountReceived === 'Yes', // Pass boolean based on the selection
      });

      if (response.status === 200) {
        Alert.alert('Payment submitted successfully');
        setCurrentForm('Doc to be submitted'); // Change to the next form based on your flow
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
      Alert.alert('Failed to submit payment');
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>Challan Payment</Title>

        {/* Amount Received from Client Section */}
        <Paragraph style={styles.label}>Amount Received from Client:</Paragraph>
        <View style={styles.radioGroup}>
          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="Yes"
              status={amountReceived === 'Yes' ? 'checked' : 'unchecked'}
              onPress={() => setAmountReceived('Yes')}
            />
            <Text>Yes</Text>
          </View>
          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="No"
              status={amountReceived === 'No' ? 'checked' : 'unchecked'}
              onPress={() => setAmountReceived('No')}
            />
            <Text>No</Text>
          </View>
        </View>

        {/* Amount Input */}
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

        {/* Government Fee Input */}
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

        {/* Total Calculation */}
        <View style={styles.inputContainer}>
          <Paragraph style={styles.label}>Total:</Paragraph>
          <Paragraph style={styles.total}>{calculateTotal()}</Paragraph>
        </View>

        {/* Submit Button */}
        <Button
          mode="contained"
          onPress={handleSubmitPayment}
          style={styles.button}>
          Submit Payment
        </Button>
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
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ChallanPaymentForm;
