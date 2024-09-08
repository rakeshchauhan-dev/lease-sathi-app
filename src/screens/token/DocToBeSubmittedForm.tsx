import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';
import axiosInstance from '../../axiosInstance';
import config from '../../config';

interface DocToBeSubmittedFormProps {
  tokenID: number; // Accept tokenID as a prop
  setCurrentForm: (form: string) => void; // Add setCurrentForm prop
}

const DocToBeSubmittedForm: React.FC<DocToBeSubmittedFormProps> = ({
  tokenID,
  setCurrentForm,
}) => {
  const handleApprove = async () => {
    try {
      const response = await axiosInstance.put(`${config.TOKENS_URL}/${tokenID}`, {
        status: 'Doc to be checked', // Assuming status is updated to 'Doc to be checked'
      });

      if (response.status === 200) {
        Alert.alert('Document marked as submitted to government');
        setCurrentForm('Doc to be checked'); // Switch to the next form or state upon successful approval
      }
    } catch (error) {
      console.error('Error updating token status:', error);
      Alert.alert('Failed to update document status');
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>Document has been submitted to the government</Title>
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={handleApprove} style={styles.button}>
            Approve
          </Button>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    borderRadius: 6,
    paddingHorizontal: 20,
  },
});

export default DocToBeSubmittedForm;
