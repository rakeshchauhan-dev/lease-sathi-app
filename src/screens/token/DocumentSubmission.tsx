import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Card, Title, Button} from 'react-native-paper';

interface DocumentSubmissionProps {
  draftFile: any;
  handleDocumentPick: () => void;
  handleSubmit: () => void;
}

const DocumentSubmission: React.FC<DocumentSubmissionProps> = ({
  draftFile,
  handleDocumentPick,
  handleSubmit,
}) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>Document Submission</Title>
        <Button
          mode="outlined"
          onPress={handleDocumentPick}
          style={styles.uploadButton}>
          {draftFile ? 'Change Document' : 'Upload Document'}
        </Button>
        {draftFile && <Text style={styles.fileName}>{draftFile.name}</Text>}
        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Submit
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
    marginBottom: 4,
    color: '#333',
    textAlign: 'center',
  },
  uploadButton: {
    marginBottom: 8,
  },
  fileName: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 8,
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    borderRadius: 6,
  },
});

export default DocumentSubmission;
