import i18n from 'i18n-js';
import AsyncStorage from '@react-native-community/async-storage'

import en from './en.json'
import zh from './zh.json'

i18n.translations = {
    en,
    zh
}

async function getLanguage() {
    const choice = await AsyncStorage.getItem('setLanguage')
    i18n.locale = choice
    i18n.fallbacks = true

    console.log(i18n.currentLocale())
}

getLanguage()

export function t(name: string) {
    return i18n.t(name)
