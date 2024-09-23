import React, { useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import axiosInstance from '../../axiosInstance';
import config from '../../config';
import AppointmentInfo from './AppointmentInfo';
import RescheduleAppointmentForm from './RescheduleAppointmentForm';
import UploadProofForm from './UploadProofForm';

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

const AppointmentDetailsPage = () => {
  const route = useRoute();
  const { appointment_id } = route.params as { appointment_id: number };
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [currentForm, setCurrentForm] = useState<string>('Appointment Details');

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

  const renderFormByStatus = () => {
    if (!appointment) return null;

    if (currentForm === 'Reschedule Appointment') {
      return (
        <RescheduleAppointmentForm
          appointmentID={appointment.id}
          tokenID={appointment.token_id}
          setCurrentForm={setCurrentForm}
        />
      );
    }

    return (
      <UploadProofForm
        tokenID={appointment.token_id}
        appointmentID={appointment.id}
        setCurrentForm={setCurrentForm}
      />
    );
  };

  if (!appointment) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView>
      <AppointmentInfo appointment={appointment} />
      {renderFormByStatus()}
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
