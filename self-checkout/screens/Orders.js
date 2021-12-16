import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, FlatList, Modal, RefreshControl} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import axios from 'axios';
import { apiEndPoint } from '../env/googleApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemCard2 from '../components/ItemCard2';
import ItemCard3 from '../components/ItemCard3';
import { Entypo } from '@expo/vector-icons';


const Orders = (props) => {

    const [orders, setOrders] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalList, setModalList] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [refr, setRefr] = useState(true)


    const getData = async () => {
        let userData = await AsyncStorage.getItem("userData");
        let user = JSON.parse(userData).userId;
        let res = await axios.get(`${apiEndPoint}/users/${user}/orders.json`);
        console.log(res.data);
        let list = []
        let o = res.data
        for(let i in o){
            list.push(o[i]);
        }
        
        list.reverse()
        setOrders(list)
        setRefr(!refr)
        // implement the conversion of object to array
        // setOrders(res.data)
    }


    useEffect(()=>{
        getData();
    }, [])

    const toggleModal = (value)=>{
        console.log(value)
        setModalList(value)
        setModalVisible(!modalVisible)
    }

    const renderList = ({item, index}) =>{
        if(item)
        {
            return(
                <ItemCard2 orderList = {item} index = {index} toggleModal = {toggleModal} />
            )
        }
    }

    const renderList2 = ({item, index})=>{
        if (item) {
            return (
                <ItemCard3 pid={item.pid} sr={index + 1} pname={item.pname} qty={item.pqty}/>
            )
        }
    }

    const refreshData = async()=>{
        setRefresh(true);
        await getData();
        setRefresh(false);
    }

    return (
        <View style={styles.screen}>
            <Modal
                visible = {modalVisible}
                animationType="slide"
                transparent={false}
                style ={{flex: 1}}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}
            >
                <Entypo.Button name="cross" iconStyle={styles.icon} backgroundColor="white" onPress={()=>{setModalVisible(!modalVisible)}} />
                <View style={styles.header}>
                    <Text style={[styles.border, { flex: 0.15, }]} >Sr. No.</Text>
                    <Text style={[styles.border, { flex: 0.7, }]}>Product Name</Text>
                    <Text style={[styles.border, { flex: 0.4 }]}>Qty.</Text>
                </View>
                {modalList.length !== 0 ? <FlatList
                    data={modalList}
                    keyExtractor={(item) => item.pid.toString()}
                    renderItem={renderList2}
                /> : <Text>No Items Yet</Text>}
            </Modal>
            {
                orders.length === 0 ? <Text>No orders to display.</Text> :
                <FlatList
                    refreshControl={<RefreshControl
                        refreshing = {refresh}
                        onRefresh={refreshData}
                    />}
                    data={orders}
                    renderItem={renderList}
                /> 
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    border: {
        borderWidth: 2,
        textAlign: 'center',
        padding: 10,
        color: 'black',
        backgroundColor: 'white',
        borderColor: '#0BE881'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    icon: {
        marginTop: 10,
        fontSize: 40,
        padding: 3,
        textAlign: 'center',
        color: 'black',
        flex: 1,
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