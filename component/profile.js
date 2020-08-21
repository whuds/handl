import React, { Component } from 'react'
import {AppRegistry, 
    Activityindicator, 
    Text, 
    View, 
    FlatList , 
    StyleSheet, 
    TouchableHighlight, 
    TouchableOpacity,
    TextInput,
    Label,
    Span,
    Switch,
    Button,
    Picker
    }from 'react-native';
import { Icon } from 'react-native-elements'
import { AsyncStorage, Alert } from "react-native";
import { Ionicons} from '@expo/vector-icons';
// import { Container, Header, Left, Body, Right, Title } from 'native-base';
import Constants from 'expo-constants';
import firebase from 'firebase'
import * as Facebook from 'expo-facebook';
import * as WebBrowser from 'expo-web-browser';
import { ScrollView } from 'react-native-gesture-handler';

export default class Profile extends Component {

    constructor(props) {
        super();
        this.state = {
            isLoadingComplete: false,
            firstName: '',
            lastName: '',
            phoneNumber: '',
            emailAddress: '',

            checked: true,

            facebookURL: '',
            instagramURL: '',
            linkedinURL: '',
            customURL: '',

            accordionFBopen: false,
            accordionINopen: false,
            accordionLIopen: false,
            accordionCUopen: false,

            accordionFBcolor: '#eee',
            accordionINcolor: '#eee',
            accordionLIcolor: '#eee',
            accordionCUcolor: '#eee',

            accordionTextFBcolor: '#aaa',
            accordionTextINcolor: '#aaa',
            accordionTextLIcolor: '#aaa',
            accordionTextCUcolor: '#aaa',

            switchPHValue: true,
            switchFBValue: false,
            switchINValue: false,
            switchLIValue: false,
            switchCUValue: false,

            accordianBottomRadius: 5,
            text: ''
        };
        this.key = 'contactData';
        this.item = {
            cards:[]
            /*
            cards: [
                    {display: true, name: 'phone', data: 
                        {
                            firstName: '',
                            lastName: '',
                            phoneNumber: '',
                            emailAddress: ''
                        }
                    },
                    {display: true, name: 'facebook', data: 'https://www.facebook.com/kenneth7882'},
                    {display: true, name: 'linkedin', data: 'www.linkedin.com/in/kc-kenneth-huang'},
                ]
            */
            };
    }
    
    componentWillReceiveProps(nextProps) {
        //
        const { params: prevParams } = this.props.navigation.state;
        const { params: nextParams } = nextProps.navigation.state;
        
        if( nextParams.isSave === true) {
            console.log('good to store')
            this._storeData();
        }
        
        
      }
 
  /*  _downloadDataStartup = () =>{
        this._downloadData('kenneth');
    }
    _downloadDataBtn = () =>{
        this._downloadData('user2');
    }*/
    componentDidMount(){
        this._loadData();
        qrCardsUpToDate = false;
        
    }

    /*componentDidUpdate(){
            this._loadData();
    }*/

    /*_downloadDataKenneth = async () => {
        try {
            let result = await fetch('https://gthandl.herokuapp.com/users/kenneth');
            this.item = await result.json();
        }catch(error){
            console.log(error);
        }

        console.log(this.item);
        // populate input fields
        for (let index = 0; index < this.item.cards.length; index++) {
            const element = this.item.cards[index];
            if(element.name == 'phone'){
                this.setState({switchPHValue: element.display});
                this.setState({firstName: element.data.firstName});
                this.setState({lastName: element.data.lastName});
                this.setState({phoneNumber: element.data.phoneNumber});
                this.setState({emailAddress: element.data.emailAddress});
            }else if(element.name == 'facebook'){
                this.setState({switchFBValue: element.display});
                // set related field with element.data
            }else if(element.name == 'instagram'){
                this.setState({switchINValue: element.display});
                // set related field with element.data
            }else if(element.name == 'linkedin'){
                this.setState({switchLIValue: element.display});
                // set related field with element.data
            }
        }

        // save profile to storage
        try {
            await AsyncStorage.setItem(this.key, JSON.stringify(this.item));
            qrCardsUpToDate = false;          
            console.log('contact data stored');
        } catch (error) {
            // Error saving data
            console.log('error saving user\'s contact data');
        }

    }*/

