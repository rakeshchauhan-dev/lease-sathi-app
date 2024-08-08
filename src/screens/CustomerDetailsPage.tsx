import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, TextInput, Button, useTheme } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface Customer {
  id: number;
  name: string;
  mobile: string;
  address: string;
  appointmentDate: string;
  reason: string;
  status: string;
}

const customers: Customer[] = [
  { id: 1, name: 'John Doe', mobile: '1234567890', address: '123 Main St', appointmentDate: '2024-08-10', reason: 'Consultation', status: 'Pending' },
  { id: 2, name: 'Jane Smith', mobile: '0987654321', address: '456 Elm St', appointmentDate: '2024-08-12', reason: 'Follow-up', status: 'Confirmed' },
  { id: 3, name: 'Sam Johnson', mobile: '5555555555', address: '789 Oak St', appointmentDate: '2024-08-15', reason: 'Routine Check', status: 'Cancelled' }
];

const CustomerDetailsPage = () => {
  const route = useRoute();
  const { id } = route.params as { id: number };
  const customer = customers.find(c => c.id === id);

  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(undefined);
  const [appointmentStartTime, setAppointmentStartTime] = useState<Date | undefined>(undefined);
  const [employeeId, setEmployeeId] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const theme = useTheme();

  const handleConfirmDate = (date: Date) => {
    setAppointmentDate(date);
    setDatePickerVisibility(false);
  };

  const handleConfirmTime = (time: Date) => {
    setAppointmentStartTime(time);
    setTimePickerVisibility(false);
  };

  const calculateEndTime = (startTime: Date) => {
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + 30);
    return endTime;
  };

  if (!customer) {
    return (
      <View style={styles.container}>
        <Title>Customer not found</Title>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Customer Details</Title>
          <Paragraph>Name: {customer.name}</Paragraph>
          <Paragraph>Mobile: {customer.mobile}</Paragraph>
          <Paragraph>Address: {customer.address}</Paragraph>
          <Paragraph>Appointment Date: {customer.appointmentDate}</Paragraph>
          <Paragraph>Reason: {customer.reason}</Paragraph>
          <Paragraph>Status: {customer.status}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Set Appointment Details</Title>
          <Button onPress={() => setDatePickerVisibility(true)} mode="outlined" style={styles.input}>
            Select Appointment Date
          </Button>
          <TextInput
            label="Appointment Date"
            value={appointmentDate ? appointmentDate.toDateString() : ''}
            editable={false}
            mode="outlined"
            style={styles.input}
          />
          <Button onPress={() => setTimePickerVisibility(true)} mode="outlined" style={styles.input}>
            Select Start Time
          </Button>
          <TextInput
            label="Start Time"
            value={appointmentStartTime ? appointmentStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
            editable={false}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="End Time"
            value={appointmentStartTime ? calculateEndTime(appointmentStartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
            editable={false}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Employee ID"
            value={employeeId}
            onChangeText={setEmployeeId}
            mode="outlined"
            style={styles.input}
          />
          <Button mode="contained" onPress={() => console.log({ appointmentDate, appointmentStartTime, employeeId })}>
            Set Appointment
          </Button>
        </Card.Content>
      </Card>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={() => setDatePickerVisibility(false)}
      />

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={() => setTimePickerVisibility(false)}
      />
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
    marginVertical: 10,
  },
  input: {
    marginBottom: 16,
  },
});

export default CustomerDetailsPage;
