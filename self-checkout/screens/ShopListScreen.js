import React, { useState } from 'react'
import { View, Text, StyleSheet, Platform, Button } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import BarcodeScanner from '../components/BarcodeScanner'

const ShopListScreen = (props) => {
  const [openScanner, setOpenScanner] = useState(false)
  const openScannerHandler = () => {
    setOpenScanner((oldValue) => {
      return !oldValue
    });
  }
  return (
    //will keep a list of cartItems card.
    <>
      <Button title={openScanner ? 'Close Scanner' : 'Open Scanner'} onPress={openScannerHandler} />
      {openScanner && <BarcodeScanner />}
    </>
  );
}
ShopListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Shop List',
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            iconName={Platform.OS === 'android' ? 'md-wallet' : 'ios-wallet'}
            title='ProceedCheckout'
            onPress={() => {
              navData.navigation.navigate('Checkout')
            }}
          />
        </HeaderButtons>
      )
    },
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            iconName={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
            title='Menu'
            onPress={() => {
              navData.navigation.toggleDrawer()
            }}
          />
        </HeaderButtons>
      )
    },
  }
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ShopListScreen
