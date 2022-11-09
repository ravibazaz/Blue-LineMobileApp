import React, { Component } from "react";
import { AppState, StyleSheet, Text, View, AsyncStorage } from "react-native";

class AppStateExample extends Component {
  
  state = {
    appState: AppState.currentState
  };

  async componentDidMount() {


    console.log('componentDidMount calledddd1', new Date().toLocaleString(), this.state.appState)

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

    this.appStateSubscription.remove();

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Current state is: {this.state.appState}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default AppStateExample;