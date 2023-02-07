import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../Screen/Login';
import HowToUsePage from '../Screen/HowToUse';
import OfficeContactsPage from '../Screen/OfficeContacts';
import FAQsPage from '../Screen/FAQs';
import ForgotPasswordPage from '../Screen/ForgotPassword';
import ProfilePage from '../Screen/Profile';
import NewOrderPage from '../Screen/NewOrder';
import ConfirmOrderPage from '../Screen/ConfirmOrder';
import NewOrder1Page from '../Screen/NewOrder1';
import OrderDetailsPage from '../Screen/OrderDetails';
import OrdersPage from '../Screen/Orders';
import SignInPage from '../Screen/SignIn';
import SplashScreen from '../Screen/SplashScreen';
import TermsAndCondsForOrder from '../Screen/TermsAndCondsForOrder';
const Stack = createNativeStackNavigator();
export default function MainStack(props) {
    return (
        <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
      name="SplashScreen"
      component={SplashScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="LoginPage"
      component={LoginPage}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="HowToUsePage"
      component={HowToUsePage}
      options={{
        headerShown: false,
      }}
    />
     <Stack.Screen
      name="OfficeContactsPage"
      component={OfficeContactsPage}
      options={{
        headerShown: false,
      }}
    />
     <Stack.Screen
      name="FAQsPage"
      component={FAQsPage}
      options={{
        headerShown: false,
      }}
    />
     <Stack.Screen
      name="NewOrderPage"
      component={NewOrderPage}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="ConfirmOrderPage"
      component={ConfirmOrderPage}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="ForgotPasswordPage"
      component={ForgotPasswordPage}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="NewOrder1Page"
      component={NewOrder1Page}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="OrderDetailsPage"
      component={OrderDetailsPage}
      options={{
        headerShown: false,
      }}
    />
    
    <Stack.Screen
      name="SignInPage"
      component={SignInPage}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="TermsAndCondsForOrder"
      component={TermsAndCondsForOrder}
      options={{
        headerShown: false,
      }}
    />
    
    <Stack.Screen
      name="OrdersPage"
      component={OrdersPage}
      options={{
        headerShown: false,
      }}
    />
    
     <Stack.Screen
      name="ProfilePage"
      component={ProfilePage}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
    </NavigationContainer>
    )
}