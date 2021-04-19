import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'

const ShopListScreen = (props) => {
  return (
    //will keep a list of cartItems card.
    <View style={styles.screen}>
      <Text>Purchased Items come here!</Text>
    </View>
  )
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
