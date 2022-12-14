import { View, Text, TextInput } from 'react-native';

import { AgendaModal } from '../';
import { Button } from '../../Button';

import styles from './ModalNewEvent.styles';

import DateTimePicker from '@react-native-community/datetimepicker';
import React from "react";
import moment from "moment";

type Props = {
  isVisible: boolean;
  selectedDate: string | undefined;
  onChangeText: (text: string) => void;
  onPressCancel: () => void;
  onPressAdd: () => void;
  onChangeTime: (event: any, selectTime: any) => void;
  dateFormated: (date: Date) => string;
};

export const ModalNewEvent = ({
  isVisible,
  selectedDate,
  onChangeText,
  onPressCancel,
  onPressAdd,
  onChangeTime,
  dateFormated,
}: Props) => {
  return (
    <AgendaModal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <Text style={styles.selectedDate}>{selectedDate}</Text>
        <TextInput
          placeholder='Nome do evento'
          style={styles.input}
          onChangeText={onChangeText}
        />
        <View style={styles.buttonsContainer}>
          <DateTimePicker style={styles.hourContainer} value={new Date()} mode="time" onChange={onChangeTime}/>
        </View>
        <View style={styles.buttonsContainer}>
          <Button title='Cancelar' onPress={onPressCancel} />
          <Button title='Adicionar' onPress={onPressAdd} />
        </View>
      </View>
    </AgendaModal>
    );
    };

