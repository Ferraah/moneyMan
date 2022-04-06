import React from 'react';
import {StyleSheet, Text, View, } from "react-native";

export default function Header(){
    return(
        <View style={styles.header}>
            <Text style={styles.title}>My todos</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: "#ffa726",
        padding: 24,
        alignItems: 'center'        
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold', 
        color: 'white'
    }
});