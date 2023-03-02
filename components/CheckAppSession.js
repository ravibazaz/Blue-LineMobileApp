import React, { Component } from 'react';
import { AppState, AsyncStorage } from 'react-native';

const withAppState = (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        appState: AppState.currentState,
        isSessionActive: false,
      };
    }

    componentDidMount() {
        this.checkAppState()
    }

    componentWillUnmount() {
        this.appStateSubscription.remove();
    }

    async checkAppState () {
        this.appStateSubscription = AppState.addEventListener(
            'change',
            async nextAppState => {
              console.log('nextAppState: ', nextAppState);
      
              if (
                this.state.appState.match(/inactive|background/) &&
                nextAppState === 'active'
              ) {
                console.log('App has come to the foregrounddddd!');
      
                let dispatchTimeString = await AsyncStorage.getItem('dispatchTime');
      
                var msDiff =
                  new Date().getTime() - new Date(dispatchTimeString).getTime();
                var timeTillNow = Math.floor(msDiff / 1000 / 60); 
      
                console.log(
                  'dispatchTimeString is: ',
                  dispatchTimeString,
                  timeTillNow,
                );
      
                if (timeTillNow > 1) {
                    this.setState({
                        isSessionActive: false,
                      });
                }
                else
                {
                this.setState({
                        isSessionActive: true,
                      });
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
    };

    render() {
      const { isSessionActive } = this.state;

      return <WrappedComponent isSessionActive={isSessionActive} {...this.props} />;
    }
  };
};

export default withAppState;