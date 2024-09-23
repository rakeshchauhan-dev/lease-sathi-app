import React from 'react';
import { StyleSheet, Text, Alert } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import axiosInstance from '../../axiosInstance';
import { useNavigation } from '@react-navigation/native';
import config from '../../config';

interface UploadProofFormProps {
  tokenID: number;
  appointmentID: number;
  setCurrentForm: (form: string) => void;
}

const UploadProofForm: React.FC<UploadProofFormProps> = ({
  tokenID,
  appointmentID,
  setCurrentForm,
}) => {
  const [proofFile, setProofFile] = React.useState<DocumentPickerResponse | null>(null);
  const navigation = useNavigation<any>();

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.allFiles],
      });
      setProofFile(result[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.error('Error selecting document:', err);
      }
    }
  };

  const handleFileUpload = async () => {
    if (!proofFile) {
      Alert.alert('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('tokenID', String(tokenID));
    formData.append('documentType', 'Appointment Completed');
    formData.append('appointmentID', String(appointmentID));
    formData.append('files', {
      uri: proofFile.uri,
      type: proofFile.type,
      name: proofFile.name,
    });

    try {
      const response = await axiosInstance.post(`${config.APPOINTMENTS_URL}/upload-file`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        Alert.alert('Proof uploaded successfully!');
        navigation.navigate('AppointmentDashboard');
      } else {
        Alert.alert('Failed to upload proof');
      }
    } catch (error) {
      console.error('Error uploading proof:', error);
      Alert.alert('File upload failed');
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>Upload Proof of Appointment Completion</Title>

        <Button
          mode="outlined"
          onPress={handleDocumentPick}
          style={styles.uploadButton}
        >
          {proofFile ? 'Change Proof Image' : 'Upload Proof Image'}
        </Button>

        {proofFile && (
          <Text style={styles.fileName}>
            {proofFile.name}
          </Text>
        )}

        {proofFile && (
          <Button
            mode="contained"
            onPress={handleFileUpload}
            style={styles.submitButton}
          >
            Submit Proof
          </Button>
        )}
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

export default UploadProofForm;
