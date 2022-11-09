import React,{Component, useState} from 'react';
import { AppState, Linking, Platform, StatusBar, View, Text, StyleSheet, FlatList, AsyncStorage, ScrollView, TouchableOpacity, SafeAreaView, Image, Dimensions } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker'
import AnimateLoadingButton from 'react-native-animate-loading-button';
import CheckBox from '@react-native-community/checkbox';
import Toast from 'react-native-simple-toast';
import Modal from "react-native-modal";
import UrlUtil from '../utils/ConfigApp';
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      appState: AppState.currentState,
      checkNavigationDone: false,
      isAgreed : false,
      value: 'fsdfdsf',
      date: new Date(),
      tokenString: '',
      companyNameString: '',
      companyIDString: '',
      emailString: '',
      phoneNoString:'',
      houseString: '',
      streetString: '',
      townString: '',
      countryString: '',
      refIDString: '',


      containerSizeIDString : '',
      containerSizeValueString : '',
      haulageIDString : '',
      haulageValueString : '',
      containerPurchaseString : '',
      cargoTypeString: '',
      CargoHazadeousString: '',
      AgreedPriceString: '',
      TotalCargoWeightString: '',
      DestinationPortString: '',
      DestinationCountryString: '',
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

      Company_String_LA: '',
      Address1_String_LA: '',
      Address2_String_LA: '',
      City_String_LA: '',
      Country_String_LA: '',
      PostalCode_String_LA: '',

      Collection_Date_String: '',
      Collection_Time_String: '',
      Loading_Time_String: '',
      Loading_Date_String: '',

      AdditionalShippingInformationString: '',


      containerSizeIDString: '',

      isSuccessTextShow: false,
      items: [
         {label: 'Apple', value: 'apple'},
         {label: 'Banana', value: 'banana'}
       ],

       open1: false,
      value1: 'fsdfdsf111',
      items1: [
         {label: 'Apple1', value: 'apple1'},
         {label: 'Banana1', value: 'banana1'}
       ],
       itemList1:  [
        {a: 'London To Paris', b: '102',  c: '23.12.2022', d: 'Available Stock: 45'}, 
        {a: 'Manchester United to Paris', b: '107',  c: '24.12.2022', d: 'Available Stock: 100'},
        {a: 'India To Paris', b: '311',  c: '25.12.2022', d: 'Available Stock: 134'},
        {a: 'ALPS', b: '102',  c: '26.12.2022', d: 'Available Stock: 45'}, 
        {a: 'ALPS', b: '107',  c: '27.12.2022', d: 'Available Stock: 100'},
        {a: 'ALPS', b: '311',  c: '28.12.2022', d: 'Available Stock: 134'},
        {a: 'ALPS', b: '102',  c: '29.12.2022', d: 'Available Stock: 45'}, 
        {a: 'ALPS', b: '107',  c: '30.12.2022', d: 'Available Stock: 100'},
        {a: 'ALPS', b: '311',  c: '31.12.2022', d: 'Available Stock: 134'},
        // {a: 'ALPS', b: '107',  c: '12.12.2022', d: 'Available Stock: 100'},
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
         {a: 'ALPS', b: '102',  c: '29.12.2022', d: 'Available Stock: 45'}, 
         {a: 'ALPS', b: '107',  c: '30.12.2022', d: 'Available Stock: 100'},
         {a: 'ALPS', b: '311',  c: '31.12.2022', d: 'Available Stock: 134'},
         {a: 'ALPS', b: '107',  c: '12.12.2022', d: 'Available Stock: 100'},
         {a: 'ALPS', b: '107',  c: '30.12.2022', d: 'Available Stock: 100'},
         {a: 'ALPS', b: '311',  c: '31.12.2022', d: 'Available Stock: 134'},
         {a: 'ALPS', b: '107',  c: '12.12.2022', d: 'Available Stock: 100'},
         {a: 'ALPS', b: '311',  c: '31.12.2022', d: 'Available Stock: 134'},
         {a: 'ALPS', b: '107',  c: '12.12.2022', d: 'Available Stock: 100'},
         {a: 'ALPS', b: '107',  c: '30.12.2022', d: 'Available Stock: 100'},
         {a: 'ALPS', b: '311',  c: '31.12.2022', d: 'Available Stock: 134'},
         {a: 'ALPS', b: '107',  c: '12.12.2022', d: 'Available Stock: 100'},
         {a: 'ALPS', b: '107',  c: '12.12.2022', d: 'Available Stock: 100'},
         ],
         isModalVisible: false,

