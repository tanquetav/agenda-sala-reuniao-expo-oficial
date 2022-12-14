import { View, Text, TextInput } from 'react-native';

import { AgendaModal } from '../';
import { Button } from '../../Button';

import styles from './ModalNewEvent.styles';

import DateTimePicker from '@react-native-community/datetimepicker';
import React from "react";
import moment from "moment";
import {Spacer} from "../../Spacer";

type Props = {
  isVisible: boolean;
  selectedDate: string | undefined;
  onChangeText: (text: string) => void;
  onPressCancel: () => void;
  onPressAdd: () => void;
  onChangeTime: (event: any, selectTime: any) => void;
  dateFormated: (date: Date) => void;
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
        <View>
          <Spacer h={2} />
            <Text>
              Novo Agendamento
            </Text>
            <Spacer h={2} />

            <Text>
              Data: {selectedDate?.localeCompare('dd, MMMM, YYYY') === Date.UTC(2022, 12, 16) ? 'Selecione uma data' : Date.UTC(2022, 12, 16, 12, 30)}
            </Text>
            <Spacer h={2} />
          <Text>
            Hoje é: {dateFormated(new Date())}
          </Text>

            <Spacer h={2} />
        </View>

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

