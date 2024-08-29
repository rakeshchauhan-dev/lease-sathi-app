import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Dashboard from '../screens/Dashboard';
import NewCustomerPage from '../screens/customer/NewCustomerPage';
import CustomerDetailsPage from '../screens/customer/CustomerDetailsPage';
import RescheduleAppointment from '../screens/appointment/RescheduleAppointmentPage';
import EnquiryDetailsPage from '../screens/enquiry/EnquiryDetailsPage';
import EnquiryPage from '../screens/enquiry/EnquiryPage';
import AddAppointmentPage from '../screens/appointment/AddAppointmentPage';
import CreateDraft from '../screens/CreateDraft';
import AddEnquiryPage from '../screens/enquiry/AddEnquiryPage';
import LoginScreen from '../screens/LoginScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DashboardStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="DashboardMain" component={Dashboard} options={{ headerShown: false }} />
    <Stack.Screen name="NewCustomerPage" component={NewCustomerPage} options={{ title: 'New Customer' }} />
    <Stack.Screen name="CustomerDetailsPage" component={CustomerDetailsPage} options={{ title: 'Customer Details' }} />
    <Stack.Screen name="AddAppointmentPage" component={AddAppointmentPage} options={{ title: 'Add Appointment' }} />
    <Stack.Screen name="RescheduleAppointment" component={RescheduleAppointment} options={{ title: 'Reschedule Appointment' }} />
  </Stack.Navigator>
);

const EnquiryStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="EnquiryPage" component={EnquiryPage} options={{ headerShown: false }} />
    <Stack.Screen name="AddEnquiryPage" component={AddEnquiryPage} options={{ title: 'Add Enquiry' }} />
    <Stack.Screen name="EnquiryDetailsPage" component={EnquiryDetailsPage} options={{ title: 'Enquiry Details' }} />
    <Stack.Screen name="CreateDraft" component={CreateDraft} options={{ title: 'Create Draft' }} />
  </Stack.Navigator>
);

const MainTabNavigator = () => (
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
      unmountOnBlur: true,
    })}
  >
    <Tab.Screen name="Dashboard" component={DashboardStack} />
    <Tab.Screen name="Enquiry" component={EnquiryStack} />
  </Tab.Navigator>
);

const MainNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem('authToken');
      setIsAuthenticated(!!token);
    };
    checkAuthStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? "DashboardMain" : "Login"} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="DashboardMain" component={MainTabNavigator} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default MainNavigator;
