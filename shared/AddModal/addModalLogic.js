
import { Timestamp } from "firebase/firestore";

const MAX_VALUE_LEN = 8; // 999 999.99
const MAX_NOTES_LEN = 30;

export function checkInsertedData({value, notes, emoji}){
    console.log(notes.length);
    if(value <= 0 || value.indexOf(' ') >= 0){
        return [false,'Value input is not valid'];
    }
    if(notes.length > MAX_NOTES_LEN){
        return [false,'Notes are too long'];
    }
    return [true, ''];
}

export function convertDateToFirestoreTimestamp(date){
    //TODO: Bug, not working as expected.
    return Timestamp.fromDate(date);
}

// Create a new GraphData triplet after user new entry.
export function createUpdatedGraphData(graph_data, newEntryData){
    


    if(newEntryData.type === 'INCOME'){
        graph_data.total_incomes = +graph_data.total_incomes + +newEntryData.value;
        graph_data.total_profits = +graph_data.total_profits + +newEntryData.value;

    }
    else{
        graph_data.total_expenses = +graph_data.total_expenses + +newEntryData.value;
        graph_data.total_profits = +graph_data.total_profits + +newEntryData.value;
    }

    return graph_data;
}

export function getMonthFromString(mon){
    return new Date(Date.parse(mon +" 1, 2012")).getMonth();
}
 