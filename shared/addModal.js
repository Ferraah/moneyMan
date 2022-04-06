
import {Text, View, TextInput, StyleSheet} from 'react-native'
import {React, useState} from 'react'
import Modal from "react-native-modal";
import DatePicker from './datePicker';

import{Button} from '@ui-kitten/components'

export default function AddModal(props) {
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const addIncomePart = 
        <View>
            <Text style={fontsStyle.semibold25}>Add an income:</Text>
            <TextInput style={styles.normalText} placeholder='Insert Value'></TextInput>
        </View>
    

    const addExpensesPart = 
        <View>
            <Text style={fontsStyle.semibold25}>Add an expense:</Text>
            <TextInput style={styles.normalText} placeholder='Insert value'></TextInput>
        </View>

    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>  
        <Modal style={styles.modal} isVisible={props.isModalVisible}>
          <View >
            <Text style={fontsStyle.semibold25}>Date:</Text>

            <View style={styles.dateAndButtonView}>
                
                <View style={styles.date}>
                    <Text style={styles.normalText}>{date.toLocaleDateString()}</Text>            
                </View>

                <View  style={styles.changeButton}>
                    <Button onPress={() => setShowDatePicker(true)}>Change</Button>
                </View>

            </View>

            <DatePicker date={date} setDate={setDate} show={showDatePicker} setShow={setShowDatePicker}/>
            
            <View style={styles.valueView}>

                { props.isAddingIncome ? addIncomePart : addExpensesPart}

            </View>
            {/* Sistemare altezza */}
            <Button style={styles.insertButton}onPress={props.toggleModal} >Insert</Button>



          </View>
        </Modal>
      </View>
    );
  }


    
const styles = StyleSheet.create({
    incomeView:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'pink'
    },
    monthLabel:{
        marginRight: 'auto',
        marginLeft: 20,
        marginVertical: 20    
    },
    bigBoldText: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    mediumBoldText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    normalText: {
        fontSize: 20,
        fontFamily: 'Poppins_400Regular'
    },
    container:{
        marginVertical: 20,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey'
    },
    modal:{
        padding: 30,
        flex: 0,
        backgroundColor: 'white',

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
    valueView:{
        marginTop: 20,
        
    },
    insertButton:{
        marginTop: 40
    }


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