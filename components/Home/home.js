
import {React, useEffect, useState} from "react";
import Graph from "../../shared/graph";
import Card from "../../shared/card";
import {filterMonthly} from "../../shared/dataHandlers"

import {Text, View, StyleSheet, FlatList, ScrollView, SafeAreaView, TouchableOpacity, Button} from 'react-native'

import {fetchDataByMonth_firestore, fetchGraphData_firestore} from "../../firebase/firstoreFetch";
import { Layout} from "@ui-kitten/components";


import { useHeaderHeight } from '@react-navigation/elements';

export default function Home({navigation}){
   

    const headerHeight = useHeaderHeight();

    const [graph_data, setGraph_data] = useState({});
    const [dbQueryDone, setDbQueryDone] = useState(false);
    const [year, setYear] = useState('2020');

    // Fetching Graph data -------------------------

    const loadGraphData = async () =>{
        const data = await fetchGraphData_firestore('zeta', year);
        setGraph_data(data);
        setDbQueryDone(true);

    }

    // Fetch Data when home is opened, 1 time only
    useEffect(()=>{
        if(!dbQueryDone){

            loadGraphData();
            console.log('Debug: GraphData fetched');
        }
    }, []);
    

    // Handlers ------------------------------------

    const onPressCard = (navigation, item, year) => {
        navigation.navigate('ReportOverview', [item, year]);
    };

    // --------------------------------------------


    if(dbQueryDone){
        return(
            <View style={{marginTop: headerHeight}}>
                {/*<Header*/}

                <SafeAreaView style={styles.container}>
                    <ScrollView nestedScrollEnabled>
                    <View style={styles.resocontoView}>
                        <Text style={styles.bigBoldText}>{year}</Text>
                        <Text style={styles.normalText}>Ecco i resconti dell'anno:</Text>
                    </View>
                        
                        {<FlatList
                            data={graph_data}
                            renderItem={({item}) => (
                                <TouchableOpacity onPress={() => onPressCard(navigation, item, year)}>
                                    <Card>
                                        <Graph data={item.graph_data}></Graph>
                                        <Text>{item.month}</Text>
                                    </Card>
                                </TouchableOpacity>

                            )}
                            style={styles.flatlistView}
                            />}
                    </ScrollView>
                </SafeAreaView>

            </View>
        );
    }
    else{
        return(
            <View>
                <Text>Fetching Data</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    resocontoView: {
        alignSelf: 'flex-start',

    },
    flatlistView: {
        //backgroundColor: 'blue',
        marginTop: 15
    },
    bigBoldText: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    normalText: {
        fontSize: 20
    },
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'pink'
    }
});