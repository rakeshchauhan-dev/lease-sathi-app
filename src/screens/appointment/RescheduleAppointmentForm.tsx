import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Card, TextInput, Button, Paragraph, Checkbox } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axiosInstance from '../../axiosInstance';
import config from '../../config';

interface Employee {
  id: string;
  name: string;
}

interface RescheduleAppointmentFormProps {
  appointmentID: number;
  tokenID: number;
  setCurrentForm: (form: string) => void;
}

const RescheduleAppointmentForm: React.FC<RescheduleAppointmentFormProps> = ({ appointmentID, tokenID, setCurrentForm }) => {
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(undefined);
  const [appointmentTime, setAppointmentTime] = useState<Date | undefined>(undefined);
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [isEmployeeListVisible, setEmployeeListVisible] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

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

  const handleSubmit = async () => {
    if (!appointmentDate || !appointmentTime || !employeeId) {
      Alert.alert('Error', 'Please fill in all the required fields');
      return;
    }

        // Format the date as an ISO 8601 string (YYYY-MM-DDTHH:MM:SSZ)
    const formattedAppointmentDate = appointmentDate.toISOString(); 

    // Format the time as HH:MM in 24-hour format
    const formattedAppointmentTime = appointmentTime.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    });

  
    const rescheduledAppointment = {
      appointment_id: appointmentID, // Use the passed appointment ID
      token_id: tokenID, // Use the passed token ID
      new_date: formattedAppointmentDate, // ISO string for appointment date
      new_time: formattedAppointmentTime,
      new_employee_id: employeeId,
    };
    
  
    try {
      const response = await axiosInstance.post(`${config.APPOINTMENTS_URL}/reschedule`, rescheduledAppointment);
      if (response.status === 200) {
        Alert.alert('Success', 'Appointment rescheduled successfully!');
        setCurrentForm(''); // Navigate back or clear the form
      } else {
        throw new Error('Failed to reschedule appointment');
      }
    } catch (error) {
      console.error('Error rescheduling appointment:', error);
      Alert.alert('Error', 'Failed to reschedule appointment. Please try again.');
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Paragraph style={styles.subtitle}>Reschedule Appointment</Paragraph>

          {/* Reschedule appointment date and time */}
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

          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.buttonCompact}
            contentStyle={styles.buttonContentCompact}
          >
            Reschedule Appointment
          </Button>
        </Card.Content>
      </Card>

      {/* DateTimePickers */}
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

export default RescheduleAppointmentForm;
