import PropTypes from 'prop-types';
import React, {Component, useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  Linking,
  Clipboard,
  Modal,
  TextInput,
  AsyncStorage
} from 'react-native';
var {height, width} = Dimensions.get('window');
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { useIsFocused } from "@react-navigation/native";
// import Strings from '../utils/Strings';
const CustomSidebarMenu = props => {
  const BASE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
  const proileImage = 'react_logo.png';
  const [user_id, setUser_id] = useState('');
  const [user_Type, setUser_Type] = useState('');
  const [token, setToken] = useState('');
  const [profile_img, setprofile_img] = useState('');
  const [profile_name, setprofile_name] = useState('');
  const isFocused = useIsFocused();
  const [modalVisibleForZip, setmodalVisibleForZip] = useState(false);
  const [DescriptionString, setDescriptionString] = useState('');
  const [maxLengthh1, setmaxLengthh1] = useState(5000);

  // useEffect(async () => {
   
  // //   if(isFocused){ 
  // //     doStuff();
  // // }

  
    
       
  // } );

  const doStuff = async () => {
    
  };

  const logout = async () => {
    AsyncStorage.clear();
    props.navigation.replace('SignInPage');
     
  };
  
  
  
  return (
    <View style={{flex: 1}}>
      
     
      



      <DrawerContentScrollView style={{backgroundColor: '#c6cbdf'}} {...props}>
        <DrawerItemList {...props} />

{/* <DrawerItem label="Profile" onPress={() =>  props.navigation.navigate('ProfilePage')} />
          <DrawerItem label="Orders" onPress={() => props.navigation.navigate('NewOrderPage')} /> */}
        
          <DrawerItem label="Profile" labelStyle={{fontFamily: 'BebasNeuePro-Middle',fontSize: 29, color: '#7e808b',}} onPress={() =>  props.navigation.navigate('ProfilePage')} />
          <DrawerItem label="Orders" labelStyle={{fontFamily: 'BebasNeuePro-Middle',fontSize: 29, color: '#7e808b',}} onPress={() => props.navigation.navigate('OrdersPage')} />
          <DrawerItem label="Terms And Conditions" labelStyle={{fontFamily: 'BebasNeuePro-Middle',fontSize: 29, color: '#7e808b',}} onPress={() => props.navigation.navigate('HowToUsePage')} />
          <DrawerItem label="Office Contacts" labelStyle={{fontFamily: 'BebasNeuePro-Middle',fontSize: 29, color: '#7e808b',}} onPress={() => props.navigation.navigate('OfficeContactsPage')} />
          <DrawerItem label="Resources" labelStyle={{fontFamily: 'BebasNeuePro-Middle',fontSize: 29, color: '#7e808b',}} onPress={() => props.navigation.navigate('FAQsPage')} />
          <DrawerItem label="Logout" labelStyle={{fontFamily: 'BebasNeuePro-Middle',fontSize: 29, color: '#7e808b',}} onPress={() => logout()} />
      </DrawerContentScrollView>

      
                       
      
    </View>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
     backgroundColor: 'transparent',
     tintColor: '#f55656',
     resizeMode: 'contain'
     
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomSidebarMenu;
