import React, {useState} from 'react';
import {StyleSheet, Text, Alert} from 'react-native';
import {Card, Title, Button} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import axiosInstance from '../../axiosInstance';
import config from '../../config';
import {useNavigation} from '@react-navigation/native';

// Define the DocumentFile interface for type safety
interface DocumentFile {
  uri: string;
  type: string;
  name: string;
}

interface DocumentToBeCheckedFormProps {
  tokenID: number;
  challanFile: DocumentFile | null; // Ensure this is DocumentFile or null
  setChallanFile: React.Dispatch<React.SetStateAction<DocumentFile | null>>;
  mainDocFile: DocumentFile | null;
  setMainDocFile: React.Dispatch<React.SetStateAction<DocumentFile | null>>;
  index2File: DocumentFile | null;
  setIndex2File: React.Dispatch<React.SetStateAction<DocumentFile | null>>;
  policeVerificationFile: DocumentFile | null; // Optional
  setPoliceVerificationFile: React.Dispatch<
    React.SetStateAction<DocumentFile | null>
  >;
  setCurrentForm: (form: string) => void;
}

const DocumentToBeCheckedForm: React.FC<DocumentToBeCheckedFormProps> = ({
  tokenID,
  challanFile,
  setChallanFile,
  mainDocFile,
  setMainDocFile,
  index2File,
  setIndex2File,
  policeVerificationFile,
  setPoliceVerificationFile,
  setCurrentForm,
}) => {
  const navigation = useNavigation<any>(); // Typed useNavigation
  const [draftFile, setDraftFile] = useState<DocumentFile | null>(null); // State for handling the draft document

  const handleDocumentPick = async (
    setFile: React.Dispatch<React.SetStateAction<DocumentFile | null>>,
    title: string,
  ) => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.allFiles],
      });

      // Map the response to DocumentFile type
      const selectedFile: DocumentFile = {
        uri: result[0].uri,
        type: result[0].type || 'application/octet-stream', // Default type if null
        name: result[0].name || 'Unnamed Document', // Default name if null
      };

      setFile(selectedFile);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.error('Error selecting document:', err);
      }
    }
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('tokenID', String(tokenID));
    formData.append('documentType', 'Final Document');

    if (challanFile) {
      formData.append('challan', {
        uri: challanFile.uri,
        type: challanFile.type,
        name: challanFile.name,
      });
    }

    if (mainDocFile) {
      formData.append('mainDocument', {
        uri: mainDocFile.uri,
        type: mainDocFile.type,
        name: mainDocFile.name,
      });
    }

    if (index2File) {
      formData.append('index2', {
        uri: index2File.uri,
        type: index2File.type,
        name: index2File.name,
      });
    }

    if (policeVerificationFile) {
      formData.append('policeVerification', {
        uri: policeVerificationFile.uri,
        type: policeVerificationFile.type,
        name: policeVerificationFile.name,
      });
    }

    try {
      const response = await axiosInstance.post(
        `${config.TOKENS_URL}/upload-file`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.status === 200) {
        Alert.alert('Documents uploaded successfully');
        navigation.navigate('DashboardMain');
      }
    } catch (error) {
      console.error('Error uploading documents:', error);
      Alert.alert('Document upload failed');
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>Document Check</Title>

        <Button
          mode="outlined"
          onPress={() => handleDocumentPick(setChallanFile, 'Challan Document')}
          style={styles.uploadButton}>
          {challanFile ? 'Change Challan Document' : 'Upload Challan Document'}
        </Button>
        {challanFile && <Text style={styles.fileName}>{challanFile.name}</Text>}

        <Button
          mode="outlined"
          onPress={() => handleDocumentPick(setMainDocFile, 'Main Document')}
          style={styles.uploadButton}>
          {mainDocFile ? 'Change Main Document' : 'Upload Main Document'}
        </Button>
        {mainDocFile && <Text style={styles.fileName}>{mainDocFile.name}</Text>}

        <Button
          mode="outlined"
          onPress={() => handleDocumentPick(setIndex2File, 'Index 2 Document')}
          style={styles.uploadButton}>
          {index2File ? 'Change Index 2 Document' : 'Upload Index 2 Document'}
        </Button>
        {index2File && <Text style={styles.fileName}>{index2File.name}</Text>}

        <Button
          mode="outlined"
          onPress={() =>
            handleDocumentPick(
              setPoliceVerificationFile,
              'Police Verification (Optional)',
            )
          }
          style={styles.uploadButton}>
          {policeVerificationFile
            ? 'Change Police Verification (Optional)'
            : 'Upload Police Verification (Optional)'}
        </Button>
        {policeVerificationFile && (
          <Text style={styles.fileName}>{policeVerificationFile.name}</Text>
        )}

        <Button
          mode="contained"
          onPress={handleFileUpload}
          style={styles.submitButton}>
          Submit Documents
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
