import React from 'react';
import { StyleSheet, Text, Alert } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import axiosInstance from '../../axiosInstance';
import config from '../../config';

interface UploadRevisedDraftFormProps {
  draftFile: any;
  setDraftFile: (file: any) => void;
  handleSubmit: () => void;
  tokenID: number;
  setCurrentForm: (form: string) => void; // Add setCurrentForm prop
}

const UploadRevisedDraftForm: React.FC<UploadRevisedDraftFormProps> = ({
  draftFile,
  setDraftFile,
  handleSubmit,
  tokenID,
  setCurrentForm, // Destructure setCurrentForm
}) => {
  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.allFiles],
      });
      setDraftFile(result[0]); // Set the selected file (first file in the array)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.error('Error selecting document:', err);
      }
    }
  };

  const handleFileUpload = async () => {
    if (!draftFile) {
      Alert.alert('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('tokenID', String(tokenID));
    formData.append('documentType', 'Revised Document');
    formData.append('file', {
      uri: draftFile.uri,
      type: draftFile.type,
      name: draftFile.name,
    });

    try {
      const response = await axiosInstance.post(config.FILE_UPLOAD_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        Alert.alert('File uploaded successfully');
        setCurrentForm('Awaiting Feedback'); // Switch back to Awaiting Feedback after upload
        console.log('Form switched to Awaiting Feedback');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      Alert.alert('File upload failed');
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>Under Revision</Title>

        <Button
          mode="outlined"
          onPress={handleDocumentPick}
          style={styles.uploadButton}
        >
          {draftFile ? 'Change Revised Draft' : 'Upload Revised Draft'}
        </Button>

        {draftFile && (
          <Text style={styles.fileName}>
            {draftFile.name}
          </Text>
        )}

        <Button
          mode="contained"
          onPress={handleFileUpload}
          style={styles.submitButton}
        >
          Submit
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
  uploadButton: {
    marginBottom: 10,
    borderColor: '#6200ee',
    borderWidth: 1,
    borderRadius: 6,
  },
  fileName: {
    marginBottom: 10,
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  submitButton: {
    marginTop: 10,
    borderRadius: 6,
  },
});

export default UploadRevisedDraftForm;
