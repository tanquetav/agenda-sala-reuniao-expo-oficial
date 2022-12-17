import { View, Text, TextInput } from 'react-native';

import { AgendaModal } from '../';
import { Button } from '../../Button';

import styles from './ModalNewEvent.styles';

import DateTimePicker from '@react-native-community/datetimepicker';
import React from "react";
import moment from "moment";
import {Spacer} from "../../Spacer"
import 'moment/locale/pt-br';

type Props = {
  isVisible: boolean;
  selectedDate: any | undefined;
  onChangeText: (text: string) => void;
  onPressCancel: () => void;
  onPressAdd: () => void;
  onChangeTime: (event: any, selectedDate: any) => void;
  dateFormatted: (date: Date) => void;
  setEventTime: (time: any) => void;
    setEventTitle: (title: any) => void;
    setHour: (hour: any) => void;
};
//
// let filterDate1 = (date: Date) => {;
// filterDate = (date: Date) => {
//     return date.toLocaleDateString();
// }

function filterTime(date: Date) {
    return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}
function timestampToDate1(timestamp: number) {
    return new Date(timestamp);
}

function dateToTimestamp(date: Date) {
    return date.getTime();
}

function dateToTimestampString(date: Date) {
    return date.getTime().toString();
}
function timeStampToDate(props: any)   {
  var t = new Date( props );
  var hours = t.getHours();
  var minutes = t.getMinutes();
  var newformat = t.getHours() >= 12 ? 'PM' : 'AM';

// Find current hour in AM-PM Format
  hours = hours % 12;

// To display "0" as "12"
  hours = hours ? hours : 12;
  // @ts-ignore
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const formatted =
      (t.toString().split(' ')[0])
      + ', ' + ('0' + t.getDate()).slice(-2)
      + '/' + ('0' + (t.getMonth() + 1)).slice(-2)
      + '/' + (t.getFullYear())
      + ' - ' + ('0' + t.getHours()).slice(-2)
      + ':' + ('0' + t.getMinutes()).slice(-2)
      + ' ' + newformat;
  return <View><Text>{ formatted }</Text></View>;
}

export const ModalNewEvent = ({
                                isVisible,
                                selectedDate,
                                onChangeText,
                                onPressCancel,
                                onPressAdd,
                                onChangeTime,
                                dateFormatted,
                                setHour,
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
              {/*Data: {selectedDate?.localeCompare('dd, MMMM, YYYY') === Date.UTC(2022, 12, 16) ? 'Selecione uma data' : Date.UTC(2022, 12, 16, 12, 30)}*/}
              <View>
                <Text>

             Data Agendamento: {timeStampToDate(selectedDate)}
                    {console.log(Object.getOwnPropertyNames( onChangeTime))}
                </Text>

              </View>
                    {/*{(selectedDate.isSameOrAfter(moment().format('YYYY-MM-DD HH:mm:ss')) )}*/}
                    {/*//? 'Selecione uma data' : selectedDate)}*/}


                {/*{console.log(Object.getOwnPropertyNames(selectedDate))}*/}
                {/*{console.log(selectedDate)}*/}
            </Text>
            <Spacer h={2} />
            <Text>
              Hoje é: {dateFormatted(new Date())}
            </Text>

            <Spacer h={2} />
          </View>

          <TextInput
              placeholder='Nome do evento'
              style={styles.input}
              onChangeText={onChangeText}
          />
            <Spacer h={2} />
          <View style={styles.buttonsContainer}>
            {false && <DateTimePicker style={styles.hourContainer} value={new Date()} mode="time" onChange={setHour}/>}
          </View>
          <View style={styles.buttonsContainer}>
            <Button title='Cancelar' onPress={onPressCancel} />
            <Button title='Adicionar' onPress={onPressAdd} />
          </View>
        </View>
      </AgendaModal>
  );
};
