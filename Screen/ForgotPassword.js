import React,{Component,useEffect} from "react";
import {StatusBar, Modal, ActivityIndicator, FlatList, TouchableWithoutFeedback, Image, View,StyleSheet,SafeAreaView,Text,Dimensions, TouchableOpacity } from "react-native";
import { WebView } from 'react-native-webview';
import Modal1 from "react-native-modal";
import UrlUtil from '../utils/ConfigApp';
export default class HowToUse extends Component {

constructor(props)
{
   super(props);
   this.state = {

}

}
componentDidMount = async () => 
    {

    }


    hideSpinner() {
      this.setState({ visible: false });
    }

render()
{

  return(
    <View style={styles.container}>
<SafeAreaView>
    <View style={styles.dashboard_main_headers}>
        <View style={styles.dashboard_headers_Menu_View}>
          <TouchableOpacity style={styles.menu_icon}
            onPress={() => this.props.navigation.goBack(null)}>
            <Image
              style={{width: 30,
                height: 30,
                tintColor: '#4387bb',}}
              source={require('../Images/arrow.png')}
            />
          </TouchableOpacity>
        
        </View>
        <View style={styles.dashboard_headers_Create_View}>
          </View>

      </View>
      </SafeAreaView>
   <WebView
   source={{ uri: UrlUtil.WEB_URL+'password/reset' }}
   onLoad={() => this.hideSpinner()}
   style={{ marginTop: 0, marginBottom:0 }}
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
</View>
  );

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
    marginStart: 4,
     marginTop: 4,
    backgroundColor: 'transparent',
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