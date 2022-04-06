
import {Text, StyleSheet, View, FlatList, TextInput} from 'react-native'
import {React, useState} from 'react'
import AddModal from '../shared/addModal';
import DataList from './dataList';
import EntriesListWithEmoji from '../shared/entriesListWithEmoji';

import {Button, Layout, Card, Icon} from '@ui-kitten/components'

import { Poppins_400Regular, Poppins_600SemiBold, useFonts } from '@expo-google-fonts/poppins'



export default function ReportOverview({route, navigation}){
    const data = route.params
    const [isModalVisible, setModalVisible] = useState(false);
    const [isAddingIncome, setAddingIncome] = useState();
  
    const AddButton = (props) =>(
        <Icon name='plus-circle' style={{ width: 50, height: 50, tintColor: props.color }} />
    )

      
    /* FONTS LOADING */
    let [fontsLoaded, error] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold
      });

      
    const toggleModal = (incomeButton) => {
        if(incomeButton)
            setAddingIncome(true);
        else
            setAddingIncome(false);

        setModalVisible(!isModalVisible);
    };

    if (!fontsLoaded) {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        );
    }else{
        return(
            <Layout style={styles.container}>

                <AddModal toggleModal={toggleModal} isModalVisible={isModalVisible} isAddingIncome={isAddingIncome}/>

                {/*
                    <View style={styles.monthLabel}>
                        <Text style={fontsStyle.semibold25}>{data.timeSpanName}</Text>
                    </View>*/
                }
                <View style={styles.incomeView}>                            
                    <Text style={fontsStyle.regular16}>Total incomes:</Text>
                    <View style={styles.valueAndButton}>
                        <Text style={fontsStyle.semibold39}>100,0€</Text>
                        <Button accessoryLeft={() => AddButton({color: 'green'})} onPress={() => toggleModal(true)} appearance='ghost'></Button>
                    </View>
                    <Text style={fontsStyle.regular16}>Total expenses:</Text>
                    <View style={styles.valueAndButton}>
                        <Text style={fontsStyle.semibold39}>100,0€</Text>
                        <Button accessoryLeft={() => AddButton({color: 'red'})} onPress={() => toggleModal(false)} appearance='ghost'></Button>
                    </View>

                </View>


                {/*<DataList rawData={data.rawData}/>*/}
                {<EntriesListWithEmoji rawData={data.rawData} style={styles.entriesList}/>}
            </Layout>
        );
    }

}



  
const styles = StyleSheet.create({
    incomeView:{
        //backgroundColor: 'pink',
        borderColor: 'red',
        borderWidth: 1,
        width: '80%',
        alignSelf: 'center',
        marginVertical: 100

    },
    valueAndButton:{
        flexDirection: 'row',
        //backgroundColor: 'purple',
        justifyContent: 'space-between'        
    },
    container:{
        marginVertical: 20,
        marginHorizontal: 20,
        //backgroundColor: 'grey',
        flex: 1
    },

    dateAndButtonView:{
        flexDirection: "row",
        justifyContent: "space-between",
        /*backgroundColor: 'red'        */

    },
    changeButton: {
        flex: 1,
        marginLeft: 100,
    },
    date:{
        flex: 1,
        justifyContent: 'center',
        /*backgroundColor: 'blue'*/
    },



});

const fontsStyle = StyleSheet.create({
    regular16: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular'
    },
    regular25: {
        fontSize: 25,
        fontFamily: 'Poppins_400Regular'
    },
    regular39: {
        fontSize: 39,
        fontFamily: 'Poppins_400Regular'
    },
    semibold16: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold'
    },
    semibold25: {
        fontSize: 25,
        fontFamily: 'Poppins_600SemiBold'
    },
    semibold39: {
        fontSize: 39,
        fontFamily: 'Poppins_600SemiBold'
    },
})