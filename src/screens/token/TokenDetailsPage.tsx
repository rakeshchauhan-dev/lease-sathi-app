import React, {useState, useEffect} from 'react';
import {ScrollView, Text, ActivityIndicator} from 'react-native';
import axiosInstance from '../../axiosInstance';
import config from '../../config';
import TokenInfo from './TokenInfo';
import AwaitingFeedbackForm from './AwaitingFeedbackForm';
import ChallanPaymentForm from './ChallanPaymentForm';
import UploadRevisedDraftForm from './UploadRevisedDraftForm';
import AddAppointmentForm from './AddAppointmentForm';
import DocToBeSubmittedForm from './DocToBeSubmittedForm';
import DocumentToBeCheckedForm from './DocumentToBeCheckedForm';
import {useRoute} from '@react-navigation/native'; // Import useRoute

interface Token {
  token_id: number;
  token_no: string;
  status: string;
  created_at: string;
  updated_at: string;
  customer_id: number;
  customer_name: string;
  customer_mobile: string;
}

interface DocumentFile {
  uri: string;
  type: string;
  name: string;
}

const TokenDetailsPage = () => {
  const route = useRoute(); // Using useRoute to get the route params
  const {token_id} = route.params as {token_id: number}; // Extract token_id from route params

  const [token, setToken] = useState<Token | null>(null);
  const [currentForm, setCurrentForm] = useState<string>(''); // State to track the current form
  const [amount, setAmount] = useState('');
  const [governmentFee, setGovernmentFee] = useState('');
  const [draftFile, setDraftFile] = useState<DocumentFile | null>(null); // State for handling the draft document

  // New states for different document types
  const [challanFile, setChallanFile] = useState<DocumentFile | null>(null);
  const [mainDocFile, setMainDocFile] = useState<DocumentFile | null>(null);
  const [index2File, setIndex2File] = useState<DocumentFile | null>(null);
  const [policeVerificationFile, setPoliceVerificationFile] =
    useState<DocumentFile | null>(null); // Optional

  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchTokenDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `${config.TOKENS_URL}/${token_id}`,
        );
        setToken(response.data);
        setCurrentForm(response.data.status); // Set initial form based on token status
      } catch (error) {
        console.error('Error fetching token details:', error);
        // Optionally set an error state here to inform the user
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchTokenDetails();
  }, [token_id]);

  const renderFormByStatus = () => {
    if (!token) {
      return null;
    }

    switch (currentForm) {
      case 'Awaiting Feedback':
        return (
          <AwaitingFeedbackForm
            tokenID={token.token_id}
            setCurrentForm={setCurrentForm}
          />
        );
      case 'Under Revision':
        return (
          <UploadRevisedDraftForm
            draftFile={draftFile}
            setDraftFile={setDraftFile}
            tokenID={token.token_id}
            setCurrentForm={setCurrentForm}
          />
        );
      case 'Schedule Appointment':
        return (
          <AddAppointmentForm
            tokenID={token.token_id}
            setCurrentForm={setCurrentForm}
          />
        );
      case 'Challan to be Paid':
        return (
          <ChallanPaymentForm
            tokenID={token.token_id}
            amount={amount}
            governmentFee={governmentFee}
            setAmount={setAmount}
            setGovernmentFee={setGovernmentFee}
            setCurrentForm={setCurrentForm}
          />
        );
      case 'Doc to be submitted':
        return (
          <DocToBeSubmittedForm
            tokenID={token.token_id}
            setCurrentForm={setCurrentForm}
          />
        );
      case 'Doc to be checked':
        return (
          <DocumentToBeCheckedForm
            tokenID={token.token_id}
            challanFile={challanFile} // Pass challan file state
            setChallanFile={setChallanFile}
            mainDocFile={mainDocFile} // Pass main document file state
            setMainDocFile={setMainDocFile}
            index2File={index2File} // Pass Index 2 file state
            setIndex2File={setIndex2File}
            policeVerificationFile={policeVerificationFile} // Optional police verification
            setPoliceVerificationFile={setPoliceVerificationFile}
            setCurrentForm={setCurrentForm}
          />
        );
      default:
        return <Text>No specific form for this status.</Text>;
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Show a loading spinner
  }

  if (!token) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView>
      <TokenInfo token={token} />
      {renderFormByStatus()}
    </ScrollView>
  );
};

export default TokenDetailsPage;
