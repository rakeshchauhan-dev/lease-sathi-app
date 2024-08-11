import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';

const CreateDraft = () => {
  const navigation = useNavigation();

  const [tokenNo, setTokenNo] = useState('');
  const [password, setPassword] = useState('');
  const [draft, setDraft] = useState(null);

  const handleUploadDraft = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setDraft(result);
      console.log(result); // Log the selected file details
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the upload');
      } else {
        console.log('Unknown error:', err);
      }
    }
  };

  const handleCreateDraft = () => {
    const newDraft = {
      tokenNo,
      password,
      draft,
    };
    // Handle the creation of the draft (e.g., save to backend)
    console.log(newDraft);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Create Draft</Title>
          <Paragraph style={styles.subtitle}>Please fill in the details below:</Paragraph>
          <TextInput
            label="Token No"
            value={tokenNo}
            onChangeText={setTokenNo}
            mode="outlined"
            style={styles.input}
            placeholder="Enter token number"
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={styles.input}
            placeholder="Enter password"
            secureTextEntry
          />
          <Button
            mode="contained"
            onPress={handleUploadDraft}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Upload Draft
          </Button>
          {draft && (
            <Paragraph style={styles.subtitle}>Selected File: {draft.name}</Paragraph>
          )}
          <Button
            mode="contained"
            onPress={handleCreateDraft}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Submit
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginVertical: 20,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    color: '#666',
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

export default CreateDraft;
