import React,{Component, useState} from 'react';
import {StatusBar,  AppState, View, Keyboard, Platform, ActivityIndicator, Text, AsyncStorage, KeyboardAvoidingView, StyleSheet, FlatList, ScrollView, TouchableOpacity, Linking, SafeAreaView, TextInput, Image, Dimensions } from 'react-native'
import SideMenuCommon from '../components/SideMenuCommon';
import TabBarCommon from '../components/TabBarCommon';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker'
import DateTimePicker from '../components/DateTimePicker';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import Moment from 'moment';
import Modal from "react-native-modal";
import KeyboardManager from 'react-native-keyboard-manager';
import DatePicker1 from 'react-native-datepicker'
import UrlUtil from '../utils/ConfigApp';
import Toast from 'react-native-simple-toast';
import CheckBox from '@react-native-community/checkbox';
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      appState: AppState.currentState,
      checkNavigationDone: false,
      openContainerPurchase: false,
      openCargoHazadeous: false,
      openCollectionTime: false,
      openDeliveryTime: false,
      openAgreedPrice: false,
      openLoadingTime: false,
      openDestinationCountry: false,
      openDestinationPort: false,
      tokenString: '',
      openHaulage: false,
      value0: '',
      valueHaulage: '',
      containerSizeIDString : '',
      containerSizeValueString : '',
      haulageIDString : '',
      haulageValueString : '',
      containerPurchaseString : 'NO',
      cargoTypeString: '',
      CargoHazadeousString : '',
      AgreedPriceString: '',
      TotalCargoWeightString: '',
      DestinationPortString: '',
      DestinationPortVString: '',
      DestinationPortIDString: '',
      DestinationCountryString: '',
      DestinationCountryVString: '',
      DestinationCountryIDString: '',
      SiteContactNameString: '',
      SiteContactTelnoString: '',
      LoadingPostcodeString: '',
      LoadingAddressString: '',
      Delivery_Time_String: '',
      Delivery_Date_String: '',
      DeliveryAddressString: '',
      Company_String: '',
      Address1_String: '',
      Address2_String: '',
      City_String: '',
      Country_String: '',
      PostalCode_String: '',
      AdditionalShippingInformationString: '',

      Company_String_LA: '',
      Address1_String_LA: '',
      Address2_String_LA: '',
      City_String_LA: '',
      Country_String_LA: '',
      PostalCode_String_LA: '',

      Collection_Date_String: '',
      Collection_Time_String: '',
      glabalDate: '',

      openDateTimePicker: false,
      modeDateTimePicker: 'time',
      flag: '',
      Loading_Time_String: '',
      Loading_Date_String: '',
      time: new Date(),
      date: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)),
      items: [],
      // items: [
      //    {label1: '20ft General Purpose', value1: '1'},
      //    {label1: '40ft General Purpose', value1: '2'},
      //    {label1: '40ft High Cube', value1: '3'},
      //   {label1: 'Other', value1: '4'},
      //  ],
       itemsHaulage: [
        {label1: 'Sidelifter (lifted to ground): Wait & load', value1: 'type1'},
        {label1: 'Sidelifter (lifted to ground): Drop & Collect', value1: 'type2'},
        {label1: 'Standard (on trailer): Wait & load', value1: 'type3'},
        {label1: 'Standard (on trailer): Trailer Drop & Collect', value1: 'type4'},
        {label1: 'No Haulage: Quay to Quay', value1: 'type5'},
        {label1: 'Other', value1: 'type6'}
      ],
      
      itemsContainerPurchase: [
        {label1: 'YES', value1: 'YES'},
        {label1: 'NO', value1: 'NO'},
      ],
      itemsLoadingTime: [
        {label1: 'AM', value1: 'AM'},
        {label1: 'PM', value1: 'PM'},
      ],
      itemsDestinationCountry: [],
      itemsDestinationPort: [
      ],
      itemList:  [
         {a: 'London To Paris', b: '102',  c: '23.12.2022', d: 'Available Stock: 45'}, 
         {a: 'Manchester United to Paris', b: '107',  c: '24.12.2022', d: 'Available Stock: 100'},
         {a: 'India To Paris', b: '311',  c: '25.12.2022', d: 'Available Stock: 134'},
         {a: 'ALPS', b: '102',  c: '26.12.2022', d: 'Available Stock: 45'}, 
         {a: 'ALPS', b: '107',  c: '27.12.2022', d: 'Available Stock: 100'},
         {a: 'ALPS', b: '311',  c: '28.12.2022', d: 'Available Stock: 134'},
         {a: 'ALPS', b: '102',  c: '29.12.2022', d: 'Available Stock: 45'}, 
         {a: 'ALPS', b: '107',  c: '30.12.2022', d: 'Available Stock: 100'},
         {a: 'ALPS', b: '311',  c: '31.12.2022', d: 'Available Stock: 134'},
         {a: 'ALPS', b: '107',  c: '12.12.2022', d: 'Available Stock: 100'},
         ],
         isModalVisible: false,

         errContainerSize: false,
         errContainerPurchase: false,
         errCargoType: false,
         errCargoHazadeous: false,
         errHaulageType: false,
         errAgreedPrice: false,
         errTotalCargoWeight: false,
         errDestinationPort: false,
         errDestinationCountry: false,
         errLoadingTime: false,
         errSiteContactName: false,
         errSiteContactTelNumber: false,
         errLoadingAddress: false,
         errLoadingPostcode: false,
         errLoadingDate: false,
         errDeliveryDate: false,
         errDeliveryTime: false,
         errDeliveryAddress: false,
         errCompany: false,
         errAddress1: false,
         errAddress2: false,
         errCity: false,
         errCountry: false,
         errPostalCode: false,
         errAdditionalShippingInformation: false,

         errCompany_LA: false,
         errAddress1_LA: false,
         errAddress2_LA: false,
         errCity_LA: false,
         errCountry_LA: false,
         errPostalCode_LA: false,

         isAgreed: false,
         isAgreed_LA: false,
         errCollectionDate: false, 
         errCollectionTime: false,
         loading: false,
         portDropdownHeight: 240,
         keyboardState: 'closed',

         futureDateString: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)),

        //  errContainerSize: true,
        //  errContainerPurchase: true,
        //  errCargoType: true,
        //  errHaulageType: true,
        //  errAgreedPrice: true,
        //  errTotalCargoWeight: true,
        //  errDestinationPort: true,
        //  errDestinationCountry: true,
        //  errLoadingTime: true,
        //  errSiteContactName: true,
        //  errSiteContactTelNumber: true,
        //  errLoadingAddress: true,
        //  errLoadingPostcode: true,
        //  errLoadingDate: true,
        //  errDeliveryDate: true,
        //  errDeliveryTime: true,
        //  errDeliveryAddress: true,
        //  errCollectionDate: true, 
        //  errCollectionTime: true,



itemListForDrawer:  [
    {a: 'Profile'},
    {a: 'Orders'},
    {a: 'Terms & Conditions'},
    {a: 'Office Contacts'},
    {a: "Resources"},
    {a: 'Logout'},
  ],
         

    };
    this.setValue = this.setValue.bind(this);
    this.setValueHaulage = this.setValueHaulage.bind(this);
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  _keyboardDidShow = () => {
    this.setState({
        keyboardState: 'opened'
    });
  }

  _keyboardDidHide = () => {
    this.setState({
        keyboardState: 'closed'
    });
  }

  componentDidMount = async () => 
  {

    if (Platform.OS === 'ios') {
      KeyboardManager.setEnable(true);
    }

    this.checkAppState()

    AsyncStorage.getItem("token").then((value) => {
      this.setState({tokenString: value});
  })
  .then(res => {
    console.log('token is: ', this.state.tokenString)
       this.fetchContainerSizeAndType()
       this.setOpenDestinationCountry1()
  });

  this.props.navigation.addListener('blur', () => {
    console.log('unMount calledddd')
    this.setState({checkNavigationDone: true});
    this.appStateSubscription.remove();
   
    
})
  
  this.focusListener = this.props.navigation.addListener('focus', () => {
    this.setState({checkNavigationDone: false, isModalVisible: false});
    this.checkAppState()
  })
    
  }
  async checkAppState()
 {
  this.appStateSubscription = AppState.addEventListener(
    "change",
    async nextAppState => {
      if (
        this.state.appState.match(/inactive|background/) &&
        nextAppState === "active"
      ) 
      {
        console.log("App has come to the foreground!");
        

        let dispatchTimeString = await AsyncStorage.getItem('dispatchTime');

        var msDiff =new Date().getTime() - new Date(dispatchTimeString).getTime();    //Future date - current date
         var timeTillNow = Math.floor((msDiff/1000)/60);//Math.floor(msDiff / (1000 * 60 * 60 * 24));

        console.log("dispatchTimeString is: ", dispatchTimeString, timeTillNow);
        // Toast.show('Current Time: '+String(new Date().getTime()) + 'dispatch time: '+ 
        // String(new Date(dispatchTimeString).getTime()) +' dispatchTimeString: '+ dispatchTimeString + ' timeTillNow: ' + String(timeTillNow) + this.state.checkNavigationDone, Toast.LONG)
        if (timeTillNow > 30)
        {
if (this.state.checkNavigationDone == false)
{
  Toast.show("You're being timed out due to inactivity", Toast.LONG)
  this.setState({
   checkNavigationDone : true
}, () => {
 this.logoutApi()
});
}
        }
      }
      else if (this.state.appState.match(/inactive|active/) && nextAppState === 'background') {

        // Dispatch current time here.

       

        // AsyncStorage.setItem('dispatchTime', new Date().toLocaleString())
        AsyncStorage.setItem('dispatchTime', String(new Date()))

        console.log("App has come to the background!");

    }
    else if (this.state.appState.match(/inactive|active/) && nextAppState === 'inactive') {

      // Dispatch current time here.


      // AsyncStorage.setItem('dispatchTime', new Date().toLocaleString())
      AsyncStorage.setItem('dispatchTime', String(new Date()))

      console.log('the app is closed');

  }
      this.setState({ appState: nextAppState });
    }
  );
 }
  setOpen= (open) => {

   this.setState({
     open
   });
 }

 setOpenContainerPurchase= (openContainerPurchase) => {

  this.setState({
    openContainerPurchase
  });
}

setOpenCargohazadeous= (openCargoHazadeous) => {

  this.setState({
    openCargoHazadeous
  });
}

setOpenCollectionTime= (openCollectionTime) => {

  this.setState({
    openCollectionTime
  });
}

setOpenLoadingTime= (openLoadingTime) => {

  this.setState({
    openLoadingTime
  });
}

setOpenDeliveryTime= (openDeliveryTime) => {

  this.setState({
    openDeliveryTime
  });
}
setOpenAgreedPrice= (openAgreedPrice) => {

  this.setState({
    openAgreedPrice
  });
}

setOpenDestinationCountry= (openDestinationCountry) => {
      this.setState({
        openDestinationCountry
      })  
}

setOpenDestinationCountry1 = () => {

  this.setState({
    loading : true,
    openDestinationPort: false,
  })  

  fetch(UrlUtil.BASE_URL+'countrylist', {
    method: 'GET', //Request Type
    headers: {
      // 'Authorization': bearer,
      'Content-Type': 'application/json',
    },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('DestinationCountry response: ',responseJson);
    
    if (responseJson.success == false)
    {
      this.setState({
        loading : false
      }) 
     alert('Something went wrong, please try again later');
    }
    else
    {
      this.setState({
        itemsDestinationCountry : responseJson.data,
        loading : false,
    }, () => {
      if (this.props.route.params) 
      {
        this.fetchOrderDetails();
      }
    });

      

    }
      
    })
    //If response is not in json then in error
    .catch((error) => {
      this.setState({
        loading : false
      }) 
      alert('Netwok request failed. Please check your internet connection and try again');
      console.error(error);
    });
  
}

setOpenDestinationPort= (openDestinationPort) => {
console.log('dsadasd', this.state.itemsDestinationPort)
if (this.state.DestinationCountryIDString == '')
{
  alert('Please select a Destination Country first');
}
else
{
  
  this.setState({
    loading : true
  }) 

  fetch(UrlUtil.BASE_URL+'portlist', {
    method: 'POST', //Request Type
    headers: {
      // 'Authorization': bearer,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      country_id: this.state.DestinationCountryIDString,
    }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('DestinationCountry response: ',responseJson);
    
    if (responseJson.success == false)
    {
      this.setState({
        loading : false
      }) 
     alert('Something went wrong, please try again later');
    }
    else
    {

      if (responseJson.data.length == 1)
      {
        this.setState({
          itemsDestinationPort : responseJson.data,
          loading : false,
          portDropdownHeight: 85,
          openDestinationPort
        })
      }
      else if (responseJson.data.length == 2)
      {
        this.setState({
          itemsDestinationPort : responseJson.data,
          loading : false,
          portDropdownHeight: 130,
          openDestinationPort
        })
      }
      else if (responseJson.data.length == 3)
      {
        this.setState({
          itemsDestinationPort : responseJson.data,
          loading : false,
          portDropdownHeight: 165,
          openDestinationPort
        })
      }
      else if (responseJson.data.length == 4)
      {
        this.setState({
          itemsDestinationPort : responseJson.data,
          loading : false,
          portDropdownHeight: 220,
          openDestinationPort
        })
      }
      else
      {
        this.setState({
          itemsDestinationPort : responseJson.data,
          loading : false,
          portDropdownHeight: 240,
          openDestinationPort
        })
      }
      
      

    }
      
    })
    //If response is not in json then in error
    .catch((error) => {
      this.setState({
        loading : false
      })
      alert('Netwok request failed. Please check your internet connection and try again');
      console.error(error);
    });


}

}

