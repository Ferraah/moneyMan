import React from "react";
import { StyleSheet } from 'react-native';
import { Divider, List, ListItem, Text, Icon} from '@ui-kitten/components';

import {splitDailyData} from './dataHandlers'

export default function EntriesListWithEmoji({rawData}) {
  console.log(rawData)
  const renderItemEmoji = (props) => (
    <Icon {...props} name='person'/>
  );

  const renderItemValue = (props) => (
    <Text>+100,00 euro</Text>
  );
  const renderItem = ({ item, index }) => (
    <ListItem
      title={item.notes}
      description={item.date}
      accessoryLeft={renderItemEmoji}
      accessoryRight={renderItemValue}
    />
  );

  return (
    <List
      data={rawData}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}

    />
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 200,
  },
});
