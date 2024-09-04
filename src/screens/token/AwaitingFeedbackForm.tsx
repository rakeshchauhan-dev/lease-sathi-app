import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';

interface AwaitingFeedbackFormProps {
  comment: string;
  setComment: (text: string) => void;
  handleSubmit: () => void;
}

const AwaitingFeedbackForm: React.FC<AwaitingFeedbackFormProps> = ({ comment, setComment, handleSubmit }) => {
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
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.button}
        >
          Submit Feedback
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  button: {
    marginTop: 10,
    borderRadius: 6,
  },
});

export default AwaitingFeedbackForm;
