import React, {Component} from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
} from 'react-native';
import Modal1 from 'react-native-modal';
import UrlUtil from '../utils/ConfigApp';
const {height} = Dimensions.get('window');

export default class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  navigateTotheNewOrderScreen = () => {
    if (this.props.screenName == 'Dashboard') {
      this.setState(
        {
          isHideMaskedView: true,
        },
        () => {
          this.props.navigation.navigate('NewOrderPage');
        },
      );
    } else {
      this.props.navigation.navigate('NewOrderPage');
    }
  };

  navigateTotheProfileScreen = () => {
    if (this.props.screenName == 'Dashboard') {
      this.setState(
        {
          isHideMaskedView: true,
        },
        () => {
          this.props.navigation.navigate('ProfilePage');
        },
      );
    } else {
      this.props.navigation.navigate('ProfilePage');
    }
  };

  navigateTothDashboardScreen = () => {
    this.props.navigation.navigate('LoginPage');
  };

  render() {
    return (
      <View style={styles.footer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flex: 1,
              maxWidth: 414,
              backgroundColor: null,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              disabled={this.props.screenName == 'Dashboard' ? true : false}
              onPress={() => this.navigateTothDashboardScreen()}>
              <View
                style={{
                  marginLeft: 0,
                  width: Dimensions.get('window').width / 3,
                  marginTop: 0,
                  height: 80,
                  backgroundColor: 'null',
                }}>
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    marginStart: 18,
                  }}>
                  <Image
                    style={{
                      height: 30,
                      width: 30,
                      resizeMode: 'contain',
                      tintColor:
                        this.props.screenName == 'Dashboard' ? 'grey' : null,
                    }}
                    source={require('../Images/Home.png')}></Image>
                  <Text
                    style={{
                      fontFamily: 'BebasNeuePro-Middle',
                      fontSize: 13.2,
                      marginTop: 5,
                      paddingLeft: 4,
                    }}>
                    Home
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={this.props.screenName == 'NewOrder' ? true : false}
              onPress={() => this.navigateTotheNewOrderScreen()}>
              <View
                style={{
                  marginLeft: 0,
                  width: Dimensions.get('window').width / 3,
                  marginTop: 0,
                  height: 80,
                }}>
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{height: 30, width: 30, resizeMode: 'contain'}}
                    source={
                      this.props.screenName == 'NewOrder'
                        ? require('../Images/plusicongrey.png')
                        : require('../Images/Create.png')
                    }></Image>
                  <Text
                    style={{
                      fontFamily: 'BebasNeuePro-Middle',
                      fontSize: 13.2,
                      marginTop: 5,
                    }}>
                    New Booking
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={this.props.screenName == 'Profile' ? true : false}
              onPress={() => this.navigateTotheProfileScreen()}>
              <View
                style={{
                  marginLeft: 0,
                  width: Dimensions.get('window').width / 3,
                  marginTop: 0,
                  height: 80,
                }}>
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    marginEnd: 18,
                  }}>
                  <Image
                    style={{
                      height: 30,
                      width: 30,
                      resizeMode: 'contain',
                      tintColor:
                        this.props.screenName == 'Profile' ? 'grey' : null,
                    }}
                    source={require('../Images/User.png')}></Image>
                  <Text
                    style={{
                      fontFamily: 'BebasNeuePro-Middle',
                      fontSize: 13.2,
                      marginTop: 5,
                      paddingRight: 3,
                    }}>
                    Profile
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    height: 80,
    left: 0,
    // top: Dimensions.get('window').height - 100,
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    bottom: 0,
    // opacity: 0.9,

    borderTopWidth: 1,
    // borderRadius: 20,
    borderColor: 'white',
    borderBottomWidth: 0,
    shadowColor: 'white',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    shadowColor: 'grey',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 3,
  },
});
