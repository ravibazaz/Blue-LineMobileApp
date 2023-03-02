import React,{Component, useEffect} from 'react';
import { StatusBar,  AppState, ActivityIndicator, TouchableWithoutFeedback, AsyncStorage, View, Modal, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, SafeAreaView, Image, Dimensions } from 'react-native'
import SideMenuCommon from '../components/SideMenuCommon';
import TabBarCommon from '../components/TabBarCommon';
import MaskedView from '../components/maskedView1';
 import MaskedElement from '../components/maskElement1';
 import Modal1 from "react-native-modal";
 import UrlUtil from '../utils/ConfigApp';
 import Toast from 'react-native-simple-toast';

export default class Login1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      checkNavigationDone: false,
      open: false,
      tokenString: '',
      loading: false,
      isHideMaskedView: false,
      itemList:  [
        {a: 'London To Paris', b: 'ASC123456',  c: '23.12.2022', d: 'green'}, 
        {a: 'Manchester United to Paris', b: '1ASC12345607',  c: '24.12.2022', d: 'green'},
        {a: 'India To Paris', b: 'Processing',  c: '25.12.2022', d: '#e3c777'},
        {a: 'ALPS', b: 'ASC123456',  c: '26.12.2022', d: 'red'}, 
        {a: 'ALPS', b: 'ASC123456',  c: '27.12.2022', d: 'red'},
        {a: 'ALPS', b: 'Processing',  c: '28.12.2022', d: '#e3c777'},
        {a: 'ALPS', b: 'Processing',  c: '29.12.2022', d: '#e3c777'}, 
        {a: 'ALPS', b: 'ASC123456',  c: '30.12.2022', d: 'green'},
        {a: 'ALPS', b: 'ASC123456',  c: '31.12.2022', d: 'red'},
        {a: 'ALPS', b: 'Processing',  c: '12.12.2022', d: '#e3c777'},
        {a: 'ALPS', b: 'ASC123456',  c: '13.12.2022', d: 'green'}, ],

        isModalVisible: false,

itemListForDrawer:  [
    {a: 'Profile'},
    {a: 'Orders'},
    {a: 'Terms & Conditions'},
    {a: 'Office Contacts'},
    {a: "Resources"},
    {a: 'Logout'},
  ],
  // loading: true,
    };
   
   
  }
