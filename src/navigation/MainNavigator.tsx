import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, ActivityIndicator} from 'react-native';

import Dashboard from '../screens/Dashboard';
import AppointmentDashboard from '../screens/AppointmentDashboard';
import NewCustomerPage from '../screens/customer/NewCustomerPage';
import TokenDetailsPage from '../screens/token/TokenDetailsPage';
import EnquiryDetailsPage from '../screens/enquiry/EnquiryDetailsPage';
import AppointmentDetailsPage from '../screens/appointment/AppointmentDetailsPage';
import AddEnquiryPage from '../screens/enquiry/AddEnquiryPage';
import LoginScreen from '../screens/LoginScreen';
import CustomerDashboard from '../screens/CustomerDashboard';
import EnquiryDashboard from '../screens/EnquiryDashboard';
import CustomerDetailsPage from '../screens/customer/CustomerDetailsPage';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DashboardStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="DashboardMain"
      component={Dashboard}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="NewCustomerPage"
      component={NewCustomerPage}
      options={{title: 'New Customer'}}
    />
    <Stack.Screen
      name="TokenDetailsPage"
      component={TokenDetailsPage}
      options={{title: 'Token Details'}}
    />
  </Stack.Navigator>
);

const EnquiryStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="EnquiryDashboard"
      component={EnquiryDashboard}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="AddEnquiryPage"
      component={AddEnquiryPage}
      options={{title: 'Add Enquiry'}}
    />
    <Stack.Screen
      name="EnquiryDetailsPage"
      component={EnquiryDetailsPage}
      options={{title: 'Enquiry Details'}}
    />
  </Stack.Navigator>
);

const CustomerStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="CustomerDashboard"
      component={CustomerDashboard}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="CustomerDetailsPage"
      component={CustomerDetailsPage}
      options={{title: 'Customer Details'}}
    />
  </Stack.Navigator>
);

const AppointmentStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="AppointmentDashboard"
      component={AppointmentDashboard}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="AppointmentDetailsPage"
      component={AppointmentDetailsPage}
      options={{title: 'Appointment Details'}}
    />
  </Stack.Navigator>
);

const MainTabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Dashboard"
    screenOptions={({route}) => ({
      tabBarIcon: ({color, size}) => {
        let iconName;
        switch (route.name) {
          case 'Dashboard':
            iconName = 'home';
            break;
          case 'Enquiries':
            iconName = 'search';
            break;
          case 'Customers':
            iconName = 'person';
            break;
          case 'Appointments':
            iconName = 'calendar';
            break;
          default:
            iconName = 'home';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
      unmountOnBlur: true,
    })}>
    <Tab.Screen name="Dashboard" component={DashboardStack} />
    <Tab.Screen name="Appointments" component={AppointmentStack} />
    <Tab.Screen name="Customers" component={CustomerStack} />
    <Tab.Screen name="Enquiries" component={EnquiryStack} />
  </Tab.Navigator>
);

const MainNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error('Failed to check authentication status:', error);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'Dashboard' : 'Login'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="DashboardMain" component={MainTabNavigator} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
