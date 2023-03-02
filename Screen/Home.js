import React,{ Component } from "react";
import {StatusBar, AppState, TextInput, ImageBackground, Modal, ActivityIndicator,  SafeAreaView, StyleSheet, FlatList,View,Text,Image, TouchableOpacity ,Alert,AsyncStorage} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import { withOrientation } from "react-navigation";
import API from '../services/api';

export default class Home extends Component{

  constructor(props) {
    super(props);

    this.state = {
      appState: AppState.currentState,
      open: true,
      checkNavigationDone: false,
       search:'',
      setlistData: [],
      isWish: '',
      category_name : '',
      username:'',
      progress: false,
     
    };
  }

  //handling onPress action  
  getListViewItem = (item) => {  
    Alert.alert(item.key);  
  }  

  Categorylist = async ()=> {
    this.setState({ progress: true})
      var logs = {
        // user_id: user_id,
      };
      console.log(logs);
      var response = await API.post('category-list', logs);
      if (response.message == 'Success') {
        console.log(response.data);
        this.setState({
          setlistData: response.data, progress: false});
        
      } else {
        this.setState({ progress: false})
        Alert.alert(response.status, response.message);
      }
  
    
    };
  
  

     async Categorysearch (text) {
     
      var formdata = new FormData();
      formdata.append('category_name', text);
      console.log("test",text);
      var response = await API.postWithFormData('search-category', formdata);
      if (response.message == 'Success') {
        console.log(response.data);
        this.setState({
          setlistData: [...response.data], });
        
      } else {
        Alert.alert(response.status, response.message);
      }
  
    
    };
  



    async componentDidMount ()
  {

   this.Categorylist();
   this.setState({
      username : await AsyncStorage.getItem('username')
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
 
         if (timeTillNow > 30)
         {
            Toast.show("You're being timed out due to inactivity", Toast.LONG)
           this.logoutApi()
         }
 
 
 
       }
       else if (this.state.appState.match(/inactive|active/) && nextAppState === 'background') {
 
         // Dispatch current time here.
 
         AsyncStorage.setItem('dispatchTime', new Date().toLocaleString())
 
         console.log("App has come to the background!");
 
     }
       this.setState({ appState: nextAppState });
     }
   );
  }
  componentWillUnmount() {

    // this.appStateSubscription.remove();

  }
   
render()
{
return(
    <ImageBackground style ={styles.container}
    source ={require('../Images/bg.jpg')}>
  <SafeAreaView>

  <TouchableOpacity style={{ marginLeft:23, marginTop: 25}}
                  onPress={() => this.props.navigation.goBack()}>
                <Image style={{resizeMode:'contain', width:30,height:30, tintColor: 'black'}} source = {require('../Images/arrow.png')}></Image>
                </TouchableOpacity>
 
  <View style={{ alignSelf: 'flex-end'}}>

<TouchableOpacity  onPress= {()=> this.props.navigation.navigate('Dashboard')}><Image style={{resizeMode:'contain',width:50,height:50,alignSelf:'flex-end',marginRight:20}} source = {require('../Images/logo.png')}></Image>
 </TouchableOpacity> 
</View>

             </SafeAreaView>     
  {/* <TouchableOpacity onPress={()=>this.props.navigation.navigate('Chartlist')}>
      <Image style={{resizeMode:'contain',width:80,height:50,alignSelf:'flex-end',marginLeft:'40%'}} source = {require('../Images/hand.png')}></Image>
      </TouchableOpacity>  */}
   
              
    <View style={{flexDirection:'row'}}><Text style ={{marginLeft:40,marginTop:10,fontSize:25,color:'black', fontWeight:"bold"}}>Category</Text>
    </View>
   <View style = {styles.item}><TextInput style ={{color:'black',marginTop:10,marginLeft:10,width:'70%'}}  
                placeholder='Search'
                placeholderTextColor={'grey'}
                // value = {this.state.search}
              
                // autoCapitalize = 'none'
                // keyboardType={this.state.search}
                
               onChangeText={text => this.Categorysearch(text)}
               onClear={text => this.Categorysearch()}
               ></TextInput>
                </View>

    {/* <View style ={{marginBottom:200}}> */}

        
              
    <FlatList 
        data={this.state.setlistData}
        renderItem={({item}) =>  
        <View>
        <TouchableOpacity style = {{marginTop:10, marginBottom:10,marginLeft:15,marginRight:15}} onPress ={() => this.props.navigation.navigate('Diseaselist',{category_id: item.id,})}>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={{height:80, borderRadius:10}}
              colors={['#ffe9e6','#fffdd5','#f5ffee','#e9ebff']}>
                  <Text style={{fontSize:19,fontWeight: "900",alignSelf:'center',color:'black',padding:5,
              marginTop:9}}>{item.category_name}</Text>        
      </LinearGradient> 
      </TouchableOpacity>
    
  </View>}  
        ItemSeparatorComponent={this.renderSeparator}  
      
        keyExtractor={item => item.id}
      />

       {/* </View> */}

       <Modal
            transparent={true}
            animationType={'none'}
            visible={this.state.progress}
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
        justifyContent: 'center'
    }}>
                    <ActivityIndicator color="#999999" size="large"
                        animating={this.state.progress} />
                        {/* <Text style={{color: 'black',fontSize:16, marginTop: 20, alignSelf: 'center'}}>Loading...</Text> */}
                </View>
            </View>
        </Modal>

    </ImageBackground>
  
);

}
}

var styles = StyleSheet.create({
    container: {
         flex:1,
         width:null,
         height:null,
    },
    boxarea : {
        marginRight: 40,
        marginLeft: 40,
       
        height:'90%',
       backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        color:'black'

    },  item: {
        backgroundColor: '#D3D3D3',
        marginVertical: 8,
        marginHorizontal: 16,
        height: 50,
        marginRight: 20,
        marginLeft: 20,
        flexDirection:'row'
      },
      title: {
        fontSize: 12,
      },

})