import { StatusBar } from 'expo-status-bar';
import { useEffect, useReducer, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import useCalendar from '@atiladev/usecalendar';

import {
  AgendaItem,
  Header,
  ModalNewEvent,
  ModalError,
  ModalRemove,
  ModalNoCalendar,
} from './components';
import reducer, { stateProps } from './reducer';
import styles from './App.styles';
import { Calendar } from 'expo-calendar';
import { getLocales } from "expo-localization";



const deviceLanguage = getLocales()[0].languageCode;
console.log (deviceLanguage);

const initialState: stateProps = {
  visibleModalNewEvent: false,
  visibleModalError: false,
  visibleModalRemove: false,
  visibleModalNoCalendar: false,
  eventTitle: '',
  selectedDate: undefined,
  events: undefined,
};

const calendarName = 'Agenda Sala';

export default function App() {
  const {
    getPermission,
    createCalendar,
    addEventsToCalendar,
    deleteCalendar,
    openSettings,
    getEvents,
    getCalendarId,
  } = useCalendar(calendarName, 'green', 'agendament-sala-reuniao');

  const [state, dispatch] = useReducer(reducer, initialState);
  const [granted, setGranted] = useState<Calendar[] | undefined>();

  const openModalNewEvent = () => {
    if (state.selectedDate) {
      dispatch({ type: 'setVisibleModalNewEvent', payload: true });
    } else {
      dispatch({ type: 'setVisibleModalError', payload: true });
    }
  };
  const closeModalNewEvent = () => {
    dispatch({ type: 'setVisibleModalNewEvent', payload: false });
    dispatch({ type: 'clear' });
  };

  const closeModalError = () => {
    dispatch({ type: 'setVisibleModalError', payload: false });
  };

  const openModalRemove = async () => {
    const calendarId = await getCalendarId();
    if (calendarId) {
      dispatch({ type: 'setVisibleModalRemove', payload: true });
    } else {
      openModalNoCalendar();
    }
  };
  const closeModalRemove = () => {
    dispatch({ type: 'setVisibleModalRemove', payload: false });
  };

  const openModalNoCalendar = () => {
    dispatch({ type: 'setVisibleModalNoCalendar', payload: true });
  };

  const closeModalNoCalendar = () => {
    dispatch({ type: 'setVisibleModalNoCalendar', payload: false });
  };

  const askPermission = async () => {
    const isGranted = await getPermission();
    setGranted(isGranted);
  };

  useEffect(() => {
    askPermission();
  }, []);

  const createCalAndEvent = async () => {
    if (granted) {
      const calendarId = await getCalendarId();
      if (!calendarId) {
        await createCalendar();
      }

      if (state.selectedDate) {
        try {
          addEventsToCalendar(
            state.eventTitle,
            new Date(state.selectedDate.toString()),
            new Date(state.selectedDate.toString())
          );
          const listEvent = await getEvents();
          dispatch({ type: 'setEvents', payload: listEvent });
        } catch (e) {
          // Something went wrong
        }
      }
    } else {
      openSettings();
    }
  };

  const removeCalendar = () => deleteCalendar();

  useEffect(() => {
    async function loadEvents() {
      const events = await getEvents();
      dispatch({ type: 'setEvents', payload: events });
    }
    loadEvents();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        onPressLeft={openModalRemove}
        onPressRight={openModalNewEvent}
        title={'Agenda Sala de Reunião'}
      />
      <View style={styles.calendarContainer}>
        <CalendarPicker
          onDateChange={(evt) =>
            // @ts-ignore
            dispatch({ type: 'setSelectedDate', payload: evt })
          }
            selectedDayColor={'#00BFFF'}
            selectedDayTextColor={'#FFFFFF'}
            todayBackgroundColor={'#00BFFF'}
            todayTextStyle={{ color: '#FFFFFF' }}
            textStyle={{ color: '#000000' }}
            weekdays={['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']}
            months={['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio','Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ]}
          minDate={new Date()}
        />
      </View>

      {!!state.events?.length && (
        <Text style={styles.textEvents}>Agendamentos</Text>
      )}

      <View style={styles.flatListContainer}>
        <FlatList
          data={state.events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AgendaItem item={item} />}
        />
      </View>

      <ModalNewEvent
        isVisible={state.visibleModalNewEvent}
        selectedDate={state.selectedDate?.toString()}
        onChangeText={(text) =>
          dispatch({ type: 'setEventTitle', payload: text })
        }

        onChangeTime={(time) => {
            dispatch({ type: 'setSelectedDate', payload: time });
        }}

        onPressAdd={() => {
          createCalAndEvent().then(r => {
            closeModalNewEvent();
          });
          closeModalNewEvent();
        }}
        onPressCancel={closeModalNewEvent}
       dateFormated={state.selectedDate?.format('DD/MM/yyyy')}

      />

      <ModalError
        isVisible={state.visibleModalError}
        onPress={closeModalError}
      />

      <ModalNoCalendar
        isVisible={state.visibleModalNoCalendar}
        onPress={closeModalNoCalendar}
      />

      <ModalRemove
        isVisible={state.visibleModalRemove}
        calendarName={calendarName}
        onPressCancel={closeModalRemove}
        onPressContinue={() => {
          dispatch({ type: 'setEvents', payload: undefined });
          removeCalendar();
          closeModalRemove();
        }}
      />

      <StatusBar style='light' />
    </View>
  );

}
