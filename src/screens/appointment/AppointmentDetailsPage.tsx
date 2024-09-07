import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Alert } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../../axiosInstance';
import config from '../../config';
import AppointmentInfo from './AppointmentInfo'; // Component to display appointment information
import RescheduleAppointmentForm from './RescheduleAppointmentForm'; // Form for rescheduling the appointment
import UploadProofForm from './UploadProofForm'; // Import the new UploadProofForm

interface Appointment {
  id: number;
  token_id: number;
  appointment_date: string;
  appointment_time: string;
  employee_id: number;
  address_id: number;
  role: string;
  customer_name: string;
  appointment_address: string;
  created_at: string;
  updated_at: string;
}

interface AppointmentDetailsPageProps {
  route: {
    params: {
      appointment_id: number;
    };
  };
}

const AppointmentDetailsPage: React.FC<AppointmentDetailsPageProps> = ({ route }) => {
  const { appointment_id } = route.params;
  const navigation = useNavigation();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [currentForm, setCurrentForm] = useState<string>('Appointment Details');
  const [proofFile, setProofFile] = useState<any>(null);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await axiosInstance.get(`${config.APPOINTMENTS_URL}/${appointment_id}`);
        setAppointment(response.data);
      } catch (error) {
        console.error('Error fetching appointment details:', error);
      }
    };

    fetchAppointmentDetails();
  }, [appointment_id]);

  const handleProofUploadSubmit = async () => {
    try {
      Alert.alert('Success', 'Proof uploaded successfully!');
      navigation.navigate('AppointmentDashboard'); // Navigate back to the Appointment Dashboard
    } catch (error) {
      console.error('Error uploading proof:', error);
      Alert.alert('Error', 'Failed to upload proof. Please try again.');
    }
  };

  const renderFormByStatus = () => {
    if (!appointment) return null;

    // Show Reschedule form if currentForm is 'Reschedule Appointment'
    if (currentForm === 'Reschedule Appointment') {
      return (
        <RescheduleAppointmentForm
          appointmentID={appointment.id}
          tokenID={appointment.token_id}
          setCurrentForm={setCurrentForm}
        />
      );
    }

    // Show UploadProofForm otherwise
    return (
      <>
        <UploadProofForm
          proofFile={proofFile}
          setProofFile={setProofFile}
          tokenID={appointment.token_id}
          setCurrentForm={setCurrentForm}
        />
        {proofFile && (
          <Button
            mode="contained"
            onPress={handleProofUploadSubmit}
            style={{ marginTop: 10 }}
          >
            Submit Proof
          </Button>
        )}
      </>
    );
  };

  if (!appointment) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView>
      {/* Display Appointment Information */}
      <AppointmentInfo appointment={appointment} />

      {/* Render either Reschedule Form or Upload Proof Form */}
      {renderFormByStatus()}

      {/* Card for Reschedule Appointment Button */}
      {currentForm !== 'Reschedule Appointment' && (
        <Card style={{ margin: 20 }}>
          <Card.Content>
            <Button
              mode="outlined"
              onPress={() => setCurrentForm('Reschedule Appointment')}
              style={{ marginTop: 10 }}
            >
              Reschedule Appointment
            </Button>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
};

export default AppointmentDetailsPage;
