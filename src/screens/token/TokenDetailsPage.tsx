import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Alert } from 'react-native';
import axiosInstance from '../../axiosInstance';
import config from '../../config';
import TokenInfo from './TokenInfo';
import AwaitingFeedbackForm from './AwaitingFeedbackForm';
import ChallanPaymentForm from './ChallanPaymentForm';
import UploadRevisedDraftForm from './UploadRevisedDraftForm';
import AddAppointmentForm from './AddAppointmentForm'; // Import the new form

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

  useEffect(() => {
    const fetchTokenDetails = async () => {
      try {
        const response = await axiosInstance.get(`${config.TOKENS_URL}/${token_id}`);
        setToken(response.data);
        setCurrentForm(response.data.status); // Set initial form based on token status
      } catch (error) {
        console.error('Error fetching token details:', error);
      }
    };

    fetchTokenDetails();
  }, [token_id]);

  const renderFormByStatus = () => {
    switch (currentForm) {
      case 'Awaiting Feedback':
        return (
          <AwaitingFeedbackForm
            tokenID={token?.token_id || 0}
            setCurrentForm={setCurrentForm}
          />
        );
      case 'Under Revision':
        return (
          token && (
            <UploadRevisedDraftForm
              draftFile={null}
              setDraftFile={() => {}}
              handleSubmit={() => {}}
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
      case 'Appointment':
        return (
          <AddAppointmentForm
          tokenID={token?.token_id || 0}
          setCurrentForm={setCurrentForm}
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
      <TokenInfo token={token} />
      {renderFormByStatus()}
    </ScrollView>
  );
};

export default TokenDetailsPage;
