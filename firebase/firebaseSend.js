import { setDoc } from "firebase/firestore";
import  {fetchDataByMonth_firestore, createMonthlyDataDocRef, fetchDataByDocRef } from "./firstoreFetch"

export async function sendData_firestore(username, dataObject, graphData, date){

    //console.log(dataObject);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = monthNames[date.getMonth()];
    const year = date.getUTCFullYear().toString()
    console.log(username, month, year);
    const docRef = await createMonthlyDataDocRef(username, month , year);
    const oldDoc = await fetchDataByDocRef(docRef);

    oldDoc['all_array'].push(dataObject);
    //console.log(oldDoc);
    setDoc(docRef, oldDoc);
    //console.log(graphData);
    //const data = await fetchDataByMonth_firestore('zeta', 'January', '2020');

}

export async function sendGraphData_firestore(username, month , year){

}