import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../screens/Dashboard';
import NewCustomerPage from '../screens/NewCustomerPage';
import CustomerDetailsPage from '../screens/CustomerDetailsPage';
import EditAppointmentPage from '../screens/EditAppointmentPage';
import EnquiryPage from '../screens/EnquiryPage';
import AddEnquiryPage from '../screens/AddEnquiryPage';
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
      <Stack.Screen name="EditAppointmentPage" component={EditAppointmentPage} options={{ title: 'Edit Appointment' }} />
    </Stack.Navigator>
  );
};


// Create a stack navigator for the Enquiry tab
const EnquiryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="EnquiryPage" component={EnquiryPage} options={{ headerShown: false }} />
      <Stack.Screen name="AddEnquiryPage" component={AddEnquiryPage} options={{ title: 'Add Enquiry' }} />
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
        })}
      >
        <Tab.Screen name="Dashboard" component={DashboardStack} />
        <Tab.Screen name="Enquiry" component={EnquiryStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
