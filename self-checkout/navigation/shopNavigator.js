import React from 'react'
import { SafeAreaView, View, Button } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import CheckoutScreen from '../screens/CheckoutScreen'
import ShopListScreen from '../screens/ShopListScreen'
import DiscountScreen from '../screens/DiscountsScreen'
import Orders from '../screens/Orders'
import { Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import Register from '../screens/Register'
import StartupScreen from '../screens/StartupScreen'
import { useDispatch } from 'react-redux'
import * as authActions from '../centralstore/actions/auth'
import AdminScreen from '../screens/Admin'
import AdminWrapper from '../screens/AdminWrapper'

const defNavSettings = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : Colors.accent,
  },
  headerTintColor: Platform.OS === 'android' ? Colors.accent : Colors.primary,
  headerTitleStyle: {
    textAlign: 'center',
    flex: 1,
  },
}

const ProductsNavigator = createStackNavigator(
  {
    ShopList: ShopListScreen,
    Checkout: CheckoutScreen,
  },
  {
    navigationOptions: {
      drawerLabel: 'Shopping List',
      drawerIcon: (drawerInfo) => {
        return (
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
            size={23}
            color={drawerInfo.tintColor}
          />
        )
      },
    },
    defaultNavigationOptions: defNavSettings,
  }
)
const DiscountNavigator = createStackNavigator(
  {
    Discount: DiscountScreen,
  },
  {
    navigationOptions: {
      drawerLabel: 'Discounts',
      drawerIcon: (drawerInfo) => {
        return (
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-cash' : 'md-cash'}
            size={23}
            color={drawerInfo.tintColor}
          />
        )
      },
    },
    defaultNavigationOptions: defNavSettings,
  }
)

const OrderNavigator = createStackNavigator(
  {
    Order: Orders,
  },
  {
    navigationOptions: {
      drawerLabel: 'Orders',
      drawerIcon: (drawerInfo) => {
        return (
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-briefcase' : 'md-briefcase'}
            size={23}
            color={drawerInfo.tintColor}
          />
        )
      },
    },
    defaultNavigationOptions: defNavSettings,
  }
)

const MainNavigator = createDrawerNavigator(
  {
    ShopNav: {
      screen: ProductsNavigator,
    },
    Orders: {
      screen: OrderNavigator,
    },
    Discounts: {
      screen: DiscountNavigator,
    },
  },
  {
    contentOptions: {
      activeTintColor:
        Platform.OS === 'android' ? Colors.primary : Colors.accent,
      labelStyle: {
        textAlign: 'center',
        // marginTop: 48,
      },
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 30 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems {...props} />
            <Button title="Logout" color={Colors.primary} onPress={() => {
              dispatch(authActions.logout());
            }
            }
            />
          </SafeAreaView>
        </View>
      )
    },
  }
)

const AuthNavigator = createStackNavigator(
  {
    Auth: Register
  },
  {
    defaultNavigationOptions: defNavSettings
  }
);

const AdminNavigator = createStackNavigator(
  {
    Admin: AdminWrapper
  },
  {
    defaultNavigationOptions: defNavSettings
  }
)

const ShopNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Admin: AdminNavigator,
  Auth: AuthNavigator,
  Shop: MainNavigator,
})
export default createAppContainer(ShopNavigator)