setOpenDestinationPort1= (id, port_name) => {
  if (this.state.DestinationCountryIDString == '')
  {
    alert('Please select a Destination Country first');
  }
  else
  {

    fetch(UrlUtil.BASE_URL+'portlist', {
      method: 'POST', //Request Type
      headers: {
        // 'Authorization': bearer,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country_id: this.state.DestinationCountryIDString,
      }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('DestinationCountry response: ',responseJson);
      
      if (responseJson.success == false)
      {
       
      }
      else
      {
  
        if (responseJson.data.length == 1)
        {
          this.setState({
            itemsDestinationPort : responseJson.data,
            portDropdownHeight: 85,
          })
        }
        else if (responseJson.data.length == 2)
        {
          this.setState({
            itemsDestinationPort : responseJson.data,
            portDropdownHeight: 130,
          })
        }
        else if (responseJson.data.length == 3)
        {
          this.setState({
            itemsDestinationPort : responseJson.data,
            portDropdownHeight: 165,
          })
        }
        else if (responseJson.data.length == 4)
        {
          this.setState({
            itemsDestinationPort : responseJson.data,
            portDropdownHeight: 220,
          })
        }
        else
        {
          this.setState({
            itemsDestinationPort : responseJson.data,
            portDropdownHeight: 240,
          })
        }
        
        this.setState({DestinationPortIDString: id, DestinationPortString: port_name})
  
      }
        
      })
      //If response is not in json then in error
      .catch((error) => {
        console.error(error);
      });
  
  
  }
  
  }

 setValue = (callback) => {

   console.log('set value isssss1', callback)

   this.setState(state => ({
    containerSizeIDString: callback(state.containerSizeIDString)
   }));
 }

 setValueCollectionTime = (callback) => {

  console.log('set value isssss1', callback)

  this.setState(state => ({
    Collection_Time_String: callback(state.value0)
  }));
}

setValueDeliveryTime = (callback) => {

  this.setState(state => ({
    Delivery_Time_String: callback(state.value0)
  }));
}

setValueLoadingTime = (callback) => {

  this.setState(state => ({
    Loading_Time_String: callback(state.value0)
  }));
}

setValueAgreedPrice = (callback) => {

  this.setState(state => ({
    AgreedPriceString: callback(state.value0)
  }));
}


 setValueContainerPurchase = (callback) => {

  console.log('set ContainerPurchase value isssss1', callback)

  this.setState(state => ({
    containerPurchaseString: callback(state.containerPurchaseString)
  }));
}

setValueCargohazadeous = (callback) => {

  console.log('set ContainerPurchase value isssss1', callback)

  this.setState(state => ({
    CargoHazadeousString: callback(state.CargoHazadeousString)
  }));
}

setValueDestinationCountry = (callback) => {

  this.setState(state => ({
    DestinationCountryIDString: callback(state.DestinationCountryIDString)
  }));
}

setValueDestinationPort = (callback) => {

  this.setState(state => ({
    DestinationPortIDString: callback(state.DestinationPortIDString)
  }));
}

//  setItems = (callback) => {
//    console.log('set Items is', callback)
//    this.setState(state => ({
//      items: callback(state.items)
//    }));
//  }

 setOpenHaulage= (openHaulage) => {

   this.setState({
     openHaulage
   });
 }
 setValueHaulage = (callback) => {


  this.setState(state => ({
    valueHaulage: callback(state.valueHaulage),
  }));

  console.log('value is=>', this.state.valueHaulage)

}

openDateTimePicker = (mode, hideOrShow, flag) =>
{
  Moment.locale('en');
  
  if (flag == 'Collection_Date' && this.state.Delivery_Date_String == '')
  {
    alert('Please select a Delivery Date first');
  }
  else if (flag == 'Collection_Time' || flag == 'Loading_Time' || flag == 'Delivery_Time')
  {
    this.setState({
      modeDateTimePicker: mode,
      openDateTimePicker: hideOrShow,
      flag: flag,
      date: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)),
      futureDateString: null,
    })
  }
  else if (flag == 'Collection_Date')
  {

    let momentObj = Moment(this.state.Delivery_Date_String, 'DD-MM-yyyy')

    this.setState({
      modeDateTimePicker: mode,
      openDateTimePicker: hideOrShow,
      flag: flag,
      date: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)),
      futureDateString: String(Moment(momentObj).format('yyyy-MM-DD')),
    })
  }
  else
  {
    this.setState({
      modeDateTimePicker: mode,
      openDateTimePicker: hideOrShow,
      flag: flag,
      date: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)),
      futureDateString: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)),
    })
  }
  
}
onChangeDateTimePicker = (date, flag) =>
{
  Moment.locale('en');
    
  console.log('value is1333=> ', String(Moment(date).format('DD-MM-yyyy')), flag, date)

  if (flag == 'Loading_Time')
  {
         
    const minutes = Math.round(date.getMinutes() / 15) * 15;
    const roundedDate = new Date(date);
    roundedDate.setMinutes(minutes);
        
    this.setState({
       openDateTimePicker: false,
      Loading_Time_String: String(Moment(roundedDate).format('h:mm a')),
      errLoadingTime: false,
      
    })
  }
  else if(flag == 'Loading_Date')
  {
    this.setState({
       openDateTimePicker: false,
      Loading_Date_String: String(Moment(date).format('DD-MM-yyyy')),
      errLoadingDate: false,
      
    })
  }
  else if(flag == 'Delivery_Date')
  {
    this.setState({
       openDateTimePicker: false,
      Delivery_Date_String: String(Moment(date).format('DD-MM-yyyy')),
      futureDateString: String(Moment(date).format('yyyy-MM-DD')),
      Collection_Date_String: '',
      errDeliveryDate: false,
      
    })
  }
  else if(flag == 'Delivery_Time')
  {

    const minutes = Math.round(date.getMinutes() / 15) * 15;
    const roundedDate = new Date(date);
    roundedDate.setMinutes(minutes);

    this.setState({
       openDateTimePicker: false,
      Delivery_Time_String: String(Moment(roundedDate).format('h:mm a')),
      errDeliveryTime: false,
      
    })
  }
  else if(flag == 'Collection_Date')
  {
    this.setState({
       openDateTimePicker: false,
      Collection_Date_String: String(Moment(date).format('DD-MM-yyyy')),
      futureDateString: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)),
      errCollectionDate: false,
    })
  }
  else if(flag == 'Collection_Time')
  {

    const minutes = Math.round(date.getMinutes() / 15) * 15;
    const roundedDate = new Date(date);
    roundedDate.setMinutes(minutes);

    this.setState({
       openDateTimePicker: false,
      Collection_Time_String: String(Moment(roundedDate).format('h:mm a')),
      errCollectionTime: false
    })
  }

}
onChangeDateTimePickerForiOSOnly = (date, flag) =>
{
  Moment.locale('en');
    
  console.log('value is1333=> ', date, flag)

  if (flag == 'Loading_Time')
  {
    this.setState({
       openDateTimePicker: false,
       date: date,
      Loading_Time_String: String(Moment(date).format('h:mm a')),
      
    })
  }
  else if(flag == 'Loading_Date')
  {
    this.setState({
       openDateTimePicker: false,
       date: date,
      Loading_Date_String: String(date),
      
    })
  }
  else if(flag == 'Delivery_Date')
  {
    this.setState({
       openDateTimePicker: false,
      Delivery_Date_String: String(Moment(date).format('DD-MM-yyyy')),
      
    })
  }
  else if(flag == 'Delivery_Time')
  {
    this.setState({
       openDateTimePicker: false,
      Delivery_Time_String: String(Moment(date).format('h:mm a')),
      
    })
  }
  else if(flag == 'Collection_Date')
  {
    this.setState({
       openDateTimePicker: false,
      Collection_Date_String: String(Moment(date).format('DD-MM-yyyy')),
      
    })
  }
  else if(flag == 'Collection_Time')
  {
    this.setState({
       openDateTimePicker: false,
      Collection_Time_String: String(Moment(date).format('h:mm a')),
      
    })
  }

}
renderHorizontalItem1 = ({ item, index }) => {

  return (

<TouchableOpacity style={{
  flex:1, marginTop: 10,
  // backgroundColor: 'red',
  width: '100%',
  height: 50,
  // backgroundColor: 'red'

}} onPress ={() => this.selectMenuItem(index)}>

          <Text style={{paddingLeft: 13,textAlignVertical: 'center', justifyContent: 'center',
          fontFamily: 'BebasNeuePro-Middle',fontSize: 46.2, color: 'black',}
}>{item.a}</Text>
          
</TouchableOpacity>
   )}
   selectMenuItem = (index) =>{
    console.log('index: ', index)

    this.setState({isModalVisible: false})

    if (index == 0)
    {
      this.props.navigation.navigate('ProfilePage')
    }
    else if (index == 1)
    {
      this.props.navigation.navigate('OrdersPage')
    }
    else if (index == 2)
    {
      this.props.navigation.navigate('HowToUsePage')
    }
    else if (index == 3)
    {
      this.props.navigation.navigate('OfficeContactsPage')
    }
    else if (index == 4)
    {
      this.props.navigation.navigate('FAQsPage')
    }
    else if (index == 5)
    {
      this.logoutApi()
    }

   }
   toggleModal = () => {
    this.setState({isModalVisible: true})
    };
