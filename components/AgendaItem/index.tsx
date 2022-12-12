import React from 'react';
import * as Calendar from 'expo-calendar';
import { View, Text } from 'react-native';
import { Spacer } from '../Spacer';
import styles from './AgendaItem.styles';

type Props = {
  item: Calendar.Event;
};

export const AgendaItem = ({ item }: Props) => {
    item.location = item.location = "" || 'Local não informado';
    console.log(item.location);
  return (
    <View style={styles.container}>
      <Text style={styles.textDate}>
        {new Date(item.startDate).toLocaleDateString()}
      </Text>
        <Spacer h={2} />
        <Text style={styles.textDate}>
            {new Date(item.startDate).toLocaleTimeString()}
        </Text>
      <Spacer h={2} />
      <Text style={styles.eventText}>{item.title}</Text>
    </View>
  );
};
