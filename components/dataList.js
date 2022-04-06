import {React, useState} from 'react'
import { FlatList, View, Text, StyleSheet, ScrollView } from 'react-native'


export default function DataList({rawData}){

    return(
        <ScrollView style={styles.flatlistView} nestedScrollEnabled>
            <FlatList
            data={rawData}
            renderItem={({item}) => (
                <Text>{item.date}</Text>
            )}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    flatlistView: {
        backgroundColor: 'blue',
        marginTop: 15,
    },

});