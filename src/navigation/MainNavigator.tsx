// src/navigation/MainNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../screens/Dashboard';
import CustomerDetailsPage from '../screens/CustomerDetailsPage';
import NewCustomerPage from '../screens/NewCustomerPage';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="CustomerDetails" component={CustomerDetailsPage} />
        <Stack.Screen name="NewCustomer" component={NewCustomerPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
