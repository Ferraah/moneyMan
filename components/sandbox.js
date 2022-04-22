import {Text, View, StyleSheet, FlatList, ScrollView, SafeAreaView, TouchableOpacity, Button} from 'react-native'


export default function Sandbox(){
    return(
        <View>
            <View style={styles.container}>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container:{
        height: 75,
        borderColor: 'red',
        borderWidth: 2
    }
});