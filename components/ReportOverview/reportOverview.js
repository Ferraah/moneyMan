
import {Text, StyleSheet, View, FlatList, TextInput} from 'react-native'
import {React, useEffect, useState} from 'react'
import AddModal from '../../shared/AddModal/addModal';
import DataList from '../../shared/dataList';
import EntriesListWithEmoji from '../../shared/entriesListWithEmoji';

import {Button, Layout, Card, Icon} from '@ui-kitten/components'

import { Poppins_400Regular, Poppins_600SemiBold, useFonts } from '@expo-google-fonts/poppins'

import fetchDataByMonth_firestore from '../../firebase/firstoreFetch'
import  Colors from '../../assets/custom-theme.json'
import { CURRENCY_SYMBOL } from '../../shared/costants';




export default function ReportOverview({route, navigation}){
    
    const [item, year] = route.params
    const [isModalVisible, setModalVisible] = useState(false);
    const [isAddingIncome, setAddingIncome] = useState();

    const [monthlyData, setMonthlyData] = useState();
    const [dbQueryDone, setDbQueryDone] = useState(false);


    const [graphData, setGraphData] = useState(item.graph_data);

    /* FONTS LOADING */
    let [fontsLoaded, error] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold
        });

    // Fetching monthly data -------------------------

    const loadMonthlyData = async () =>{
        setDbQueryDone(false);
        const data = await fetchDataByMonth_firestore('zeta', item.month, year);
        if(data['all_array'])
            setMonthlyData(data['all_array']);
        else
            setMonthlyData([]);

        setDbQueryDone(true);
    }

    // Fetch Data when home is opened, 1 time only
    useEffect(()=>{
        if(!dbQueryDone){
            loadMonthlyData();
        }   
    }, []);
    


    // JSX Code ------------------------------------

    const AddButton = (props) =>(
        <Icon name='plus-circle' style={{ width: 50, height: 50, tintColor: props.color }} />
    )

    // ---------------------------------------------
      


    // Handlers ------------------------------------
    const toggleModal = (incomeButton) => {
        setModalVisible(!isModalVisible);
        if(incomeButton)
            setAddingIncome(true);
        else
            setAddingIncome(false);

    };
    // ---------------------------------------------

    if (!fontsLoaded || !dbQueryDone) {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        );
    }else{
        return(
            <View style={styles.container}>

                <AddModal setGraphData={setGraphData} graphData={graphData} item={item} year={year} toggleModal={toggleModal} isModalVisible={isModalVisible} isAddingIncome={isAddingIncome} loadMonthlyData={loadMonthlyData}/>

                {/*
                    <View style={styles.monthLabel}>
                        <Text style={fontsStyle.semibold25}>{data.timeSpanName}</Text>
                    </View>*/
                }
                <View style={styles.incomesAndExpensesView}>
                    <View style={styles.incomesAndExpensesViewSecondary}>
                        <View style={styles.incomeExpenseBox}>
                            <View style={{justifyContent: 'center'}}>
                                <Text style={fontsStyle.regular16}>Total incomes:</Text>
                                <Text style={fontsStyle.semibold39}>+{graphData.total_incomes}{CURRENCY_SYMBOL}</Text>
                            </View>
                            <View style={styles.buttonsView}>
                                <Button accessoryLeft={() => AddButton({color: Colors['color-success-500']})} onPress={() => toggleModal(true)} appearance='ghost'></Button>
                            </View>
                        </View>
                        <View style={[styles.incomeExpenseBox, {marginTop: 10}]}>
                            <View style={{justifyContent: 'center'}}>
                                <Text style={fontsStyle.regular16}>Total expenses:</Text>
                                <Text style={fontsStyle.semibold39}>-{graphData.total_expenses}{CURRENCY_SYMBOL}</Text>
                            </View>
                            <View style={styles.buttonsView}>
                                <Button accessoryLeft={() => AddButton({color: Colors['color-danger-500']})} onPress={() => toggleModal(false)} appearance='ghost'></Button>
                            </View>
                        </View>
                    </View>                            



                </View>

                {/*<DataList rawData={data.rawData}/>*/}
                <View style={styles.entriesListView}>
                    <View style= {styles.entriesListViewSecondary}>
                        <View style={{alignItems: 'center'}}>
                            <Text style={fontsStyle.semibold39}>{item.month}</Text>
                        </View>
                        {<EntriesListWithEmoji monthlyData={monthlyData} style={styles.entriesList}/>}
                    </View>

                </View>
            </View>
        );
    }

}


  
const styles = StyleSheet.create({
    entriesListView:{
        //borderWidth: 2,
        height: '50%'
    },
    entriesListViewSecondary:{
        //borderWidth: 2,
    },
    incomesAndExpensesView:{
        //backgroundColor: 'pink',
        borderColor: 'red',
        //borderWidth: 1,
        paddingBottom: 30,
        width: '80%',
        height: '50%',
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row'

    },
    incomesAndExpensesViewSecondary:{
        //borderWidth: 1,
        alignSelf: 'flex-end'
    },
    incomeExpenseBox:{
        flexDirection: 'row', 
        justifyContent: 'space-evenly'
    },
    buttonsView:{
        paddingTop: 23, 
        marginLeft: 30
    },
    container:{
        height: '100%',
        marginHorizontal: 20,
        justifyContent: 'space-evenly'
        //borderWidth: 2,
    },

    dateAndButtonView:{
        flexDirection: "row",
        justifyContent: "space-between",
        /*backgroundColor: 'red'        */

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