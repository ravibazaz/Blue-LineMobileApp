import React,{Component, useState} from 'react';
import { StatusBar,  AppState, View, Text, StyleSheet, AsyncStorage, FlatList, ScrollView, TouchableOpacity, SafeAreaView, Image, Dimensions } from 'react-native'
import SideMenuCommon from '../components/SideMenuCommon';
import TabBarCommon from '../components/TabBarCommon';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker'
import UrlUtil from '../utils/ConfigApp';
import Toast from 'react-native-simple-toast';
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      open: true,
      checkNavigationDone: false,
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
       isModalVisible: false,
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
        //  {a: 'ALPS', b: '107',  c: '12.12.2022', d: 'Available Stock: 100'},
         ]

    };
    this.setValue = this.setValue.bind(this);
  }
  componentDidMount = async () => 
    {
      this.checkAppState()

      AsyncStorage.getItem("token").then((value) => {
        this.setState({tokenString: value});
    })
    .then(res => {
      this.fetchProfileData()
    });

    this.props.navigation.addListener('blur', () => {
      console.log('unMount calledddd at New Order')
      this.appStateSubscription.remove();
       this.setState({checkNavigationDone: true});
      
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
  toggleModal = () => {
    this.setState({isModalVisible: true})
    };
  setOpen= (open) => {

   console.log('open value is', open)

   this.setState({
     open
   });
 }

 setValue = (callback) => {

   console.log('set value is', callback)

   this.setState(state => ({
     value: callback(state.value)
   }));
 }

 setItems = (callback) => {
   console.log('set Items is', callback)
   this.setState(state => ({
     items: callback(state.items)
   }));
 }

 setOpen1= (open1) => {

   console.log('open value is', open1)

   this.setState({
     open1
   });
 }

 setValue1 = (callback) => {

   console.log('set value is', callback)

   this.setState(state => ({
     value1: callback(state.value1)
   }));
 }

 setItems1 = (callback) => {
   console.log('set Items is', callback)
   this.setState(state => ({
     items1: callback(state.item1)
   }));
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
.then(async (responseJson) => {
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

if (responseJson.success == false)
{
// alert('Email or Password not authorize');
}
else
{

  AsyncStorage.setItem('userData',  JSON.stringify(responseJson.data));

  this.setState({
    companyNameString: responseJson.data.compnay,
    emailString: responseJson.data.email,
    houseString: responseJson.data.address1,
    streetString: responseJson.data.address2,
    countryString: responseJson.data.county,
    townString: responseJson.data.city,
    refIDString: responseJson.data.post_code,
     phoneNoString: responseJson.data.phone,
     companyIDString: responseJson.data.username
  });
}

    
})
//If response is not in json then in error
.catch((error) => {
  alert('Netwok request failed. Please check your internet connection and try again');
  console.error(error);
});

    
    }
    gotToNextScreen = () => 
    {
      if (this.props.route.params) 
      {
    console.log('params::: ',this.props.route.params)
    this.props.navigation.navigate('NewOrder1Page',{reorderFlag: true, record_id: this.props.route.params.record_id})
      }
      else
      {
        console.log('no params::: ')
        this.props.navigation.navigate('NewOrder1Page')
      }
      
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
          <ScrollView style={{backgroundColor: 'null'}}>
          <Text style={{fontFamily: 'BebasNeuePro-Middle',fontSize: 46.2, marginTop: 45, color: '#4387bb', marginLeft: 24, marginBottom: 16}}>New Booking</Text>

          

          <FlatList
     keyboardDismissMode="none"
      keyboardShouldPersistTaps='handled'
      style={{
        marginTop: 6,
        marginBottom: 0
      }}
      
                        data={this.state.itemList}
                        renderItem={this.renderHorizontalItem}
                        keyExtractor={(item, index) => index}
                    /> 



{/* <DatePicker
        modal
        mode='time'
        open={this.state.open}
        date={this.state.date}
        onConfirm={(date) => {

         this.setState({
            open: false,
            date: date
          });

        }}
        onCancel={() => {
         this.setState({
            open: false,
      
          });
        }}
      /> */}

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
          
  
          <TouchableOpacity onPress ={() => this.gotToNextScreen()} 
          style={{flexDirection: 'row', justifyContent: 'flex-end', position: 'absolute',
          height: 55,bottom:80, alignSelf: 'flex-end', width: '30%'
}}>
<Text style={{fontFamily: 'BebasNeuePro-Middle',fontSize: 29.6, 
justifyContent: 'center',  color: '#4387bb', marginTop: -4}}>Continue</Text>
<Image style={{ height: 30, width: 30,resizeMode: 'contain', marginRight: 33, tintColor: '#4387bb', marginLeft: 5}}
                source={require('../Images/arrow-06.png')}></Image>
</TouchableOpacity>
          
<TabBarCommon screenName={'NewOrder'}  
navigation={this.props.navigation} /> 


    <SideMenuCommon screenName={'NewOrder'} isVisible={this.state.isModalVisible}  
navigation={this.props.navigation} 
handleModalVisible={this.handleModalVisible}
/>

      </View>
      
    );
  }
   handleModalVisible = (value) => {
    this.setState({ isModalVisible: value });
  }

  renderHorizontalItem = ({ item, index }) => {

    return (
  
  <View style={{
    flex:1, marginTop: 1,
    padding:1,
    borderRadius:10,
    paddingTop: 1,
    marginTop: 1,
    
    marginVertical:0,
    marginLeft: 18,
    marginRight: 18,
    // backgroundColor: 'red'
  
  }}>
  
           { index == 0 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black'
}}>{this.state.companyIDString}</Text> }
  
         { index == 1 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black'
}}>{this.state.companyNameString}</Text> }



{ index == 2 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black'
}}>{this.state.emailString}</Text> }

{ index == 3 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black'
}}>{this.state.phoneNoString}</Text> }
            
            { index == 4 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black'
}}>{this.state.houseString}</Text> } 

{ index == 5 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black'
}}>{this.state.streetString}</Text> } 

{ index == 6 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black'
}}>{this.state.townString}</Text> } 

     { index == 7 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black'
}}>{this.state.countryString}</Text> }   

{ index == 8 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black'
}}>{this.state.refIDString}</Text> } 
           
           {/* { index == 9 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black'
}}>{'SM015'}</Text> }  */}
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