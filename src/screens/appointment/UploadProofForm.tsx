import React, {useState} from 'react';
import {StyleSheet, Text, Alert, ActivityIndicator, View} from 'react-native';
import {Card, Title, Button} from 'react-native-paper';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import axiosInstance from '../../axiosInstance';
import {useNavigation} from '@react-navigation/native';
import config from '../../config';

interface UploadProofFormProps {
  tokenID: number;
  appointmentID: number;
  setCurrentForm: (form: string) => void;
}

const UploadProofForm: React.FC<UploadProofFormProps> = ({
  tokenID,
  appointmentID,
}) => {
  // Store an array of files
  const [proofFiles, setProofFiles] = useState<DocumentPickerResponse[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigation = useNavigation<any>();

  // Handle multi-file selection
  const handleDocumentPick = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.allFiles],
        allowMultiSelection: true, // Allow multiple selection
      });
      setProofFiles(results); // Set the selected files in state
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.error('Error selecting documents:', err);
      }
    }
  };

  // Handle multi-file upload
  const handleFileUpload = async () => {
    if (proofFiles.length === 0) {
      Alert.alert('No files selected');
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('tokenID', String(tokenID));
    formData.append('documentType', 'Appointment Completed');
    formData.append('appointmentID', String(appointmentID));

    // Loop through files and append them to the FormData
    proofFiles.forEach(file => {
      formData.append('files', {
        uri: file.uri,
        type: file.type,
        name: file.name,
      });
    });

    try {
      const response = await axiosInstance.post(
        `${config.APPOINTMENTS_URL}/upload-file`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.status === 200) {
        Alert.alert('Proof uploaded successfully!');
        navigation.navigate('AppointmentDashboard');
      } else {
        Alert.alert('Failed to upload proof');
      }
    } catch (error) {
      console.error('Error uploading proof:', error);
      Alert.alert('File upload failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>
          Upload Proof of Appointment Completion
        </Title>

        <Button
          mode="outlined"
          onPress={handleDocumentPick}
          style={styles.uploadButton}
          disabled={isSubmitting}>
          {proofFiles.length > 0 ? 'Change Proof Files' : 'Upload Proof Files'}
        </Button>

        {proofFiles.length > 0 && (
          <View>
            {proofFiles.map(file => (
              <Text key={file.uri} style={styles.fileName}>
                {file.name}
              </Text>
            ))}
          </View>
        )}

        {proofFiles.length > 0 && (
          <Button
            mode="contained"
            onPress={handleFileUpload}
            style={styles.submitButton}
            disabled={isSubmitting}>
            {isSubmitting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              'Submit Proof'
            )}
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
