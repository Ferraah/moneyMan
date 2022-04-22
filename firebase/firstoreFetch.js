import firestore from '@react-native-firebase/firestore'
import React, {Component, useState} from 'react'

import {db} from './firebaseInfo'
import {collection, getDocs, getDoc,doc, query, where} from 'firebase/firestore'
import {cache} from '../shared/cacheHandler'

export default async function fetchDataByMonth_firestore(username, month, year){
    const docRef = await createMonthlyDataDocRef(username, month, year);
    // Get the monthly document containing an array of /E object.
    const monthlyDoc = await getDoc(docRef);
    //console.log(monthlyDoc.id, " => ", monthlyDoc.data());
    return monthlyDoc.data();


}

export async function fetchDataByDocRef(docRef){
    // Get the monthly document containing an array of /E object.
    const monthlyDoc = await getDoc(docRef);
    //console.log(monthlyDoc.id, " => ", monthlyDoc.data());
    return monthlyDoc.data();
}
export async function createMonthlyDataDocRef(username, month, year){
    
    // Find user id and month id to make a query
    const q = query(collection(db, "Users"), where('username', '==', username));
    const usernameSnapshot = await getDocs(q);

    var userId;
    var monthId;
    usernameSnapshot.forEach((userDoc) => {
        // doc.data() is never undefined for query doc snapshots
        userId = userDoc.id;
    });

    const monthSnap = await getDocs(query(collection(db, "Users", userId, year), where('month', '==', month)));
    monthSnap.forEach(element => {
        monthId = element.id;
    });

    // --------------------------


    return doc(db, "Users", userId, year, monthId, 'data', 'all_docs')
}

// TODO: Save user id
export async function fetchGraphData_firestore(username, year){

    // Find user id and month id to make a query
    const q = query(collection(db, "Users"), where('username', '==', username));
    const usernameSnapshot = await getDocs(q);

    var userId;
    var yearlyGraphDataArray=[];

    usernameSnapshot.forEach((userDoc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(userDoc.id, " => ", userDoc.data());
        userId = userDoc.id;
        cache.set('userId', userId);
    });

    const monthSnap = await getDocs(collection(db, "Users", userId, year));
    monthSnap.forEach(element => {
        //console.log(element.id, " => ", element.data());
        yearlyGraphDataArray.push(element.data());
    });

    // Array of objects containing graph data and month
    /*
    [
        Object {
            "graph_data": Object {
                "total_expenses": 480,
                "total_incomes": 600,
                "total_profit": 120,
            },
            "month": "January",
        },
        ...
        ...
        Object {
            "graph_data": Object {
                "total_expenses": 480,
                "total_incomes": 620,
                "total_profit": 140,
            },
            "month": "December",
        },

    ]

    */
    return yearlyGraphDataArray;




}
