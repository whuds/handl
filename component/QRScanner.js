import React, { Component } from 'react'

import { Text, View, StyleSheet, Button, Linking } from 'react-native';
import Constants from 'expo-constants';


import * as Permissions from 'expo-permissions';

import * as Contacts from 'expo-contacts';

import { BarCodeScanner } from 'expo-barcode-scanner';

//import QRCodeScanner from 'react-native-qrcode-scanner';


export default class QRScanner extends Component {

    state = {
        hasCameraPermission: null,
        scanned: false,
    };

    async componentDidMount() {
        this.getPermissionsAsync();
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    };

    render() {

        const { hasCameraPermission, scanned } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting camera permission</Text>;
        }

        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }

        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                }}
            >


                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                {scanned && (
                    <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
                )}
            </View>
        );
    }
    
    handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true });
        Linking.canOpenURL(data).then((supported) => {
            if (!supported) {
                //Alert.alert(`Scanned: ${type} of ${data}`);
                console.log(data)
                this.checkVCard(data);
            } 
            else {
                return Linking.openURL(data);
            }
        }).catch((err) => console.error('An error occurred', err));

    };

    checkVCard = (data) => {
        //console.log(data.includes("BEGIN"));
        if ( data.includes("BEGIN:VCARD\nVERSION:3.0\n") ) {
            //console.log('Vcard found');
            lastNameIndex = data.indexOf('\nN:',23) + 3; //find index of name variable
            lastNameIndexEnd = data.indexOf(';',23);
            firstNameIndex = lastNameIndexEnd + 1;
            firstNameIndexEnd = data.indexOf('\nFN:',23);
            lastName = data.substring(lastNameIndex,lastNameIndexEnd);
            firstName = data.substring(firstNameIndex,firstNameIndexEnd);

            var fullName = firstName + " " + lastName;
            if (firstNameIndexEnd < 0){
                fullName = lastName;
            }

            cellIndex = data.indexOf('\nTEL;CELL:',23) + 10;
            if (cellIndex < 10){
                cellIndex = data.indexOf('\nTEL;TYPE=CELL:',23) + 15;
                if (cellIndex < 15){
                    cellIndex = data.indexOf('\nTEL:',23) + 5;
                }
            }
            console.log("cellIndex" + cellIndex)
            cellIndexEnd = data.indexOf('\n',cellIndex);
            phoneNumber = data.substring(cellIndex,cellIndexEnd);

            var email = "";
            emailIndex = data.indexOf("\nEMAIL;",23);
            if (emailIndex > 0){
                emailIndex = data.indexOf("INTERNET:",emailIndex)+9;
                emailIndexEnd = data.indexOf("\n",emailIndex);
                email = data.substring(emailIndex,emailIndexEnd);
            }
            /*
            console.log('\n' + fullName);
            console.log('\n' + phoneNumber);
            console.log('\n' + email);
            */
                    //console.log(Contacts.PhoneNumber.digits);
            const contact = {
                [Contacts.Fields.FirstName]: firstName,
                [Contacts.Fields.LastName]: lastName, 
                [Contacts.Fields.PhoneNumbers]: [{ label : 'mobile', number: phoneNumber}]
            };

            try{
                const contactId = Contacts.addContactAsync(contact);
                console.log('contact-ID:'+contactId);
                if(contactId){
                    alert('Contact ' + firstName + ' ' + lastName + ' Saved.')
                }
                else{
                    alert('Contact not saved.')
                }
            }
            catch(err){
                alert('Contact not Saved')
            }

                
            //const contactId = Contacts.addContactAsync(newContact);
        }
    }


}