_onPressBotton1Handler = async () => { 
    
  //       Keyboard.dismiss()
  //  this.Login()
  // this.loadingButton.showLoading(true);
  this.Submit()

  // this.props.navigation.navigate('LoginPage')
 
  
        }
        Submit = async () => {

          console.log('dc dci dp dpi', this.state.DestinationCountryString, this.state.DestinationCountryIDString,
          this.state.DestinationPortString, this.state.DestinationPortIDString)

          // this.submitItem()

           if (this.state.containerSizeIDString == '')
           {
            Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
            this.setState({
              errContainerSize : true,
            })
           }
           else if (this.state.containerPurchaseString.trim() == '')
           {
            Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
            this.setState({
              errContainerPurchase : true,
            })
           }
           else if (this.state.cargoTypeString.trim() == '')
           {
            Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
            this.setState({
              errCargoType : true,
            })
           }
           else if (this.state.CargoHazadeousString.trim() == '')
           {
            Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
            this.setState({
              errCargoHazadeous : true,
            })
           }
           else if (this.state.haulageIDString == '')
           {
            Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
            this.setState({
              errHaulageType : true,
            })
           }
           else if (this.state.AgreedPriceString.trim() == '')
           {
            Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
            this.setState({
              errAgreedPrice : true,
            })
           }
           else if (this.state.TotalCargoWeightString.trim() == '')
           {
            Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
            this.setState({
              errTotalCargoWeight : true,
            })
           }
           else if (this.state.DestinationCountryString == '')
           {
            Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
            this.setState({
              errDestinationCountry : true,
            })
           }
           else if (this.state.DestinationPortString == '')
           {
            Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
            this.setState({
              errDestinationPort : true,
            })
           }
           
          //  else if (this.state.SiteContactNameString.trim() == '')
          //  {
          //   Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
          //   this.setState({
          //     errSiteContactName : true,
          //   })
          //  }
          //  else if (this.state.SiteContactTelnoString.trim() == '')
          //  {
          //   Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
          //   this.setState({
          //     errSiteContactTelNumber : true,
          //   })
          //  }
          //  else if (this.state.AdditionalShippingInformationString.trim() == '')
          //  {
          //   Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
          //   this.setState({
          //     errAdditionalShippingInformation : true,
          //   })
          //  }
          //  else if (this.state.LoadingAddressString.trim() == '')
          //  {
          //   Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
          //   this.setState({
          //     errLoadingAddress : true,
          //   })
          //  }
          //  else if (this.state.LoadingPostcodeString.trim() == '')
          //  {
          //   Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
          //   this.setState({
          //     errLoadingPostcode : true,
          //   })
          //  }
           else
           {

            if (this.state.valueHaulage == 'type1' || this.state.valueHaulage == 'type3')
           {
            if (this.state.Loading_Date_String == '')
           {
            Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
            this.setState({
              errLoadingDate : true,
            })
           }
           else if (this.state.Loading_Time_String == '')
           {
            Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
            this.setState({
              errLoadingTime : true,
            })
           }
           else if (this.state.Company_String_LA.trim() == '')
           {
            Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
            this.setState({
              errCompany_LA : true,
            })
           }
           else if (this.state.Address1_String_LA.trim() == '')
           {
            Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
            this.setState({
              errAddress1_LA : true,
            })
           }
          //  else if (this.state.Address2_String_LA.trim() == '')
          //  {
          //   Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
          //   this.setState({
          //     errAddress2_LA : true,
          //   })
          //  }
           else if (this.state.City_String_LA.trim() == '')
           {
            Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
            this.setState({
              errCity_LA : true,
            })
           }
           else if (this.state.Country_String_LA.trim() == '')
           {
            Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
            this.setState({
              errCountry_LA : true,
            })
           }
           else if (this.state.PostalCode_String_LA.trim() == '')
           {
            Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
            this.setState({
              errPostalCode_LA : true,
            })
           }
           else
           {
            this.submitItem()
           }
           }
           else if (this.state.valueHaulage == 'type2' || this.state.valueHaulage == 'type4')
           {
            
            if (this.state.Delivery_Date_String == '')
           {
            Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
            this.setState({
              errDeliveryDate : true,
            })
           }
           else if (this.state.Delivery_Time_String == '')
           {
            Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
            this.setState({
              errDeliveryTime : true,
            })
           }
          //  else if (this.state.DeliveryAddressString == '')
          //  {
          //   Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
          //   this.setState({
          //     errDeliveryAddress : true,
          //   })
          else if (this.state.Company_String.trim() == '')
           {
            Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
            this.setState({
              errCompany : true,
            })
           }
           else if (this.state.Address1_String.trim() == '')
           {
            Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
            this.setState({
              errAddress1 : true,
            })
           }
          //  else if (this.state.Address2_String.trim() == '')
          //  {
          //   Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
          //   this.setState({
          //     errAddress2 : true,
          //   })
          //  }
           else if (this.state.City_String.trim() == '')
           {
            Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
            this.setState({
              errCity : true,
            })
           }
           else if (this.state.Country_String.trim() == '')
           {
            Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
            this.setState({
              errCountry : true,
            })
           }
           else if (this.state.PostalCode_String.trim() == '')
           {
            Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
            this.setState({
              errPostalCode : true,
            })
           }
           else if (this.state.Collection_Date_String == '')
           {
            Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
            this.setState({
              errCollectionDate : true,
            })
           }
           else if (this.state.Collection_Time_String == '')
           {
            Toast.show('Please make sure all fields are filled in correctly.', Toast.LONG)
            this.setState({
              errCollectionTime : true,
            })
           }
           else
           {
            this.submitItem()
           }
           }
           else
           {
            this.submitItem()
           }


        }
          
        
        }

        submitItem = async () => 
          {

            var bearer = 'Bearer ' + this.state.tokenString;
            this.loadingButton.showLoading(true);


            var log

            if (String(this.state.haulageIDString) == 'type1' || String(this.state.haulageIDString) == 'type3')
{

             log = JSON.stringify({ 'data': {
              container_size_type: String(this.state.containerSizeIDString),//'customer@crescentek.com',
              cargo_type: this.state.cargoTypeString,//'12345678',
              container_purchase: this.state.containerPurchaseString,
              haulage_type: String(this.state.haulageIDString),
              loading_date: this.state.Loading_Date_String,
              loading_time: this.state.Loading_Time_String,
              // loading_address: this.state.LoadingAddressString,
              agreed_price: this.state.AgreedPriceString,
              total_cargo_weight: this.state.TotalCargoWeightString,
              destination_port: String(this.state.DestinationPortIDString),
              destination_country: String(this.state.DestinationCountryIDString),
              loading_time: this.state.Loading_Time_String,
              site_contact_name: this.state.SiteContactNameString,
              site_contact_tel_number: this.state.SiteContactTelnoString,
              // loading_address: this.state.LoadingAddressString,
              loading_address: {
                company: this.state.Company_String_LA,
                address1: this.state.Address1_String_LA,
                address2: this.state.Address2_String_LA,
                city: this.state.City_String_LA,
                county: this.state.Country_String_LA,
                post_code: this.state.PostalCode_String_LA,
               
              },
              loading_postcode: this.state.LoadingPostcodeString,
              is_the_cargo_hazadeous: this.state.CargoHazadeousString,
              additional_shipping_information: this.state.AdditionalShippingInformationString
              // delivery_date: this.state.Delivery_Date_String,
              // delivery_time: this.state.Delivery_Time_String,
              // delivery_address: this.state.DeliveryAddressString,
              // collection_date: this.state.Collection_Date_String,
              // collection_time: this.state.Collection_Time_String,
              
            }
            })
          } else if (String(this.state.haulageIDString) == 'type2' || String(this.state.haulageIDString) == 'type4')
          {
            log = JSON.stringify({ 'data': {
              container_size_type: String(this.state.containerSizeIDString),//'customer@crescentek.com',
              cargo_type: this.state.cargoTypeString,//'12345678',
              container_purchase: this.state.containerPurchaseString,
              haulage_type: String(this.state.haulageIDString),
              loading_date: this.state.Loading_Date_String,
              loading_time: this.state.Loading_Time_String,
              loading_address: this.state.LoadingAddressString,
              agreed_price: this.state.AgreedPriceString,
              total_cargo_weight: this.state.TotalCargoWeightString,
              destination_port: String(this.state.DestinationPortIDString),
              destination_country: String(this.state.DestinationCountryIDString),
              loading_time: this.state.Loading_Time_String,
              site_contact_name: this.state.SiteContactNameString,
              site_contact_tel_number: this.state.SiteContactTelnoString,
              loading_address: this.state.LoadingAddressString,
              loading_postcode: this.state.LoadingPostcodeString,
              delivery_date: this.state.Delivery_Date_String,
              delivery_time: this.state.Delivery_Time_String,
              delivery_address: {
                company: this.state.Company_String,
                address1: this.state.Address1_String,
                address2: this.state.Address2_String,
                city: this.state.City_String,
                county: this.state.Country_String,
                post_code: this.state.PostalCode_String,
               
              },
              collection_date: this.state.Collection_Date_String,
              collection_time: this.state.Collection_Time_String,
              is_the_cargo_hazadeous: this.state.CargoHazadeousString,
              additional_shipping_information: this.state.AdditionalShippingInformationString
            }
            })
          }
          else
          {
            log = JSON.stringify({ 'data': {
              container_size_type: String(this.state.containerSizeIDString),//'customer@crescentek.com',
              cargo_type: this.state.cargoTypeString,//'12345678',
              container_purchase: this.state.containerPurchaseString,
              haulage_type: String(this.state.haulageIDString),
              loading_time: this.state.Loading_Time_String,
              loading_address: this.state.LoadingAddressString,
              agreed_price: this.state.AgreedPriceString,
              total_cargo_weight: this.state.TotalCargoWeightString,
              destination_port: String(this.state.DestinationPortIDString),
              destination_country: String(this.state.DestinationCountryIDString),
              loading_time: this.state.Loading_Time_String,
              site_contact_name: this.state.SiteContactNameString,
              site_contact_tel_number: this.state.SiteContactTelnoString,
              loading_address: this.state.LoadingAddressString,
              loading_postcode: this.state.LoadingPostcodeString,
              remarks: '',
              is_the_cargo_hazadeous: this.state.CargoHazadeousString,
              additional_shipping_information: this.state.AdditionalShippingInformationString
             
              
            }
            })
          }

            var log1 = JSON.stringify({ 'data': {


              containerSizeIDString: String(this.state.containerSizeIDString),
              containerSizeValueString: this.state.containerSizeValueString,
              containerPurchaseString: this.state.containerPurchaseString,
              cargoTypeString: this.state.cargoTypeString,
              haulageIDString: String(this.state.haulageIDString),
              haulageValueString: this.state.haulageValueString,
              AgreedPriceString: this.state.AgreedPriceString,
              AgreedPriceString: this.state.AgreedPriceString,
              TotalCargoWeightString: this.state.TotalCargoWeightString,
              DestinationPortString: this.state.DestinationPortString,
              DestinationCountryString: this.state.DestinationCountryString,
              Loading_Time_String: this.state.Loading_Time_String,
              SiteContactNameString: this.state.SiteContactNameString,
              SiteContactTelnoString: this.state.SiteContactTelnoString,
              LoadingAddressString: this.state.LoadingAddressString,
              LoadingPostcodeString: this.state.LoadingPostcodeString,


              Loading_Date_String: this.state.Loading_Date_String,

              Delivery_Date_String: this.state.Delivery_Date_String,
              Delivery_Time_String: this.state.Delivery_Time_String,
              // DeliveryAddressString: this.state.DeliveryAddressString,

              Company_String: this.state.Company_String,
              Address1_String: this.state.Address1_String,
              Address2_String: this.state.Address2_String,
              City_String: this.state.City_String,
              Country_String: this.state.Country_String,
              PostalCode_String: this.state.PostalCode_String,

              Company_String_LA: this.state.Company_String_LA,
              Address1_String_LA: this.state.Address1_String_LA,
              Address2_String_LA: this.state.Address2_String_LA,
              City_String_LA: this.state.City_String_LA,
              Country_String_LA: this.state.Country_String_LA,
              PostalCode_String_LA: this.state.PostalCode_String_LA,

              Collection_Date_String: this.state.Collection_Date_String,
              Collection_Time_String: this.state.Collection_Time_String,
              CargoHazadeousString: this.state.CargoHazadeousString,
              AdditionalShippingInformationString: this.state.AdditionalShippingInformationString

            }
            })

            

            AsyncStorage.setItem('userBookingData', log)
            AsyncStorage.setItem('userBookingDataAll', log1)

            setTimeout(()=>{
              this.loadingButton.showLoading(false);
              this.props.navigation.navigate('ConfirmOrderPage') //ParcelDetailsPage //DashPage
          },2000)

//             console.log('logs are: ', log)

//             fetch(UrlUtil.BASE_URL+'newbooking', {
//       method: 'POST', //Request Type
//       body: log, //post body
//       headers: {
//         Accept: 'application/json',
//         'Authorization': bearer,
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       //If response is in json then in success
//       .then((responseJson) => {
//         // alert(JSON.stringify(responseJson));
//         console.log('submitItem response: ',responseJson);
//         // this.loadingButton.showLoading(false);

// if (responseJson.success == false)
// {
//   this.loadingButton.showLoading(false);
//   alert('');
// }
// else
// {
  
//     setTimeout(()=>{
//             this.loadingButton.showLoading(false);
//             this.props.navigation.navigate('ConfirmOrderPage') //ParcelDetailsPage //DashPage
//         },2000)
// }

          
//       })
//       //If response is not in json then in error
//       .catch((error) => {
//         alert(JSON.stringify(error));
//         console.error(error);
//         this.loadingButton.showLoading(false);
//       });
   
          
          }

        setContainerPurchase = (value) =>
          {
            this.setState({
              containerPurchaseString : value,
            })

            if (value.trim() == '')
            {
              this.setState({
                errContainerPurchase : true,
              })
            }
            else
            {
              this.setState({
                errContainerPurchase : false,
              })
            }

          }

          setCargoType = (value) =>
          {
            this.setState({
              cargoTypeString : value,
            })

            if (value.trim() == '')
            {
              this.setState({
                errCargoType : true,
              })
            }
            else
            {
              this.setState({
                errCargoType : false,
              })
            }

          }

          setAdditionalShippingInformation = (value) =>
          {
            this.setState({
              AdditionalShippingInformationString : value,
            })

            // if (value.trim() == '')
            // {
            //   this.setState({
            //     errAdditionalShippingInformation : true,
            //   })
            // }
            // else
            // {
            //   this.setState({
            //     errAdditionalShippingInformation : false,
            //   })
            // }

          }

          setCountry = (value) =>
          {
            this.setState({
              Country_String : value,
            })

            if (value.trim() == '')
            {
              this.setState({
                errCountry : true,
              })
            }
            else
            {
              this.setState({
                errCountry : false,
              })
            }

          }

          setCountry_LA = (value) =>
          {
            this.setState({
              Country_String_LA : value,
            })

            if (value.trim() == '')
            {
              this.setState({
                errCountry_LA : true,
              })
            }
            else
            {
              this.setState({
                errCountry_LA : false,
              })
            }

          }

          setCompany = (value) =>
          {
            this.setState({
              Company_String : value,
            })

            if (value.trim() == '')
            {
              this.setState({
                errCompany : true,
              })
            }
            else
            {
              this.setState({
                errCompany : false,
              })
            }

          }
          
          setCompany_LA = (value) =>
          {
            this.setState({
              Company_String_LA : value,
            })

            if (value.trim() == '')
            {
              this.setState({
                errCompany_LA : true,
              })
            }
            else
            {
              this.setState({
                errCompany_LA : false,
              })
            }

          }

          setAddress1 = (value) =>
          {
            this.setState({
              Address1_String : value,
            })

            if (value.trim() == '')
            {
              this.setState({
                errAddress1 : true,
              })
            }
            else
            {
              this.setState({
                errAddress1 : false,
              })
            }

          }

          setAddress1_LA = (value) =>
          {
            this.setState({
              Address1_String_LA : value,
            })

            if (value.trim() == '')
            {
              this.setState({
                errAddress1_LA : true,
              })
            }
            else
            {
              this.setState({
                errAddress1_LA : false,
              })
            }

          }

          setAddress2 = (value) =>
          {
            this.setState({
              Address2_String : value,
            })

            if (value.trim() == '')
            {
              this.setState({
                errAddress2 : true,
              })
            }
            else
            {
              this.setState({
                errAddress2 : false,
              })
            }

          }

          setAddress2_LA = (value) =>
          {
            this.setState({
              Address2_String_LA : value,
            })

            if (value.trim() == '')
            {
              this.setState({
                errAddress2_LA : true,
              })
            }
            else
            {
              this.setState({
                errAddress2_LA : false,
              })
            }

          }

          setCity = (value) =>
          {
            this.setState({
              City_String : value,
            })

            if (value.trim() == '')
            {
              this.setState({
                errCity : true,
              })
            }
            else
            {
              this.setState({
                errCity : false,
              })
            }

          }

          setCity_LA = (value) =>
          {
            this.setState({
              City_String_LA : value,
            })

            if (value.trim() == '')
            {
              this.setState({
                errCity_LA : true,
              })
            }
            else
            {
              this.setState({
                errCity_LA : false,
              })
            }

          }

          setPostalCode = (value) =>
          {
            this.setState({
              PostalCode_String : value,
            })

            if (value.trim() == '')
            {
              this.setState({
                errPostalCode : true,
              })
            }
            else
            {
              this.setState({
                errPostalCode : false,
              })
            }

          }

          setPostalCode_LA = (value) =>
          {
            this.setState({
              PostalCode_String_LA : value,
            })

            if (value.trim() == '')
            {
              this.setState({
                errPostalCode_LA : true,
              })
            }
            else
            {
              this.setState({
                errPostalCode_LA : false,
              })
            }

          }

          setDeliveryAddress = (value) =>
          {
            this.setState({
              DeliveryAddressString : value,
            })

            if (value.trim() == '')
            {
              this.setState({
                errDeliveryAddress : true,
              })
            }
            else
            {
              this.setState({
                errDeliveryAddress : false,
              })
            }

          }

          setLoadingAddress = (value) =>
          {
            this.setState({
              LoadingAddressString : value,
            })

            if (value.trim() == '')
            {
              this.setState({
                errLoadingAddress : true,
              })
            }
            else
            {
              this.setState({
                errLoadingAddress : false,
              })
            }

          }

          setAgreedPrice = (value) =>
          {
            this.setState({
              AgreedPriceString : value,
            })

            if (value.trim() == '')
            {
              this.setState({
                errAgreedPrice : true,
              })
            }
            else
            {
              this.setState({
                errAgreedPrice : false,
              })
            }

          }

          setTotalCargoWeight = (value) =>
          {
            this.setState({
              TotalCargoWeightString : value,
            })

            if (value.trim() == '')
            {
              this.setState({
                errTotalCargoWeight : true,
              })
            }
            else
            {
              this.setState({
                errTotalCargoWeight : false,
              })
            }

          }

          setDestinationPort = (value) =>
          {
            this.setState({
              DestinationPortString : value,
            })

            if (value.trim() == '')
            {
              this.setState({
                errDestinationPort : true,
              })
            }
            else
            {
              this.setState({
                errDestinationPort : false,
              })
            }

          }

          setDestinationCountry = (value) =>
          {
            this.setState({
              DestinationCountryString : value,
            })

            if (value.trim() == '')
            {
              this.setState({
                errDestinationCountry : true,
              })
            }
            else
            {
              this.setState({
                errDestinationCountry : false,
              })
            }

          }

          setSiteContactName = (value) =>
          {
            this.setState({
              SiteContactNameString : value,
            })

            // if (value.trim() == '')
            // {
            //   this.setState({
            //     errSiteContactName : true,
            //   })
            // }
            // else
            // {
            //   this.setState({
            //     errSiteContactName : false,
            //   })
            // }

          }

          setSiteContactTelNumber = (value) =>
          {
            this.setState({
              SiteContactTelnoString : value,
            })

            // if (value.trim() == '')
            // {
            //   this.setState({
            //     errSiteContactTelNumber : true,
            //   })
            // }
            // else
            // {
            //   this.setState({
            //     errSiteContactTelNumber : false,
            //   })
            // }

          }

          setLoadingPostCode = (value) =>
          {
            this.setState({
              LoadingPostcodeString : value,
            })

            if (value.trim() == '')
            {
              this.setState({
                errLoadingPostcode : true,
              })
            }
            else
            {
              this.setState({
                errLoadingPostcode : false,
              })
            }

          }

          setUserDefaultAddress = (value) =>
          {
            this.setState({isAgreed: value})

            console.log('value:::', value)

            if (value == true)
            {
this.fetchProfileData()
            }
            else
            {
this.setState({Company_String: '', Address1_String: '', Address2_String: '',
City_String: '', Country_String: '', PostalCode_String: ''})
            }

          }

          setUserDefaultAddress_LA = (value) =>
          {
            this.setState({isAgreed_LA: value})

            console.log('value:::', value)

            if (value == true)
            {
this.fetchProfileData_LA()
            }
            else
            {
this.setState({Company_String_LA: '', Address1_String_LA: '', Address2_String_LA: '',
City_String_LA: '', Country_String_LA: '', PostalCode_String_LA: ''})
            }

          }

         

          fetchContainerSizeAndType = async () => 
          {
      
            
            fetch(UrlUtil.BASE_URL+'containesizetype', {
      method: 'GET', //Request Type
      headers: {
        // 'Authorization': bearer,
        'Content-Type': 'application/json',
      },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('containesizetype response: ',responseJson);
      
      if (responseJson.success == false)
      {
       alert('Something went wrong, please try again later');
      }
      else
      {
        this.setState({
          items : responseJson.data,
        })
      }
        
      })
      //If response is not in json then in error
      .catch((error) => {
        alert('Netwok request failed. Please check your internet connection and try again');
        console.error(error);
      });
      
          
          }

          logoutApi = async () => 
          {
      
            var bearer = 'Bearer ' + this.state.tokenString;
            fetch(UrlUtil.BASE_URL+'logout', {
      method: 'GET', //Request Type
      headers: {
        'Authorization': bearer,
        'Content-Type': 'application/json',
      },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('logout response: ',responseJson);
      
      if (responseJson.success == false)
      {
       alert('Something went wrong, please try again later');
      }
      else
      {
        AsyncStorage.clear();
        this.props.navigation.replace('SignInPage');
      }
        
      })
      //If response is not in json then in error
      .catch((error) => {
        alert('Netwok request failed. Please check your internet connection and try again');
        console.error(error);
      });
      
          
          }
          fetchProfileData_LA = async () => 
          {
      
            var bearer = 'Bearer ' + this.state.tokenString;
            fetch(UrlUtil.BASE_URL+'user', {
      method: 'GET', //Request Type
      headers: {
        'Authorization': bearer,
        'Content-Type': 'application/json',
      },
      })
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
        // alert(JSON.stringify(responseJson));
        console.log('user data response: ',responseJson);
      
        
      
        // companyNameString: '',
        //     companyIDString: '',
        //     emailString: '',
        //     phoneNoString:'',
        //     houseString: '',
        //     streetString: '',
        //     townString: '',
        //     countryString: '',
        //     refIDString: '',
      
        // this.loadingButton.showLoading(false);
      
      if (responseJson.success == false)
      {
      // alert('Email or Password not authorize');
      }
      else
      {
        this.setState({
          Company_String_LA: responseJson.data.compnay || '',
          Address1_String_LA: responseJson.data.address1 || '',
          Address2_String_LA: responseJson.data.address2 || '',
          Country_String_LA: responseJson.data.county || '',
          City_String_LA: responseJson.data.city || '',
          PostalCode_String_LA: responseJson.data.post_code || '',
          errCompany_LA: false,
          errAddress1_LA: false,
          errAddress2_LA: false,
          errCity_LA: false,
          errCountry_LA: false,
          errPostalCode_LA: false
        });
      }
      
          
      })
      //If response is not in json then in error
      .catch((error) => {
        alert('Netwok request failed. Please check your internet connection and try again');
        console.error(error);
      });
      
          
          }
          fetchProfileData = async () => 
    {

      var bearer = 'Bearer ' + this.state.tokenString;
      fetch(UrlUtil.BASE_URL+'user', {
method: 'GET', //Request Type
headers: {
  'Authorization': bearer,
  'Content-Type': 'application/json',
},
})
.then((response) => response.json())
//If response is in json then in success
.then((responseJson) => {
  // alert(JSON.stringify(responseJson));
  console.log('user data response: ',responseJson);

  

  // companyNameString: '',
  //     companyIDString: '',
  //     emailString: '',
  //     phoneNoString:'',
  //     houseString: '',
  //     streetString: '',
  //     townString: '',
  //     countryString: '',
  //     refIDString: '',

  // this.loadingButton.showLoading(false);

if (responseJson.success == false)
{
// alert('Email or Password not authorize');
}
else
{
  this.setState({
    Company_String: responseJson.data.compnay || '',
    Address1_String: responseJson.data.address1 || '',
    Address2_String: responseJson.data.address2 || '',
    Country_String: responseJson.data.county || '',
    City_String: responseJson.data.city || '',
    PostalCode_String: responseJson.data.post_code || '',
    errCompany: false,
    errAddress1: false,
    errAddress2: false,
    errCity: false,
    errCountry: false,
    errPostalCode: false
  });
}

    
})
//If response is not in json then in error
.catch((error) => {
  alert('Netwok request failed. Please check your internet connection and try again');
  console.error(error);
});

    
    }

  render() {

   const { open, value, items } = this.state;

    return (
      
      <View style={styles.container}>
        <StatusBar backgroundColor='#4387bb' barStyle={'light-content'} />
<SafeAreaView>
<View style={styles.dashboard_main_headers}>
            <View style={styles.dashboard_headers_Menu_View}>
              <TouchableOpacity
                onPress={() => this.toggleModal()}>
                  {/* this.props.navigation.openDrawer() */}
                <Image
                  style={styles.menu_icon}
                  source={require('../Images/outline_apps_black_48.png')}
                />
              </TouchableOpacity>
            
            </View>
            {/* <View style={styles.dashboard_headers_Create_View}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('NewOrderPage')}>
                <Image
                  style={styles.create_icon}
                  source={require('../Images/outline_add_black_48.png')}
                  // resizeMode="contain"dashboard_main_btn
                />
              </TouchableOpacity>
              </View> */}

          </View>
          </SafeAreaView>
          <ScrollView nestedScrollEnabled={true} horizontal={false} contentContainerStyle={{paddingBottom: Platform.OS === 'android' && this.state.keyboardState == 'opened' ? 150 : 0}}>
          
          <Text style={{fontFamily: 'BebasNeuePro-Middle', fontSize: 29.6, marginTop: 45, color: '#4387bb', marginLeft: 24, marginBottom: 8}}>New Booking Continued</Text>
          


          
          <View style={styles.mainView}>  

          <Text style={styles.textLabel
}>{'Container Size & Type'}</Text>

<DropDownPicker
containerProps={{
  height: this.state.open === true ? 240 : null,
  
}}
listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: true,
  }}
