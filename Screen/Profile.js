import React,{Component, useEffect} from 'react';
import { StatusBar,  AppState, AsyncStorage, View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, SafeAreaView, Image, Dimensions } from 'react-native'
import Modal from "react-native-modal";
import UrlUtil from '../utils/ConfigApp';
import Toast from 'react-native-simple-toast';
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      checkNavigationDone: false,
      open: false,
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
  toggleModal = () => {
    this.setState({isModalVisible: true})
    };
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

  render() {
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
            <View style={styles.dashboard_headers_Create_View}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('NewOrderPage')}>
                <Image
                  style={styles.create_icon}
                  source={require('../Images/outline_add_black_48.png')}
                  // resizeMode="contain"dashboard_main_btn
                />
              </TouchableOpacity>
              </View>

          </View>
          </SafeAreaView>
          <ScrollView>
          <Text style={{fontFamily: 'BebasNeuePro-Middle',fontSize: 46.2, marginTop: 45, color: '#4387bb', marginLeft: 23, marginBottom: 16}}>Profile</Text>

          

          <FlatList
     keyboardDismissMode="none"
      keyboardShouldPersistTaps='handled'
      style={{
        marginTop: 6,
        marginBottom: 72
      }}
      
                        data={this.state.itemList}
                        renderItem={this.renderHorizontalItem}
                        keyExtractor={(item, index) => index}
                    /> 
<View style={{height: 28}}></View>
          </ScrollView>


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

             <TouchableOpacity onPress ={() => this.props.navigation.navigate('NewOrderPage')}>
                 

            <View style={{ marginLeft: 0, width: Dimensions.get('window').width/3, marginTop: 0, height: 80}}>
            <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{ height: 30, width: 30,resizeMode: 'contain'}}
                source={require('../Images/Create.png')}></Image>
                <Text style={{fontFamily: 'BebasNeuePro-Middle',fontSize: 13.2, marginTop: 5}}>New Booking</Text>
</View>
               </View>
            
            </TouchableOpacity>

               
                 

            <View style={{ marginLeft: 0, width: Dimensions.get('window').width/3, marginTop: 0, height: 80}}>
            <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'flex-end', marginEnd: 18}}>
            <Image style={{ height: 30, width: 30,resizeMode: 'contain', tintColor: 'grey'}}
                source={require('../Images/User.png')}></Image>
                <Text style={{fontFamily: 'BebasNeuePro-Middle',fontSize: 13.2, marginTop: 5, paddingRight: 3}}>Profile</Text>
</View>
               </View>
            
            
  
  
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
                        renderItem={this.renderHorizontalItem1}
                        keyExtractor={(item, index) => index}
                    /> 
         
        </View>
      </Modal>

      </View>
      

      

     
      
    );
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
        // AsyncStorage.clear();
        // this.props.navigation.replace('SignInPage');
        this.logoutApi()
      }

     }
  renderHorizontalItem = ({ item, index }) => {

    return (
  
  <View style={{
    flex:1, marginTop: 1,
    padding:1,
    borderRadius:10,
    paddingTop: 1,
    marginTop: 1,
    
    marginVertical:1,
    marginLeft: 18,
    marginRight: 18,
  
  }}>
  
           
  
  { index == 0 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black'
}}>{this.state.companyIDString}</Text> }

{ index == 1 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black'
}}>{this.state.companyNameString}</Text> }

{/* { index == 2 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black'
}}>{'12345678'}</Text> } */}

{ index == 3 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black'
}}>{this.state.emailString}</Text> }
            
            { index == 4 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black'
}}>{this.state.phoneNoString}</Text> } 

{ index == 5 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black'
}}>{this.state.houseString}</Text> } 

{ index == 6 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black'
}}>{this.state.streetString}</Text> } 

     { index == 7 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black'
}}>{this.state.townString}</Text> }   

{ index == 8 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black'
}}>{this.state.countryString}</Text> } 
           
           { index == 9 && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 4, fontSize: 26.4, color: 'black'
}}>{this.state.refIDString}</Text> } 
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