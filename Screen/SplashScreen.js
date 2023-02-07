import React,{Component} from 'react';

import { StyleSheet, Image,ImageBackground, AsyncStorage} from 'react-native';
import {StatusBar} from 'react-native';


export default class SplashScreen extends Component{

 
  async componentWillMount(){
    this.LoginReg();
    }
     LoginReg = async () => {

      var token = await AsyncStorage.getItem('token');
  
      let dispatchTimeString = await AsyncStorage.getItem('dispatchTime');
          var msDiff =new Date().getTime() - new Date(dispatchTimeString).getTime();    //Future date - current date
           var timeTillNow = Math.floor((msDiff/1000)/60);//Math.floor(msDiff / (1000 * 60 * 60 * 24));
  
          console.log("dispatchTimeString is: ", dispatchTimeString, timeTillNow);
  
          if (timeTillNow > 30)
          {
            this.props.navigation.replace('SignInPage')
          }
          else
          {
            setTimeout(() => 
            {
              if (token == null || token == undefined) {
                 this.props.navigation.replace('SignInPage')
                //  navigation.navigate('LoginPage'); // Dashboard_donation // StartCampaign  
              } else {
                this.props.navigation.replace('LoginPage');
              }
            }, 2000);
          }  
    };
  render(){
    return(
      <ImageBackground source={require('../Images/splash-screen.jpg')} style= {{
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
}

var styles = StyleSheet.create({
    container: {
      flex: 1,
      // remove width and height to override fixed static size
     
       width: null,
      height: null,
      resizeMode: 'cover',
      justifyContent: 'center',

    }

    
   
  });