dropDownContainerStyle={{
  backgroundColor: "#ecf6fa",
  fontFamily: 'BebasNeuePro-Middle',
  fontSize: 26.4,
}}
style={{
  borderColor: "#4387bb",
  borderWidth: 1,
  backgroundColor: 'transparent'
}}
textStyle={{
  fontFamily: 'BebasNeuePro-Middle', fontSize: 26.4, color: 'black',
}}
placeholder=""
schema={{
  label: 'type',
  value: 'id'
}}
        open={this.state.open}
        value={this.state.containerSizeIDString}
        items={this.state.items}
        setOpen={this.setOpen}
        setValue={this.setValue}
        setItems={this.setItems}
        onSelectItem={(item) => {
          console.log('onSelectItem: ',item);
          this.setState({containerSizeValueString: item.type})
        }}
        onChangeValue={(value) => {
          console.log('onChangeValue: ',value);
          this.setState({errContainerSize: false, containerSizeIDString: value})
        }}
      />



{this.state.errContainerSize && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4
    }}>{'Container Size & Type field can not be blank'}</Text> }

<Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black', marginTop: 15
}}>{'Container Purchase'}</Text>

{/* <TextInput
                    style={{
                      borderColor: '#4387bb',
                      borderWidth: 1,
                      width: '100%',
                      height: 48,
                      borderRadius: 8,
                      paddingLeft: 8,
                      fontFamily: 'BebasNeuePro-Middle', fontSize: 26.4, color: 'black',
                    }}
                    placeholder=""
                    // ref ={ref => this.inputText1 = ref}
                    // editable={this.state.iseditablefname}
                    onChangeText={value => this.setContainerPurchase(value)}
                    value={this.state.containerPurchaseString}
                    keyboardType="default"></TextInput> */}

<DropDownPicker
containerProps={{
  height: this.state.openContainerPurchase === true ? 120 : null,
  
}}
listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: true,
  }}
dropDownContainerStyle={{
  backgroundColor: "#ecf6fa",
  fontFamily: 'BebasNeuePro-Middle',
  fontSize: 26.4,
}}
style={{
  borderColor: "#4387bb",
  borderWidth: 1,
  backgroundColor: 'transparent'
}}
textStyle={{
  fontFamily: 'BebasNeuePro-Middle', fontSize: 26.4, color: 'black',
}}
placeholder=""
schema={{
  label: 'label1',
  value: 'value1'
}}
        open={this.state.openContainerPurchase}
        value={this.state.containerPurchaseString}
        items={this.state.itemsContainerPurchase}
        setOpen={this.setOpenContainerPurchase}
        setValue={this.setValueContainerPurchase}
        setItems={this.setItems}
        onSelectItem={(item) => {
          console.log('onSelectItem: ',item);
          // this.setState({containerSizeValueString: item.type})
        }}
        onChangeValue={(value) => {
          console.log('onChangeValue: ',value);
          this.setState({errContainerPurchase: false, containerPurchaseString: value})
        }}
      />

