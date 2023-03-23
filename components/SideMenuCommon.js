import React, {Component} from 'react';
import {TouchableOpacity, AsyncStorage, View, StyleSheet, Dimensions, Text, FlatList} from 'react-native';
import Modal1 from "react-native-modal";
import UrlUtil from '../utils/ConfigApp';
const {height} = Dimensions.get('window');

export default class SideMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
        //   isModalVisible: false,
        //   isHideMaskedView: false,
        //   loading: false,
        tokenString: '',
            itemListForDrawer:  [
              {a: 'Profile'},
              {a: 'Orders'},
              {a: 'Terms & Conditions'},
              {a: 'Office Contacts'},
              {a: "Resources"},
              // {a: "Change Password"},
              {a: 'Logout'},
            ]
        };
      }

      logoutApi = async () => 
      {

        AsyncStorage.getItem("token").then((value) => {
        var bearer = 'Bearer ' + value;
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
  //  alert('Something went wrong, please try again later');
  }
  else
  {
    AsyncStorage.clear();

    if  (this.props.screenName == 'Dashboard')
            {
             this.handleHideMask(true).then(() => {
                this.props.navigation.replace('SignInPage');
               })
            }
            else
            {
                this.props.navigation.replace('SignInPage');
            }
  }
    
  })
  .catch((error) => {
    alert('Netwok request failed. Please check your internet connection and try again');
    console.error(error);
  });
})
      
      }
  
    renderHorizontalItem1 = ({ item, index }) => {

        return (
      
      <TouchableOpacity style={{
        flex:1, marginTop: 10,
        width: '100%',
        height: 50}} onPress ={() => this.selectMenuItem(index)}>
      
                <Text style={{paddingLeft: 13,textAlignVertical: 'center', justifyContent: 'center',
                fontFamily: 'BebasNeuePro-Middle',fontSize: Dimensions.get('window').width > 375 ? 44.2 : 38, color: 'black',}
    }>{item.a}</Text>
                
      </TouchableOpacity>
         )}

    selectMenuItem = (index) =>{  

      this.handleModalVisible(false)
  
        if (index == 0)
        {

            if  (this.props.screenName == 'Dashboard')
           {
            this.handleHideMask(true).then(() => {
                this.props.navigation.navigate('ProfilePage')
              })
           }
           else if  (this.props.screenName == 'Profile')
           {
            this.handleModalVisible(false)
           }
           else
           {
            this.props.navigation.navigate('ProfilePage')
           }
          
        }
        else if (index == 1)
        {

            if  (this.props.screenName == 'Dashboard')
           {
            this.handleHideMask(true).then(() => {
                this.props.navigation.navigate('OrdersPage')
              })
           }
           else
           {
            this.props.navigation.navigate('OrdersPage')
           }

        }
        else if (index == 2)
        {

            if  (this.props.screenName == 'Dashboard')
            {
             this.handleHideMask(true).then(() => {
                 this.props.navigation.navigate('HowToUsePage')
               })
            }
            else if (this.props.screenName == 'TermsAndConditions')
            {
                this.handleModalVisible(false)
            }
            else
            {
             this.props.navigation.navigate('HowToUsePage')
            }

        }
        else if (index == 3)
        {

            if  (this.props.screenName == 'Dashboard')
            {
             this.handleHideMask(true).then(() => {
                 this.props.navigation.navigate('OfficeContactsPage')
               })
            }
            else if (this.props.screenName == 'OfficeContacts')
            {
                this.handleModalVisible(false)
            }
            else
            {
             this.props.navigation.navigate('OfficeContactsPage')
            }

        }
        else if (index == 4)
        {

            if  (this.props.screenName == 'Dashboard')
            {
             this.handleHideMask(true).then(() => {
                 this.props.navigation.navigate('FAQsPage')
               })
            }
            else if (this.props.screenName == 'Resources')
            {
                this.handleModalVisible(false)
            }
            else
            {
             this.props.navigation.navigate('FAQsPage')
            }

        }
        else if (index == 5)
        {

          this.logoutApi()

        }
        else if (index == 6)
        {
          // this.logoutApi()
          
        }
  
       }

       handleModalVisible = (value) => {
        this.props.handleModalVisible(value);
      }

      handleHideMask = (value) => {

        return new Promise((resolve) => {
            this.props.handleHideMask(value);
            resolve();
          });
      }

       render() {
    return (
        <Modal1 isVisible={this.props.isVisible} 
        onBackdropPress={() => this.handleModalVisible(false)}
        swipeDirection="left"
        animationIn = 'slideInLeft'
        animationOut= 'slideOutLeft'
        onSwipeComplete={() => this.handleModalVisible(false)} >
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
          </Modal1>
    );
        }
}

const styles = StyleSheet.create({
  preloader: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
    backgroundColor: '#FFFFFF',
  },
});
