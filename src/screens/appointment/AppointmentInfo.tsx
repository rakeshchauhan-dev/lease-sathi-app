import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';

interface AppointmentInfoProps {
  appointment: {
    appointment_date: string;
    appointment_time: string;
    customer_name: string;
    appointment_address: string;
    role: string;
  };
}

const AppointmentInfo: React.FC<AppointmentInfoProps> = ({ appointment }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>Appointment Information</Title>
        <View style={styles.infoContainer}>
          <Paragraph style={styles.label}>Customer Name:</Paragraph>
          <Paragraph style={styles.value}>{appointment.customer_name}</Paragraph>
        </View>
        <View style={styles.infoContainer}>
          <Paragraph style={styles.label}>Appointment Address:</Paragraph>
          <Paragraph style={styles.value}>{appointment.appointment_address}</Paragraph>
        </View>
        <View style={styles.infoContainer}>
          <Paragraph style={styles.label}>Role:</Paragraph>
          <Paragraph style={styles.value}>{appointment.role}</Paragraph>
        </View>
        <View style={styles.infoContainer}>
          <Paragraph style={styles.label}>Appointment Date:</Paragraph>
          <Paragraph style={styles.value}>
            {new Date(appointment.appointment_date).toLocaleDateString()}
          </Paragraph>
        </View>
        <View style={styles.infoContainer}>
          <Paragraph style={styles.label}>Appointment Time:</Paragraph>
          <Paragraph style={styles.value}>
            {new Date(appointment.appointment_time).toLocaleTimeString()}
          </Paragraph>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginHorizontal: 10, 
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#777',
  },
});

export default AppointmentInfo;