{this.state.errContainerPurchase && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4
    }}>{'Container Purchase field can not be blank'}</Text> }


<Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black', marginTop: 15
}}>{'Cargo Description'}</Text>

<TextInput
                    style={{
                      borderColor: '#4387bb',
                      borderWidth: 1,
                      width: '100%',
                      color: 'black',
                      height: 120,
                      borderRadius: 8,
                      paddingLeft: 8,
                      fontFamily: 'BebasNeuePro-Middle',
                      fontSize: 26.4,
                    }}
                    placeholder="Type Here"
                    // ref ={ref => this.inputText1 = ref}
                    // editable={this.state.iseditablefname}
                    onChangeText={value => this.setCargoType(value)}
                    textAlignVertical={'top'}
                    numberOfLines = {5}
                    multiline = {true}
                    value={this.state.cargoTypeString}
                    keyboardType="default"></TextInput>

{this.state.errCargoType && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4
    }}>{'Cargo Description field can not be blank'}</Text> }

<Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black', marginTop: 15
}}>{'Is the Cargo Hazardous'}</Text>

<DropDownPicker
containerProps={{
  height: this.state.openCargoHazadeous === true ? 120 : null,
  
}}
listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: true,
  }}
dropDownContainerStyle={{
  backgroundColor: "#ecf6fa",
  fontFamily: 'BebasNeuePro-Middle',
  fontSize: 26.4,
}}
style={{
  borderColor: "#4387bb",
  borderWidth: 1,
  backgroundColor: 'transparent'
}}
textStyle={{
  fontFamily: 'BebasNeuePro-Middle', fontSize: 26.4, color: 'black',
}}
placeholder=""
schema={{
  label: 'label1',
  value: 'value1'
}}
        open={this.state.openCargoHazadeous}
        value={this.state.CargoHazadeousString}
        items={this.state.itemsContainerPurchase}
        setOpen={this.setOpenCargohazadeous}
        setValue={this.setValueCargohazadeous}
        setItems={this.setItems}
        onSelectItem={(item) => {
          console.log('onSelectItem: ',item);
          // this.setState({containerSizeValueString: item.type})
        }}
        onChangeValue={(value) => {
          console.log('onChangeValue: ',value);
          this.setState({errCargoHazadeous: false, CargoHazadeousString: value})
        }}
      />

{this.state.errCargoHazadeous && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4
    }}>{'This field can not be blank'}</Text> }
 
 <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black', marginTop: 15
}
}>{'Haulage Type'}</Text>

<DropDownPicker
containerProps={{
  height: this.state.openHaulage === true ? 240 : null,
  
}}
listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: true,
  }}
dropDownContainerStyle={{
  backgroundColor: "#ecf6fa",
  fontFamily: 'BebasNeuePro-Middle',
  fontSize: 26.4, //26.4
}}
style={{
  borderColor: "#4387bb",
  borderWidth: 1,
  backgroundColor: 'transparent'
}}
textStyle={{
  fontFamily: 'BebasNeuePro-Middle', fontSize: 20.4, color: 'black',
}}
// listItemContainerStyle={{ ...Platform.select({
//   ios: {
//     height: 60,
//     // numberOfLines: 2
//   },
//   android: {
//     height: 55
//   },
// })}}
placeholder=""
schema={{
  label: 'label1',
  value: 'value1'
}}
        open={this.state.openHaulage}
        value={this.state.valueHaulage}
        items={this.state.itemsHaulage}
        setOpen={this.setOpenHaulage}
        setValue={this.setValueHaulage}
        setItems={this.setItemsHaulage}
        onSelectItem={(item) => {
          console.log('onSelectItem::: ',item);
          this.setState({haulageValueString: item.label1})
          this.setState({errHaulageType: false, isAgreed: false, haulageIDString: item.value1, Collection_Time_String: '',
          Loading_Date_String: '', Loading_Time_String: '', LoadingAddressString: '', Delivery_Date_String: '',
          Delivery_Time_String: '',  Company_String: '', Address1_String: '', Address2_String: '',
          City_String: '', Country_String: '', PostalCode_String: '', Collection_Date_String: '',
          Collection_Time_String: '', isAgreed_LA: false, Company_String_LA: '', Address1_String_LA: '',
          Address2_String_LA: '', City_String_LA: '', Country_String_LA: '', PostalCode_String_LA: '',
        })
        }}
        onChangeValue={(value) => {
          console.log('onChangeValue1: ',value);
        }}
      />

{this.state.errHaulageType && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4
    }}>{'Haulage Type field can not be blank'}</Text> }

      { (this.state.valueHaulage == 'type1' || this.state.valueHaulage == 'type3') && <View>

      <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black', marginTop: 15
}
}>{'Loading Date'}</Text>

<TouchableOpacity onPress ={() => this.openDateTimePicker('date', true, 'Loading_Date')}>
<Text style={{
  fontFamily: 'BebasNeuePro-Middle', fontSize: 26.4,
                      borderColor: '#4387bb',
                      borderWidth: 1,
                      width: '100%',
                      color: 'black',
                      height: 48,
                      borderRadius: 8,
                      paddingLeft: 8,
                      textAlignVertical: 'center',
                      ...Platform.select({
                        ios: {
                          paddingTop: 6,
                         
                        },
                        android: {
                          
                        },
                      }),
                    }}>{this.state.Loading_Date_String}</Text>
</TouchableOpacity>

{this.state.errLoadingDate && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4
    }}>{'Loading Date field can not be blank'}</Text> }

      <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black', marginTop: 15
}
}>{'Loading Time'}</Text>

{ (this.state.valueHaulage == 'type1') && <DropDownPicker
containerProps={{
  height: this.state.openLoadingTime === true ? 120 : null,
  
}}
listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: true,
  }}
dropDownContainerStyle={{
  backgroundColor: "#ecf6fa",
  fontFamily: 'BebasNeuePro-Middle',
  fontSize: 26.4,
}}
style={{
  borderColor: "#4387bb",
  borderWidth: 1,
  backgroundColor: 'transparent'
}}
textStyle={{
  fontFamily: 'BebasNeuePro-Middle', fontSize: 26.4, color: 'black',
}}
placeholder=""
schema={{
  label: 'label1',
  value: 'value1'
}}
        open={this.state.openLoadingTime}
        value={this.state.Loading_Time_String}
        items={this.state.itemsLoadingTime}
        setOpen={this.setOpenLoadingTime}
        setValue={this.setValueLoadingTime}
        setItems={this.setItems}
        onSelectItem={(item) => {
          console.log('onSelectItem: ',item);
          // this.setState({containerSizeValueString: item.type})
        }}
        onChangeValue={(value) => {
          console.log('onChangeValue: ',value);
          this.setState({errLoadingTime: false, Loading_Time_String: value})
        }}
      /> }

{ (this.state.valueHaulage == 'type3') && <TouchableOpacity onPress ={() => this.openDateTimePicker('time', true, 'Loading_Time')}>
<Text style={{
  fontFamily: 'BebasNeuePro-Middle', fontSize: 26.4,
                      borderColor: '#4387bb',
                      borderWidth: 1,
                      width: '100%',
                      color: 'black',
                      height: 48,
                      borderRadius: 8,
                      paddingLeft: 8,
                      textAlignVertical: 'center',
                      ...Platform.select({
                        ios: {
                          paddingTop: 6,
                         
                        },
                        android: {
                          
                        },
                      }),
                    }}>{this.state.Loading_Time_String}</Text>
</TouchableOpacity> }

{this.state.errLoadingTime && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4
    }}>{'Loading Time field can not be blank'}</Text> }

{/* <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black', marginTop: 15
}}>{'Loading Address'}</Text>

<TextInput
                    style={{
                      fontFamily: 'BebasNeuePro-Middle',
                      fontSize: 26.4,
                      borderColor: '#4387bb',
                      borderWidth: 1,
                      width: '100%',
                      color: 'black',
                      height: 120,
                      borderRadius: 8,
                      paddingLeft: 8
                    }}
                    placeholder="Type here"
                    // ref ={ref => this.inputText1 = ref}
                    // editable={this.state.iseditablefname}
                    onChangeText={value => this.setLoadingAddress(value)}
                    textAlignVertical={'top'}
                    numberOfLines = {5}
                    multiline = {true}
                    value={this.state.LoadingAddressString}
                    keyboardType="default"></TextInput>

{this.state.errLoadingAddress && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4
    }}>{'Loading Address field can not be blank'}</Text> } */}

<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
<Text style={{fontFamily: 'BebasNeuePro-Middle', alignSelf: 'flex-start',
color: '#000',padding: 4, fontSize: 26.4, color: 'black', marginTop: 15
}}>{'Loading Address'}</Text>

{/* <Text style={{fontFamily: 'BebasNeuePro-Middle', alignSelf: 'flex-end',
color: '#000',padding: 4, fontSize: 26.4, color: 'black', marginTop: 15
}}>{'Delivery Address'}</Text> */}

<View style = {{flexDirection: 'row',   alignSelf: 'flex-end',
 marginRight: 8, alignItems: 'center', justifyContent: 'center', height: 40
}}>

<TouchableOpacity
      style={[
        {
          backgroundColor: 'null',
          marginTop: 10,
          // ...Platform.select({
          //   ios: {
          //     marginTop: -17.5
             
          //   },
          //   android: {
          //     marginTop: -2.5
          //   },
          // })
        },
      ]}
      onPress={() => this.setUserDefaultAddress_LA(!this.state.isAgreed_LA)}>
<Text style={{fontFamily: 'BebasNeuePro-Middle', alignSelf: 'flex-start',
color: '#000',padding: 4, fontSize: 18.4, color: 'black',
}}>{'Use Profile Address'}</Text> 
</TouchableOpacity>
<CheckBox
style={{ marginLeft: 4, marginTop: 12, ...Platform.select({
  ios: {
    width: 20, height: 20,
   
  },
  android: {
    width: 20, height: 20, marginLeft: -5
  },
}),}}
boxType = {'square'}
// onCheckColor = 'white'
// onFillColor = '#4387bb'
// tintColor = '#4387bb'
onCheckColor = '#4387bb'
tintColors={{ true: '#4387bb'}}

disabled={false}
value={this.state.isAgreed_LA}
onValueChange={(newValue) => this.setUserDefaultAddress_LA(newValue)}
/>
    
</View>
</View>


<TextInput
              style={{
                borderColor: '#4387bb',
                borderWidth: 1,
                width: '100%',
                color: 'black',
                height: 48,
                borderRadius: 8,
                paddingLeft: 8,
                fontFamily: 'BebasNeuePro-Middle',
                fontSize: 26.4,
                
              }}
              placeholder="Company:"
              onChangeText={value => this.setCompany_LA(value)}
              value={this.state.Company_String_LA}
              keyboardType='default'></TextInput>

{this.state.errCompany_LA && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4,
        
    }}>{'Company field can not be blank'}</Text> }

<TextInput
              style={{
                borderColor: '#4387bb',
                borderWidth: 1,
                width: '100%',
                color: 'black',
                height: 48,
                borderRadius: 8,
                paddingLeft: 8,
                fontFamily: 'BebasNeuePro-Middle',
                fontSize: 26.4,
                marginTop: 14
              }}
              placeholder="Address 1:"
              // ref ={ref => this.inputText1 = ref}
              // editable={this.state.iseditablefname}
              onChangeText={value => this.setAddress1_LA(value)}
              value={this.state.Address1_String_LA}
              keyboardType='default'></TextInput>

{this.state.errAddress1_LA && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4,
        
    }}>{'Address field can not be blank'}</Text> }

<TextInput
              style={{
                borderColor: '#4387bb',
                borderWidth: 1,
                width: '100%',
                color: 'black',
                height: 48,
                borderRadius: 8,
                paddingLeft: 8,
                fontFamily: 'BebasNeuePro-Middle',
                fontSize: 26.4,
                marginTop: 14
              }}
              placeholder="Address 2:"
              // ref ={ref => this.inputText1 = ref}
              // editable={this.state.iseditablefname}
              onChangeText={value => this.setAddress2_LA(value)}
              value={this.state.Address2_String_LA}
              keyboardType='default'></TextInput>

{this.state.errAddress2_LA && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4,
        
    }}>{'Address Line 2 field can not be blank'}</Text> }

<TextInput
              style={{
                borderColor: '#4387bb',
                borderWidth: 1,
                width: '100%',
                color: 'black',
                height: 48,
                borderRadius: 8,
                paddingLeft: 8,
                fontFamily: 'BebasNeuePro-Middle',
                fontSize: 26.4,
                marginTop: 14
              }}
              placeholder="City:"
              // ref ={ref => this.inputText1 = ref}
              // editable={this.state.iseditablefname}
              onChangeText={value => this.setCity_LA(value)}
              value={this.state.City_String_LA}
              keyboardType='default'></TextInput>

{this.state.errCity_LA && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4,
        
    }}>{'City field can not be blank'}</Text> }

