import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Alert } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';
import axiosInstance from '../../axiosInstance';
import config from '../../config';

interface AwaitingFeedbackFormProps {
  tokenID: number; // Accept tokenID as a prop
  setCurrentForm: (form: string) => void; // Add setCurrentForm prop
}

const AwaitingFeedbackForm: React.FC<AwaitingFeedbackFormProps> = ({
  tokenID,
  setCurrentForm,
}) => {
  const [comment, setComment] = useState<string>('');

  const handleSubmitFeedback = async () => {
    if (!comment.trim()) {
      Alert.alert('Feedback comment is required');
      return;
    }

    try {
      const response = await axiosInstance.post(`${config.FEEDBACKS_URL}`, {
        token_id: tokenID, // Use tokenID dynamically
        comment: comment,
      });

      if (response.status === 200) {
        Alert.alert('Feedback submitted successfully');
        setCurrentForm('Under Revision'); // Switch to UploadRevisedDraftForm on successful feedback submission
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Alert.alert('Failed to submit feedback');
    }
  };

  const handleApprove = async () => {
    try {
      const response = await axiosInstance.put(`${config.TOKENS_URL}/${tokenID}`, {
        status: 'Schedule Appointment', // Assuming status is updated to 'Appointment'
      });

      if (response.status === 200) {
        Alert.alert('Token status updated to Appointment');
        setCurrentForm('Schedule Appointment'); // Switch to the Appointment form upon successful update
      }
    } catch (error) {
      console.error('Error updating token status:', error);
      Alert.alert('Failed to update token status');
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>Feedback</Title>
        <TextInput
          style={styles.input}
          placeholder="Enter your feedback"
          value={comment}
          onChangeText={setComment}
          multiline
          numberOfLines={4}
        />
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={handleSubmitFeedback} style={styles.button}>
            Submit Feedback
          </Button>
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 5,
  },
});

export default AwaitingFeedbackForm;