toggleModal = () => {
    this.setState({isModalVisible: true})
    };
  componentDidMount = async () => 
  {

    this.checkAppState()

    AsyncStorage.getItem("token").then((value) => {
      this.setState({tokenString: value, loading: true,});
  })
  .then(res => {
    this.fetchOrderList()
  });


  this.props.navigation.addListener('blur', () => {
    console.log('unMount calledddd')
    this.setState({checkNavigationDone: true});
    this.appStateSubscription.remove();
    
})

  this.focusListener = this.props.navigation.addListener('focus', () => {
    this.setState({checkNavigationDone: false, isModalVisible: false});
    this.checkAppState()
  AsyncStorage.getItem("token").then((value) => {
    this.setState({tokenString: value, loading: true});
    
})
.then(res => {
  this.fetchOrderList()
});
   
  });

  
  
  

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
  goToDashboard = async () => 
  {
    // MaskedView = null

    this.setState({
      isHideMaskedView: true
  }, () => {
    this.props.navigation.navigate('LoginPage')
  })
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

          <Text style={{fontFamily: 'BebasNeuePro-Middle',fontSize: 46.2, marginTop: 26.5, color: '#4387bb', marginLeft: 24, marginBottom: 16}}>Orders</Text>
          
{this.state.isHideMaskedView && 
  <FlatList
     keyboardDismissMode="none"
     bounces = {true}
     inverted = {true}
      keyboardShouldPersistTaps='handled'
      style={{
        marginTop: 35,
        marginBottom: 56
      }}
      
                        data={this.state.itemList}
                        renderItem={this.renderHorizontalItem}
                        keyExtractor={(item, index) => index}
                    /> 
}

{this.state.isHideMaskedView == false && <MaskedView element={<MaskedElement />}>
          <FlatList
     keyboardDismissMode="none"
     bounces = {true}
     inverted = {true}
      keyboardShouldPersistTaps='handled'
      style={{
        marginTop: 35,
        marginBottom: 56
      }}
      
                        data={this.state.itemList}
                        renderItem={this.renderHorizontalItem}
                        keyExtractor={(item, index) => index}
                    /> 
                    </MaskedView>}
 <View style={{height: 28}}></View>


 <TabBarCommon screenName={'Orders'}  
navigation={this.props.navigation} />

    


    <SideMenuCommon screenName={'Orders'} isVisible={this.state.isModalVisible}  
navigation={this.props.navigation} 
handleModalVisible={this.handleModalVisible}
/>

      <Modal
            transparent={true}
            animationType={'none'}
            visible={this.state.loading}
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
        justifyContent: 'space-around'
    }}>
                    <ActivityIndicator
                        animating={this.state.loading} />
                </View>
            </View>
        </Modal>

      {/* <Modal
            transparent={true}
            animationType={'none'}
            visible={this.state.loading}
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
        justifyContent: 'space-around'
    }}>
                    <ActivityIndicator
                        animating={this.state.loading} />
                </View>
            </View>
        </Modal> */}

      </View>
      

      

     
      
    );
  }

  handleModalVisible = (value) => {
    this.setState({ isModalVisible: value });
  }

  fetchOrderList = async () => 
  {

    var bearer = 'Bearer ' + this.state.tokenString;
    fetch(UrlUtil.BASE_URL+'bookinglist', {
method: 'GET', //Request Type
headers: {
  'Authorization': bearer,
'Content-Type': 'application/json',
},
})
.then((response) => response.json())
.then((responseJson) => {
console.log('containesizetype response: ',responseJson);
this.setState({
  loading: false,
})
if (responseJson.success == false)
{
alert('Something went wrong, please try again later');
}
else
{
this.setState({
  itemList : responseJson.data
})

if (responseJson.message == 'Records not Found')
{
  Toast.show("No orders found", Toast.LONG)
}

}



})
//If response is not in json then in error
.catch((error) => {
  alert('Netwok request failed. Please check your internet connection and try again');
this.setState({
  loading: false,
})
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
        
        this.setState({
          loading: false
      }, () => {
        this.props.navigation.replace('SignInPage');
      }); 
}
  
})
//If response is not in json then in error
.catch((error) => {
  alert('Netwok request failed. Please check your internet connection and try again');
  console.error(error);
});

    
    }

  renderHorizontalItem = ({ item, index }) => {

    return (
      <TouchableOpacity
      onPress={() => this.props.navigation.navigate('OrderDetailsPage',{id:item.id, status: item.status})}>
      { item.status == 'Pending' && <View style={{
    flex:1, marginTop: 1, backgroundColor:'#fff',
    padding:1,
    borderRadius:10,
    paddingTop: 1,
    // shadowColor: '#efefef',
    // shadowOffset: { width: 0, height: 23 },
    // shadowOpacity: 1,
    // shadowRadius: 3,
    marginTop: 1,
    // elevation: 3,
    marginVertical:5,
    marginLeft: 18,
    marginRight: 18,
    borderColor: 'orange',
    borderWidth: .8
    // backgroundColor: 'red'
  
  }}>  
  
            <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 11, fontSize: 23, color: 'black', marginBottom: -36
}}>{'Order Date: '+ item.created_at.substring(0, 10)}</Text>
            
            <Text style={{fontFamily: 'BebasNeuePro-Middle',
  paddingRight: 11, fontSize: 20, color: 'orange', alignSelf: 'flex-end', marginBottom:0
}}>{ item.status}</Text>
            
          {item.haulage_type == 'type1' && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 11, fontSize: 26.4, color: 'black'
}}>{'Sidelifter (lifted to ground): Wait & load'}</Text>}

{item.haulage_type == 'type2' && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 11, fontSize: 26.4, color: 'black'
}}>{'Sidelifter (lifted to ground): Drop & Collect'}</Text>}

{item.haulage_type == 'type3' && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 11, fontSize: 26.4, color: 'black'
}}>{'Standard (on trailer): Wait & load'}</Text>}

{item.haulage_type == 'type4' && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 11, fontSize: 26.4, color: 'black'
}}>{'Standard (on trailer): Trailer Drop & Collect'}</Text>}

{item.haulage_type == 'type5' && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 11, fontSize: 26.4, color: 'black'
}}>{'Standard (on trailer): Quay to Quay'}</Text>}

