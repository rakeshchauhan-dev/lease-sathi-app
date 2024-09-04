import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { Card, TextInput, Button, Title, Paragraph, Checkbox, RadioButton } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface AddAppointmentFormProps {
    tokenID: number;
    setCurrentForm: (form: string) => void;
  }

  const AddAppointmentForm: React.FC<AddAppointmentFormProps> = ({ 
    tokenID, 
    setCurrentForm,
 }) => {    
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(undefined);
  const [appointmentTime, setAppointmentTime] = useState<Date | undefined>(undefined);
  const [employeeId, setEmployeeId] = useState('');
  const [address, setAddress] = useState('');
  const [useSameAddress, setUseSameAddress] = useState(true);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const [isAdditionalAppointmentVisible, setAdditionalAppointmentVisibility] = useState(false);
  const [additionalAppointmentDate, setAdditionalAppointmentDate] = useState<Date | undefined>(undefined);
  const [additionalAppointmentTime, setAdditionalAppointmentTime] = useState<Date | undefined>(undefined);
  const [additionalEmployeeId, setAdditionalEmployeeId] = useState('');
  const [additionalAddress, setAdditionalAddress] = useState('');
  const [selectedRole, setSelectedRole] = useState('Tenant');

  // Separate date and time pickers for normal and additional appointments
  const [isAdditionalDatePickerVisible, setAdditionalDatePickerVisibility] = useState(false);
  const [isAdditionalTimePickerVisible, setAdditionalTimePickerVisibility] = useState(false);

  // Handlers for normal appointment date/time
  const handleConfirmDate = (date: Date) => {
    setAppointmentDate(date);
    setDatePickerVisibility(false);
  };

  const handleConfirmTime = (time: Date) => {
    setAppointmentTime(time);
    setTimePickerVisibility(false);
  };

  // Handlers for additional appointment date/time
  const handleConfirmAdditionalDate = (date: Date) => {
    setAdditionalAppointmentDate(date);
    setAdditionalDatePickerVisibility(false);
  };

  const handleConfirmAdditionalTime = (time: Date) => {
    setAdditionalAppointmentTime(time);
    setAdditionalTimePickerVisibility(false);
  };


  

  const handleSubmit = () => {
    const newAppointment = {
      token_id: tokenID, // Use the passed tokenID
      appointment_date: appointmentDate ? appointmentDate.toISOString().split('T')[0] : undefined,
      appointment_time: appointmentTime ? appointmentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined,
      employee_id: employeeId,
      use_same_address: useSameAddress,
      address: useSameAddress ? address : additionalAddress,
      role: selectedRole,
      is_additional_appointment_visible: isAdditionalAppointmentVisible,
      additional_appointment_date: isAdditionalAppointmentVisible && additionalAppointmentDate
        ? additionalAppointmentDate.toISOString().split('T')[0]
        : undefined,
      additional_appointment_time: isAdditionalAppointmentVisible && additionalAppointmentTime
        ? additionalAppointmentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : undefined,
      additional_employee_id: isAdditionalAppointmentVisible ? additionalEmployeeId : undefined,
      additional_address: isAdditionalAppointmentVisible ? additionalAddress : undefined,
    };
  
    console.log('Appointment Request Body:', newAppointment);
    // Add your submit logic here, e.g., sending data to a backend or updating state
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Add Appointment</Title>
          <Paragraph style={styles.subtitle}>Please fill in the details below:</Paragraph>

          {/* Normal appointment date and time */}
          <Button onPress={() => setDatePickerVisibility(true)} mode="outlined" style={styles.inputCompact}>
            Select Appointment Date
          </Button>
          <TextInput
            label="Appointment Date"
            value={appointmentDate ? appointmentDate.toDateString() : ''}
            editable={false}
            mode="outlined"
            style={styles.inputCompact}
          />
          <Button onPress={() => setTimePickerVisibility(true)} mode="outlined" style={styles.inputCompact}>
            Select Appointment Time
          </Button>
          <TextInput
            label="Appointment Time"
            value={appointmentTime ? appointmentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
            editable={false}
            mode="outlined"
            style={styles.inputCompact}
          />
          <TextInput
            label="Employee ID"
            value={employeeId}
            onChangeText={setEmployeeId}
            mode="outlined"
            style={styles.inputCompact}
            placeholder="Enter employee ID"
          />

          <Checkbox.Item
            label="Use Same Address"
            status={useSameAddress ? 'checked' : 'unchecked'}
            onPress={() => setUseSameAddress(!useSameAddress)}
          />
          {!useSameAddress && (
            <TextInput
              label="Address"
              value={address}
              onChangeText={setAddress}
              mode="outlined"
              style={styles.inputCompact}
              placeholder="Enter address"
            />
          )}

          {/* Divider line to separate normal and additional sections */}
          <View style={styles.divider} />

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

              {/* Additional appointment date and time */}
              <Button onPress={() => setAdditionalDatePickerVisibility(true)} mode="outlined" style={styles.inputCompact}>
                Select Additional Appointment Date
              </Button>
              <TextInput
                label="Additional Appointment Date"
                value={additionalAppointmentDate ? additionalAppointmentDate.toDateString() : ''}
                editable={false}
                mode="outlined"
                style={styles.inputCompact}
              />
              <Button onPress={() => setAdditionalTimePickerVisibility(true)} mode="outlined" style={styles.inputCompact}>
                Select Additional Appointment Time
              </Button>
              <TextInput
                label="Additional Appointment Time"
                value={additionalAppointmentTime ? additionalAppointmentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                editable={false}
                mode="outlined"
                style={styles.inputCompact}
              />
              <TextInput
                label="Additional Employee ID"
                value={additionalEmployeeId}
                onChangeText={setAdditionalEmployeeId}
                mode="outlined"
                style={styles.inputCompact}
                placeholder="Enter additional employee ID"
              />
              <TextInput
                label="Additional Address"
                value={additionalAddress}
                onChangeText={setAdditionalAddress}
                mode="outlined"
                style={styles.inputCompact}
                placeholder="Enter additional address"
              />
            </>
          )}

          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.buttonCompact}
            contentStyle={styles.buttonContentCompact}
          >
            Save Appointment
          </Button>
        </Card.Content>
      </Card>

      {/* DateTimePickers for normal appointment */}
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

      {/* DateTimePickers for additional appointment */}
      <DateTimePickerModal
        isVisible={isAdditionalDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmAdditionalDate}
        onCancel={() => setAdditionalDatePickerVisibility(false)}
      />
      <DateTimePickerModal
        isVisible={isAdditionalTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmAdditionalTime}
        onCancel={() => setAdditionalTimePickerVisibility(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 12,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginVertical: 10,
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    marginBottom: 4,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666',
    textAlign: 'center',
  },
  inputCompact: {
    marginBottom: 8,
    backgroundColor: '#fff',
    height: 40,
  },
  buttonCompact: {
    marginTop: 12,
    borderRadius: 6,
  },
  buttonContentCompact: {
    paddingVertical: 6,
  },
  sectionTitle: {
    fontSize: 16,
    marginVertical: 8,
    color: '#333',
  },
  radioGroup: {
    marginBottom: 12,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 12,
  },
});

export default AddAppointmentForm;
