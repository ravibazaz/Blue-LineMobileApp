import React,{Component,useEffect} from "react";
import {StatusBar,  AppState, Platform, FlatList, TouchableWithoutFeedback, TouchableOpacity, AsyncStorage, Image, ImageBackground, View,StyleSheet,SafeAreaView,ScrollView,Text,Dimensions } from "react-native";
import SideMenuCommon from '../components/SideMenuCommon';
import { WebView } from 'react-native-webview';
import Modal from "react-native-modal";
import Pdf from 'react-native-pdf';
import UrlUtil from '../utils/ConfigApp';
import Toast from 'react-native-simple-toast';
export default class HowToUse extends Component {

constructor(props)
{
   super(props);
   this.state = {
    appState: AppState.currentState,
      checkNavigationDone: false,
    isModalVisible: false,

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
render()
{

  const source = { uri: 'https://www.containerlift.co.uk/wp-content/uploads/2022/07/Containerlift-Terms-Conditions-of-Trade-V2.5-019.07.2022.pdf', cache: true };

  return(
    <View style={styles.container}>
    {/* <StatusBar backgroundColor='#4387bb' barStyle={'light-content'} /> */}
<SafeAreaView>
    <View style={styles.dashboard_main_headers}>
        <View style={styles.dashboard_headers_Menu_View}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}>
              {/* this.props.navigation.openDrawer() */}
            <Image
              style={styles.menu_icon}
              source={require('../Images/arrow.png')}
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
      { Platform.OS === 'ios' && <WebView
   source={{ uri: 'https://www.containerlift.co.uk/wp-content/uploads/2022/07/Containerlift-Terms-Conditions-of-Trade-V2.5-019.07.2022.pdf' }}
   style={{ marginTop: 0, marginBottom:56 }}
 /> }

{ Platform.OS === 'android' && <Pdf
trustAllCerts={false}
                    source={source}
                    onLoadComplete={(numberOfPages,filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={{
                      flex:1,
                      width:Dimensions.get('window').width,
                      height:Dimensions.get('window').height,
                  }}/> }

<View style={{height: 8}}></View>

<SideMenuCommon screenName={'TermsAndConditions'} isVisible={this.state.isModalVisible}  
navigation={this.props.navigation} 
handleModalVisible={this.handleModalVisible}
/>
</View>
  );

}

handleModalVisible = (value) => {
    this.setState({ isModalVisible: value });
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
// alert('Email or Password not authorize');
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