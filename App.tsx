import { StatusBar } from 'expo-status-bar';
import { useEffect, useReducer, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import * as calendarexpo from 'expo-calendar';
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
import {DateTime} from "i18n-js";
import moment from 'moment';



const deviceLanguage = getLocales()[0].languageCode;
console.log (deviceLanguage);

const initialState: stateProps = {
  visibleModalNewEvent: false,
  visibleModalError: false,
  visibleModalRemove: false,
  visibleModalNoCalendar: false,
  eventTitle: '',
  eventTime: '',
  selectedDate: undefined,
  events: undefined,
  hour: undefined,
  endDate: Date

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


  const setHour = (hour: DateTime) => {
    if ("getHours" in hour) {
      state.selectedDate?.setHours(hour.getHours());
    }
    dispatch({ type: 'SET_HOUR', payload: hour });
  }

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

  // @ts-ignore
  const openModalRemove = async () => {
    const calendarId = await getCalendarId();
    if (calendarId) {
      dispatch({ type: 'setVisibleModalRemove', payload: true });
    } else {
      openModalNoCalendar();
    }
  };

  // @ts-ignore
  const closeModalRemove = () => {
    dispatch({ type: 'setVisibleModalRemove', payload: false });
  };

  // @ts-ignore
  const openModalNoCalendar = () => {
    dispatch({ type: "setVisibleModalNoCalendar", payload: true });
  };

  const closeModalNoCalendar = () => {
    // @ts-ignore
    dispatch({ type: "setVisibleModalNoCalendar", payload: false });
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
          const time = moment(state.eventTime);
          const date = moment(state.selectedDate);
          const date2 = date.hour(state.eventTime.substr(0,2)).minute(state.eventTime.substr(3,2));
          console.log(state.eventTime.substr(0,2), state.eventTime.substr(3,2))
          await addEventsToCalendar(
              state.eventTitle,
              date2.toDate(),
              date2.toDate(),
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
        //TODO RETIREI .tostring do selectedDate?
        selectedDate={state.selectedDate}
        onChangeText={(text) =>
          dispatch({ type: 'setEventTitle', payload: text })
        }

        onChangeTime={(time) => {
          console.log(time)
            dispatch({ type: 'setEventTime', payload: time });
        }}
        setHour = { (hour) => {
          const tim = moment(hour.nativeEvent.timestamp)
          console.log(tim.format("HH:mm:ss"))
            dispatch({ type: 'setEventTime', payload: tim.format("HH:mm:ss") });
        }}

        onPressAdd={() => {
          createCalAndEvent().then(r => {
            closeModalNewEvent();
          });
          closeModalNewEvent();
        }}
        onPressCancel={closeModalNewEvent}

       dateFormatted={date => {
          const dateFormatted = new Date(date);
            const day = dateFormatted.getDate();
            const month = dateFormatted.getMonth() + 1;
            const year = dateFormatted.getFullYear();
            return `${day}/${month}/${year}`;
        }}
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
console.log(reducer.state)