itemListForDrawer:  [
    {a: 'Profile'},
    {a: 'Orders'},
    {a: 'Terms & Conditions'},
    {a: 'Office Contacts'},
    {a: "Resources"},
    {a: 'Logout'},
  ],

    };
  }
  componentDidMount = async () => 
    {
  
      this.checkAppState()

      AsyncStorage.getItem("token").then((value) => {
        this.setState({tokenString: value});
    })
    .then(res => {
      
    });

      AsyncStorage.getItem("userData").then((value) => {

        var abc = JSON.parse(value)

        this.setState({
          companyNameString: abc.compnay,
          companyIDString: abc.username,
          emailString: abc.email,
          houseString: abc.address1,
          streetString: abc.address2,
          countryString: abc.county,
          townString: abc.city,
          refIDString: abc.post_code,
           phoneNoString: abc.phone,
         
        });
        
    })
    .then(res => {
      // this.fetchProfileData()
    });

    AsyncStorage.getItem("userBookingDataAll").then((value) => {

      console.log('user booking data: ', JSON.parse(value))

      var bookingDataJson = JSON.parse(value)

      this.setState({

      containerSizeIDString : bookingDataJson.data.containerSizeIDString,
      containerSizeValueString : bookingDataJson.data.containerSizeValueString,
      haulageIDString : bookingDataJson.data.haulageIDString,
      haulageValueString : bookingDataJson.data.haulageValueString,
      containerPurchaseString : bookingDataJson.data.containerPurchaseString,
      cargoTypeString: bookingDataJson.data.cargoTypeString,
      AgreedPriceString: bookingDataJson.data.AgreedPriceString,
      TotalCargoWeightString: bookingDataJson.data.TotalCargoWeightString,
      DestinationPortString: bookingDataJson.data.DestinationPortString,
      DestinationCountryString: bookingDataJson.data.DestinationCountryString,
      SiteContactNameString: bookingDataJson.data.SiteContactNameString,
      SiteContactTelnoString: bookingDataJson.data.SiteContactTelnoString,
      LoadingPostcodeString: bookingDataJson.data.LoadingPostcodeString,
      LoadingAddressString: bookingDataJson.data.LoadingAddressString,
      Delivery_Time_String: bookingDataJson.data.Delivery_Time_String,
      Delivery_Date_String: bookingDataJson.data.Delivery_Date_String,
      DeliveryAddressString: bookingDataJson.data.DeliveryAddressString,
      Collection_Date_String: bookingDataJson.data.Collection_Date_String,
      Collection_Time_String: bookingDataJson.data.Collection_Time_String,
      Loading_Time_String: bookingDataJson.data.Loading_Time_String,
      Loading_Date_String: bookingDataJson.data.Loading_Date_String,
      CargoHazadeousString:bookingDataJson.data.CargoHazadeousString,
      AdditionalShippingInformationString: bookingDataJson.data.AdditionalShippingInformationString,
      Company_String: bookingDataJson.data.Company_String,
      Address1_String: bookingDataJson.data.Address1_String,
      Address2_String: bookingDataJson.data.Address2_String,
      City_String: bookingDataJson.data.City_String,
      Country_String: bookingDataJson.data.Country_String,
      PostalCode_String: bookingDataJson.data.PostalCode_String,

      Company_String_LA: bookingDataJson.data.Company_String_LA,
      Address1_String_LA: bookingDataJson.data.Address1_String_LA,
      Address2_String_LA: bookingDataJson.data.Address2_String_LA,
      City_String_LA: bookingDataJson.data.City_String_LA,
      Country_String_LA: bookingDataJson.data.Country_String_LA,
      PostalCode_String_LA: bookingDataJson.data.PostalCode_String_LA,
      });

      
  })
  .then(res => {
    // this.fetchProfileData()
    // console.log('user data: ', res)
  });

  this.props.navigation.addListener('blur', () => {
    console.log('unMount calledddd')
    this.setState({checkNavigationDone: true});
    this.appStateSubscription.remove();
    
})
  
  this.focusListener = this.props.navigation.addListener('focus', () => {
    this.setState({checkNavigationDone: false});
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
    submitItem = async () => 
          {

            AsyncStorage.getItem("userBookingData").then((value) => {

              console.log('userBookingData value: ',JSON.parse(value));

              var bearer = 'Bearer ' + this.state.tokenString;
            this.loadingButton.showLoading(true);

            fetch(UrlUtil.BASE_URL+'newbooking', {
              method: 'POST', //Request Type
              body: value, //post body
              headers: {
                Accept: 'application/json',
                'Authorization': bearer,
                'Content-Type': 'application/json',
              },
            })
              .then((response) => response.json())
              //If response is in json then in success
              .then((responseJson) => {
                // alert(JSON.stringify(responseJson));
                console.log('submitItem response: ',responseJson);
                 this.loadingButton.showLoading(false);
        
        if (responseJson.success == false)
        {
         
          alert('Something went worng, please try again later');
        }
        else
        {
          
          this.Submit()
        }
        
                  
              })
              //If response is not in json then in error
              .catch((error) => {
                alert('Netwok request failed. Please check your internet connection and try again');
                console.error(error);
                this.loadingButton.showLoading(false);
              });
   
              
          })
          .then(res => {
           
          });

          }

  toggleModal = () => {
    this.setState({isModalVisible: true})
    };
  _onPressBotton1Handler = async () => { 
    
    //       Keyboard.dismiss()
    //  this.Login()

    if (this.state.isAgreed == false)
    {
      alert('Please accept Terms & Conditions before you proceed');
    }
    else
    {
      this.loadingButton.showLoading(true);
      this.submitItem()
    }

    
          }
          Submit = async () => {
            
            // Toast.show('Thank you for your order, we will confirm shortly', Toast.LONG)
            setTimeout(()=>{
              this._scrollView.scrollTo({y:1400});
              this.loadingButton.showLoading(false);
              this.setState({isSuccessTextShow: true})

              setTimeout(()=>{
                this.props.navigation.replace('LoginPage')
                // this.props.navigation.replace('LoginPage') //ParcelDetailsPage //DashPage
            },2000)
              // this.props.navigation.replace('LoginPage') //ParcelDetailsPage //DashPage
          },2000)
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
                <Image
                  style={styles.menu_icon}
                  source={require('../Images/outline_apps_black_48.png')}
                />
              </TouchableOpacity>
            
            </View>

          </View>

          </SafeAreaView>
          <ScrollView ref={view => this._scrollView = view} style={{backgroundColor: 'null'}}>
          <Text style={{fontFamily: 'BebasNeuePro-Middle',fontSize: 29.6, marginTop: 45, color: '#4387bb', marginLeft: 22, marginBottom: 16}}>Confirm Order</Text>

          

          <FlatList
     keyboardDismissMode="none"
      keyboardShouldPersistTaps='handled'
      style={{
        marginTop: 6,
        marginBottom: 0
      }}
      
                        data={this.state.itemList1}
                        renderItem={this.renderHorizontalItem}
                        keyExtractor={(item, index) => index}
                    /> 

<Text style={{fontFamily: 'BebasNeuePro-Middle',fontSize: 29.6, marginTop: 35, color: '#4387bb', marginLeft: 22, marginBottom: 16}}>Details</Text>

          

<FlatList
keyboardDismissMode="none"
keyboardShouldPersistTaps='handled'
style={{
marginTop: 6,
marginBottom: 0,
}}

              data={this.state.itemList}
              renderItem={this.renderHorizontalItem1}
              keyExtractor={(item, index) => index}
          /> 

<View style = {{flexDirection: 'row', width: '100%',  alignSelf: 'center', marginTop: 10}}>

<CheckBox
style={{ marginLeft: 18, ...Platform.select({
  ios: {
    marginRight: 10,
    width: 25, height: 25,
   
  },
  android: {
    
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
onValueChange={(newValue) => this.setState({isAgreed: newValue})}
/>
<TouchableOpacity
      style={[
        {
          backgroundColor: 'null',
          ...Platform.select({
            ios: {
              marginTop: -7.5
             
            },
            android: {
              marginTop: -2.5
            },
          })
        },
      ]}
      onPress={() => this.setState({isAgreed: !this.state.isAgreed})}>
<Text style={{
fontFamily: 'BebasNeuePro-Middle',
color: '#000',paddingTop: 4, paddingBottom: 4, paddingLeft: 2, paddingRight: 4, fontSize: 26.4, color: 'black'
}}>{'Accept Terms & Conditions'}</Text> 
</TouchableOpacity>
<TouchableOpacity
      style={[
        {
          marginTop: 4,
          marginStart: 0, 
          marginEnd: 0,
          width: 40,
          ...Platform.select({
            ios: {
              
             
            },
            android: {
              marginTop: 7.5
            },
          })
        },
      ]}
      onPress={() => this.props.navigation.navigate('TermsAndCondsForOrder')}>
    <Text style={{
      fontFamily: 'BebasNeuePro-Middle',
      color: '#000',padding: 4, fontSize: 15.2, color: '#4387bb',
    }}>
      Read
    </Text>
    </TouchableOpacity>
    
</View>

<View style={{
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: 0,
        marginTop: 35,
        marginLeft: 18,
        alignSelf: 'flex-start'
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

          
        {this.state.isSuccessTextShow && <Text 
        style={{fontFamily: 'BebasNeuePro-Middle',fontSize: 38, marginTop: 50, color: '#91cc92', 
        marginLeft: 24, marginRight: 24, marginBottom: 16}}>
          Thank you for your order, we will confirm shortly</Text> }



<View style={{height: 300}}></View>
          </ScrollView>
          
  
          {/* <TouchableOpacity onPress ={() => this.props.navigation.navigate('NewOrder1Page')} 
          style={{flexDirection: 'row', justifyContent: 'flex-end', position: 'absolute',
          height: 55,bottom:80, alignSelf: 'flex-end', width: '30%'
}}>
<Text style={{fontFamily: 'BebasNeuePro-Middle',fontSize: 27, justifyContent: 'center',  color: '#4387bb', marginTop: -2}}>Continue</Text>
<Image style={{ height: 30, width: 30,resizeMode: 'contain', marginRight: 33, tintColor: '#4387bb'}}
                source={require('../Images/outline_arrow_right_alt_black_48.png')}></Image>
</TouchableOpacity> */}

          <View style={styles.footer}>

      <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
              
            <TouchableOpacity onPress ={() => this.props.navigation.navigate('LoginPage')}>
            <View style={{ marginLeft: 0, width: Dimensions.get('window').width/3, marginTop: 0, height: 80, backgroundColor: 'null'}}>
            <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'flex-start', marginStart: 18}}>
            <Image style={{ height: 30, width: 30,resizeMode: 'contain', }}
                source={require('../Images/Home.png')}></Image>
                <Text style={{fontFamily: 'BebasNeuePro-Middle',fontSize: 13.2, marginTop: 5, paddingLeft: 4}}>Home</Text>
</View>

            
             </View>
             </TouchableOpacity>

            
                 

            <View style={{ marginLeft: 0, width: Dimensions.get('window').width/3, marginTop: 0, height: 80}}>
            <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{ height: 30, width: 30,resizeMode: 'contain', }}
                source={require('../Images/plusicongrey.png')}></Image>
                <Text style={{fontFamily: 'BebasNeuePro-Middle',fontSize: 13.2, marginTop: 5}}>New Booking</Text>
</View>
               </View>
            
            

               
                 
            <TouchableOpacity onPress ={() => this.props.navigation.navigate('ProfilePage')}>
            <View style={{ marginLeft: 0, width: Dimensions.get('window').width/3, marginTop: 0, height: 80}}>
            <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'flex-end', marginEnd: 18}}>
            <Image style={{ height: 30, width: 30,resizeMode: 'contain', }}
                source={require('../Images/User.png')}></Image>
                <Text style={{fontFamily: 'BebasNeuePro-Middle',fontSize: 13.2, marginTop: 5, paddingRight: 3}}>Profile</Text>
</View>
               </View>
               </TouchableOpacity>
            
  
  
            </View>
            </View>
    </View>

    <Modal isVisible={this.state.isModalVisible} 
    onBackdropPress={() => this.setState({isModalVisible: false})}
    swipeDirection="left"
    animationIn = 'slideInLeft'
    animationOut= 'slideOutLeft'
    onSwipeComplete={() => this.setState({isModalVisible: false})} >
        <View style={{ flex: 1 ,width: '86%', backgroundColor: '#c6cbdf', marginTop: -20,
         height: '100%', marginLeft: -18, marginBottom: -18 }}>
         <FlatList
     keyboardDismissMode="none"
      keyboardShouldPersistTaps='handled'
      style={{
        marginTop: 65,
      }}
      
                        data={this.state.itemListForDrawer}
                        renderItem={this.renderHorizontalItem2}
                        keyExtractor={(item, index) => index}
                    /> 
         
        </View>
      </Modal>

      </View>
      

      

     
      
    );
  }
  renderHorizontalItem = ({ item, index }) => {

    return (
  
  <View style={{
    flex:1, marginTop: 1,
    // padding:1,
    borderRadius:10,
    // paddingTop: 1,
    // marginTop: 1,
    
    marginVertical:0,
    marginLeft: 18,
    marginRight: 18,
    // backgroundColor: 'red'
  
  }}>
  
  { index == 0 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 36.2, color: 'black'
}}>{this.state.companyIDString}</Text> }
  
         { index == 1 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 36.2, color: 'black'
}}>{this.state.companyNameString}</Text> }

{/* { index == 1 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 36.2, color: 'black'
}}>{'12345678'}</Text> } */}

{ index == 2 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 36.2, color: 'black'
}}>{this.state.emailString}</Text> }