<TextInput
              style={{
                borderColor: '#4387bb',
                borderWidth: 1,
                width: '100%',
                color: 'black',
                height: 48,
                borderRadius: 8,
                paddingLeft: 8,
                fontFamily: 'BebasNeuePro-Middle',
                fontSize: 26.4,
                marginTop: 14
              }}
              placeholder="Country:"
              // ref ={ref => this.inputText1 = ref}
              // editable={this.state.iseditablefname}
              onChangeText={value => this.setCountry_LA(value)}
              value={this.state.Country_String_LA}
              keyboardType='default'></TextInput>

{this.state.errCountry_LA && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4,
        
    }}>{'Country field can not be blank'}</Text> }

<TextInput
              style={{
                borderColor: '#4387bb',
                borderWidth: 1,
                width: '100%',
                color: 'black',
                height: 48,
                borderRadius: 8,
                paddingLeft: 8,
                fontFamily: 'BebasNeuePro-Middle',
                fontSize: 26.4,
                marginTop: 14, 
              }}
              placeholder="Postal Code:"
              // ref ={ref => this.inputText1 = ref}
              // editable={this.state.iseditablefname}
              onChangeText={value => this.setPostalCode_LA(value)}
              value={this.state.PostalCode_String_LA}
              keyboardType='default'></TextInput>

{this.state.errPostalCode_LA && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4,
        
    }}>{'Postal Code field can not be blank'}</Text> }

        </View>}

        { (this.state.valueHaulage == 'type2' || this.state.valueHaulage == 'type4') && <View>

<Text style={{fontFamily: 'BebasNeuePro-Middle',
color: '#000',padding: 4, fontSize: 26.4, color: 'black', marginTop: 15
}
}>{'Delivery Date'}</Text>

<TouchableOpacity onPress ={() => this.openDateTimePicker('date', true, 'Delivery_Date')}>
<Text style={{
                borderColor: '#4387bb',
                borderWidth: 1,
                width: '100%',
                color: 'black',
                height: 48,
                borderRadius: 8,
                paddingLeft: 8,
                fontFamily: 'BebasNeuePro-Middle',
                fontSize: 26.4,
                textAlignVertical: 'center',
                ...Platform.select({
                  ios: {
                    paddingTop: 6,
                   
                  },
                  android: {
                    
                  },
                }),
              }}>{this.state.Delivery_Date_String}</Text>
</TouchableOpacity>

{this.state.errDeliveryDate && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4
    }}>{'Delivery Date field can not be blank'}</Text> }

<Text style={{fontFamily: 'BebasNeuePro-Middle',
color: '#000',padding: 4, fontSize: 26.4, color: 'black', marginTop: 15
}
}>{'Delivery Time'}</Text>

{ (this.state.valueHaulage == 'type4') && <TouchableOpacity onPress ={() => this.openDateTimePicker('time', true, 'Delivery_Time')}>
<Text style={{
                borderColor: '#4387bb',
                borderWidth: 1,
                width: '100%',
                color: 'black',
                height: 48,
                borderRadius: 8,
                paddingLeft: 8,
                fontFamily: 'BebasNeuePro-Middle',
                      fontSize: 26.4,
                textAlignVertical: 'center',
                ...Platform.select({
                  ios: {
                    paddingTop: 6,
                   
                  },
                  android: {
                    
                  },
                }),
              }}>{this.state.Delivery_Time_String}</Text>
</TouchableOpacity> }

 

{ (this.state.valueHaulage == 'type2') && <DropDownPicker
containerProps={{
  height: this.state.openDeliveryTime === true ? 120 : null,
  
}}
listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: true,
  }}
dropDownContainerStyle={{
  backgroundColor: "#ecf6fa",
  fontFamily: 'BebasNeuePro-Middle',
  fontSize: 26.4,
}}
style={{
  borderColor: "#4387bb",
  borderWidth: 1,
  backgroundColor: 'transparent'
}}
textStyle={{
  fontFamily: 'BebasNeuePro-Middle', fontSize: 26.4, color: 'black',
}}
placeholder=""
schema={{
  label: 'label1',
  value: 'value1'
}}
        open={this.state.openDeliveryTime}
        value={this.state.Delivery_Time_String}
        items={this.state.itemsLoadingTime}
        setOpen={this.setOpenDeliveryTime}
        setValue={this.setValueDeliveryTime}
        setItems={this.setItems}
        onSelectItem={(item) => {
          console.log('onSelectItem: ',item);
          // this.setState({containerSizeValueString: item.type})
        }}
        onChangeValue={(value) => {
          console.log('onChangeValue: ',value);
          this.setState({errDeliveryTime: false, Delivery_Time_String: value})
        }}
      /> }

{this.state.errDeliveryTime && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4
    }}>{'Delivery Time field can not be blank'}</Text> }

<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
<Text style={{fontFamily: 'BebasNeuePro-Middle', alignSelf: 'flex-start',
color: '#000',padding: 4, fontSize: 26.4, color: 'black', marginTop: 15
}}>{'Delivery Address'}</Text>

{/* <Text style={{fontFamily: 'BebasNeuePro-Middle', alignSelf: 'flex-end',
color: '#000',padding: 4, fontSize: 26.4, color: 'black', marginTop: 15
}}>{'Delivery Address'}</Text> */}

<View style = {{flexDirection: 'row',   alignSelf: 'flex-end',
 marginRight: 8, alignItems: 'center', justifyContent: 'center', height: 40
}}>

<TouchableOpacity
      style={[
        {
          backgroundColor: 'null',
          marginTop: 10,
          // ...Platform.select({
          //   ios: {
          //     marginTop: -17.5
             
          //   },
          //   android: {
          //     marginTop: -2.5
          //   },
          // })
        },
      ]}
      onPress={() => this.setUserDefaultAddress(!this.state.isAgreed)}>
<Text style={{fontFamily: 'BebasNeuePro-Middle', alignSelf: 'flex-start',
color: '#000',padding: 4, fontSize: 18.4, color: 'black',
}}>{'Use Profile Address'}</Text> 
</TouchableOpacity>
<CheckBox
style={{ marginLeft: 4, marginTop: 12, ...Platform.select({
  ios: {
    width: 20, height: 20,
   
  },
  android: {
    width: 20, height: 20, marginLeft: -5
  },
}),}}
boxType = {'square'}
// onCheckColor = 'white'
// onFillColor = '#4387bb'
// tintColor = '#4387bb'
onCheckColor = '#4387bb'
tintColors={{ true: '#4387bb'}}

disabled={false}
value={this.state.isAgreed}
onValueChange={(newValue) => this.setUserDefaultAddress(newValue)}
/>
    
</View>
</View>
{/* <TextInput
              style={{
                borderColor: '#4387bb',
                borderWidth: 1,
                width: '100%',
                color: 'black',
                height: 120,
                borderRadius: 8,
                paddingLeft: 8,
                fontFamily: 'BebasNeuePro-Middle',
                fontSize: 26.4,
              }}
              placeholder="Type here"
              // ref ={ref => this.inputText1 = ref}
              // editable={this.state.iseditablefname}
              onChangeText={value => this.setDeliveryAddress(value)}
              textAlignVertical={'top'}
              numberOfLines = {5}
              multiline = {true}
              value={this.state.DeliveryAddressString}
              keyboardType="default"></TextInput> */}

<TextInput
              style={{
                borderColor: '#4387bb',
                borderWidth: 1,
                width: '100%',
                color: 'black',
                height: 48,
                borderRadius: 8,
                paddingLeft: 8,
                fontFamily: 'BebasNeuePro-Middle',
                fontSize: 26.4,
                
              }}
              placeholder="Company:"
              // ref ={ref => this.inputText1 = ref}
              // editable={this.state.iseditablefname}
              onChangeText={value => this.setCompany(value)}
              value={this.state.Company_String}
              keyboardType='default'></TextInput>

{this.state.errCompany && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4,
        
    }}>{'Company field can not be blank'}</Text> }

<TextInput
              style={{
                borderColor: '#4387bb',
                borderWidth: 1,
                width: '100%',
                color: 'black',
                height: 48,
                borderRadius: 8,
                paddingLeft: 8,
                fontFamily: 'BebasNeuePro-Middle',
                fontSize: 26.4,
                marginTop: 14
              }}
              placeholder="Address 1:"
              // ref ={ref => this.inputText1 = ref}
              // editable={this.state.iseditablefname}
              onChangeText={value => this.setAddress1(value)}
              value={this.state.Address1_String}
              keyboardType='default'></TextInput>

{this.state.errAddress1 && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4,
        
    }}>{'Address field can not be blank'}</Text> }

<TextInput
              style={{
                borderColor: '#4387bb',
                borderWidth: 1,
                width: '100%',
                color: 'black',
                height: 48,
                borderRadius: 8,
                paddingLeft: 8,
                fontFamily: 'BebasNeuePro-Middle',
                fontSize: 26.4,
                marginTop: 14
              }}
              placeholder="Address 2:"
              // ref ={ref => this.inputText1 = ref}
              // editable={this.state.iseditablefname}
              onChangeText={value => this.setAddress2(value)}
              value={this.state.Address2_String}
              keyboardType='default'></TextInput>

{this.state.errAddress2 && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4,
        
    }}>{'Address Line 2 field can not be blank'}</Text> }

<TextInput
              style={{
                borderColor: '#4387bb',
                borderWidth: 1,
                width: '100%',
                color: 'black',
                height: 48,
                borderRadius: 8,
                paddingLeft: 8,
                fontFamily: 'BebasNeuePro-Middle',
                fontSize: 26.4,
                marginTop: 14
              }}
              placeholder="City:"
              // ref ={ref => this.inputText1 = ref}
              // editable={this.state.iseditablefname}
              onChangeText={value => this.setCity(value)}
              value={this.state.City_String}
              keyboardType='default'></TextInput>

{this.state.errCity && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4,
        
    }}>{'City field can not be blank'}</Text> }

<TextInput
              style={{
                borderColor: '#4387bb',
                borderWidth: 1,
                width: '100%',
                color: 'black',
                height: 48,
                borderRadius: 8,
                paddingLeft: 8,
                fontFamily: 'BebasNeuePro-Middle',
                fontSize: 26.4,
                marginTop: 14
              }}
              placeholder="Country:"
              // ref ={ref => this.inputText1 = ref}
              // editable={this.state.iseditablefname}
              onChangeText={value => this.setCountry(value)}
              value={this.state.Country_String}
              keyboardType='default'></TextInput>

{this.state.errCountry && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4,
        
    }}>{'Country field can not be blank'}</Text> }

<TextInput
              style={{
                borderColor: '#4387bb',
                borderWidth: 1,
                width: '100%',
                color: 'black',
                height: 48,
                borderRadius: 8,
                paddingLeft: 8,
                fontFamily: 'BebasNeuePro-Middle',
                fontSize: 26.4,
                marginTop: 14, 
              }}
              placeholder="Postal Code:"
              // ref ={ref => this.inputText1 = ref}
              // editable={this.state.iseditablefname}
              onChangeText={value => this.setPostalCode(value)}
              value={this.state.PostalCode_String}
              keyboardType='default'></TextInput>

{this.state.errPostalCode && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4,
        
    }}>{'Postal Code field can not be blank'}</Text> }

<Text style={{fontFamily: 'BebasNeuePro-Middle',
color: '#000',padding: 4, fontSize: 26.4, color: 'black', marginTop: 15
} 
}>{'Collection Date'}</Text>

<TouchableOpacity onPress ={() => this.openDateTimePicker('date', true, 'Collection_Date')}>
<Text style={{
                borderColor: '#4387bb',
                borderWidth: 1,
                width: '100%',
                color: 'black',
                height: 48,
                borderRadius: 8,
                paddingLeft: 8,
                textAlignVertical: 'center',
                fontFamily: 'BebasNeuePro-Middle',
                      fontSize: 26.4,
                ...Platform.select({
                  ios: {
                    paddingTop: 6,
                   
                  },
                  android: {
                    
                  },
                }),
              }}>{this.state.Collection_Date_String}</Text>
</TouchableOpacity>

{this.state.errCollectionDate && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4
    }}>{'Collection Date field can not be blank'}</Text> }

{ (this.state.valueHaulage == 'type2') && <View> 
  <Text style={{fontFamily: 'BebasNeuePro-Middle',
color: '#000',padding: 4, fontSize: 26.4, color: 'black', marginTop: 15
}
}>{'Collection Time'}</Text>

<DropDownPicker
containerProps={{
  height: this.state.openCollectionTime === true ? 120 : null,
  
}}
listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: true,
  }}
dropDownContainerStyle={{
  backgroundColor: "#ecf6fa",
  fontFamily: 'BebasNeuePro-Middle',
  fontSize: 26.4,
}}
style={{
  borderColor: "#4387bb",
  borderWidth: 1,
  backgroundColor: 'transparent'
}}
textStyle={{
  fontFamily: 'BebasNeuePro-Middle', fontSize: 26.4, color: 'black',
}}
placeholder=""
schema={{
  label: 'label1',
  value: 'value1'
}}
        open={this.state.openCollectionTime}
        value={this.state.Collection_Time_String}
        items={this.state.itemsLoadingTime}
        setOpen={this.setOpenCollectionTime}
        setValue={this.setValueCollectionTime}
        setItems={this.setItems}
        onSelectItem={(item) => {
          console.log('onSelectItem: ',item);
          // this.setState({containerSizeValueString: item.type})
        }}
        onChangeValue={(value) => {
          console.log('onChangeValue: ',value);
          this.setState({errCollectionTime: false, Collection_Time_String: value})
        }}
      />

