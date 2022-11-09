// In App.js in a new project
//https://github.com/Kureev/react-native-side-menu/blob/master/examples/Basic/Basic.js
import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, Button, StyleSheet,
  Image,
  TouchableOpacity, Platform,
  SafeAreaView, AsyncStorage, StatusBar, ImageBackground} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {navigationRef} from './Route';
import SideMenu from './SideMenu';
import LoginPage from './Screen/Login';
import HowToUsePage from './Screen/HowToUse';
import OfficeContactsPage from './Screen/OfficeContacts';
import FAQsPage from './Screen/FAQs';
import ProfilePage from './Screen/Profile';
import NewOrderPage from './Screen/NewOrder';
import ConfirmOrderPage from './Screen/ConfirmOrder';
import NewOrder1Page from './Screen/NewOrder1';
import OrderDetailsPage from './Screen/OrderDetails';
import OrdersPage from './Screen/Orders';
import SignInPage from './Screen/SignIn';
import TermsAndCondsForOrder from './Screen/TermsAndCondsForOrder';

// import SideMenu from 'react-native-side-menu';
 import Menu from './Screen/Menu1';
 const DrawerCampForDonee = createDrawerNavigator();
 const AuthStack = createNativeStackNavigator();
 const HomeStack_nav = createNativeStackNavigator();
//  import 'react-native-gesture-handler';
// const image = require('../Images/menu.png');
function HomeScreen({ navigation }) {

  React.useEffect( async () => 
  {

    LoginReg();
    
  }, []);
  const LoginReg = async () => {

    var token = await AsyncStorage.getItem('token');

    let dispatchTimeString = await AsyncStorage.getItem('dispatchTime');
        var msDiff =new Date().getTime() - new Date(dispatchTimeString).getTime();    //Future date - current date
         var timeTillNow = Math.floor((msDiff/1000)/60);//Math.floor(msDiff / (1000 * 60 * 60 * 24));

        console.log("dispatchTimeString is: ", dispatchTimeString, timeTillNow);

        if (timeTillNow > 30)
        {
          navigation.replace('SignInPage')
        }
        else
        {
          setTimeout(() => 
          {
            if (token == null || token == undefined) {
               navigation.replace('SignInPage')
              //  navigation.navigate('LoginPage'); // Dashboard_donation // StartCampaign  
            } else {
              navigation.replace('LoginPage');
            }
          }, 2000);
        }

    
    
  };
  return (
    <ImageBackground source={require('./Images/splash-screen.jpg')} style= {{
      flex: 1,
       width: null,
      height: null,
      resizeMode: 'cover',
      justifyContent: 'center',

    }} >
    <StatusBar
        backgroundColor="#090915"
        barStyle="light-content"
    />
</ImageBackground>
  );
}

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStackScreenForDonerOnly = ({navigation}) => (
  <HomeStack_nav.Navigator initialRouteName="LoginPage">
    <HomeStack_nav.Screen
      name="LoginPage"
      component={LoginPage}
      options={{
        headerShown: false,
      }}
    />
    <HomeStack_nav.Screen
      name="HowToUsePage"
      component={HowToUsePage}
      options={{
        headerShown: false,
      }}
    />
     <HomeStack_nav.Screen
      name="OfficeContactsPage"
      component={OfficeContactsPage}
      options={{
        headerShown: false,
      }}
    />
     <HomeStack_nav.Screen
      name="FAQsPage"
      component={FAQsPage}
      options={{
        headerShown: false,
      }}
    />
     <HomeStack_nav.Screen
      name="NewOrderPage"
      component={NewOrderPage}
      options={{
        headerShown: false,
      }}
    />
    <HomeStack_nav.Screen
      name="ConfirmOrderPage"
      component={ConfirmOrderPage}
      options={{
        headerShown: false,
      }}
    />
    
    <HomeStack_nav.Screen
      name="NewOrder1Page"
      component={NewOrder1Page}
      options={{
        headerShown: false,
      }}
    />
    <HomeStack_nav.Screen
      name="OrderDetailsPage"
      component={OrderDetailsPage}
      options={{
        headerShown: false,
      }}
    />
    
    <HomeStack_nav.Screen
      name="SignInPage"
      component={SignInPage}
      options={{
        headerShown: false,
      }}
    />
    <HomeStack_nav.Screen
      name="TermsAndCondsForOrder"
      component={TermsAndCondsForOrder}
      options={{
        headerShown: false,
      }}
    />
    
    <HomeStack_nav.Screen
      name="OrdersPage"
      component={OrdersPage}
      options={{
        headerShown: false,
      }}
    />
    
     <HomeStack_nav.Screen
      name="ProfilePage"
      component={ProfilePage}
      options={{
        headerShown: false,
      }}
    />
    
    <HomeStack_nav.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerShown: false,
      }}
    />

  </HomeStack_nav.Navigator>
);
const DrawerScreenForDonor = () => (
  <DrawerCampForDonee.Navigator
    //  initialRouteName="LoginPage"
    screenOptions={{
    swipeEdgeWidth: 0,
  }}

    drawerPosition="left"
    drawerContent={props => <SideMenu {...props} />}
    drawerStyle={{width: '50%'}}
    drawerContentOptions={{
      labelStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: -5,
        color: '#000000',
      },
      activeTintColor: '#4d4d4d',
      itemStyle: {
        borderBottomColor: '#cccccc',
        borderBottomWidth: 0.5, // 0.5
        height: 40, //40
      },
    }}>
    {/* <Drawer.Screen name="Home" component={TabsScreen} /> */}
    <DrawerCampForDonee.Screen name="Dashboard 1234"  component={HomeStackScreenForDonerOnly} options={{ 
        headerShown: false,
        drawerItemStyle: { height: 0 },
        drawerLabel: () => (
          <Text style={{fontFamily: 'BebasNeuePro-Middle',fontSize: 29, color: '#7e808b',}}>Dashboard</Text>
        ),
        
      }}/>

