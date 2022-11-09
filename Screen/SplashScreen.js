import React,{Component} from 'react';

import { StyleSheet, Image,ImageBackground, AsyncStorage} from 'react-native';
import {StatusBar} from 'react-native';


export default class SplashScreen extends Component{

 
  async componentWillMount(){

    

      let userLoggedInOrNotFlagString = await AsyncStorage.getItem('status');

      if (userLoggedInOrNotFlagString == 'true') //'true'
   {
  setTimeout(()=>{
    this.props.navigation.navigate('SignInPage') //ParcelDetailsPage //DashPage
},2000)
console.disableYellowBox = true; 
}
else
{
  this.props.navigation.navigate('SignInPage')
    //  this.props.navigation.replace('LoginPage'); 
      
      }
    }

  render(){
    return(
        <ImageBackground source={require('../Images/splash2.jpg')} style= {styles.container} >
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
