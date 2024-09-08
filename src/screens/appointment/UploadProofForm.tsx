import React from 'react';
import { StyleSheet, Text, Alert } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import axiosInstance from '../../axiosInstance';
import config from '../../config';

interface UploadProofFormProps {
  proofFile: DocumentPickerResponse | null;
  setProofFile: (file: DocumentPickerResponse | null) => void;
  tokenID: number;
  appointmentID: number; // Added appointmentID
  setCurrentForm: (form: string) => void;
}

const UploadProofForm: React.FC<UploadProofFormProps> = ({
  proofFile,
  setProofFile,
  tokenID,
  appointmentID, // Ensure this is passed in the props
  setCurrentForm,
}) => {
  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.allFiles], // Restrict to images only
      });
      setProofFile(result[0]); // Set the selected file (first file in the array)
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
    formData.append('file', {
      uri: proofFile.uri,
      type: proofFile.type,
      name: proofFile.name,
    });

    try {
      // Step 1: Upload the proof file
      const response = await axiosInstance.post(config.FILE_UPLOAD_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {

        // Step 2: Update the appointment status after file upload
        const statusUpdateResponse = await axiosInstance.put(`${config.APPOINTMENTS_URL}/status`, {
          appointment_id: appointmentID, // Make sure appointmentID is used correctly
          new_status: 'Completed',
        });

        if (statusUpdateResponse.status === 200) {
          Alert.alert('Appointment status updated successfully');
          
          // Step 3: Set form state to 'Appointment Completed'
          setCurrentForm('Appointment Completed');
        } else {
          Alert.alert('Failed to update appointment status');
        }
      }
    } catch (error) {
      console.error('Error uploading proof or updating status:', error);
      Alert.alert('File upload or status update failed');
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

        <Button
          mode="contained"
          onPress={handleFileUpload}
          style={styles.submitButton}
        >
          Submit Proof
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

export default UploadProofForm;