{item.haulage_type == 'type6' && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 11, fontSize: 26.4, color: 'black'
}}>{'Other'}</Text>}
           
  
  </View> }

  { item.status == 'Approved' && <View style={{
    flex:1, marginTop: 1, backgroundColor:'#fff',
    padding:1,
    borderRadius:10,
    paddingTop: 1,
    // shadowColor: '#efefef',
    // shadowOffset: { width: 0, height: 23 },
    // shadowOpacity: 1,
    // shadowRadius: 3,
    marginTop: 1,
    // elevation: 3,
    marginVertical:5,
    marginLeft: 18,
    marginRight: 18,
    borderColor: 'green',
    borderWidth: .8
    // backgroundColor: 'red'
  
  }}>
  
           
  
            <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 11, fontSize: 23, color: 'black', marginBottom: -36
}}>{'Order Date: '+ item.created_at.substring(0, 10)}</Text>
            
            <Text style={{fontFamily: 'BebasNeuePro-Middle',
  paddingRight: 11, fontSize: 20, color: 'green', alignSelf: 'flex-end', marginBottom:0
}}>{ item.ref}</Text>
            
            {item.haulage_type == 'type1' && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 11, fontSize: 26.4, color: 'black'
}}>{'Sidelifter (lifted to ground): Wait & load'}</Text>}

{item.haulage_type == 'type2' && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 11, fontSize: 26.4, color: 'black'
}}>{'Sidelifter (lifted to ground): Drop & Collect'}</Text>}

{item.haulage_type == 'type3' && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 11, fontSize: 26.4, color: 'black'
}}>{'Standard (on trailer): Wait & load'}</Text>}

{item.haulage_type == 'type4' && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 11, fontSize: 26.4, color: 'black'
}}>{'Standard (on trailer): Trailer Drop & Collect'}</Text>}

{item.haulage_type == 'type5' && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 11, fontSize: 26.4, color: 'black'
}}>{'Standard (on trailer): Quay to Quay'}</Text>}

{item.haulage_type == 'type6' && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 11, fontSize: 26.4, color: 'black'
}}>{'Other'}</Text>}
           
  
  </View> }

  { item.status == 'Rejected' && <View style={{
    flex:1, marginTop: 1, backgroundColor:'#fff',
    padding:1,
    borderRadius:10,
    paddingTop: 1,
    // shadowColor: '#efefef',
    // shadowOffset: { width: 0, height: 23 },
    // shadowOpacity: 1,
    // shadowRadius: 3,
    marginTop: 1,
    // elevation: 3,
    marginVertical:5,
    marginLeft: 18,
    marginRight: 18,
    borderColor: 'red',
    borderWidth: .8
    // backgroundColor: 'red'
  
  }}>
  
           
  
            <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 11, fontSize: 23, color: 'black', marginBottom: -36
}}>{'Order Date: '+ item.created_at.substring(0, 10)}</Text>
            
            <Text style={{fontFamily: 'BebasNeuePro-Middle',
  paddingRight: 11, fontSize: 20, color: 'red', alignSelf: 'flex-end', marginBottom:0
}}>{ item.ref}</Text>
            
            {item.haulage_type == 'type1' && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 11, fontSize: 26.4, color: 'black'
}}>{'Sidelifter (lifted to ground): Wait & load'}</Text>}

{item.haulage_type == 'type2' && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 11, fontSize: 26.4, color: 'black'
}}>{'Sidelifter (lifted to ground): Drop & Collect'}</Text>}

{item.haulage_type == 'type3' && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 11, fontSize: 26.4, color: 'black'
}}>{'Standard (on trailer): Wait & load'}</Text>}

{item.haulage_type == 'type4' && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 11, fontSize: 26.4, color: 'black'
}}>{'Standard (on trailer): Trailer Drop & Collect'}</Text>}

{item.haulage_type == 'type5' && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 11, fontSize: 26.4, color: 'black'
}}>{'Standard (on trailer): Quay to Quay'}</Text>}

{item.haulage_type == 'type6' && <Text style={{fontFamily: 'BebasNeuePro-Middle',
  color: '#000',padding: 11, fontSize: 26.4, color: 'black'
}}>{'Other'}</Text>}
           
  
  </View> }
  </TouchableOpacity>
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