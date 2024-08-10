import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../screens/Dashboard';
import CustomerDetailsPage from '../screens/CustomerDetailsPage';
import NewCustomerPage from '../screens/NewCustomerPage';
import EditAppointmentPage from '../screens/EditAppointmentPage';
import LoginScreen from '../screens/LoginScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Login screen without logo or search button */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,  // Alternatively, you can hide the entire header on the login screen
          }}
        />

        {/* Screens with logo and search button */}
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerLeft: () => (
              <Image
                source={require('../assets/logo.png')}  // Replace with your logo path
                style={{ width: 40, height: 40, marginLeft: 10 }}
                resizeMode="contain"
              />
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => console.log('Search button pressed')}>
                <Ionicons
                  name="search"
                  size={24}
                  color="black"
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
            ),
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen
          name="CustomerDetails"
          component={CustomerDetailsPage}
          options={{
            headerLeft: () => (
              <Image
                source={require('../assets/logo.png')}
                style={{ width: 40, height: 40, marginLeft: 10 }}
                resizeMode="contain"
              />
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => console.log('Search button pressed')}>
                <Ionicons
                  name="search"
                  size={24}
                  color="black"
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
            ),
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen
          name="NewCustomer"
          component={NewCustomerPage}
          options={{
            headerLeft: () => (
              <Image
                source={require('../assets/logo.png')}
                style={{ width: 40, height: 40, marginLeft: 10 }}
                resizeMode="contain"
              />
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => console.log('Search button pressed')}>
                <Ionicons
                  name="search"
                  size={24}
                  color="black"
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
            ),
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen
          name="EditAppointment"
          component={EditAppointmentPage}
          options={{
            headerLeft: () => (
              <Image
                source={require('../assets/logo.png')}
                style={{ width: 40, height: 40, marginLeft: 10 }}
                resizeMode="contain"
              />
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => console.log('Search button pressed')}>
                <Ionicons
                  name="search"
                  size={24}
                  color="black"
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
            ),
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
