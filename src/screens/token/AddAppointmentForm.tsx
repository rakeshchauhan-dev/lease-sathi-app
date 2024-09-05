import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Card, TextInput, Button, Title, Paragraph, Checkbox, RadioButton } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axiosInstance from '../../axiosInstance';
import config from '../../config';

interface Employee {
  id: string;
  name: string;
}

interface AddAppointmentFormProps {
  tokenID: number;
  setCurrentForm: (form: string) => void;
}

const AddAppointmentForm: React.FC<AddAppointmentFormProps> = ({ tokenID, setCurrentForm }) => {
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(undefined);
  const [appointmentTime, setAppointmentTime] = useState<Date | undefined>(undefined);
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [isEmployeeListVisible, setEmployeeListVisible] = useState(false);
  const [address, setAddress] = useState('');
  const [useSameAddress, setUseSameAddress] = useState(true);


  const [isAdditionalAppointmentVisible, setAdditionalAppointmentVisibility] = useState(false);
  const [additionalAppointmentDate, setAdditionalAppointmentDate] = useState<Date | undefined>(undefined);
  const [additionalAppointmentTime, setAdditionalAppointmentTime] = useState<Date | undefined>(undefined);
  const [additionalEmployeeId, setAdditionalEmployeeId] = useState('');
  const [additionalEmployeeName, setAdditionalEmployeeName] = useState(''); // Additional employee name state
  const [filteredAdditionalEmployees, setFilteredAdditionalEmployees] = useState<Employee[]>([]); // Filtered list for additional employees
  const [isAdditionalEmployeeListVisible, setAdditionalEmployeeListVisible] = useState(false);
  const [additionalAddress, setAdditionalAddress] = useState('');
  const [selectedRole, setSelectedRole] = useState('Tenant');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isAdditionalDatePickerVisible, setAdditionalDatePickerVisibility] = useState(false);
  const [isAdditionalTimePickerVisible, setAdditionalTimePickerVisibility] = useState(false);

  // Fetch employee data from the API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axiosInstance.get(`${config.EMPLOYEES_URL}`);
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  // Filter employee list based on the input for the main employee search
  const handleEmployeeSearch = (name: string) => {
    setEmployeeName(name);
    if (name.length >= 2) {
      const filtered = employees.filter((employee) =>
        employee.name.toLowerCase().includes(name.toLowerCase())
      );
      setFilteredEmployees(filtered);
      setEmployeeListVisible(true);
    } else {
      setEmployeeListVisible(false);
    }
  };

    // Filter employee list based on the input for additional employee search
    const handleAdditionalEmployeeSearch = (name: string) => {
      setAdditionalEmployeeName(name);
      if (name.length >= 2) {
        const filtered = employees.filter((employee) =>
          employee.name.toLowerCase().includes(name.toLowerCase())
        );
        setFilteredAdditionalEmployees(filtered);
        setAdditionalEmployeeListVisible(true);
      } else {
        setAdditionalEmployeeListVisible(false);
      }
    };
  
    // Select additional employee
    const handleSelectAdditionalEmployee = (employee: Employee) => {
      setAdditionalEmployeeName(employee.name);
      setAdditionalEmployeeId(employee.id);
      setAdditionalEmployeeListVisible(false); // Hide the suggestions
    };
  

  // Select main employee
  const handleSelectEmployee = (employee: Employee) => {
    setEmployeeName(employee.name);
    setEmployeeId(employee.id);
    setEmployeeListVisible(false); // Hide the suggestions
  };

  // Handlers for appointment date/time
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

  const handleSubmit = async () => {
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
    try {
      const response = await axiosInstance.post(`${config.APPOINTMENTS_URL}`, newAppointment);
      // Assuming success if status is 200
      if (response.status === 200) {
        Alert.alert('Success', 'Appointment saved successfully!');
      } else {
        throw new Error('Failed to save appointment');
      }
    } catch (error) {
      console.error('Error saving appointment:', error);
      Alert.alert('Error', 'Failed to save appointment. Please try again.');
    }
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

          {/* Employee search input */}
          <TextInput
            label="Employee Name"
            value={employeeName}
            onChangeText={handleEmployeeSearch}
            mode="outlined"
            style={styles.inputCompact}
            placeholder="Enter employee name"
          />
          {isEmployeeListVisible && (
            <FlatList
              data={filteredEmployees}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelectEmployee(item)}>
                  <Text style={styles.suggestionItem}>{item.name}</Text>
                </TouchableOpacity>
              )}
              style={styles.suggestionList}
            />
          )}

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

              {/* Additional employee search input */}
              <TextInput
                label="Additional Employee Name"
                value={additionalEmployeeName}
                onChangeText={handleAdditionalEmployeeSearch}
                mode="outlined"
                style={styles.inputCompact}
                placeholder="Enter additional employee name"
              />
              {isAdditionalEmployeeListVisible && (
                <FlatList
                  data={filteredAdditionalEmployees}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleSelectAdditionalEmployee(item)}>
                      <Text style={styles.suggestionItem}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                  style={styles.suggestionList}
                />
              )}

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
  suggestionItem: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  suggestionList: {
    maxHeight: 150, // Limit height so it doesn't expand too much
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});

export default AddAppointmentForm;
