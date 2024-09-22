import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Alert } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import axiosInstance from '../../axiosInstance';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import config from '../../config';

interface CreateTokenFormProps {
  customerID: number;
}

const CreateTokenForm: React.FC<CreateTokenFormProps> = ({ customerID }) => {
  const [tokenNo, setTokenNo] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<any>(); // Typed useNavigation
  const [file, setFile] = useState<DocumentPickerResponse | null>(null); // Single file state

  const handleCreateToken = async () => {
    if (!tokenNo || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!file) {
      Alert.alert('Error', 'Please upload a file');
      return;
    }

    const formData = new FormData();
    formData.append('tokenNo', tokenNo);
    formData.append('password', password);
    formData.append('customerID', String(customerID));

    // Ensure the correct field name for the single file
    formData.append('files', {
      uri: file.uri,
      type: file.type,
      name: file.name,
    });

    try {
      const response = await axiosInstance.post(`${config.TOKENS_URL}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Token created successfully!');
        navigation.navigate('CustomerDashboard');  // Assuming your dashboard route is named 'Dashboard'

      }
    } catch (error: any) {
      if (error.response) {
        console.error('Error response:', error.response);
        Alert.alert('Error', error.response.data.message || 'Failed to create token');
      } else if (error.request) {
        console.error('No response from server:', error.request);
        Alert.alert('Error', 'No response from server');
      } else {
        console.error('Error', error.message);
        Alert.alert('Error', error.message || 'Something went wrong');
      }
    }
  };

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles], // Allows all file types
      });
      setFile(result[0]); // Set the first selected file
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker');
      } else {
        console.error('File picker error:', err);
      }
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>Create Token</Title>
        <TextInput
          style={styles.input}
          placeholder="Enter token number"
          value={tokenNo}
          onChangeText={setTokenNo}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button
          mode="outlined"
          onPress={handleFilePick}
          style={styles.button}
        >
          {file ? `Selected File: ${file.name}` : 'Upload File'}
        </Button>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleCreateToken}
            style={styles.button}
          >
            Create Token
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

export default CreateTokenForm;
