import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import ShopNavigator from './navigation/shopNavigator'
import Login from './screens/Login'
import Admin from './screens/Admin'

import { LogBox } from 'react-native'
import Register from './screens/Register'
LogBox.ignoreAllLogs()

export default function App() {
  // return <ShopNavigator />
  return <Admin/>
}

const styles = StyleSheet.create({})
