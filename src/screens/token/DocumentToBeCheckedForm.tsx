import React from 'react';
import { StyleSheet, Text, Alert } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import axiosInstance from '../../axiosInstance';
import config from '../../config';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

interface DocumentToBeCheckedFormProps {
  checkedFile: any;
  setCheckedFile: (file: any) => void;
  tokenID: number;
  setCurrentForm: (form: string) => void; // Add setCurrentForm prop
}

const DocumentToBeCheckedForm: React.FC<DocumentToBeCheckedFormProps> = ({
  checkedFile,
  setCheckedFile,
  tokenID,
  setCurrentForm, // Destructure setCurrentForm
}) => {
const navigation = useNavigation<any>(); // Typed useNavigation

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.allFiles],
      });
      setCheckedFile(result[0]); // Set the selected file (first file in the array)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.error('Error selecting document:', err);
      }
    }
  };

  const handleFileUpload = async () => {
    if (!checkedFile) {
      Alert.alert('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('tokenID', String(tokenID));
    formData.append('documentType', 'Final Document');
    formData.append('files', {
      uri: checkedFile.uri,
      type: checkedFile.type,
      name: checkedFile.name,
    });

    try {
      const response = await axiosInstance.post(`${config.TOKENS_URL}/upload-file`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        Alert.alert('Document uploaded successfully');
        
        // Navigate to the main dashboard
        navigation.navigate('DashboardMain');  // Assuming your dashboard route is named 'Dashboard'

        console.log('Form switched to Completed');
      }
    } catch (error) {
      console.error('Error uploading document:', error);
      Alert.alert('Document upload failed');
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>Document Check</Title>

        <Button
          mode="outlined"
          onPress={handleDocumentPick}
          style={styles.uploadButton}
        >
          {checkedFile ? 'Change Checked Document' : 'Upload Checked Document'}
        </Button>

        {checkedFile && (
          <Text style={styles.fileName}>
            {checkedFile.name}
          </Text>
        )}

        <Button
          mode="contained"
          onPress={handleFileUpload}
          style={styles.submitButton}
        >
          Submit Checked Document
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

export default DocumentToBeCheckedForm;
