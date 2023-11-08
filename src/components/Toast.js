import {ToastAndroid} from 'react-native';

export function ShowToast(message) {
  ToastAndroid.show(message, ToastAndroid.SHORT);
}
