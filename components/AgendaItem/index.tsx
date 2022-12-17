import React from 'react';
import * as Calendar from 'expo-calendar';
import { View, Text } from 'react-native';
import { Spacer } from '../Spacer';
import styles from './AgendaItem.styles';
import moment from 'moment';

type Props = {
  item: Calendar.Event;
};

export const AgendaItem = ({ item }: Props) => {

  return (
    <View style={styles.container}>
      <Text style={styles.textDate}>
        {moment(item.startDate).format("DD/MM/yyyy")}
      </Text>
        <Spacer h={2} />
        <Text style={styles.textDate}>
            {/*{new Date(item.startDate).toLocaleTimeString()}*/}
            {/*{new Date().setTime().toLocaleTimeString()}*/}
            {moment(item.startDate).format("HH:mm:ss")}
        </Text>
      <Spacer h={2} />
      <Text style={styles.eventText}>{item.title}</Text>

    </View>
  );
};
