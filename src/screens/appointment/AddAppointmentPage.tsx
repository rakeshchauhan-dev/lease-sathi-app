import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, TextInput, Button, Title, Paragraph, Checkbox, RadioButton, Text } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const AddAppointmentPage = () => {
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(undefined);
  const [appointmentTime, setAppointmentTime] = useState<Date | undefined>(undefined);
  const [employeeId, setEmployeeId] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const [isAdditionalAppointmentVisible, setAdditionalAppointmentVisibility] = useState(false);
  const [additionalAppointmentDate, setAdditionalAppointmentDate] = useState<Date | undefined>(undefined);
  const [additionalAppointmentTime, setAdditionalAppointmentTime] = useState<Date | undefined>(undefined);
  const [additionalEmployeeId, setAdditionalEmployeeId] = useState('');
  const [selectedRole, setSelectedRole] = useState('Tenant');

  const handleConfirmDate = (date: Date) => {
    setAppointmentDate(date);
    setDatePickerVisibility(false);
  };

  const handleConfirmTime = (time: Date) => {
    setAppointmentTime(time);
    setTimePickerVisibility(false);
  };

  const handleConfirmAdditionalDate = (date: Date) => {
    setAdditionalAppointmentDate(date);
    setDatePickerVisibility(false);
  };

  const handleConfirmAdditionalTime = (time: Date) => {
    setAdditionalAppointmentTime(time);
    setTimePickerVisibility(false);
  };

  const handleSubmit = () => {
    const newAppointment = { appointmentDate, appointmentTime, employeeId };
    const additionalAppointment = isAdditionalAppointmentVisible
      ? { additionalAppointmentDate, additionalAppointmentTime, additionalEmployeeId, selectedRole }
      : null;

    console.log('New Appointment:', newAppointment);
    if (additionalAppointment) {
      console.log('Additional Appointment:', additionalAppointment);
    }
    // Add your submit logic here, e.g., sending data to a backend or updating state
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Add Appointment</Title>
          <Paragraph style={styles.subtitle}>Please fill in the details below:</Paragraph>

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
            Select Appointment Time
          </Button>
          <TextInput
            label="Appointment Time"
            value={appointmentTime ? appointmentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
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
            placeholder="Enter employee ID"
          />

          <Checkbox.Item
            label="Add Additional Appointment"
            status={isAdditionalAppointmentVisible ? 'checked' : 'unchecked'}
            onPress={() => setAdditionalAppointmentVisibility(!isAdditionalAppointmentVisible)}
          />

          {isAdditionalAppointmentVisible && (
            <>
              <Paragraph style={styles.sectionTitle}>Additional Appointment Details</Paragraph>

              <View style={styles.radioGroup}>
                <Text>Select Role:</Text>
                <View style={styles.radioButtonContainer}>
                  <RadioButton
                    value="Tenant"
                    status={selectedRole === 'Tenant' ? 'checked' : 'unchecked'}
                    onPress={() => setSelectedRole('Tenant')}
                  />
                  <Text>Tenant</Text>
                  <RadioButton
                    value="Owner"
                    status={selectedRole === 'Owner' ? 'checked' : 'unchecked'}
                    onPress={() => setSelectedRole('Owner')}
                  />
                  <Text>Owner</Text>
                </View>
              </View>

              <Button onPress={() => setDatePickerVisibility(true)} mode="outlined" style={styles.input}>
                Select Additional Appointment Date
              </Button>
              <TextInput
                label="Additional Appointment Date"
                value={additionalAppointmentDate ? additionalAppointmentDate.toDateString() : ''}
                editable={false}
                mode="outlined"
                style={styles.input}
              />
              <Button onPress={() => setTimePickerVisibility(true)} mode="outlined" style={styles.input}>
                Select Additional Appointment Time
              </Button>
              <TextInput
                label="Additional Appointment Time"
                value={additionalAppointmentTime ? additionalAppointmentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                editable={false}
                mode="outlined"
                style={styles.input}
              />
              <TextInput
                label="Additional Employee ID"
                value={additionalEmployeeId}
                onChangeText={setAdditionalEmployeeId}
                mode="outlined"
                style={styles.input}
                placeholder="Enter additional employee ID"
              />
            </>
          )}

          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Save Appointment
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
  sectionTitle: {
    fontSize: 18,
    marginVertical: 12,
    color: '#333',
  },
  radioGroup: {
    marginBottom: 16,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default AddAppointmentPage;
