import React,{Component, useState} from 'react';
import { Modal, AppState, StatusBar, Keyboard, ActivityIndicator, View, Text, ImageBackground, StyleSheet, AsyncStorage, Platform, FlatList, ScrollView, TouchableOpacity, Linking, SafeAreaView, TextInput, Image, Dimensions } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker'
import AnimateLoadingButton from 'react-native-animate-loading-button';
import KeyboardManager from 'react-native-keyboard-manager';
import UrlUtil from '../utils/ConfigApp';
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      showUserNameError: false,
      showPasswordError: false,
      modeDateTimePicker: 'time',
      userNameString: '',
      passwordString: '',
      loading: false,
         

    };
   
  }
  componentDidMount = async () => 
  {
// console.log('url is', UrlUtil.BASE_URL)

    if (Platform.OS === 'ios') {
      KeyboardManager.setEnable(true);
    }
    
  }
  _onPressBotton1Handler = async () => { 
    
          Keyboard.dismiss()
    //  this.Login()
    
    this.Login()

    // this.props.navigation.navigate('LoginPage')
   
    
          }
          Login = async () => 
          {

           if (this.state.userNameString.trim() == '' && this.state.passwordString == '')
           {
            this.setState({
              showUserNameError : true,
              showPasswordError : true,
            })
           }
           else if (this.state.userNameString.trim() == '')
           {
            this.setState({
              showUserNameError : true,
            })
           }
           else if (this.state.passwordString == '')
           {
            this.setState({
              showPasswordError : true,
            })
           }
           else
           {
            this.loadingButton.showLoading(true);
            fetch(UrlUtil.BASE_URL+'login', {
      method: 'POST', //Request Type
      body: JSON.stringify({
        email: this.state.userNameString.trim(),//'customer@crescentek.com',
        password: this.state.passwordString,//'12345678',
        // email: 'customer@crescentek.com',
        // password: '12345678',
      }), //post body
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
        // alert(JSON.stringify(responseJson));
        console.log('login response: ',responseJson);
        // this.loadingButton.showLoading(false);

if (responseJson.success == false)
{
  this.loadingButton.showLoading(false);
  alert('Email or Password not authorized');
}
else
{
  AsyncStorage.setItem('userName',  responseJson.data.name);
  AsyncStorage.setItem('token',  responseJson.data.token);
  setTimeout(()=>{
    this.loadingButton.showLoading(false);
    this.props.navigation.replace('LoginPage') //ParcelDetailsPage //DashPage
},1000)
}

          
      })
      //If response is not in json then in error
      .catch((error) => {
        alert('Netwok request failed. Please check your internet connection and try again');
        console.error('error is: ', error);
        this.loadingButton.showLoading(false);
      });
    }  
          
          }

          setUserName = (value) =>
          {
            this.setState({
              userNameString : value,
            })

            if (value.trim() == '')
            {
              this.setState({
                showUserNameError : true,
              })
            }
            else
            {
              this.setState({
                showUserNameError : false,
              })
            }

          }

          setPassword = (value) =>
          {
            this.setState({
              passwordString : value,
            })

            if (value.trim() == '')
            {
              this.setState({
                showPasswordError : true,
              })
            }
            else
            {
              this.setState({
                showPasswordError : false,
              })
            }

          }

  render() {

   const { open, value, items } = this.state;

    return (
      
      <ImageBackground style ={styles.container}
      source ={require('../Images/BlueLineAppbackgroud-05.jpg')}>
        {/* <View style={{...StyleSheet.absoluteFillObject,
    backgroundColor: '#ecf6fa',}} /> */}
        <StatusBar backgroundColor='#4387bb' barStyle={'light-content'} />
<SafeAreaView>
        
          </SafeAreaView>
          <ScrollView nestedScrollEnabled={true} horizontal={false}>
          <Text style={{fontFamily: 'BebasNeuePro-Middle',fontSize: 60, marginTop: 85, color: 'black', marginLeft: 33, marginBottom: 0}}>Welcome Back</Text>
          <Text style={{fontFamily: 'BebasNeuePro-Middle', fontSize: 44, marginTop: 11, color: 'black', marginLeft: 33, marginBottom: 85}}>Login into your account</Text>
          


          
          <TextInput
              style={{
                borderColor: '#4387bb',
                borderWidth: 1,
                // width: '100%',
                color: 'black',
                height: 48,
                borderRadius: 8,
                paddingLeft: 8,
                marginLeft: 18,
                marginRight: 18,
                textAlignVertical: 'center',
                fontFamily: 'BebasNeuePro-Middle',
                fontSize: 27
              }}
              autoCapitalize={false}
              textAlign={'center'}
              placeholder="User Name"
              placeholderTextColor={'black'}
              // ref ={ref => this.inputText1 = ref}
              // editable={this.state.iseditablefname}
              onChangeText={value => this.setUserName(value)}
              value={this.state.userNameString}
              keyboardType='default'></TextInput>

       {this.state.showUserNameError && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 20
    }}>{'Username is required'}</Text> }
          
       <TextInput
              style={{
                borderColor: '#4387bb',
                borderWidth: 1,
                // width: '100%',
                color: 'black',
                height: 48,
                borderRadius: 8,
                paddingLeft: 8,
                marginLeft: 18,
                marginRight: 18,
                textAlignVertical: 'center',
                marginTop: 22,
                fontFamily: 'BebasNeuePro-Middle',
                fontSize: 27
              }}
              textAlign={'center'}
              placeholder="Password"
              placeholderTextColor={'black'}
              // ref ={ref => this.inputText1 = ref}
              // editable={this.state.iseditablefname}
              secureTextEntry={true}
              onChangeText={value => this.setPassword(value)}
              value={this.state.passwordString}
              keyboardType='default'></TextInput>
        
        {this.state.showPasswordError && <Text style={{
        marginTop: 3,
        color: 'red',
        fontSize: 11,
        marginBottom: -5,
        alignSelf: 'flex-start',
        marginLeft: 20
    }}>{'Password is required'}</Text> }

        <View style={{
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: 0,
        marginTop: 22,
        marginLeft: 18,
        marginRight: 18,
      }}>
              <AnimateLoadingButton
              ref={c => (this.loadingButton = c)}
              width={Dimensions.get('window').width - 36}
              height={48}
              titleFontFamily='BebasNeuePro-Bold'
              title="Login"
              titleFontSize={26.4}
              titleColor="rgb(255,255,255)"
              backgroundColor="#4387bb"
              borderRadius={4}
              onPress={this._onPressBotton1Handler.bind(this)}
            />
          </View>
          <TouchableOpacity style={{
        marginTop: 20,
        alignSelf: 'flex-end',
        marginRight: 20,
        paddingBottom: 40
    }}
                onPress={() => this.props.navigation.navigate('ForgotPasswordPage')}>
          <Text style={{
        color: '#1A1919',
        fontSize: 23,
        fontFamily: 'BebasNeuePro-Middle',
    }}>{'Forgot Password?'}</Text>
    </TouchableOpacity>

          {/* 1A1919 */}
          </ScrollView>

          
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

      </ImageBackground>
      

      

     
      
    );
  }



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  backgroundColor: "red",
    // backgroundColor: "#ecf6fa",
    marginTop: 0,
    zIndex: 0,

  },
  textLabel: {
    fontFamily: 'BebasNeuePro-Regular',
    color: '#000',padding: 4, fontSize: 20, color: 'black'
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
    marginStart: 10,
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