{ index == 3 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 36.2, color: 'black'
}}>{this.state.phoneNoString}</Text> }
            
            { index == 4 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 36.2, color: 'black'
}}>{this.state.houseString}</Text> } 

{ index == 5 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 36.2, color: 'black'
}}>{this.state.streetString}</Text> } 

{ index == 6 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 36.2, color: 'black'
}}>{this.state.townString}</Text> } 

     { index == 7 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 36.2, color: 'black'
}}>{this.state.countryString}</Text> }   

{ index == 8 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 36.2, color: 'black'
}}>{this.state.refIDString}</Text> } 
           
           {/* { index == 9 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 36.2, color: 'black'
}}>{'ID: '+ 'SM015'}</Text> }  */}
  </View>
     )}
     renderHorizontalItem2 = ({ item, index }) => {

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
          // AsyncStorage.clear();
          // this.props.navigation.replace('SignInPage');

          this.logoutApi()
        }
  
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
     renderHorizontalItem1 = ({ item, index }) => {

      return (
    
    <View style={{
      flex:1, marginTop: 1,
      // padding:1,
      borderRadius:10,
      // paddingTop: 1,
      // marginTop: 1,
      
      marginVertical:5,
      marginLeft: 18,
      marginRight: 18,
      // backgroundColor: 'red'
    
    }}>
    
             
    
           { index == 0 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: 'blue',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Container Size & Type: '+ this.state.containerSizeValueString}</Text> }
  
  { index == 1 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Container Purchase: '+ this.state.containerPurchaseString}</Text> }
  
  { index == 2 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Cargo Description: '+ this.state.cargoTypeString}</Text> }

{ index == 3 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Is the cargo Hazadeous : '+ this.state.CargoHazadeousString}</Text> }

{ index == 4 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Haulage Type: '+ this.state.haulageValueString}</Text> }
  
  
              
              {/* { index == 5 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Loading Date: '+ this.state.Loading_Date_String}</Text> }  */}
  
  {/* { index == 6 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Loading Time: '+ this.state.Loading_Time_String}</Text> }  */}
  
  {/* { index == 7 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Loading Address: '+ this.state.LoadingAddressString}</Text> }  */}
  
       { index == 5 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Agreed Price: £'+ this.state.AgreedPriceString}</Text> }   
  
  { index == 6 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Total Cargo Weight (Kg): '+ this.state.TotalCargoWeightString}</Text> } 

{ index == 7 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Destination Country: '+ this.state.DestinationCountryString}</Text> }

             
             { index == 8 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Destination Port: '+ this.state.DestinationPortString}</Text> } 


{ index == 9 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Site Contact Name: '+ this.state.SiteContactNameString}</Text> } 

{ index == 10 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Site Contact Tel Number: '+ this.state.SiteContactTelnoString}</Text> } 

{ index == 11 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Additional Shipping Information: '+ this.state.AdditionalShippingInformationString}</Text> }

{ (index == 12 && (this.state.haulageIDString == 'type1' || this.state.haulageIDString == 'type3')) && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Loading Date: '+ this.state.Loading_Date_String}</Text> } 

{ (index == 13 && (this.state.haulageIDString == 'type1' || this.state.haulageIDString == 'type3')) && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Loading Time: '+ this.state.Loading_Time_String}</Text> } 

{/* { (index == 13 && (this.state.haulageIDString == 'type1' || this.state.haulageIDString == 'type3')) && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Loading Address: '+ this.state.LoadingAddressString}</Text> }  */}

{ (index == 14 && (this.state.haulageIDString == 'type1' || this.state.haulageIDString == 'type3')) && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Company: '+ this.state.Company_String_LA}</Text> }

{ (index == 15 && (this.state.haulageIDString == 'type1' || this.state.haulageIDString == 'type3')) && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Address 1: '+ this.state.Address1_String_LA}</Text> }

{ (index == 16 && (this.state.haulageIDString == 'type1' || this.state.haulageIDString == 'type3')) && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Address 2: '+ this.state.Address2_String_LA}</Text> }

{ (index == 17 && (this.state.haulageIDString == 'type1' || this.state.haulageIDString == 'type3')) && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'City: '+ this.state.City_String_LA}</Text> }

{ (index == 18 && (this.state.haulageIDString == 'type1' || this.state.haulageIDString == 'type3')) && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Country: '+ this.state.Country_String_LA}</Text> }

{ (index == 19 && (this.state.haulageIDString == 'type1' || this.state.haulageIDString == 'type3')) && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Postal Code: '+ this.state.PostalCode_String_LA}</Text> }

{ (index == 12 && (this.state.haulageIDString == 'type2' || this.state.haulageIDString == 'type4')) && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Delivery Date: '+ this.state.Delivery_Date_String}</Text> } 

{ (index == 13 && (this.state.haulageIDString == 'type2' || this.state.haulageIDString == 'type4')) && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Delivery Time: '+ this.state.Delivery_Time_String}</Text> } 

{ (index == 14 && (this.state.haulageIDString == 'type2' || this.state.haulageIDString == 'type4')) && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Company: '+ this.state.Company_String}</Text> }

{ (index == 15 && (this.state.haulageIDString == 'type2' || this.state.haulageIDString == 'type4')) && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Address 1: '+ this.state.Address1_String}</Text> }

{ (index == 16 && (this.state.haulageIDString == 'type2' || this.state.haulageIDString == 'type4')) && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Address 2: '+ this.state.Address2_String}</Text> }

{ (index == 17 && (this.state.haulageIDString == 'type2' || this.state.haulageIDString == 'type4')) && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'City: '+ this.state.City_String}</Text> }

{ (index == 18 && (this.state.haulageIDString == 'type2' || this.state.haulageIDString == 'type4')) && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Country: '+ this.state.Country_String}</Text> }

{ (index == 19 && (this.state.haulageIDString == 'type2' || this.state.haulageIDString == 'type4')) && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Postal Code: '+ this.state.PostalCode_String}</Text> }

{ (index == 20 && (this.state.haulageIDString == 'type2' || this.state.haulageIDString == 'type4')) && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Collection Date: '+ this.state.Collection_Date_String}</Text> } 

{ (index == 21 && (this.state.haulageIDString == 'type2' || this.state.haulageIDString == 'type4')) && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Collection Time: '+ this.state.Collection_Time_String}</Text> }

{/* { index == 13 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
    color: '#000',padding: 4, fontSize: 29.6, color: 'black'
  }}>{'Loading Postcode: '+ this.state.LoadingPostcodeString}</Text> }  */}
    </View>
       )}

       
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor: "#ecf6fa",
    // backgroundColor: "#ecf6fa",
    marginTop: 0,
    zIndex: 0
  },
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