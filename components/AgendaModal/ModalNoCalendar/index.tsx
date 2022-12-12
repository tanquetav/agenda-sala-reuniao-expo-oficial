import { View, Text } from 'react-native';
import React from 'react';

import { AgendaModal } from '..';
import { Button } from '../../Button';

import styles from './ModalNoCalendar.styles';

type Props = {
  isVisible: boolean;
  onPress: () => void;
};

export const ModalNoCalendar = ({ isVisible, onPress }: Props) => {
  return (
    <AgendaModal isVisible={isVisible} locale={"pt-BR"}>
      <View style={styles.modalNoCalendarContainer}>
        <Text style={styles.textMessage}>
          Não foi possível acessar o calendário
        </Text>
        <View style={styles.buttonContainer}>
          <Button title='Ok' onPress={onPress} />
        </View>
      </View>
    </AgendaModal>
  );
};
