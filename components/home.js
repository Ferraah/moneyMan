
import {React, useState} from "react";
import Graph from "../shared/graph";
import Card from "../shared/card";
import {filterMonthly} from "../shared/dataHandlers"

import {tempSettings, tempData} from "./logic/homeLogic"

import {Text, View, StyleSheet, FlatList, ScrollView, SafeAreaView, TouchableOpacity, Button} from 'react-native'


function onPressCard(navigation, item){
    navigation.navigate('ReportOverview', item)

}

function populatePage(timeSpanMode){
    
    // Filtra per Mese
    if(timeSpanMode === "MONTHLY"){
        const tmp = filterMonthly(tempData);
        return tmp;
    }

    // ...da fare... //

}


export default function Home({navigation}){
   
    const [data, setData] = useState(tempData);


    return(
        <View>
            {/*<Header*/}

            <SafeAreaView style={styles.container}>
                <ScrollView nestedScrollEnabled>
                <View style={styles.resocontoView}>
                    <Text style={styles.bigBoldText}>2020</Text>
                    <Text style={styles.normalText}>Ecco i resconti del mese:</Text>

                </View>

                    {<FlatList
                        data={populatePage(tempSettings.TIMESPAN)}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={() => onPressCard(navigation, item)}>
                                <Card>
                                    <Graph data={item.tripletTotal}></Graph>
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

const styles = StyleSheet.create({
    resocontoView: {
        alignSelf: 'flex-start',

    },
    flatlistView: {
        backgroundColor: 'blue',
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
        backgroundColor: 'pink'
    }
});