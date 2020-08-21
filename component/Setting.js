import React, { Component } from 'react'
import firebase from 'firebase'
import {AppRegistry, 
    Activityindicator, 
    Text, 
    View, 
    FlatList , 
    StyleSheet, 
    TouchableHighlight, 
    TouchableOpacity,
    TextInput, 
    Button,
    Picker
    }from 'react-native';

export default class Facebook extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity>
                    <Button 
                        title="Sign out"
                        onPress={() => {
                            firebase.auth().signOut()
                            this.props.navigation.navigate('Login')
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}