{/* <DrawerCampForDonee.Screen name="Dashboard 12345"  component={ProfilePage} options={{ 
        headerShown: false,
        // drawerItemStyle: { height: 0 },
        drawerLabel: () => (
          <Text style={{fontFamily: 'BebasNeuePro-Middle',fontSize: 29, color: '#7e808b',}}>Profile</Text>
        ),
        
      }}/>

<DrawerCampForDonee.Screen name="Dashboard 12346"  component={OrdersPage} options={{ 
        headerShown: false,
        drawerItemStyle: { height: 0 },
        drawerLabel: () => (
          <Text style={{fontFamily: 'BebasNeuePro-Middle',fontSize: 29, color: '#7e808b',}}>Order</Text>
        ),
        
      }}/> */}


      {/* <DrawerCampForDonee.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{ drawerLabel: 'Profile',headerShown: false, }}
      />
      <DrawerCampForDonee.Screen
        name="NewOrderPage"
        component={NewOrderPage}
        options={{ drawerLabel: 'Orders',headerShown: false, }}
      /> */}
      {/* <DrawerCampForDonee.Screen
        name="HowToUsePage"
        component={HowToUsePage}
        options={{ drawerLabel: 'Terms And Conditions',headerShown: true, headerTitle: 'Terms And Conditions'}}
      />

<DrawerCampForDonee.Screen
        name="OfficeContactsPage"
        component={OfficeContactsPage}
        options={{ drawerLabel: 'Office Contact',headerShown: true, headerTitle: 'Contact Us'}}
      />

<DrawerCampForDonee.Screen
        name="FAQsPage"
        component={FAQsPage}
        options={{ drawerLabel: 'FAQs',headerShown: true, headerTitle: 'FAQs'}}
      /> */}  
      

  </DrawerCampForDonee.Navigator>
);
const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode="none" initialRouteName="Home">
    <AuthStack.Screen name="Home" component={HomeScreen} options={{
        headerShown: false,
      }}/>
    <AuthStack.Screen name="HowToUsePage" component={HowToUsePage}  options={{
       headerShown: false,
        headerTitle: 'Terms And Conditions'
      }}/>
      <AuthStack.Screen name="OfficeContactsPage" component={OfficeContactsPage}  options={{
        headerShown: false,
        headerTitle: 'Office Contacts'
      }}/>
      <AuthStack.Screen name="FAQsPage" component={FAQsPage}  options={{
        headerShown: false,
        headerTitle: 'FAQs'
      }}/>
      <AuthStack.Screen name="NewOrderPage" component={NewOrderPage}  options={{
        headerShown: false,
        headerTitle: 'Orders'
      }}/>
      <AuthStack.Screen name="ConfirmOrderPage" component={ConfirmOrderPage}  options={{
        headerShown: false,
        headerTitle: 'Orders'
      }}/>
      
      <AuthStack.Screen name="NewOrder1Page" component={NewOrder1Page}  options={{
        headerShown: false,
        headerTitle: 'Orders'
      }}/>
      <AuthStack.Screen name="OrderDetailsPage" component={OrderDetailsPage}  options={{
        headerShown: false,
        headerTitle: 'Orders'
      }}/>
      <AuthStack.Screen name="SignInPage" component={SignInPage}  options={{
        headerShown: false,
        headerTitle: 'Orders'
      }}/>
      <AuthStack.Screen name="TermsAndCondsForOrder" component={TermsAndCondsForOrder}  options={{
        headerShown: false,
        headerTitle: 'Orders'
      }}/>
      <AuthStack.Screen name="OrdersPage" component={OrdersPage}  options={{
        headerShown: false,
        headerTitle: 'Orders'
      }}/>
      
      <AuthStack.Screen name="ProfilePage" component={ProfilePage}  options={{
        headerShown: false,
        headerTitle: 'Profile'
      }}/>
        
    <AuthStack.Screen name="LoginPage" component={DrawerScreenForDonor} options={{
        headerShown: false,
      }}/>
  </AuthStack.Navigator>
);
const RootStack = createNativeStackNavigator();
const RootStackScreen = ({}) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="App" component={AuthStackScreen} options={{
        headerShown: false,
      }}/>
  </RootStack.Navigator>
);
function App() {
  return (
    <NavigationContainer>
      
      <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="LoginPage" component={LoginPage} options={{
        headerShown: false,
      }}/>
   
        {/* <Drawer.Screen name="Home" component={HomeScreen} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
export default ({}) => (
  <NavigationContainer ref={navigationRef}>
    <RootStackScreen />
  </NavigationContainer>
);
// export default App;