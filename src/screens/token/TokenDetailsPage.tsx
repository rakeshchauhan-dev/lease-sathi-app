import React, { useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import axiosInstance from '../../axiosInstance';
import config from '../../config';
import TokenInfo from './TokenInfo'; // Token info component
import DocumentSubmission from './DocumentSubmission'; // Form component for document submission
import AwaitingFeedbackForm from './AwaitingFeedbackForm'; // Form component for awaiting feedback
import ChallanPaymentForm from './ChallanPaymentForm'; // Form component for challan payment

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
  const [draftFile, setDraftFile] = useState<any>(null);

  useEffect(() => {
    const fetchTokenDetails = async () => {
      try {
        const response = await axiosInstance.get(`${config.TOKENS_URL}/${token_id}`);
        setToken(response.data);
      } catch (error) {
        console.error('Error fetching token details:', error);
      }
    };

    fetchTokenDetails();
  }, [token_id]);

  const handleSubmit = () => {
    console.log('Submitting form for token', token);
  };

  const handleDocumentPick = async () => {
    // Handle document picking logic
  };

  if (!token) {
    return <Text>Loading...</Text>;
  }

  const renderFormByStatus = () => {
    switch (token.status) {
      case 'Doc to be submitted':
        return (
          <DocumentSubmission
            draftFile={draftFile}
            handleDocumentPick={handleDocumentPick}
            handleSubmit={handleSubmit}
          />
        );
      case 'Awaiting Feedback':
        return (
          <AwaitingFeedbackForm
            comment=""
            setComment={() => {}}
            handleSubmit={handleSubmit}
          />
        );
      case 'Challan to be Paid':
        return (
          <ChallanPaymentForm
            amount=""
            governmentFee=""
            setAmount={() => {}}
            setGovernmentFee={() => {}}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return <Text>No specific form for this status.</Text>;
    }
  };

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