    _loadData = async () => {
        try {
            const retrievedItem =  await AsyncStorage.getItem(this.key);
            const item = JSON.parse(retrievedItem);
            this.item = item;
        } catch (error) {
            console.log(error.message);
            return;
        }

        // populate input fields
        for (let index = 0; index < this.item.cards.length; index++) {
            const element = this.item.cards[index];
            if(element.name == 'phone'){
                this.setState({switchPHValue: element.display});
                this.setState({firstName: element.data.firstName});
                this.setState({lastName: element.data.lastName});
                this.setState({phoneNumber: element.data.phoneNumber});
                this.setState({emailAddress: element.data.emailAddress});
            }else if(element.name == 'facebook'){
                this.setState({switchFBValue: element.display});
                this.setState({facebookURL: element.data});
            }else if(element.name == 'instagram'){
                this.setState({switchINValue: element.display});
                this.setState({instagramURL: element.data});
            }else if(element.name == 'linkedin'){
                this.setState({switchLIValue: element.display});
                this.setState({linkedinURL: element.data});
            }else if(element.name == 'custom'){
                this.setState({switchCUValue: element.display});
                this.setState({customURL: element.data});
            }
        }
    }

    _fbapi = async () => {
        
            try {
              const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
              } = await Facebook.logInWithReadPermissionsAsync('532357667602472', {
                permissions: ['public_profile','user_link'],
              });
              if (type === 'success') {
                 
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?fields=link,name&access_token=${token}`);
                fbInfo = await response.json();
                Alert.alert(`Logged in as ${fbInfo.name}!`);
                this.setState({facebookURL:fbInfo.link});
                this.setState({switchFBValue: true});
              } else {
                // type === 'cancel'
              }
            } catch ({ message }) {
              alert(`Facebook Login Error: ${message}`);
            }
          
          
    }

    _instaapi = async () => {
        
        try {
          const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
          } = await Facebook.logInWithReadPermissionsAsync('532357667602472', {
            permissions: ['public_profile','user_link'],
          });
          if (type === 'success') {
             
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?fields=link&access_token=${token}`);
            fbInfo = await response.json()
            Alert.alert('Logged in!', `Hi ${fbInfo.link}!`);
            this.setState({facebookURL:fbInfo.link});
            this.setState({switchFBValue: true});
          } else {
            // type === 'cancel'
          }
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
        }
      
      
}

    _downloadData = async () => {
        try {
            let result = await fetch('https://gthandl.herokuapp.com/users/user2');
            this.item = await result.json();
        }catch(error){
            console.log(error);
            return;
        }

        console.log(this.item);
        // populate input fields
        for (let index = 0; index < this.item.cards.length; index++) {
            const element = this.item.cards[index];
            if(element.name == 'phone'){
                this.setState({switchPHValue: element.display});
                this.setState({firstName: element.data.firstName});
                this.setState({lastName: element.data.lastName});
                this.setState({phoneNumber: element.data.phoneNumber});
                this.setState({emailAddress: element.data.emailAddress});
            }else if(element.name == 'facebook'){
                this.setState({switchFBValue: element.display});
                this.setState({facebookURL: element.data});
            }else if(element.name == 'instagram'){
                this.setState({switchINValue: element.display});
                this.setState({instagramURL: element.data});
            }else if(element.name == 'linkedin'){
                this.setState({switchLIValue: element.display});
                this.setState({linkedinURL: element.data});
            }else if(element.name == 'custom'){
                this.setState({switchCUValue: element.display});
                this.setState({customURL: element.data});
            }
        }

        // save profile to storage
        try {
            await AsyncStorage.setItem(this.key, JSON.stringify(this.item));
            qrCardsUpToDate = false;          
            console.log('contact data stored');
        } catch (error) {
            // Error saving data
            console.log('error saving user\'s contact data');
        }

    }

    _storeData = async () => {    
        console.log('_storeData called')
        this.item.cards = [];

        // check url format
        let errMessage = '';
        if(this.state.facebookURL.substring(0,4) != 'http' && this.state.switchFBValue == true){
            errMessage += "Facebook URL must start with https://\n";
            this.setState({switchFBValue: false});
        }
        if(this.state.instagramURL.substring(0,4) != 'http' && this.state.switchINValue == true){
            errMessage += "Instagram URL must start with https://\n";
            this.setState({switchINValue: false});
        }
        if(this.state.linkedinURL.substring(0,4) != 'http' && this.state.switchLIValue == true){
            errMessage += "LinkedIn URL must start with https://\n";
            this.setState({switchLIValue: false});
        }
        if(this.state.customURL.substring(0,4) != 'http' && this.state.switchCUValue == true){
            errMessage += "Custom URL must start with https://\n";
            this.setState({switchCUValue: false});
        }
        if(errMessage != ''){
            Alert.alert("Profile Not Saved", errMessage);
            return;
        }

        if(this.state.firstName != "" || this.state.lastName != "" || this.state.phoneNumber != "" || this.state.emailAddress != ""){
            this.item.cards.push({display: true, name:'phone', data: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phoneNumber: this.state.phoneNumber,
                emailAddress: this.state.emailAddress,
            }});
        }else{
            this.item.cards.push({display: false, name:'phone', data: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phoneNumber: this.state.phoneNumber,
                emailAddress: this.state.emailAddress,
            }});
        }

        if(this.state.switchFBValue){
            this.item.cards.push({display: true, name: 'facebook', data: this.state.facebookURL});
        }else{
            this.item.cards.push({display: false, name: 'facebook', data: this.state.facebookURL});
        }
        if(this.state.switchINValue){
            this.item.cards.push({display: true, name: 'instagram', data: this.state.instagramURL});
        }else{
            this.item.cards.push({display: false, name: 'instagram', data: this.state.instagramURL});
        }
        if(this.state.switchLIValue){
            this.item.cards.push({display: true, name: 'linkedin', data: this.state.linkedinURL});
        }else{
            this.item.cards.push({display: false, name: 'linkedin', data: this.state.linkedinURL});
        }
        if(this.state.switchCUValue){
            this.item.cards.push({display: true, name: 'custom', data: this.state.customURL});
        }else{
            this.item.cards.push({display: false, name: 'custom', data: this.state.customURL});
        }

        // save profile to storage
        try {
            await AsyncStorage.setItem(this.key, JSON.stringify(this.item));
            qrCardsUpToDate = false;          
            console.log('contact data stored');
        } catch (error) {
            // Error saving data
            console.log('error saving user\'s contact data');
        }

        // upload profile to backend
        try {
            fetch('https://gthandl.herokuapp.com/users/user2', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(
                this.item
            ),
            });
        }catch(error){
            console.log(error);
        }
        Alert.alert("Profile saved!");
        this.props.navigation.navigate('QRcodes');
    }

    
    handleChange = key => val => {
        console.log(key)
        this.setState({
            [key]: ~val
        })
    }
    

    /*accordianBottomRadius: 5,
    accordianColor: '#eee'*/
    render() {
        let accordionList = [
            {name: 'Facebook', switchHandle: 'switchFBValue', urlHandle: "facebookURL", accordianColorHandle: "accordionFBcolor", accordianTextColorHandle: "accordionTextFBcolor", accordionOpenHandle: "accordionFBopen", placeholder:"https://www.facebook.com/USER_NAME"}, 
            {name: 'Instagram', switchHandle: 'switchINValue', urlHandle: "instagramURL",accordianColorHandle: "accordionINcolor", accordianTextColorHandle: "accordionTextINcolor", accordionOpenHandle: "accordionINopen", placeholder:"https://www.instagram.com/USER_NAME"}, 
            {name: 'LinkedIn', switchHandle: 'switchLIValue', urlHandle: "linkedinURL",accordianColorHandle: "accordionLIcolor", accordianTextColorHandle: "accordionTextLIcolor", accordionOpenHandle: "accordionLIopen", placeholder:"https://www.linkedin.com/in/USER_ID"},
            {name: 'Custom', switchHandle: 'switchCUValue', urlHandle: "customURL",accordianColorHandle: "accordionCUcolor", accordianTextColorHandle: "accordionTextCUcolor", accordionOpenHandle: "accordionCUopen", placeholder:"https://CUSTOM_URL"}
        ];
        let accordions = [];

        /*if(this.state.facebookURL==''){
            this.state.accordionFBcolor = '#eee';
            this.state.accordianTextColor = '#aaa';
        }else{
            this.state.accordionFBcolor = '#06E252';
            this.state.accordianTextColor = '#fff';
        }
        if(this.state.instagramURL==''){
            this.state.accordionINcolor = '#eee';
        }else{
            this.state.accordionINcolor = '#06E252'; 
        }
        if(this.state.linkedinURL==''){
            this.state.accordionLIcolor = '#eee';
        }else{
            this.state.accordionLIcolor = '#06E252'; 
        }*/
        
        // Check if there's something in the URL field and change color and state accordingly
        for(let i = 0; i < accordionList.length; i++){
            if(this.state[accordionList[i].urlHandle]==''){
                this.state[accordionList[i].accordianColorHandle] = '#eee';
                this.state[accordionList[i].accordianTextColorHandle] = '#aaa';
            }else{
                this.state[accordionList[i].accordianColorHandle] = '#06E252';
                this.state[accordionList[i].accordianTextColorHandle] = '#fff';
            }

            if(this.state[accordionList[i].accordionOpenHandle]){
                accordions.push(
                    <View key = {i}>
                        <TouchableOpacity  style={[styles.accordion, styles.openAccordion, {backgroundColor: this.state[accordionList[i].accordianColorHandle]}]} onPress={() => this.setState({ [accordionList[i].accordionOpenHandle]: false })}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[styles.accordionText, {color: this.state[accordionList[i].accordianTextColorHandle]}]}>{accordionList[i].name}</Text>
                                <Icon name='chevron-up' type='font-awesome' color={this.state[accordionList[i].accordianTextColorHandle]}/>
                            </View>
                        </TouchableOpacity>
                        <TextInput placeholder={accordionList[i].placeholder} value={this.state[accordionList[i].urlHandle]} style={styles.accordionInput} onChangeText={
                            (URL) => {
                                this.setState({[accordionList[i].urlHandle]: URL}); 
                                if(URL=='') {
                                    this.setState({[accordionList[i].switchHandle]: false});
                                    //this.setState({[accordionList[i].accordianColorHandle]: '#eee'}); 
                                    
                                }else{
                                    this.setState({[accordionList[i].switchHandle]: true});
                                    //this.setState({[accordionList[i].accordianColorHandle]: '#06E252'}); 
                                }}}/>
                    </View>
                );
            }else{
                    accordions.push( 
                        <TouchableOpacity key = {i} style={[styles.accordion, styles.closeAccordion, {backgroundColor: this.state[accordionList[i].accordianColorHandle]}]} onPress={
                            () => {
                                this.setState({ [accordionList[i].accordionOpenHandle]: true });
                                if(accordionList[i].name == 'Facebook' && this.state.facebookURL == ''){
                                    this._fbapi();
                                }
                            }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[styles.accordionText, {color: this.state[accordionList[i].accordianTextColorHandle]}]}>{accordionList[i].name}</Text>
                                <Icon name='chevron-down' type='font-awesome' color={this.state[accordionList[i].accordianTextColorHandle]}/>
                            </View>
                        </TouchableOpacity>
                    );
            }
        }
        return (
            <ScrollView>
            <View style={styles.container}>
                <Text style={styles.subtitle}>Contact Information</Text>
                <TextInput placeholder="First Name" value={this.state.firstName} style={styles.input} onChangeText={(firstName) => this.setState({firstName})}/>
                <TextInput placeholder="Last Name" value={this.state.lastName} style={styles.input} onChangeText={(lastName) => this.setState({lastName})}/>
                <TextInput placeholder="Phone Number" value={this.state.phoneNumber} style={styles.input} onChangeText={(phoneNumber) => this.setState({phoneNumber})}/>
                <TextInput placeholder="Email Address" value={this.state.emailAddress} style={styles.input} onChangeText={(emailAddress) => this.setState({emailAddress})}/>

                <Text style={styles.subtitle}>Social Media</Text>
                {accordions}

                {/*
                <View style={styles.btnContainer}>
                    <Text>Facebook</Text>
                    <Switch onValueChange = {() => 
                        {   
                            this.setState({switchFBValue: !this.state.switchFBValue})
                            if(this.state.switchFBValue == false){
                                this._fbapi()
                            }
                        }
                            
                        
                            }value = {this.state.switchFBValue} />
                </View>

                <TextInput placeholder="https://www.instagram.com/YOUR_ACCOUNT" value={this.state.instagramURL} style={styles.input} onChangeText={(instagramURL) => this.setState({instagramURL})}/>
                <View style={styles.btnContainer}>
                    <Text>Instagram</Text>
                    <Switch onValueChange={() => this.setState({switchINValue: !this.state.switchINValue})} value = {this.state.switchINValue} />
                </View>

                <TextInput placeholder="https://www.linkedin.com/in/YOUR_ACCOUNT" value={this.state.linkedinURL} style={styles.input} onChangeText={(linkedinURL) => this.setState({linkedinURL})}/>
                <View style={styles.btnContainer}>
                    <Text>LinkedIn</Text>
                    <Switch onValueChange={() => this.setState({switchLIValue: !this.state.switchLIValue})} value = {this.state.switchLIValue} />
                </View>*/}
                {
                    /*
                <View style={styles.btnContainer}>
                    < TouchableOpacity style={styles.userBtn} onPress={ this._storeData}>
                            <Text style={styles.btnText} >Save</Text>
                    </TouchableOpacity>
                </View>
                */}
                <TouchableOpacity style={styles.signoutBtn}>
                    <Button 
                        title="Sign out"
                        onPress={() => {
                            firebase.auth().signOut()
                            this.props.navigation.navigate('Login')
                        }}
                    />
                </TouchableOpacity>
               
                



                {/*<View style={styles.btnContainer}>
                    < TouchableOpacity style={styles.userBtn} onPress={this._downloadData}>
                            <Text style={styles.btnText} >Download Data</Text>
                    </TouchableOpacity>
                </View>*/}
            </View>
            <View style={{height: 250}}></View>
            </ScrollView>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        textAlign: 'left',
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        backgroundColor: '#fff',
 
    },
    subtitle: {
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 18
    },
    input: {
        fontSize: 16,
        borderBottomWidth: 1,
        paddingBottom: 5,
        marginVertical: 10,
        borderColor: '#ccc',
        width: '100%'
    },
    accordionInput:{
        fontSize: 16,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        padding: 15,
        borderColor: '#eee',
        width: '100%'
    },
    accordion: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        //backgroundColor: "#eee",
        padding: 15,
        marginTop: 20
    },
    openAccordion: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    closeAccordion: {
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    accordionText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "left",
        //color: "#aaa",
    },
    userBtn: {
        backgroundColor: "#5B2C6F",
        padding: 15,
        width: "100%",
        marginTop: 15,
        borderRadius: 30
    },
    btnContainer: {
        alignSelf: 'center',
        flexDirection: "row",
        justifyContent: 'space-between',
        width: "90%",
        marginTop: 5,
        marginBottom: 10
    },
    btnText: {
        fontSize: 18,
        textAlign: "center",
        color: 'white'
    },
    statusBar: {
        backgroundColor: "#330455",
        height: Constants.statusBarHeight,
    },signoutBtn: {
        paddingTop: 20
    }
});