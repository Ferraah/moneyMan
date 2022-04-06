import firestore from '@react-native-firebase/firestore'
import React, {Component, useState} from 'react'

import {db} from './firebaseInfo'
import {collection, getDocs, doc, query} from 'firebase/firestore'

/*
class Firebase extends Component{

    constructor(props){
        super(props);
        this.getUser();
        this.subscriber = firestore().collection("Daniele").doc
        ('N5CAEQZq3T2LifobBdgx').onSnapshot(doc=>{
            this.setState({
                data:{}
            })
        })
    }


}*/



export default async function getUserTriplets(username){
    var tripletsList = [];

    /*const docRef = db.collection('Users').doc('Zeta');

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });*/

    const q = query(collection(db, "Users/"+username+"/Reports"))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        tripletsList.push(doc.data());
    });


/*
    const docRef = doc(db, "Users/Zeta/Reports", "BZltMgqgO9aCaikQRRz6");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    }
*/
    return tripletsList
} 