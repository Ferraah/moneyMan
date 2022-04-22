import React from "react";
import { StyleSheet, View } from 'react-native';
import { Divider, List, ListItem, Text, Icon} from '@ui-kitten/components';

import {splitDailyData} from './dataHandlers'
import { Timestamp } from "firebase/firestore";

import {CURRENCY_SYMBOL} from './costants'

function convertTimestampToShortDate(timestamp){
  //TODO: Bug, not working as expected.
  return timestamp.toDate().toLocaleDateString("en",{year:"2-digit",month:"2-digit", day:"4-digit"})
}

export default function EntriesListWithEmoji({monthlyData}) {
  const renderItemEmoji = (emoji) => {
    return(<View style={styles.emojiView}>
      <Text style={styles.emoji}>{emoji}</Text>
    </View>);
  };

  const renderItemValue = (value) => {
    return <Text>{value}{CURRENCY_SYMBOL}</Text>;    
  };


  const renderItem = ({item, index}) => (
    
    <ListItem
      title={item.notes}
      description={convertTimestampToShortDate(item.date)}
      accessoryLeft={() => renderItemEmoji(item.category)}
      accessoryRight={() => renderItemValue(item.value)}
    />
  );

  console.log(monthlyData);
  return (
    <List
      data={monthlyData}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  emoji: {
    fontSize: 30
  },
  emojiView:{
    //borderWidth: 2,
    paddingHorizontal: 10
  }
});
