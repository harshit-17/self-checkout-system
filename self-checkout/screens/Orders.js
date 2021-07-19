import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'

const Orders = (props) => {
    return (
        <View style={styles.screen}>
            <Text>Your order comes here.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

Orders.navigationOptions = (navData) => {
    return {
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
export default Orders