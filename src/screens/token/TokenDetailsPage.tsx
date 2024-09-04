import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Alert } from 'react-native';
import axiosInstance from '../../axiosInstance';
import config from '../../config';
import TokenInfo from './TokenInfo'; // Token info component
import DocumentSubmission from './DocumentSubmission'; // Form component for document submission
import AwaitingFeedbackForm from './AwaitingFeedbackForm'; // Form component for awaiting feedback
import ChallanPaymentForm from './ChallanPaymentForm'; // Form component for challan payment
import UploadRevisedDraftForm from './UploadRevisedDraftForm'; // Form component for uploading revised draft

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
  const [draftFile, setDraftFile] = useState<any>(null); // Correctly defined draftFile state
  const [comment, setComment] = useState<string>('');

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

  const handleSubmitFeedback = async () => {
    if (!comment.trim()) {
      Alert.alert('Feedback comment is required');
      return;
    }

    try {
      await axiosInstance.post(`${config.FEEDBACKS_URL}`, {
        token_id: token?.token_id,
        comment: comment,
      });

      Alert.alert('Feedback submitted successfully');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Alert.alert('Failed to submit feedback');
    }
  };

  const handleSubmitDraft = async () => {
    // Handle submit draft logic
    if (!draftFile) {
      Alert.alert('No draft file selected');
      return;
    }

    Alert.alert('Draft submitted successfully');
  };

  if (!token) {
    return <Text>Loading...</Text>;
  }

  const renderFormByStatus = () => {
    switch (token.status) {
      case 'Awaiting Feedback':
        return (
          <AwaitingFeedbackForm
            comment={comment}
            setComment={setComment}
            handleSubmit={handleSubmitFeedback}
            handleApprove={() => Alert.alert('Approved')}
          />
        );
      case 'Under Revision':
        return (
          <UploadRevisedDraftForm
            draftFile={draftFile}
            setDraftFile={setDraftFile}
            handleSubmit={handleSubmitDraft}
            tokenID={token.token_id} // Pass tokenID dynamically here
          />
        );
      case 'Challan to be Paid':
        return (
          <ChallanPaymentForm
            amount=""
            governmentFee=""
            setAmount={() => {}}
            setGovernmentFee={() => {}}
            handleSubmit={handleSubmitFeedback}
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
