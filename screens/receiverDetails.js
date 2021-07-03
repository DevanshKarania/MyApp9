import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import { Card, Header, Icon } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config.js';

export default class RecieverDetails extends React.Component{

    constructor(){
        super();
        this.state={
            clientName:'',
            clientContact:'',
            clientAddress:'',
            numberOfMedicines:'',
            userId:firebase.auth().currentUser.email,
        }
    }

    getClientDetails(clientName,clientContact) {
        //console.log("in getRecieverDetails:",this.state)
        db.collection('users').where('emailID', '==', this.state.userId).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    console.log("31: ",doc.data())
                    this.setState({
                        clientName: doc.data().firstName,
                        clientContact: doc.data().contact,
                        clientAddress: doc.data().address,
                        numberOfMedicines: doc.data().numberOfMedicines,
                    })
                })
            });
    }

    getNumberOfMedicines(clientName,clientContact) {
        //console.log("in getRecieverDetails:",this.state)
        db.collection('requestMedicines').where('userId', '==', this.state.userId).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    console.log("31: ",doc.data())
                    this.setState({
                        numberOfMedicines: doc.data().numberOfMedicines,
                    })
                })
            });
    }

    componentDidMount() {
        this.getClientDetails();
        this.getNumberOfMedicines();
    }

    render(){
        return(
            <View style={{ flex: 0.3}}>
                    <Card
                        title={"Client Information"}
                        titleStyle={{ fontSize: 20 }}
                    >
                        <Card>
                            <Text style={{ fontWeight: 'bold' }}>Name: {this.state.clientName}</Text>
                        </Card>
                        <Card>
                            <Text style={{ fontWeight: 'bold' }}>Contact: {this.state.clientContact}</Text>
                        </Card>
                        <Card>
                            <Text style={{ fontWeight: 'bold' }}>Address: {this.state.clientAddress}</Text>
                        </Card>
                        <Card>
                            <Text style={{fontWeight:' bold' }}>Quantity : {this.state.numberOfMedicines}</Text>
                        </Card>
                    </Card>
                </View>
        )
    }
}