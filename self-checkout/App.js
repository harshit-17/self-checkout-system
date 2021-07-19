import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import ShopNavigator from './navigation/shopNavigator'
import Login from './screens/Login'
import Admin from './screens/Admin'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import { LogBox } from 'react-native'
import Register from './screens/Register'
import authReducer from './centralstore/reducers/auth'
import NavigationContainer from './navigation/navigationContainer'
import { adminReducer } from './centralstore/reducers/products'
LogBox.ignoreAllLogs()

const rootReducer = combineReducers({
  auth: authReducer,
  adminReducer: adminReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  // return <ShopNavigator />
  return (
    <Provider store={store}>
      {/* <Register /> */}
      <NavigationContainer />
    </Provider>
  )

}

const styles = StyleSheet.create({})
