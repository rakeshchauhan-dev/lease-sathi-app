import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Alert } from 'react-native';
import axiosInstance from '../../axiosInstance';
import config from '../../config';
import TokenInfo from './TokenInfo';
import AwaitingFeedbackForm from './AwaitingFeedbackForm';
import ChallanPaymentForm from './ChallanPaymentForm';
import UploadRevisedDraftForm from './UploadRevisedDraftForm';

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

const TokenDetailsPage = ({ route }: any) => {
  const { token_id } = route.params;
  const [token, setToken] = useState<Token | null>(null);
  const [currentForm, setCurrentForm] = useState<string>(''); // State to track the current form
  const [draftFile, setDraftFile] = useState<any>(null);

  useEffect(() => {
    const fetchTokenDetails = async () => {
      try {
        const response = await axiosInstance.get(`${config.TOKENS_URL}/${token_id}`);
        setToken(response.data);
        setCurrentForm(response.data.status); // Set initial form based on token status
        console.log('Initial form set to:', response.data.status); // Debug: Log the initial form
      } catch (error) {
        console.error('Error fetching token details:', error);
      }
    };

    fetchTokenDetails();
  }, [token_id]);

  const handleApprove = () => {
    Alert.alert('Approved');
    setCurrentForm('Challan to be Paid'); // Switch to ChallanPaymentForm after approval
  };

  const renderFormByStatus = () => {
    console.log('Rendering form:', currentForm); // Debug: Log the current form
    switch (currentForm) {
      case 'Awaiting Feedback':
        return (
          <AwaitingFeedbackForm
            tokenID={token?.token_id || 0} // Pass tokenID
            setCurrentForm={setCurrentForm}
            handleApprove={handleApprove}
          />
        );
      case 'Under Revision':
        return (
          token && (
            <UploadRevisedDraftForm
              draftFile={draftFile}
              setDraftFile={setDraftFile}
              handleSubmit={() => {}} // No longer needed
              tokenID={token.token_id}
              setCurrentForm={setCurrentForm}
            />
          )
        );
      case 'Challan to be Paid':
        return (
          <ChallanPaymentForm
            amount=""
            governmentFee=""
            setAmount={() => {}}
            setGovernmentFee={() => {}}
            handleSubmit={() => Alert.alert('Payment submitted successfully')}
          />
        );
      default:
        return <Text>No specific form for this status.</Text>;
    }
  };

  if (!token) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView>
      {/* Token Information Section */}
      <TokenInfo token={token} />

      {/* Render appropriate form based on token status */}
      {renderFormByStatus()}
    </ScrollView>
  );
};

export default TokenDetailsPage;
