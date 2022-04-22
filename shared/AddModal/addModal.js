
import {Text, View, TextInput, StyleSheet, TouchableOpacity, Dimensions, KeyboardAvoidingView} from 'react-native'
import {React, useEffect, useState} from 'react'
import Modal from "react-native-modal";
import DatePicker from '../datePicker';
import{Button, Input, ListItem} from '@ui-kitten/components'
import EmojiPicker from 'rn-emoji-keyboard';
import { checkInsertedData, convertDateToFirestoreTimestamp, createUpdatedGraphData, getMonthFromString } from './addModalLogic';
import Colors from '../../assets/custom-theme.json'
import { Poppins_300Light } from '@expo-google-fonts/poppins';

import { sendData_firestore, sendGraphData_firestore } from '../../firebase/firebaseSend';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function AddModal(props) {

    const [date, setDate] = useState(new Date(props.year, getMonthFromString(props.item.month), 1, 0, 0, 0));
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [isOpen, setIsOpen] = useState(false);

    // Data to send ----------------------------------
    const [value, setValue] = useState('0€');
    const [notes, setNotes] = useState();
    const [currEmoji, setCurrEmojy] = useState('💶');

    // Default notes value
    useEffect(()=>{
        if(props.isAddingIncome)
            setNotes('Generic income');
        else
            setNotes('Generic expense');
    })

    // Hanlders --------------------------------------
    const handlePick = (emojiObject) => {
      console.log(emojiObject);
      setCurrEmojy(emojiObject.emoji);
      /* example emojiObject = { 
          "emoji": "❤️",
          "name": "red heart",
          "slug": "red_heart",
        }
      */
    };

    const toggleEmojiSelector = () => {
        if(isOpen)
            setIsOpen(false);
        else
            setIsOpen(true)
    }

        
    const insertClick = () =>{
        

        const dataObject = {
            value: value.replace('€', ''), 
            notes: notes,
            date: convertDateToFirestoreTimestamp(date),
            category: currEmoji,
            type: props.isAddingIncome ? 'INCOME': 'EXPENSE'
        }
        
        const [isValid, errorMessageTmp] = checkInsertedData(dataObject);

        if(isValid){
            //TODO: send data to server

            resetStatesAndQuitModal();

            // Send Data

            //TODO: ONLY UPDATE IF DATE HAS CURRENT MONTH AND YEAR
            props.setGraphData(createUpdatedGraphData(props.graphData, dataObject));
            console.log('DEBUG ', dataObject, '--------' )
            sendData_firestore('zeta', dataObject, props.graphData, date).then(() => props.loadMonthlyData())
            
            
        }
        else{
            setErrorMessage(errorMessageTmp);
        }

    }

    const addCurrencyAndFormat = () => {

        if(value){
            var newValue = value.replace('.', ',');
            setValue(newValue+'€');
        }
        else
            setValue('0€');
        
    }

    const resetStatesAndQuitModal = () => {
        props.toggleModal();
        setErrorMessage('');
        setValue('0€');
        setNotes('');
        setCurrEmojy('💶');
    }
    // Components ---------------------------------------------------

    const addIncomePart = () => 
        <View>
            <Text style={fontsStyle.semibold25}>Add an income:</Text>
            <Input keyboardType='numeric' value={value} onFocus={() => setValue('')} onBlur={addCurrencyAndFormat} onChangeText={(val) => setValue(val)} size='large'></Input>
        </View>
    

    const addExpensesPart = () =>
        <View>
            <Text style={fontsStyle.semibold25}>Add an expense:</Text>
            <Input keyboardType='numeric' value={value} onFocus={() => setValue('')} onBlur={addCurrencyAndFormat} onChangeText={(val) => setValue(val)} size='large' placeholder='Insert value'></Input>
        </View>


    return (
      <View>  
        <Modal style={styles.modal} onBackdropPress={resetStatesAndQuitModal} onBackButtonPress={resetStatesAndQuitModal} isVisible={props.isModalVisible} avoidKeyboard={false} animationOutTiming={300} backdropTransitionOutTiming={0}>
        
          <View style={styles.modalView}>

            <View style={styles.dateAndButtonView}>
                
                <View style={styles.date}>
                    <Text style={fontsStyle.semibold25}>Date:</Text>
                    <Text style={styles.normalText}>{date.toLocaleDateString()}</Text>            
                </View>

                <View style={styles.changeButton}>
                    <Button onPress={() => setShowDatePicker(true)}>Change</Button>
                </View>

            </View>

            <DatePicker date={date} setDate={setDate} show={showDatePicker} setShow={setShowDatePicker}/>
            
            <View style={[styles.valueView, styles.setMargin]}>

                { props.isAddingIncome ? addIncomePart() : addExpensesPart()}

            </View>
            <View style={styles.setMargin}>
                <Text style={fontsStyle.semibold25}>Notes:</Text>
                <Input status={'basic'} size='large' onChangeText={val => setNotes(val)} placeholder='ex. Train ticket'></Input>
            </View>
            <View style={[{flexDirection: 'row', justifyContent: 'space-between'}, styles.setMargin]}>
                <View style={{alignContent: 'center', justifyContent: 'center'}}>
                    <Text style={fontsStyle.semibold25}>Emoji:</Text>
                    <Text style={fontsStyle.regular16}>Tap to change</Text>
                </View>
                <TouchableOpacity style={[styles.emojiPreview, styles.setMargin]} onPress={toggleEmojiSelector}>
                    <Text style={{alignSelf: 'center', fontSize: 50}}>{currEmoji}</Text>
                </TouchableOpacity>
            </View>


            {/* Sistemare altezza */}

            <EmojiPicker
                onEmojiSelected={handlePick}
                open={isOpen}
                onClose={() => setIsOpen(false)}
            />

            <Text style={[fontsStyle.regular16, {color: Colors['color-danger-500']}]}>{errorMessage}</Text>
            <Button style={[styles.insertButton, styles.setMargin]} onPress={insertClick} >Insert</Button>


          </View>
        </Modal>
      </View>
    );
  }


    
const styles = StyleSheet.create({
    emojiPreview:{
        height: 100,
        width:100,
        justifyContent: 'center',
        borderWidth: 1.8,
        borderColor: Colors['color-info-100'],
        borderRadius: 10
    },
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey'
    },
    modal:{
        position: 'absolute', 
        width: 0.9*windowWidth, height: 0.9*windowHeight
    },
    modalView:{
        padding: 30,
        justifyContent: 'space-evenly',
        backgroundColor: 'white',
        borderRadius: 15

    },
    dateAndButtonView:{
        flexDirection: "row",
        justifyContent: "space-between",

    },
    changeButton: {
        alignContent: 'center',
        justifyContent: 'center'        
    },
    date:{
        justifyContent: 'center',
    },
    setMargin:{
        marginTop: 20
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