{this.state.errCollectionTime && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4
    }}>{'Collection Time field can not be blank'}</Text> }

  </View> }

{ (this.state.valueHaulage == 'type4') && <View> 
  <Text style={{fontFamily: 'BebasNeuePro-Middle',
color: '#000',padding: 4, fontSize: 26.4, color: 'black', marginTop: 15
}
}>{'Collection Time'}</Text>

<TouchableOpacity onPress ={() => this.openDateTimePicker('time', true, 'Collection_Time')}>
<Text style={{
                borderColor: '#4387bb',
                borderWidth: 1,
                width: '100%',
                color: 'black',
                height: 48,
                borderRadius: 8,
                paddingLeft: 8,
                textAlignVertical: 'center',
                fontFamily: 'BebasNeuePro-Middle',
                      fontSize: 26.4,
                ...Platform.select({
                  ios: {
                    paddingTop: 6,
                   
                  },
                  android: {
                    
                  },
                }),
              }}>{this.state.Collection_Time_String}</Text>
</TouchableOpacity>

{this.state.errCollectionTime && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4
    }}>{'Collection Time field can not be blank'}</Text> }

  </View> } 

  </View> }

  { (this.state.valueHaulage == 'type5') && <View>

  <TouchableOpacity style={{marginTop: 15, alignItems: 'center'}} onPress ={() => console.log('dsd')}>
<Text style={{
                // borderColor: '#4387bb',
                // borderWidth: 1,
                width: '100%',
                color: 'white',
                height: 90,
                borderRadius: 8,
                paddingRight: 8,
                paddingLeft: 8,
                textAlignVertical: 'center',
                textAlign: 'center',
                backgroundColor: '#4387bb',
                fontFamily: 'BebasNeuePro-Middle',
                fontSize: 26.4,
                ...Platform.select({
                  ios: {
                    paddingTop: 31,
                   
                  },
                  android: {
                    
                  },
                }),
                
              }}>{'You are arranging your own haulage'}</Text>
</TouchableOpacity>

  </View>}

  { (this.state.valueHaulage == 'type6') && <View>

  <TouchableOpacity style={{marginTop: 15}} onPress ={() => Linking.openURL(`tel:${'+44(0)1371879400'}`)}>
<Text style={{
                // borderColor: '#4387bb',
                // borderWidth: 1,
                width: '100%',
                color: 'white',
                height: 90,
                borderRadius: 8,
                paddingLeft: 8,
                paddingRight: 8,
                textAlignVertical: 'center',
                textAlign: 'center',
                backgroundColor: '#4387bb',
                fontFamily: 'BebasNeuePro-Middle',
                fontSize: 26.4,
                ...Platform.select({
                  ios: {
                    paddingTop: 15,
                   
                  },
                  android: {
                    
                  },
                }),
              }}>{'Please contact the Containerlift team on +44(0)1371879400'}</Text>
</TouchableOpacity>

  </View>}  

  <Text style={{fontFamily: 'BebasNeuePro-Middle',
color: '#000',padding: 4, fontSize: 26.4, color: 'black', marginTop: 15
}}>{'Agreed Price £'}</Text>

{/* <DropDownPicker
containerProps={{
  height: this.state.openAgreedPrice === true ? 120 : null,
  
}}
listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: true,
  }}
dropDownContainerStyle={{
  backgroundColor: "#ecf6fa",
  fontFamily: 'BebasNeuePro-Middle',
  fontSize: 26.4,
}}
style={{
  borderColor: "#4387bb",
  borderWidth: 1,
  backgroundColor: 'transparent'
}}
textStyle={{
  fontFamily: 'BebasNeuePro-Middle', fontSize: 26.4, color: 'black',
}}
placeholder=""
schema={{
  label: 'label1',
  value: 'value1'
}}
        open={this.state.openAgreedPrice}
        value={this.state.AgreedPriceString}
        items={this.state.itemsContainerPurchase}
        setOpen={this.setOpenAgreedPrice}
        setValue={this.setValueAgreedPrice}
        setItems={this.setItems}
        onSelectItem={(item) => {
          console.log('onSelectItem: ',item);
          // this.setState({containerSizeValueString: item.type})
        }}
        onChangeValue={(value) => {
          console.log('onChangeValue: ',value);
          this.setState({errAgreedPrice: false, AgreedPriceString: value})
        }}
      /> */}

<TextInput
              style={{
                borderColor: '#4387bb',
                borderWidth: 1,
                width: '100%',
                color: 'black',
                height: 48,
                borderRadius: 8,
                paddingLeft: 8,
                fontFamily: 'BebasNeuePro-Middle',
                      fontSize: 26.4,
              }}
              placeholder=""
              // ref ={ref => this.inputText1 = ref}
              // editable={this.state.iseditablefname}
              onChangeText={value => this.setAgreedPrice(value)}
              value={this.state.AgreedPriceString}
              keyboardType='decimal-pad'></TextInput>

{this.state.errAgreedPrice && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4
    }}>{'Agreed Price field can not be blank'}</Text> }

<Text style={{fontFamily: 'BebasNeuePro-Middle',
color: '#000',padding: 4, fontSize: 26.4, color: 'black', marginTop: 15
}}>{'Total Cargo Weight (Kg)'}</Text>

<TextInput
              style={{
                borderColor: '#4387bb',
                borderWidth: 1,
                width: '100%',
                color: 'black',
                height: 48,
                borderRadius: 8,
                paddingLeft: 8,
                fontFamily: 'BebasNeuePro-Middle',
                fontSize: 26.4,
              }}
              placeholder=""
              // ref ={ref => this.inputText1 = ref}
              // editable={this.state.iseditablefname}
              onChangeText={value => this.setTotalCargoWeight(value)}
              value={this.state.TotalCargoWeightString}
              keyboardType='decimal-pad'></TextInput>

{this.state.errTotalCargoWeight && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4
    }}>{'Total Cargo Weight field can not be blank'}</Text> }

<Text style={{fontFamily: 'BebasNeuePro-Middle',
color: '#000',padding: 4, fontSize: 26.4, color: 'black', marginTop: 15
}}>{'Destination Country'}</Text>

{/* <TextInput
              style={{
                borderColor: '#4387bb',
                borderWidth: 1,
                width: '100%',
                color: 'black',
                height: 48,
                borderRadius: 8,
                paddingLeft: 8,
                fontFamily: 'BebasNeuePro-Middle',
                      fontSize: 26.4,
              }}
              placeholder=""
              // ref ={ref => this.inputText1 = ref}
              // editable={this.state.iseditablefname}
              onChangeText={value => this.setDestinationCountry(value)}
              value={this.state.DestinationCountryString}
              keyboardType='default'></TextInput> */}

<DropDownPicker
containerProps={{
  height: this.state.openDestinationCountry === true ? 240 : null,
}}
listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: true,
  }}
dropDownContainerStyle={{
  backgroundColor: "#ecf6fa",
  fontFamily: 'BebasNeuePro-Middle',
  fontSize: 26.4,
}}
style={{
  borderColor: "#4387bb",
  borderWidth: 1,
  backgroundColor: 'transparent'
}}
textStyle={{
  fontFamily: 'BebasNeuePro-Middle', fontSize: 26.4, color: 'black',
}}
placeholder=""
schema={{
  label: 'country_name',
  value: 'id'
}}
        open={this.state.openDestinationCountry}
        value={this.state.DestinationCountryIDString}
        items={this.state.itemsDestinationCountry}
        setOpen={this.setOpenDestinationCountry}
        setValue={this.setValueDestinationCountry}
        setItems={this.setItems}
        onSelectItem={(item) => {
          console.log('onSelectItem: ',item);
          this.setState({DestinationCountryString: item.country_name})
          this.setState({DestinationPortString: '', DestinationPortIDString: '', itemsDestinationPort: []})
          this.setState({errDestinationCountry: false, DestinationCountryIDString: item.id})
        }}
        onChangeValue={(value) => {
          console.log('onChangeValue Destination Country: ',value);
        }}
      />

{this.state.errDestinationCountry && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4
    }}>{'Destination Country field can not be blank'}</Text> }

<Text style={{fontFamily: 'BebasNeuePro-Middle',
color: '#000',padding: 4, fontSize: 26.4, color: 'black', marginTop: 15
}}>{'Destination Port'}</Text>

{/* <TextInput
              style={{
                borderColor: '#4387bb',
                borderWidth: 1,
                width: '100%',
                color: 'black',
                height: 48,
                borderRadius: 8,
                paddingLeft: 8,
                fontFamily: 'BebasNeuePro-Middle',
                      fontSize: 26.4,
              }}
              placeholder=""
              // ref ={ref => this.inputText1 = ref}
              // editable={this.state.iseditablefname}
              onChangeText={value => this.setDestinationPort(value)}
              value={this.state.DestinationPortString}
              keyboardType='default'></TextInput> */}

<DropDownPicker
containerProps={{
  height: this.state.openDestinationPort === true ? this.state.portDropdownHeight : null,
  
}}
listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: true,
  }}
dropDownContainerStyle={{
  backgroundColor: "#ecf6fa",
  fontFamily: 'BebasNeuePro-Middle',
  fontSize: 26.4,
}}
style={{
  borderColor: "#4387bb",
  borderWidth: 1,
  backgroundColor: 'transparent'
}}
textStyle={{
  fontFamily: 'BebasNeuePro-Middle', fontSize: 26.4, color: 'black',
}}
placeholder=""
schema={{
  label: 'port_name',
  value: 'id'
}}
        open={this.state.openDestinationPort}
        value={this.state.DestinationPortIDString}
        items={this.state.itemsDestinationPort}
        setOpen={this.setOpenDestinationPort}
        setValue={this.setValueDestinationPort}
        setItems={this.setItems}
        onSelectItem={(item) => {
          this.setState({DestinationPortString: item.port_name, errDestinationPort: false, DestinationPortIDString: item.id})
        }}
        onChangeValue={(value) => {
          console.log('onChangeValue DestinationPortVString: ',value);          
        }}
      />

{this.state.errDestinationPort && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4
    }}>{'Destination Port field can not be blank'}</Text> }



{/* <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black', marginTop: 15
}
}>{'Loading Time'}</Text>

<TouchableOpacity onPress ={() => this.openDateTimePicker('time', true, 'Loading_Time')}>
<Text style={{
                      borderColor: '#4387bb',
                      borderWidth: 1,
                      width: '100%',
                      color: 'black',
                      height: 48,
                      borderRadius: 8,
                      paddingLeft: 8,
                      fontFamily: 'BebasNeuePro-Middle',
                      fontSize: 26.4,
                      textAlignVertical: 'center',
                      ...Platform.select({
                        ios: {
                          paddingTop: 6,
                         
                        },
                        android: {
                          
                        },
                      }),
                    }}>{this.state.Loading_Time_String}</Text>
</TouchableOpacity>

{this.state.errLoadingTime && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4
    }}>{'Loading Time field can not be blank'}</Text> } */}

<Text style={{fontFamily: 'BebasNeuePro-Middle',
color: '#000',padding: 4, fontSize: 26.4, color: 'black', marginTop: 15
}}>{'Site Contact Name'}</Text>

<TextInput
              style={{
                borderColor: '#4387bb',
                borderWidth: 1,
                width: '100%',
                color: 'black',
                height: 48,
                borderRadius: 8,
                paddingLeft: 8,
                fontFamily: 'BebasNeuePro-Middle',
                      fontSize: 26.4,
              }}
              placeholder=""
              // ref ={ref => this.inputText1 = ref}
              // editable={this.state.iseditablefname}
              onChangeText={value => this.setSiteContactName(value)}
              value={this.state.SiteContactNameString}
              keyboardType='default'></TextInput>

{this.state.errSiteContactName && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4
    }}>{'Site Contact Name field can not be blank'}</Text> }

<Text style={{fontFamily: 'BebasNeuePro-Middle',
color: '#000',padding: 4, fontSize: 26.4, color: 'black', marginTop: 15
}}>{'Site Contact Tel Number'}</Text>

<TextInput
              style={{
                borderColor: '#4387bb',
                borderWidth: 1,
                width: '100%',
                color: 'black',
                height: 48,
                borderRadius: 8,
                paddingLeft: 8,
                fontFamily: 'BebasNeuePro-Middle',
                      fontSize: 26.4,
              }}
              placeholder=""
              // ref ={ref => this.inputText1 = ref}
              // editable={this.state.iseditablefname}
              onChangeText={value => this.setSiteContactTelNumber(value)}
              value={this.state.SiteContactTelnoString}
              keyboardType='phone-pad'></TextInput>

{this.state.errSiteContactTelNumber && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4
    }}>{'Site Contact Tel Number field can not be blank'}</Text> }

<Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black', marginTop: 15
}}>{'Additional Shipping Information'}</Text>

