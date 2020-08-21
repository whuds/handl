import React, { Component } from 'react';
import {StyleSheet, Text, View, Button, TextInput,TouchableOpacity, Image } from 'react-native';
// import Fetch from './component/Fetch';
// import Buy from './component/Buy';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Login from './pages/Login'
// import Home from './pages/Home'
import Intro from './component/Intro'
import Signup from './pages/Signup'
// import AppDrawerNavigator from './component/DrawerNavigator'

import ApiKeys from './assets/ApiKeys'
import firebase from 'firebase'
import 'firebase/firestore'

import Setting from './component/Setting'
import QRcodes from './component/CardComponent'
import Profile from './component/profile'
import AddContact from './component/addContact'
import QRScanner from './component/QRScanner'
import { Ionicons} from '@expo/vector-icons'

import TabBar from "./component/TabBar";

const iconSize = 25;
const HomeBottomTabNavigator = createBottomTabNavigator(
  {
      QRcodes: {
        screen: QRcodes,
        navigationOptions: {
          tabBarIcon: ({ focused, tintColor }) => {
              tintColor = focused ? '#FF0058' : tintColor
              s = require('./assets/ICONS-1/QR_white.png');
              return <Image source={s} style={{ height: iconSize, width: iconSize, tintColor: tintColor}}/>;
          }
        },
      },
      AddContact: {
        screen: AddContact,
        navigationOptions: {
          tabBarIcon: ({ focused, tintColor }) => {
              /*
              const iconName = `ios-keypad${focused ? '' : ''}`;
              tintColor = focused ? '#FF0058' : tintColor 
              return <Ionicons name={iconName} size={25} color={tintColor} />;
              */
              s = require('./assets/ICONS-1/keypad.png');
              tintColor = focused ? '#FF0058' : tintColor
              return <Image source={s} style={{ height: iconSize, width: iconSize, tintColor: tintColor}}/>;
          }
        },
      },
      QRScanner: {
        screen: QRScanner,
        navigationOptions: {
          tabBarIcon: ({ focused, tintColor }) => {
              s = require('./assets/ICONS-1/QR_scanner.png');
              tintColor = focused ? '#FF0058' : tintColor
              return <Image source={s} style={{ height: iconSize, width: iconSize, tintColor: tintColor}}/>;
          }
        },
      }
  },
  {
      initialRouteName: 'QRcodes',
      tabBarComponent: TabBar,
      navigationOptions:({navigation})=>{
          const {routeName} = navigation.state.routes[navigation.state.index] 
          return { 
            
            headerLeft: () => {
              s = require('./assets/ICONS-1/profile.png');
              return (<TouchableOpacity style={{padding: 10}} onPress={()=>navigation.navigate('Profile')}>
                <Image source={s} style={{ height: iconSize, width: iconSize}}/>
                </TouchableOpacity> 
              )
            }
          }
      },
      tabBarOptions: { 
        style: {
          height: 55,
          backgroundColor: '#FF0058',
        },
        showLabel: false,
        activeBackgroundColor: '#FFFFFF'
      }
  }
)

const HomeStackNavigator = createStackNavigator(
  { 
      HomeBottomTabNavigator: HomeBottomTabNavigator
  }
)

const ProfileStackNavigator = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: ({navigation})=> {
        s = require('./assets/md-close.png');
        s2 = require('./assets/md-checkmark.png');
        return {
          headerLeft: () => {
            return (
              <TouchableOpacity style={{padding: 15}} onPress={()=>navigation.navigate('QRcodes')}>
                <Image source={s} style={{ height: 35, width: 35, tintColor: "#2189D9"}}/>
              </TouchableOpacity>
            )
          },
          headerRight: () => {
            return (
              <TouchableOpacity style={{paddingRight: 15}} navigation={navigation} onPress={()=> navigation.setParams({isSave: true})}>
                <Image source={s2} style={{ height: 35, width: 35, tintColor: "#2189D9"}}/>
              </TouchableOpacity>
            )
          },
          headerTitleStyle: {
            textAlign: 'center', 
            flexGrow:1,
            alignSelf:'center',
          },
          headerTitle: "Account"
        }
      }
    }
  }
)

_handleFilterPress = () => {
  // do something
}



const Navigator = createSwitchNavigator(
  {
    Login: Login,
    //Home: {screen: AppDrawerNavigator},
    Home: {screen: HomeStackNavigator},
    Intro: Intro,
    Signup: Signup,
    Profile: {
      screen: ProfileStackNavigator
    }
  },
  {
    //initialRouteName: 'Home'
    initialRouteName: 'Login'
  }
);

const AppContainer = createAppContainer(Navigator);

export default class App extends Component {

  // ToDo not state!!!
  componentWillMount() {
   firebase.initializeApp({
    apiKey: "AIzaSyARwcdW2qtVmgXFAkevlEJwSidbABcuYMY",
    authDomain: "handl-e0779.firebaseapp.com",
    databaseURL: "https://handl-e0779.firebaseio.com",
    projectId: "handl-e0779",
    storageBucket: "handl-e0779.appspot.com",
    messagingSenderId: "703833117547",
    appId: "1:703833117547:web:0947f7971de110eec7322e",
    measurementId: "G-4G1W3XKFSM"
  })
    console.log(ApiKeys)
  }

  render() {
    return (
      <AppContainer/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});


// "react-native-svg": "^9.11.1",
// "react-native-qrcode": "^0.2.7",
// "react-native-qrcode-svg": "^5.2.0",