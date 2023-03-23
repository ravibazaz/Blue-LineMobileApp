import React, {Component, useState} from 'react';
import {
  AppState,
  StatusBar,
  View,
  Text,
  StyleSheet,
  FlatList,
  AsyncStorage,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import SideMenuCommon from '../components/SideMenuCommon';
import TabBarCommon from '../components/TabBarCommon';
import Toast from 'react-native-simple-toast';
import UrlUtil from '../utils/ConfigApp';
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      checkNavigationDone: false,
      tokenString: '',
      companyNameString: '',
      companyIDString: '',
      emailString: '',
      phoneNoString: '',
      houseString: '',
      streetString: '',
      townString: '',
      countryString: '',
      refIDString: '',

      containerSizeIDString: '',
      containerSizeValueString: '',
      haulageIDString: '',
      haulageValueString: '',
      containerPurchaseString: '',
      cargoTypeString: '',
      AgreedPriceString: '',
      TotalCargoWeightString: '',
      DestinationPortString: '',
      DestinationCountryString: '',
      SiteContactNameString: '',
      SiteContactTelnoString: '',
      LoadingPostcodeString: '',
      LoadingAddressString: '',
      Delivery_Time_String: '',
      Delivery_Date_String: '',
      DeliveryAddressString: '',
      Collection_Date_String: '',
      Collection_Time_String: '',
      Loading_Time_String: '',
      Loading_Date_String: '',
      CargoHazadeousString: '',

      AdditionalShippingInformationString: '',
      Company_String: '',
      Address1_String: '',
      Address2_String: '',
      City_String: '',
      Country_String: '',
      PostalCode_String: '',
      Company_String_LA: '',
      Address1_String_LA: '',
      Address2_String_LA: '',
      City_String_LA: '',
      Country_String_LA: '',
      PostalCode_String_LA: '',
      containerSizeIDString: '',
      isSuccessTextShow: false,
      isModalVisible: false,
    };
  }
  componentDidMount = async () => {
    this.checkAppState();
    console.log('item id is::::: ', this.props.route.params.id);

    AsyncStorage.getItem('token')
      .then(value => {
        this.setState({tokenString: value});
      })
      .then(res => {
        this.fetchOrderDetails();
      });

    this.props.navigation.addListener('blur', () => {
      this.setState({checkNavigationDone: true});
      this.appStateSubscription.remove();
    });

    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.setState({checkNavigationDone: false, isModalVisible: false});
      this.checkAppState();
    });
  };
  async checkAppState() {
    this.appStateSubscription = AppState.addEventListener(
      'change',
      async nextAppState => {
        if (
          this.state.appState.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          let dispatchTimeString = await AsyncStorage.getItem('dispatchTime');
          var msDiff =
            new Date().getTime() - new Date(dispatchTimeString).getTime();
          var timeTillNow = Math.floor(msDiff / 1000 / 60);
          console.log(
            'dispatchTimeString is: ',
            dispatchTimeString,
            timeTillNow,
          );
          if (timeTillNow > 30) {
            if (this.state.checkNavigationDone == false) {
              Toast.show(
                "You're being timed out due to inactivity",
                Toast.LONG,
              );
              this.setState(
                {
                  checkNavigationDone: true,
                },
                () => {
                  this.logoutApi();
                },
              );
            }
          }
        } else if (
          this.state.appState.match(/inactive|active/) &&
          nextAppState === 'background'
        ) {
          AsyncStorage.setItem('dispatchTime', String(new Date()));
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
  fetchOrderDetails = async () => {
    var bearer = 'Bearer ' + this.state.tokenString;
    fetch(UrlUtil.BASE_URL + 'get-booking-details', {
      method: 'POST',
      headers: {
        Authorization: bearer,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.props.route.params.id,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('fetchOrderDetails response: ', responseJson);
        if (responseJson.success == false) {
        } else {
          var delivery_address = responseJson.data[0].customdeliveryaddress;
          var loading_address = responseJson.data[0].customloadingaddress;

          if (responseJson.data[0].haulage_type == 'type1') {
            this.setState({
              haulageValueString: 'Sidelifter (lifted to ground): Wait & load',
              Loading_Time_String: responseJson.data[0].loading_time || '',
              Loading_Date_String: responseJson.data[0].loading_date || '',
              LoadingAddressString: responseJson.data[0].loading_address || '',
              Company_String_LA: loading_address.company || '',
              Address1_String_LA: loading_address.address1 || '',
              Address2_String_LA: loading_address.address2 || '',
              City_String_LA: loading_address.city || '',
              Country_String_LA: loading_address.county || '',
              PostalCode_String_LA: loading_address.post_code || '',
            });
          } else if (responseJson.data[0].haulage_type == 'type2') {
            this.setState({
              haulageValueString:
                'Sidelifter (lifted to ground): Drop & Collect',
              Delivery_Time_String: responseJson.data[0].delivery_time || '',
              Delivery_Date_String: responseJson.data[0].delivery_date || '',
              DeliveryAddressString: responseJson.data[0].delivery_address || '',
              Collection_Date_String: responseJson.data[0].collection_date || '',
              Collection_Time_String: responseJson.data[0].collection_time || '',
              Company_String: delivery_address.company || '',
              Address1_String: delivery_address.address1 || '',
              Address2_String: delivery_address.address2 || '',
              City_String: delivery_address.city || '',
              Country_String: delivery_address.county || '',
              PostalCode_String: delivery_address.post_code || '',
            });
          } else if (responseJson.data[0].haulage_type == 'type3') {
            this.setState({
              haulageValueString: 'Standard (on trailer): Wait & load',
              Loading_Time_String: responseJson.data[0].loading_time,
              Loading_Date_String: responseJson.data[0].loading_date,
              LoadingAddressString: responseJson.data[0].loading_address,
              Company_String_LA: loading_address.company,
              Address1_String_LA: loading_address.address1,
              Address2_String_LA: loading_address.address2,
              City_String_LA: loading_address.city,
              Country_String_LA: loading_address.county,
              PostalCode_String_LA: loading_address.post_code,
            });
          } else if (responseJson.data[0].haulage_type == 'type4') {
            this.setState({
              haulageValueString:
                'Standard (on trailer): Trailer Drop & Collect',
              Delivery_Time_String: responseJson.data[0].delivery_time,
              Delivery_Date_String: responseJson.data[0].delivery_date,
              DeliveryAddressString: responseJson.data[0].delivery_address,
              Collection_Date_String: responseJson.data[0].collection_date,
              Collection_Time_String: responseJson.data[0].collection_time,
              Company_String: delivery_address.company,
              Address1_String: delivery_address.address1,
              Address2_String: delivery_address.address2,
              City_String: delivery_address.city,
              Country_String: delivery_address.county,
              PostalCode_String: delivery_address.post_code,
            });
          } else if (responseJson.data[0].haulage_type == 'type5') {
            this.setState({
              haulageValueString: 'Standard (on trailer): Quay to Quay',
            });
          } else if (responseJson.data[0].haulage_type == 'type6') {
            this.setState({haulageValueString: 'Other'});
          } else {
          }

          this.setState({
            companyIDString: responseJson.data[0].ref,
            containerSizeValueString:
              responseJson.data[0].containersizetype.type,
            haulageIDString: responseJson.data[0].haulage_type,
            containerPurchaseString: responseJson.data[0].container_purchase,
            cargoTypeString: responseJson.data[0].cargo_type,
            CargoHazadeousString: responseJson.data[0].is_the_cargo_hazadeous,
            AgreedPriceString: responseJson.data[0].agreed_price,
            TotalCargoWeightString: responseJson.data[0].total_cargo_weight,
            DestinationPortString:
              responseJson.data[0].destinationport.port_name,
            DestinationCountryString:
              responseJson.data[0].destinationcountry.country_name,
            SiteContactNameString: responseJson.data[0].site_contact_name,
            SiteContactTelnoString:
              responseJson.data[0].site_contact_tel_number,
            AdditionalShippingInformationString:
              responseJson.data[0].additional_shipping_information,
          });
        }
      })
      .catch(error => {
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
          </View>

          <TouchableOpacity
            style={{
              width: '50%',
              alignItems: 'flex-start',
              // justifyContent: 'space-between',
              marginLeft: 17,
              flexDirection: 'row',
            }}
            onPress={() => this.props.navigation.goBack()}>
            <Image
              style={styles.menu_icon}
              source={require('../Images/arrow-05.png')}
            />

            <Text
              style={{
                marginTop: 4,
                fontFamily: 'BebasNeuePro-Middle',
                fontSize: 19,
                color: '#4387bb',
                marginLeft: 7,
              }}>
              Back to orders
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
        <ScrollView
          ref={view => (this._scrollView = view)}
          style={{backgroundColor: 'null'}}>
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginLeft: 12,
              flexDirection: 'row',
              marginTop: 35,
              marginLeft: 22,
            }}>
            <View
              style={{
                width: '70%',
                flexDirection: 'row',
              }}
              onPress={() => this.props.navigation.goBack()}>
              <Text
                style={{
                  fontFamily: 'BebasNeuePro-Middle',
                  fontSize: 29.6,
                  color: '#4387bb',
                }}>
                {'Order: '}
              </Text>
              {this.props.route.params.status == 'Pending' && (
                <Text
                  style={{
                    fontFamily: 'BebasNeuePro-Middle',
                    fontSize: 29.6,
                    color: 'orange',
                  }}>
                  {this.state.companyIDString}
                </Text>
              )}

              {this.props.route.params.status == 'Approved' && (
                <Text
                  style={{
                    fontFamily: 'BebasNeuePro-Middle',
                    fontSize: 29.6,
                    color: '#91cc92',
                  }}>
                  {this.state.companyIDString}
                </Text>
              )}

              {this.props.route.params.status == 'Rejected' && (
                <Text
                  style={{
                    fontFamily: 'BebasNeuePro-Middle',
                    fontSize: 29.6,
                    color: 'red',
                  }}>
                  {this.state.companyIDString}
                </Text>
              )}
            </View>
            <TouchableOpacity
              style={{marginRight: 22}}
              onPress={() =>
                this.props.navigation.navigate('NewOrderPage', {
                  reorderFlag: true,
                  record_id: this.props.route.params.id,
                })
              }>
              <Text
                style={{
                  fontFamily: 'BebasNeuePro-Middle',
                  fontSize: 29.6,
                  color: '#9B4F8F',
                }}>
                {'Duplicate'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontFamily: 'BebasNeuePro-Middle',
              fontSize: 29.6,
              marginTop: 15,
              color: '#4387bb',
              marginLeft: 22,
              marginBottom: 16,
            }}>
            Details
          </Text>

          <FlatList
            keyboardDismissMode="none"
            keyboardShouldPersistTaps="handled"
            style={{
              marginTop: 6,
              marginBottom: 0,
            }}
            data={Array.from(Array(23).keys())}
            renderItem={this.renderHorizontalItem1}
            keyExtractor={(item, index) => index}
          />

          <View style={{height: 100}}></View>
        </ScrollView>
        <TabBarCommon
          screenName={'OrderDetails'}
          navigation={this.props.navigation}
        />

        <SideMenuCommon
          screenName={'OrderDetails'}
          isVisible={this.state.isModalVisible}
          navigation={this.props.navigation}
          handleModalVisible={this.handleModalVisible}
        />
      </View>
    );
  }
  handleModalVisible = value => {
    this.setState({isModalVisible: value});
  };
  renderHorizontalItem = ({item, index}) => {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 1,
          borderRadius: 10,
          marginVertical: 0,
          marginLeft: 18,
          marginRight: 18,
        }}>
        {index == 0 && (
          <Text
            style={{
              fontFamily: 'BebasNeuePro-Middle',
              color: '#000',
              padding: 4,
              fontSize: 36.2,
              color: 'black',
            }}>
            {this.state.companyIDString}
          </Text>
        )}

        {index == 1 && (
          <Text
            style={{
              fontFamily: 'BebasNeuePro-Middle',
              color: '#000',
              padding: 4,
              fontSize: 36.2,
              color: 'black',
            }}>
            {this.state.companyNameString}
          </Text>
        )}
        {index == 2 && (
          <Text
            style={{
              fontFamily: 'BebasNeuePro-Middle',
              color: '#000',
              padding: 4,
              fontSize: 36.2,
              color: 'black',
            }}>
            {this.state.emailString}
          </Text>
        )}

        {index == 3 && (
          <Text
            style={{
              fontFamily: 'BebasNeuePro-Middle',
              color: '#000',
              padding: 4,
              fontSize: 36.2,
              color: 'black',
            }}>
            {this.state.phoneNoString}
          </Text>
        )}

        {index == 4 && (
          <Text
            style={{
              fontFamily: 'BebasNeuePro-Middle',
              color: '#000',
              padding: 4,
              fontSize: 36.2,
              color: 'black',
            }}>
            {this.state.houseString}
          </Text>
        )}

        {index == 5 && (
          <Text
            style={{
              fontFamily: 'BebasNeuePro-Middle',
              color: '#000',
              padding: 4,
              fontSize: 36.2,
              color: 'black',
            }}>
            {this.state.streetString}
          </Text>
        )}

        {index == 6 && (
          <Text
            style={{
              fontFamily: 'BebasNeuePro-Middle',
              color: '#000',
              padding: 4,
              fontSize: 36.2,
              color: 'black',
            }}>
            {this.state.townString}
          </Text>
        )}

        {index == 7 && (
          <Text
            style={{
              fontFamily: 'BebasNeuePro-Middle',
              color: '#000',
              padding: 4,
              fontSize: 36.2,
              color: 'black',
            }}>
            {this.state.countryString}
          </Text>
        )}

        {index == 8 && (
          <Text
            style={{
              fontFamily: 'BebasNeuePro-Middle',
              color: '#000',
              padding: 4,
              fontSize: 36.2,
              color: 'black',
            }}>
            {this.state.refIDString}
          </Text>
        )}
      </View>
    );
  };

  logoutApi = async () => {
    var bearer = 'Bearer ' + this.state.tokenString;
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
          alert('Something went wrong, please try again later');
        } else {
          AsyncStorage.clear();
          this.props.navigation.replace('SignInPage');
        }
      })
      .catch(error => {
        alert(
          'Netwok request failed. Please check your internet connection and try again',
        );
        console.error(error);
      });
  };
  renderHorizontalItem1 = ({item, index}) => {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 1,
          borderRadius: 10,
          marginVertical: 5,
          marginLeft: 18,
          marginRight: 18,
        }}>
        {index == 0 && (
          <Text
            style={{
              fontFamily: 'BebasNeuePro-Middle',
              color: 'blue',
              padding: 4,
              fontSize: 29.6,
              color: 'black',
            }}>
            {'Container Size & Type: ' + this.state.containerSizeValueString}
          </Text>
        )}

        {index == 1 && (
          <Text
            style={{
              fontFamily: 'BebasNeuePro-Middle',
              color: '#000',
              padding: 4,
              fontSize: 29.6,
              color: 'black',
            }}>
            {'Container Purchase: ' + this.state.containerPurchaseString}
          </Text>
        )}

        {index == 2 && (
          <Text
            style={{
              fontFamily: 'BebasNeuePro-Middle',
              color: '#000',
              padding: 4,
              fontSize: 29.6,
              color: 'black',
            }}>
            {'Cargo Description: ' + this.state.cargoTypeString}
          </Text>
        )}

        {index == 3 && (
          <Text
            style={{
              fontFamily: 'BebasNeuePro-Middle',
              color: '#000',
              padding: 4,
              fontSize: 29.6,
              color: 'black',
            }}>
            {'Is the cargo Hazardous : ' + this.state.CargoHazadeousString}
          </Text>
        )}

        {index == 4 && (
          <Text
            style={{
              fontFamily: 'BebasNeuePro-Middle',
              color: '#000',
              padding: 4,
              fontSize: 29.6,
              color: 'black',
            }}>
            {'Haulage Type: ' + this.state.haulageValueString}
          </Text>
        )}

        {index == 5 && (
          <Text
            style={{
              fontFamily: 'BebasNeuePro-Middle',
              color: '#000',
              padding: 4,
              fontSize: 29.6,
              color: 'black',
            }}>
            {'Agreed Price: £' + this.state.AgreedPriceString}
          </Text>
        )}

        {index == 6 && (
          <Text
            style={{
              fontFamily: 'BebasNeuePro-Middle',
              color: '#000',
              padding: 4,
              fontSize: 29.6,
              color: 'black',
            }}>
            {'Total Cargo Weight (Kg): ' + this.state.TotalCargoWeightString}
          </Text>
        )}

        {index == 7 && (
          <Text
            style={{
              fontFamily: 'BebasNeuePro-Middle',
              color: '#000',
              padding: 4,
              fontSize: 29.6,
              color: 'black',
            }}>
            {'Destination Country: ' + this.state.DestinationCountryString}
          </Text>
        )}

        {index == 8 && (
          <Text
            style={{
              fontFamily: 'BebasNeuePro-Middle',
              color: '#000',
              padding: 4,
              fontSize: 29.6,
              color: 'black',
            }}>
            {'Destination Port: ' + this.state.DestinationPortString}
          </Text>
        )}

        {index == 9 && (
          <Text
            style={{
              fontFamily: 'BebasNeuePro-Middle',
              color: '#000',
              padding: 4,
              fontSize: 29.6,
              color: 'black',
            }}>
            {'Site Contact Name: ' + this.state.SiteContactNameString}
          </Text>
        )}

        {index == 10 && (
          <Text
            style={{
              fontFamily: 'BebasNeuePro-Middle',
              color: '#000',
              padding: 4,
              fontSize: 29.6,
              color: 'black',
            }}>
            {'Site Contact Tel Number: ' + this.state.SiteContactTelnoString}
          </Text>
        )}

        {index == 11 && (
          <Text
            style={{
              fontFamily: 'BebasNeuePro-Middle',
              color: '#000',
              padding: 4,
              fontSize: 29.6,
              color: 'black',
            }}>
            {'Additional Shipping Information: ' +
              this.state.AdditionalShippingInformationString}
          </Text>
        )}

        {index == 12 &&
          (this.state.haulageIDString == 'type1' ||
            this.state.haulageIDString == 'type3') && (
            <Text
              style={{
                fontFamily: 'BebasNeuePro-Middle',
                color: '#000',
                padding: 4,
                fontSize: 29.6,
                color: 'black',
              }}>
              {'Loading Date: ' + this.state.Loading_Date_String}
            </Text>
          )}

        {index == 13 &&
          (this.state.haulageIDString == 'type1' ||
            this.state.haulageIDString == 'type3') && (
            <Text
              style={{
                fontFamily: 'BebasNeuePro-Middle',
                color: '#000',
                padding: 4,
                fontSize: 29.6,
                color: 'black',
              }}>
              {'Loading Time: ' + this.state.Loading_Time_String}
            </Text>
          )}

        {index == 14 &&
          (this.state.haulageIDString == 'type1' ||
            this.state.haulageIDString == 'type3') && (
            <Text
              style={{
                fontFamily: 'BebasNeuePro-Bold',
                color: '#000',
                padding: 4,
                fontSize: 29.6,
                color: 'black',
              }}>
              {'Loading Address: '}
            </Text>
          )}

        {index == 15 &&
          (this.state.haulageIDString == 'type1' ||
            this.state.haulageIDString == 'type3') && (
            <Text
              style={{
                fontFamily: 'BebasNeuePro-Middle',
                color: '#000',
                padding: 4,
                fontSize: 29.6,
                color: 'black',
              }}>
              {'Company: ' + this.state.Company_String_LA}
            </Text>
          )}

        {index == 16 &&
          (this.state.haulageIDString == 'type1' ||
            this.state.haulageIDString == 'type3') && (
            <Text
              style={{
                fontFamily: 'BebasNeuePro-Middle',
                color: '#000',
                padding: 4,
                fontSize: 29.6,
                color: 'black',
              }}>
              {'Address 1: ' + this.state.Address1_String_LA}
            </Text>
          )}

        {index == 17 &&
          (this.state.haulageIDString == 'type1' ||
            this.state.haulageIDString == 'type3') && (
            <Text
              style={{
                fontFamily: 'BebasNeuePro-Middle',
                color: '#000',
                padding: 4,
                fontSize: 29.6,
                color: 'black',
              }}>
              {'Address 2: ' + this.state.Address2_String_LA}
            </Text>
          )}

        {index == 18 &&
          (this.state.haulageIDString == 'type1' ||
            this.state.haulageIDString == 'type3') && (
            <Text
              style={{
                fontFamily: 'BebasNeuePro-Middle',
                color: '#000',
                padding: 4,
                fontSize: 29.6,
                color: 'black',
              }}>
              {'City: ' + this.state.City_String_LA}
            </Text>
          )}

        {index == 19 &&
          (this.state.haulageIDString == 'type1' ||
            this.state.haulageIDString == 'type3') && (
            <Text
              style={{
                fontFamily: 'BebasNeuePro-Middle',
                color: '#000',
                padding: 4,
                fontSize: 29.6,
                color: 'black',
              }}>
              {'Country: ' + this.state.Country_String_LA}
            </Text>
          )}

        {index == 20 &&
          (this.state.haulageIDString == 'type1' ||
            this.state.haulageIDString == 'type3') && (
            <Text
              style={{
                fontFamily: 'BebasNeuePro-Middle',
                color: '#000',
                padding: 4,
                fontSize: 29.6,
                color: 'black',
              }}>
              {'Postal Code: ' + this.state.PostalCode_String_LA}
            </Text>
          )}

        {index == 12 &&
          (this.state.haulageIDString == 'type2' ||
            this.state.haulageIDString == 'type4') && (
            <Text
              style={{
                fontFamily: 'BebasNeuePro-Middle',
                color: '#000',
                padding: 4,
                fontSize: 29.6,
                color: 'black',
              }}>
              {'Delivery Date: ' + this.state.Delivery_Date_String}
            </Text>
          )}

        {index == 13 &&
          (this.state.haulageIDString == 'type2' ||
            this.state.haulageIDString == 'type4') && (
            <Text
              style={{
                fontFamily: 'BebasNeuePro-Middle',
                color: '#000',
                padding: 4,
                fontSize: 29.6,
                color: 'black',
              }}>
              {'Delivery Time: ' + this.state.Delivery_Time_String}
            </Text>
          )}

        {index == 14 &&
          (this.state.haulageIDString == 'type2' ||
            this.state.haulageIDString == 'type4') && (
            <Text
              style={{
                fontFamily: 'BebasNeuePro-Middle',
                color: '#000',
                padding: 4,
                fontSize: 29.6,
                color: 'black',
              }}>
              {'Collection Date: ' + this.state.Collection_Date_String}
            </Text>
          )}

        {index == 15 &&
          (this.state.haulageIDString == 'type2' ||
            this.state.haulageIDString == 'type4') && (
            <Text
              style={{
                fontFamily: 'BebasNeuePro-Middle',
                color: '#000',
                padding: 4,
                fontSize: 29.6,
                color: 'black',
              }}>
              {'Collection Time: ' + this.state.Collection_Time_String}
            </Text>
          )}

        {index == 16 &&
          (this.state.haulageIDString == 'type2' ||
            this.state.haulageIDString == 'type4') && (
            <Text
              style={{
                fontFamily: 'BebasNeuePro-Bold',
                color: '#000',
                padding: 4,
                fontSize: 29.6,
                color: 'black',
              }}>
              {'Delivery Address: '}
            </Text>
          )}

        {index == 17 &&
          (this.state.haulageIDString == 'type2' ||
            this.state.haulageIDString == 'type4') && (
            <Text
              style={{
                fontFamily: 'BebasNeuePro-Middle',
                color: '#000',
                padding: 4,
                fontSize: 29.6,
                color: 'black',
              }}>
              {'Company: ' + this.state.Company_String}
            </Text>
          )}

        {index == 18 &&
          (this.state.haulageIDString == 'type2' ||
            this.state.haulageIDString == 'type4') && (
            <Text
              style={{
                fontFamily: 'BebasNeuePro-Middle',
                color: '#000',
                padding: 4,
                fontSize: 29.6,
                color: 'black',
              }}>
              {'Address 1: ' + this.state.Address1_String}
            </Text>
          )}

        {index == 19 &&
          (this.state.haulageIDString == 'type2' ||
            this.state.haulageIDString == 'type4') && (
            <Text
              style={{
                fontFamily: 'BebasNeuePro-Middle',
                color: '#000',
                padding: 4,
                fontSize: 29.6,
                color: 'black',
              }}>
              {'Address 2: ' + this.state.Address2_String}
            </Text>
          )}

        {index == 20 &&
          (this.state.haulageIDString == 'type2' ||
            this.state.haulageIDString == 'type4') && (
            <Text
              style={{
                fontFamily: 'BebasNeuePro-Middle',
                color: '#000',
                padding: 4,
                fontSize: 29.6,
                color: 'black',
              }}>
              {'City: ' + this.state.City_String}
            </Text>
          )}

        {index == 21 &&
          (this.state.haulageIDString == 'type2' ||
            this.state.haulageIDString == 'type4') && (
            <Text
              style={{
                fontFamily: 'BebasNeuePro-Middle',
                color: '#000',
                padding: 4,
                fontSize: 29.6,
                color: 'black',
              }}>
              {'Country: ' + this.state.Country_String}
            </Text>
          )}

        {index == 22 &&
          (this.state.haulageIDString == 'type2' ||
            this.state.haulageIDString == 'type4') && (
            <Text
              style={{
                fontFamily: 'BebasNeuePro-Middle',
                color: '#000',
                padding: 4,
                fontSize: 29.6,
                color: 'black',
              }}>
              {'Postal Code: ' + this.state.PostalCode_String}
            </Text>
          )}
      </View>
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
  menu_icon: {
    width: 30,
    height: 30,
    backgroundColor: 'transparent',
    tintColor: '#4387bb',
  },
});