<TextInput
                    style={{
                      borderColor: '#4387bb',
                      borderWidth: 1,
                      width: '100%',
                      color: 'black',
                      height: 120,
                      borderRadius: 8,
                      paddingLeft: 8,
                      fontFamily: 'BebasNeuePro-Middle',
                      fontSize: 26.4,
                    }}
                    placeholder="Type Here"
                    // ref ={ref => this.inputText1 = ref}
                    // editable={this.state.iseditablefname}
                    onChangeText={value => this.setAdditionalShippingInformation(value)}
                    textAlignVertical={'top'}
                    numberOfLines = {5}
                    multiline = {true}
                    value={this.state.AdditionalShippingInformationString}
                    keyboardType="default"></TextInput>

{this.state.errAdditionalShippingInformation && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4
    }}>{'Additional Shipping Information field can not be blank'}</Text> }

{/* <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black', marginTop: 15
}}>{'Loading Address'}</Text>

<TextInput
                    style={{
                      borderColor: '#4387bb',
                      borderWidth: 1,
                      width: '100%',
                      color: 'black',
                      height: 120,
                      borderRadius: 8,
                      paddingLeft: 8,
                      fontFamily: 'BebasNeuePro-Middle',
                      fontSize: 26.4,
                    }}
                    placeholder="Type here"
                    // ref ={ref => this.inputText1 = ref}
                    // editable={this.state.iseditablefname}
                    onChangeText={value => this.setLoadingAddress(value)}
                    textAlignVertical={'top'}
                    numberOfLines = {5}
                    multiline = {true}
                    value={this.state.LoadingAddressString}
                    keyboardType="default"></TextInput>

{this.state.errLoadingAddress && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4
    }}>{'Loading Address field can not be blank'}</Text> } */}
  
{/* <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black', marginTop: 15
}}>{'Loading Postcode'}</Text>

<TextInput
                    style={{
                      borderColor: '#4387bb',
                      borderWidth: 1,
                      width: '100%',
                      color: 'black',
                      height: 48,
                      borderRadius: 8,
                      paddingLeft: 8,
                      fontFamily: 'BebasNeuePro-Middle',
                      fontSize: 26.4,
                    }}
                    placeholder=""
                    // ref ={ref => this.inputText1 = ref}
                    // editable={this.state.iseditablefname}
                    onChangeText={value => this.setLoadingPostCode(value)}
                    value={this.state.LoadingPostcodeString}
                    keyboardType="default"></TextInput>

{this.state.errLoadingPostcode && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 4
    }}>{'Loading Postcode field can not be blank'}</Text> } */}

<View style={{
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: 0,
        marginTop: 49,
        marginRight: 0,
        alignSelf: 'flex-end'
      }}>
              <AnimateLoadingButton
              ref={c => (this.loadingButton = c)}
              width={160}
              height={50}
              titleFontFamily='BebasNeuePro-Bold'
              title="Submit"
              titleFontSize={26.4}
              titleColor="rgb(255,255,255)"
              backgroundColor="#4387bb"
              borderRadius={8}
              onPress={this._onPressBotton1Handler.bind(this)}
            />
          </View>

          {/* <DatePicker1
        style={{borderColor: '#4387bb',
        borderWidth: 1,
        width: '100%',
        color: 'black',
        height: 50,
        borderRadius: 8,
        paddingLeft: 0,
        fontFamily: 'BebasNeuePro-Middle',
              fontSize: 26.4,}}
        date={this.state.date}
        mode={'time'}
        // onOpenModal={this.state.modeDateTimePicker}
        placeholder=""
         format="h:mm a"
        minDate="2000-01-01"
        maxDate="2099-12-30"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            // position: 'absolute',
            // left: 0,
            // top: 4,
            // marginLeft: 0
          },
          dateInput: {
            alignSelf: 'flex-start',
            borderWidth: 0,
            textAlignVertical: 'center',
            justifyContent: 'center', height: 50
          },
        
        dateText: {alignSelf: 'flex-start', paddingLeft: 13, borderWidth: 0, fontFamily: 'BebasNeuePro-Middle',
        fontSize: 26.4,}
        
      
        }}
        
        onDateChange={(date) => this.onChangeDateTimePicker(date, 'Loading_Time')}
        // getDateStr={(date) => console.log('date is: ', date)}
      />  */}

        <View style={{height: 115}}></View>

        
        
</View>
       
{/* <DropDownPicker
placeholder="Select category"
        open={this.state.open}
        value={this.state.value}
        items={this.state.items}
        setOpen={this.setOpen}
        setValue={this.setValue}
        setItems={this.setItems}
      />
   
<DropDownPicker
        open={this.state.open1}
        value={this.state.value1}
        items={this.state.items1}
        setOpen={this.setOpen1}
        setValue={this.setValue1}
        setItems={this.setItems1}
      /> */}

{/* outline_arrow_right_alt_black_48.png */}



          </ScrollView>

          

          {/* <DatePicker
        modal
        androidVariant="iosClone"
        mode={this.state.modeDateTimePicker}
        open={this.state.openDateTimePicker}
        date={this.state.date}
        onConfirm={(date) => this.onChangeDateTimePicker(date, this.state.flag)
        }
        onCancel={() => {
         this.setState({
            openopenDateTimePicker: false,
      
          });
        }}
      /> */}

 

<DateTimePicker

mode={this.state.modeDateTimePicker}
maxDate={new Date("2040-12-31")}
        minDate={new Date(this.state.futureDateString)}
// minDate={new Date("1980-12-31")}
// maxDate={new Date(this.state.futureDateString)}
        value={this.state.date}
        minuteInterval={15}
        
        dateTimePickerVisible={this.state.openDateTimePicker}
        onDateChange={val => this.setState({date: val})
        }
        onBackdropPress={() => this.setState({openDateTimePicker: false})}
        onPressDone={vallll => this.onChangeDateTimePicker(vallll, this.state.flag)}
      />


<TabBarCommon screenName={'NewOrder1'}  
navigation={this.props.navigation} /> 

    <Modal style={{
        alignItems: 'center',
        backgroundColor: '#00000040',
        position: 'absolute',
top: -20,
left: -20,
right: 0,
bottom: 0,
width: '100%',
height: '100%'
    }}
            transparent={true}
            animationType={'none'}
            visible={this.state.loading}
            onRequestClose={() => {console.log('close modal')}}>
            <View style={{
        // flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',

        position: 'absolute',
top: 0,
left: 0,
right: 0,
bottom: 0,
width: '100%',
height: '100%'
    }}>
                <View style={{
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }}>
                    <ActivityIndicator
                        animating={this.state.loading} />
                </View>
            </View>
        </Modal>

        <SideMenuCommon screenName={'NewOrder1'} isVisible={this.state.isModalVisible}  
navigation={this.props.navigation} 
handleModalVisible={this.handleModalVisible}
/>

      

      </View>
      
    );
  }

  handleModalVisible = (value) => {
    this.setState({ isModalVisible: value });
  }

  fetchOrderDetails = async () => {
    var bearer = 'Bearer ' + this.state.tokenString;
    fetch(UrlUtil.BASE_URL + 'get-booking-details', {
      method: 'POST', //Request Type
      headers: {
        Authorization: bearer,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.props.route.params.record_id,
      }),
    })
      .then(response => response.json())
      //If response is in json then in success
      .then(responseJson => {
        // alert(JSON.stringify(responseJson));
        console.log('fetchOrderDetails response: ', responseJson, responseJson.data[0].destinationcountry);
  
        if (responseJson.success == false) {
        } else {
    
          var delivery_address = responseJson.data[0].customdeliveryaddress;
          var loading_address = responseJson.data[0].customloadingaddress;
  
  
  
          if (responseJson.data[0].haulage_type == 'type1') {
            this.setState({
              haulageValueString: 'Sidelifter (lifted to ground): Wait & load',
              LoadingAddressString: responseJson.data[0].loading_address,
              Company_String_LA: loading_address.company,
              Address1_String_LA: loading_address.address1,
              Address2_String_LA: loading_address.address2,
              City_String_LA: loading_address.city,
              Country_String_LA: loading_address.county,
              PostalCode_String_LA: loading_address.post_code,
            });
          } else if (responseJson.data[0].haulage_type == 'type2') {
            console.log('dasdaskdhaskjdhajksd===', delivery_address.company)
            this.setState({
              haulageValueString:
                'Sidelifter (lifted to ground): Drop & Collect',
              DeliveryAddressString: responseJson.data[0].delivery_address,
              Company_String: delivery_address.company,
              Address1_String: delivery_address.address1,
              Address2_String: delivery_address.address2,
              City_String: delivery_address.city,
              Country_String: delivery_address.county,
              PostalCode_String: delivery_address.post_code,
            });
          } else if (responseJson.data[0].haulage_type == 'type3') {
            this.setState({
              haulageValueString: 'Standard (on trailer): Wait & load',
              LoadingAddressString: responseJson.data[0].loading_address,
              Company_String_LA: loading_address.company,
              Address1_String_LA: loading_address.address1,
              Address2_String_LA: loading_address.address2,
              City_String_LA: loading_address.city,
              Country_String_LA: loading_address.county,
              PostalCode_String_LA: loading_address.post_code,
            });
          } else if (responseJson.data[0].haulage_type == 'type4') {
            this.setState({
              haulageValueString:
                'Standard (on trailer): Trailer Drop & Collect',
              DeliveryAddressString: responseJson.data[0].delivery_address,
              Company_String: delivery_address.company,
              Address1_String: delivery_address.address1,
              Address2_String: delivery_address.address2,
              City_String: delivery_address.city,
              Country_String: delivery_address.county,
              PostalCode_String: delivery_address.post_code,
            });
          } else if (responseJson.data[0].haulage_type == 'type5') {
            this.setState({
              haulageValueString: 'Standard (on trailer): Quay to Quay',
            });
          } else if (responseJson.data[0].haulage_type == 'type6') {
            this.setState({haulageValueString: 'Other'});
          } else {
          }
  
          if (responseJson.data[0].container_purchase == 'No' || responseJson.data[0].container_purchase == 'NO')
            {
              this.setState({containerPurchaseString: 'NO'})
            }
            else
            {
              this.setState({containerPurchaseString: 'YES'})
            }
  
            if (responseJson.data[0].is_the_cargo_hazadeous == 'No' || responseJson.data[0].is_the_cargo_hazadeous == 'NO')
            {
              this.setState({CargoHazadeousString: 'NO'})
            }
            else
            {
              this.setState({CargoHazadeousString: 'YES'})
            }


            this.setState({
            DestinationCountryIDString: responseJson.data[0].destinationcountry.id,
            DestinationCountryString: responseJson.data[0].destinationcountry.country_name,
          }, () => {
            if (this.props.route.params) 
            {
              this.setOpenDestinationPort1(responseJson.data[0].destinationport.id, responseJson.data[0].destinationport.port_name);
            }
          });
  
          this.setState({
            companyIDString: responseJson.data[0].ref,
            containerSizeIDString: responseJson.data[0].containersizetype.id,
            containerSizeValueString:
              responseJson.data[0].containersizetype.type,
              valueHaulage: responseJson.data[0].haulage_type,
              haulageIDString: responseJson.data[0].haulage_type,
            cargoTypeString: responseJson.data[0].cargo_type,
            AgreedPriceString: responseJson.data[0].agreed_price,
            TotalCargoWeightString: responseJson.data[0].total_cargo_weight,
            SiteContactNameString: responseJson.data[0].site_contact_name,
            SiteContactTelnoString:
              responseJson.data[0].site_contact_tel_number,
            AdditionalShippingInformationString:
              responseJson.data[0].additional_shipping_information,
          });
        }
      })
      //If response is not in json then in error
      .catch(error => {
        alert(
          'Netwok request failed. Please check your internet connection and try again',
        );
        console.error(error);
      });
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor: "#ecf6fa",
    // backgroundColor: "#ecf6fa",
    marginTop: 0,
    zIndex: 0
  },
  textLabel: {
    fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 26.4, color: 'black'
  },
  textInputField: {

  },
  dropDownContainerStyle:
  {

  },
  dropdownstyle:
  {

  },
  textInputFieldMultiline:
  {

  },
  mainView: {paddingTop: 1,
    marginTop: 20,
    
    marginVertical:5,
    marginLeft: 18,
    marginRight: 18,},

  dashboard_main_headers : {
    // backgroundColor: '#f55656',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  dashboard_headers_Menu_View : {
    width: '50%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  dashboard_headers_Create_View : {
    width: '50%',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  menu_icon: {
    width: 30,
    height: 30,
    marginStart: 4,
     marginTop: 4,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    tintColor: '#4387bb',
    
  },
  create_icon: {
    width: 30,
    height: 30,
    marginEnd: 10,
     marginTop: 4,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    tintColor: '#4387bb'
  },
  animatedBox: {
    flex: 1,
    backgroundColor: "#38C8EC",
    padding: 10
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F04812'
  },
  footer: {
    position: 'absolute',
    height: 80,
    left: 0, 
    // top: Dimensions.get('window').height - 100, 
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    bottom:0,
    // opacity: 0.9,

    borderTopWidth: 1,
    // borderRadius: 20,
    borderColor: 'white',
    borderBottomWidth: 0,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 5,
    flexDirection: 'row',
          justifyContent: 'flex-start',
          alignContent: 'flex-start',
          alignItems: 'flex-start',
          shadowColor: 'grey',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 3,
  },
})