import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, TextInput, Button, Title } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditAppointmentPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  
  const { appointmentDate, appointmentTime, employeeId } = route.params as {
    appointmentDate: string;
    appointmentTime: string;
    employeeId: string;
  };

  const [date, setDate] = useState(new Date(appointmentDate));
  const [time, setTime] = useState(new Date(`${appointmentDate} ${appointmentTime}`));
  const [employee, setEmployee] = useState(employeeId);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const handleConfirmDate = (selectedDate: Date) => {
    setDate(selectedDate);
    setDatePickerVisibility(false);
  };

  const handleConfirmTime = (selectedTime: Date) => {
    setTime(selectedTime);
    setTimePickerVisibility(false);
  };

  const handleSubmit = () => {
    console.log('Updated Appointment:', { date, time, employee });
    // Implement your update logic here
    navigation.goBack(); // Go back to the previous screen
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Edit Appointment Details</Title>
          <Button onPress={() => setDatePickerVisibility(true)} mode="outlined" style={styles.input}>
            Select Appointment Date
          </Button>
          <TextInput
            label="Appointment Date"
            value={date.toDateString()}
            editable={false}
            mode="outlined"
            style={styles.input}
          />
          <Button onPress={() => setTimePickerVisibility(true)} mode="outlined" style={styles.input}>
            Select Appointment Time
          </Button>
          <TextInput
            label="Appointment Time"
            value={time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            editable={false}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Employee ID"
            value={employee}
            onChangeText={setEmployee}
            mode="outlined"
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Save Changes
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

export default EditAppointmentPage;
