import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, TextInput, Button, Title, Paragraph, Checkbox } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const NewCustomerPage = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

  const [appointmentEnabled, setAppointmentEnabled] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(undefined);
  const [appointmentTime, setAppointmentTime] = useState<Date | undefined>(undefined);
  const [employeeId, setEmployeeId] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const handleSubmit = () => {
    const newCustomer = { name, mobile, address, email, appointmentEnabled, appointmentDate, appointmentTime, employeeId };
    console.log('New Customer:', newCustomer);
    // Add your submit logic here, e.g., sending data to a backend or updating state
  };

  const handleConfirmDate = (date: Date) => {
    setAppointmentDate(date);
    setDatePickerVisibility(false);
  };

  const handleConfirmTime = (time: Date) => {
    setAppointmentTime(time);
    setTimePickerVisibility(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Add New Customer</Title>
          <Paragraph style={styles.subtitle}>Please fill in the details below:</Paragraph>
          <TextInput
            label="Name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
            placeholder="Enter customer name"
          />
          <TextInput
            label="Mobile No"
            value={mobile}
            onChangeText={setMobile}
            mode="outlined"
            style={styles.input}
            keyboardType="phone-pad"
            placeholder="Enter mobile number"
          />
          <TextInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            placeholder="Enter email address"
          />
          <TextInput
            label="Address"
            value={address}
            onChangeText={setAddress}
            mode="outlined"
            style={styles.input}
            multiline
            numberOfLines={3}
            placeholder="Enter customer address"
          />

          <View style={styles.checkboxContainer}>
            <Checkbox
              status={appointmentEnabled ? 'checked' : 'unchecked'}
              onPress={() => setAppointmentEnabled(!appointmentEnabled)}
            />
            <Paragraph>Set Appointment Details</Paragraph>
          </View>

          {appointmentEnabled && (
            <>
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
            </>
          )}

          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Add Customer
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

export default NewCustomerPage;
