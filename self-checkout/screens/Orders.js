import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import axios from 'axios';
import { apiEndPoint } from '../env/googleApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Orders = (props) => {

    const [orders, setOrders] = useState([])



    const getData = async () => {
        let userData = await AsyncStorage.getItem("userData");
        let user = JSON.parse(userData).userId;
        let res = await axios.get(`${apiEndPoint}/users/${user}/orders.json`);

        // implement the conversion of object to array
        // setOrders(res.data)
    }


    useEffect(()=>{
        getData();
    }, [])


    return (
        <View style={styles.screen}>
            {
                // orders.length === 0 ? <Text>No orders to display.</Text> :
                // <FlatList
                //     data={orders}
                //     keyExtractor={(item) => item.pid.toString()}
                //     renderItem={renderList}
                // /> 
            }
            
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