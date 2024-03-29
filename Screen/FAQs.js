import React,{Component,useEffect} from "react";
import SideMenuCommon from '../components/SideMenuCommon';
import TabBarCommon from '../components/TabBarCommon';
import {StatusBar, TouchableOpacity, Modal, ActivityIndicator, AppState, FlatList, AsyncStorage, TouchableWithoutFeedback, Image, ImageBackground, View,StyleSheet,SafeAreaView,ScrollView,Text,Dimensions } from "react-native";
import { WebView } from 'react-native-webview';
import Modal1 from "react-native-modal";
import UrlUtil from '../utils/ConfigApp';
import Toast from 'react-native-simple-toast';
export default class HowToUse extends Component {

constructor(props)
{
   super(props);
   this.state = {
    appState: AppState.currentState,
      open: true,
      checkNavigationDone: false,
    visible: true,
    isModalVisible: false,
    tokenString: '',
itemListForDrawer:  [
    {a: 'Profile'},
    {a: 'Orders'},
    {a: 'Terms & Conditions'},
    {a: 'Office Contacts'},
    {a: "Resources"},
    {a: 'Logout'},
  ],
}

}
componentDidMount = async () => 
    {
      this.checkAppState()

      AsyncStorage.getItem("token").then((value) => {
        this.setState({tokenString: value});
    })
    .then(res => {
        // this.fetchProfileData()
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
toggleModal = () => {
  this.setState({isModalVisible: true})
  };
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

    hideSpinner() {
      this.setState({ visible: false });
    }

render()
{

  return(
    <View style={styles.container}>
    {/* <StatusBar backgroundColor='#4387bb' barStyle={'light-content'} /> */}
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
   <WebView
   source={{ uri: 'https://www.containerlift.co.uk/resources/' }}
   onLoad={() => this.hideSpinner()}
   style={{ marginTop: 0, marginBottom:86 }}
 />


        <Modal
        transparent={true}
        animationType={'none'}
        visible={this.state.visible}
        onRequestClose={() => {console.log('close modal')}}>
        <View style={{
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
}}>
            <View style={{
              
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#4387bb',

}}>
                <ActivityIndicator color="#000000"
                    animating={this.state.visible} />
            </View>
        </View>
    </Modal>
     

    <TabBarCommon screenName={'TermsAndConditions'}  
navigation={this.props.navigation} />
    <SideMenuCommon screenName={'Resources'} isVisible={this.state.isModalVisible}  
navigation={this.props.navigation} 
handleModalVisible={this.handleModalVisible}
/>



</View>
  );

}
handleModalVisible = (value) => {
  this.setState({ isModalVisible: value });
}
renderHorizontalItem1 = ({ item, index }) => {

  return (

<TouchableWithoutFeedback style={{
  flex:1, marginTop: 10,
  // backgroundColor: 'red',
  width: '100%',
  height: 50,
  // backgroundColor: 'red'

}} onPress ={() => this.selectMenuItem(index)}>

          <Text style={{paddingLeft: 13,textAlignVertical: 'center', justifyContent: 'center',
          fontFamily: 'BebasNeuePro-Middle',fontSize: 46.2, color: 'black',}
}>{item.a}</Text>
          
</TouchableWithoutFeedback>
   )}
   selectMenuItem = (index) =>{
    console.log('indexxxx: ', index)

    // this.setState({isModalVisible: false})

    this.setState({
      isModalVisible: false
  }, () => {
      
  

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

  });

   }

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