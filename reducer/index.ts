import * as Calendar from 'expo-calendar';
import { DateChangedCallback } from 'react-native-calendar-picker';
import {DateTime} from "i18n-js";


export type stateProps = {
  visibleModalNewEvent: boolean;
  visibleModalError: boolean;
  visibleModalRemove: boolean;
  visibleModalNoCalendar: boolean;
  eventTitle: string;
  eventTime: string;
  selectedDate: string | Date | undefined;
  events: Calendar.Event[] | undefined;
  hour: number | undefined; // hour of the event
  endDate: DateChangedCallback | undefined;
};


type Actions =
  | { type: 'setVisibleModalNewEvent'; payload: boolean }
  | { type: 'setVisibleModalError'; payload: boolean }
  | { type: 'setVisibleModalRemove'; payload: boolean }
  | { type: 'setVisibleModalNoCalendar'; payload: boolean }
  | { type: 'setEventTitle'; payload: string }
  | { type: 'setEventTime'; payload: string }
  | { type: 'setSelectedDate'; payload: DateTime | undefined }
  | { type: 'setEvents'; payload: Calendar.Event[] | undefined }
  | { type: 'clear' }
  | { type: 'SET_HOUR'; payload: number | undefined  }


function reducer(state: stateProps, action: Actions) {
  switch (action.type) {
    case 'setVisibleModalNewEvent':
      return {
        ...state,
        visibleModalNewEvent: action.payload,
      };
    case 'setVisibleModalError':
      return {
        ...state,
        visibleModalError: action.payload,
      };
    case 'setVisibleModalRemove':
      return {
        ...state,
        visibleModalRemove: action.payload,
      };
    case 'setVisibleModalNoCalendar':
      return {
        ...state,
        visibleModalNoCalendar: action.payload,
      };
    case 'setEventTitle':
      return {
        ...state,
        eventTitle: action.payload,
      };
    case 'setEventTime':
      return {
        ...state,
        eventTime: action.payload,
      };
    case 'setSelectedDate':
      return {
        ...state,
        selectedDate: action.payload,
      };
    case 'setEvents':
      return {
        ...state,
        events: action.payload,
      };

    case 'clear':
      return {
        ...state,
        eventTitle: '',
      };
    case 'SET_HOUR':
        return {
            ...state,
            hour: action.payload,
        };
    default:
      return state;
  }
}
console.log(Object.getOwnPropertyNames( reducer));


export default reducer;
