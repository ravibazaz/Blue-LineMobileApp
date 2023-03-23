import React, {Component} from 'react';
import {
  View,
  Modal,
  ActivityIndicator,
  AsyncStorage,
  AppState,
  Button,
  StatusBar,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import MaskedView from '../components/maskedView';
import MaskedElement from '../components/maskElement';
import SideMenuCommon from '../components/SideMenuCommon';
import TabBarCommon from '../components/TabBarCommon';
import UrlUtil from '../utils/ConfigApp';
import Toast from 'react-native-simple-toast';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      checkNavigationDone: false,
      open: false,
      userNameString: '',
      tokenString: '',
      isModalVisible: false,
      isHideMaskedView: false,
      loading: false,
      itemList: [],
    };
  }

  async checkAppState() {
    this.appStateSubscription = AppState.addEventListener(
      'change',
      async nextAppState => {
        console.log('nextAppState: ', nextAppState);

        if (
          this.state.appState.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('App has come to the foreground!');

          let dispatchTimeString = await AsyncStorage.getItem('dispatchTime');

          var msDiff =
            new Date().getTime() - new Date(dispatchTimeString).getTime(); //Future date - current date
          var timeTillNow = Math.floor(msDiff / 1000 / 60); //Math.floor(msDiff / (1000 * 60 * 60 * 24));

          console.log(
            'dispatchTimeString is: ',
            dispatchTimeString,
            timeTillNow,
          );

          if (timeTillNow > 30) {
            Toast.show("You're being timed out due to inactivity", Toast.LONG);
            this.logoutApi();
          }
        } else if (
          this.state.appState.match(/inactive|active/) &&
          nextAppState === 'background'
        ) {
          AsyncStorage.setItem('dispatchTime', String(new Date()));
          console.log('App has come to the background!');
        } else if (
          this.state.appState.match(/inactive|active/) &&
          nextAppState === 'inactive'
        ) {
          AsyncStorage.setItem('dispatchTime', String(new Date()));
        }
        this.setState({appState: nextAppState});
      },
    );
  }

  componentDidMount = async () => {
    this.checkAppState();
    // let userName = await AsyncStorage.getItem('userName');
    // this.setState({
    //   userNameString: 'Welcome Back ' + userName,
    // });

    this.props.navigation.addListener('blur', () => {
      console.log('unMount calledddd');
      this.appStateSubscription.remove();
      this.setState({
        isHideMaskedView: true,
        // userNameString: 'Welcome Back ' + userName,
      });
    });

    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.checkAppState();
      this.setState({
        isHideMaskedView: false,
        isModalVisible: false,
      });

      AsyncStorage.getItem('token')
        .then(value => {
          this.setState({tokenString: value, loading: true});
        })
        .then(res => {
          this.fetchProfileData()
          this.fetchOrderList();
        });
    });

    AsyncStorage.getItem('token')
      .then(value => {
        this.setState({tokenString: value, loading: true});
      })
      .then(res => {
        this.fetchOrderList();
      });
  };

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
.then((responseJson) => {
  console.log('user data response: ',responseJson);
if (responseJson.success == false)
{
  alert('Netwok request failed. Please check your internet connection and try again');
}
else
{
  this.setState({
    userNameString: 'Welcome Back ' + responseJson.data.name,
  });
  AsyncStorage.setItem('userData',  JSON.stringify(responseJson.data));
}

    
})
.catch((error) => {
  alert('Netwok request failed. Please check your internet connection and try again');
  console.error(error);
});

    
    }

  logoutApi = async () => {
    AsyncStorage.getItem('token').then(value => {
      var bearer = 'Bearer ' + value;
      fetch(UrlUtil.BASE_URL + 'logout', {
        method: 'GET',
        headers: {
          Authorization: bearer,
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log('logout response: ', responseJson);

          if (responseJson.success == false) {
          } else {
            AsyncStorage.clear();
            this.setState(
              {
                isHideMaskedView: true,
              },
              () => {
                this.props.navigation.replace('SignInPage');
              },
            );
          }
        })
        .catch(error => {
          alert(
            'Netwok request failed. Please check your internet connection and try again',
          );
          console.error(error);
        });
    });
  };

  fetchOrderList = async () => {
    var bearer = 'Bearer ' + this.state.tokenString;
    fetch(UrlUtil.BASE_URL + 'bookinglist', {
      method: 'GET', //Request Type
      headers: {
        Authorization: bearer,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('containesizetype response: ', responseJson);
        this.setState({
          loading: false,
        });
        if (responseJson.success == false) {
        } else {
          this.setState({
            itemList: responseJson.data,
          });
          if (responseJson.message == 'Records not Found') {
            Toast.show('No orders found', Toast.LONG);
          }
        }
      })
      .catch(error => {
        this.setState({
          loading: false,
        });
        alert(
          'Netwok request failed. Please check your internet connection and try again',
        );
        console.error(error);
      });
  };
  toggleModal = () => {
    this.setState({isModalVisible: true});
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#4387bb" barStyle={'light-content'} />
        <SafeAreaView>
          <View style={styles.dashboard_main_headers}>
            <View style={styles.dashboard_headers_Menu_View}>
              <TouchableOpacity onPress={() => this.toggleModal()}>
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
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>

        <Text
          style={{
            fontFamily: 'BebasNeuePro-Middle',
            fontSize: 46.2,
            marginTop: 45,
            color: 'black',
            marginLeft: 33,
            marginBottom: 45,
            marginRight: 11,
          }}>
          {this.state.userNameString}
        </Text>

        {this.state.isHideMaskedView == false && (
          <MaskedView element={<MaskedElement />}>
            <FlatList
              inverted={true}
              keyboardDismissMode="none"
              keyboardShouldPersistTaps="handled"
              style={{
                marginTop: 6,
                marginBottom: 85,
              }}
              data={this.state.itemList}
              renderItem={this.renderHorizontalItem}
              keyExtractor={(item, index) => index}
            />
          </MaskedView>
        )}

        {this.state.isHideMaskedView && (
          <FlatList
            inverted={true}
            keyboardDismissMode="none"
            keyboardShouldPersistTaps="handled"
            style={{
              marginTop: 6,
              marginBottom: 85,
            }}
            data={this.state.itemList}
            renderItem={this.renderHorizontalItem}
            keyExtractor={(item, index) => index}
          />
        )}

        <TabBarCommon
          screenName={'Dashboard'}
          navigation={this.props.navigation}
        />

        <Modal
          transparent={true}
          animationType={'none'}
          visible={this.state.loading}
          onRequestClose={() => {
            console.log('close modal');
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'space-around',
              backgroundColor: '#00000040',
            }}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <ActivityIndicator
                size="large"
                color="#4387bb"
                animating={this.state.loading}
              />
            </View>
          </View>
        </Modal>

        <SideMenuCommon
          screenName={'Dashboard'}
          isVisible={this.state.isModalVisible}
          navigation={this.props.navigation}
          handleModalVisible={this.handleModalVisible}
          handleHideMask={this.handleHideMask}
        />
      </View>
    );
  }

  handleModalVisible = value => {
    this.setState({isModalVisible: value});
  };

  handleHideMask = value => {
    this.setState({isHideMaskedView: value});
  };

  navigateTotheNewOrderScreen = () => {
    this.setState(
      {
        isHideMaskedView: true,
      },
      () => {
        this.props.navigation.navigate('NewOrderPage');
      },
    );
  };

  navigateTotheProfileScreen = () => {
    this.setState(
      {
        isHideMaskedView: true,
      },
      () => {
        this.props.navigation.navigate('ProfilePage');
      },
    );
  };

  renderHorizontalItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('OrderDetailsPage', {
            id: item.id,
            status: item.status,
          })
        }>
        {item.status == 'Pending' && (
          <View
            style={{
              flex: 1,
              marginTop: 1,
              backgroundColor: '#fff',
              padding: 1,
              borderRadius: 10,
              paddingTop: 1,
              marginTop: 1,
              elevation: 3,
              marginVertical: 5,
              marginLeft: 18,
              marginRight: 18,
              borderColor: 'orange',
              borderWidth: 0.9,
            }}>
            <Text
              style={{
                fontFamily: 'BebasNeuePro-Middle',
                color: '#000',
                padding: 11,
                fontSize: 23,
                color: 'black',
                marginBottom: -36,
              }}>
              {'Order Date: ' + item.created_at.substring(0, 10)}
            </Text>

            <Text
              style={{
                fontFamily: 'BebasNeuePro-Middle',
                paddingRight: 11,
                fontSize: 20,
                color: 'orange',
                alignSelf: 'flex-end',
                marginBottom: 0,
              }}>
              {item.status}
            </Text>

            <Text
              style={{
                fontFamily: 'BebasNeuePro-Middle',
                color: '#000',
                padding: 11,
                fontSize: 26.4,
                color: 'black',
              }}>
              {item.haulage_type == 'type1'
                ? 'Sidelifter (lifted to ground): Wait & load'
                : item.haulage_type == 'type2'
                ? 'Sidelifter (lifted to ground): Drop & Collect'
                : item.haulage_type == 'type3'
                ? 'Sidelifter (lifted to ground): Drop & Collect'
                : item.haulage_type == 'type4'
                ? 'Standard (on trailer): Trailer Drop & Collect'
                : item.haulage_type == 'type5'
                ? 'Standard (on trailer): Quay to Quay'
                : 'Other'}
            </Text>
          </View>
        )}

        {item.status == 'Rejected' && (
          <View
            style={{
              flex: 1,
              marginTop: 1,
              backgroundColor: '#fff',
              padding: 1,
              borderRadius: 10,
              paddingTop: 1,
              marginTop: 1,
              elevation: 3,
              marginVertical: 5,
              marginLeft: 18,
              marginRight: 18,
              borderColor: 'red',
              borderWidth: 0.9,
            }}>
            <Text
              style={{
                fontFamily: 'BebasNeuePro-Middle',
                color: '#000',
                padding: 11,
                fontSize: 23,
                color: 'black',
                marginBottom: -36,
              }}>
              {'Order Date: ' + item.created_at.substring(0, 10)}
            </Text>

            <Text
              style={{
                fontFamily: 'BebasNeuePro-Middle',
                paddingRight: 11,
                fontSize: 20,
                color: 'red',
                alignSelf: 'flex-end',
                marginBottom: 0,
              }}>
              {item.ref}
            </Text>

            <Text
              style={{
                fontFamily: 'BebasNeuePro-Middle',
                color: '#000',
                padding: 11,
                fontSize: 26.4,
                color: 'black',
              }}>
              {item.haulage_type == 'type1'
                ? 'Sidelifter (lifted to ground): Wait & load'
                : item.haulage_type == 'type2'
                ? 'Sidelifter (lifted to ground): Drop & Collect'
                : item.haulage_type == 'type3'
                ? 'Sidelifter (lifted to ground): Drop & Collect'
                : item.haulage_type == 'type4'
                ? 'Standard (on trailer): Trailer Drop & Collect'
                : item.haulage_type == 'type5'
                ? 'Standard (on trailer): Quay to Quay'
                : 'Other'}
            </Text>
          </View>
        )}

        {item.status == 'Approved' && (
          <View
            style={{
              flex: 1,
              marginTop: 1,
              backgroundColor: '#fff',
              padding: 1,
              borderRadius: 10,
              paddingTop: 1,
              marginTop: 1,
              elevation: 3,
              marginVertical: 5,
              marginLeft: 18,
              marginRight: 18,
              borderColor: 'green',
              borderWidth: 0.9,
            }}>
            <Text
              style={{
                fontFamily: 'BebasNeuePro-Middle',
                color: '#000',
                padding: 11,
                fontSize: 23,
                color: 'black',
                marginBottom: -36,
              }}>
              {'Order Date: ' + item.created_at.substring(0, 10)}
            </Text>

            <Text
              style={{
                fontFamily: 'BebasNeuePro-Middle',
                paddingRight: 11,
                fontSize: 20,
                color: 'green',
                alignSelf: 'flex-end',
                marginBottom: 0,
              }}>
              {item.ref}
            </Text>

            <Text
              style={{
                fontFamily: 'BebasNeuePro-Middle',
                color: '#000',
                padding: 11,
                fontSize: 26.4,
                color: 'black',
              }}>
              {item.haulage_type == 'type1'
                ? 'Sidelifter (lifted to ground): Wait & load'
                : item.haulage_type == 'type2'
                ? 'Sidelifter (lifted to ground): Drop & Collect'
                : item.haulage_type == 'type3'
                ? 'Sidelifter (lifted to ground): Drop & Collect'
                : item.haulage_type == 'type4'
                ? 'Standard (on trailer): Trailer Drop & Collect'
                : item.haulage_type == 'type5'
                ? 'Standard (on trailer): Quay to Quay'
                : 'Other'}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf6fa',
    marginTop: 0,
    zIndex: 0,
  },
  dashboard_main_headers: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  dashboard_headers_Menu_View: {
    width: '50%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  dashboard_headers_Create_View: {
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
    tintColor: '#4387bb',
  },
  animatedBox: {
    flex: 1,
    backgroundColor: '#38C8EC',
    padding: 10,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F04812',
  },
});
