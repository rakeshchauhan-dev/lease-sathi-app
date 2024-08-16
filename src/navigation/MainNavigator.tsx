import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../screens/Dashboard';
import NewCustomerPage from '../screens/customer/NewCustomerPage.tsx';
import CustomerDetailsPage from '../screens/customer/CustomerDetailsPage.tsx';
import RescheduleAppointment from '../screens/appointment/RescheduleAppointmentPage.tsx';
import EnquiryDetailsPage from '../screens/enquiry/EnquiryDetailsPage.tsx';
import EnquiryPage from '../screens/enquiry/EnquiryPage.tsx';
import AddAppointmentPage from '../screens/appointment/AddAppointmentPage.tsx';
import CreateDraft from '../screens/CreateDraft';
import AddEnquiryPage from '../screens/enquiry/AddEnquiryPage.tsx';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Create a stack navigator for the Dashboard tab
const DashboardStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DashboardMain" component={Dashboard} options={{ headerShown: false }} />
      <Stack.Screen name="NewCustomerPage" component={NewCustomerPage} options={{ title: 'New Customer' }} />
      <Stack.Screen name="CustomerDetailsPage" component={CustomerDetailsPage} options={{ title: 'Customer Details' }} />
      <Stack.Screen name="AddAppointmentPage" component={AddAppointmentPage} options={{ title: 'Add Appointment' }} />
      <Stack.Screen name="RescheduleAppointment" component={RescheduleAppointment} options={{ title: 'Reschedule Appointment' }} />
    </Stack.Navigator>
  );
};


// Create a stack navigator for the Enquiry tab
const EnquiryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="EnquiryPage" component={EnquiryPage} options={{ headerShown: false }} />
      <Stack.Screen name="AddEnquiryPage" component={AddEnquiryPage} options={{ title: 'Add Enquiry' }} />
      <Stack.Screen name="EnquiryDetailsPage" component={EnquiryDetailsPage} options={{ title: 'Enquiry Details' }} />
      <Stack.Screen name="CreateDraft" component={CreateDraft} options={{ title: 'Create Draft' }} />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Dashboard') {
              iconName = 'home';
            } else if (route.name === 'Enquiry') {
              iconName = 'search';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          unmountOnBlur: true, // This will reset the stack when switching tabs
        })}
      >
        <Tab.Screen name="Dashboard" component={DashboardStack} />
        <Tab.Screen name="Enquiry" component={EnquiryStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
