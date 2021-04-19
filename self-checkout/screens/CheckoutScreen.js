import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const CheckoutScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Proceeding to Checkout</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default CheckoutScreen
