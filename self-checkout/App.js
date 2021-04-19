import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import ShopNavigator from './navigation/shopNavigator'

import { LogBox } from 'react-native'
LogBox.ignoreAllLogs()

export default function App() {
  return <ShopNavigator />
}

const styles = StyleSheet.create({})
