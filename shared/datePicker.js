import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, View, Text } from 'react-native';
import { useState } from 'react';

export default function DatePicker({date, setDate, show, setShow}){
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
    };
    
    return (
      <View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </View>
    );
  }