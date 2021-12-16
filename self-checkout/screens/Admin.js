import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Pressable, Modal, TouchableOpacity, ScrollView, FlatList, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ItemCard from '../components/ItemCard';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as authActions from '../centralstore/actions/auth'
import { adminUpdateQuantity, fetchAdminProducts } from '../centralstore/actions/products';
import AddnewProduct from './AddnewProduct'
import axios from 'axios';
import { apiEndPoint } from '../env/googleApi';

const Admin = (props) => {
    //const setIsAdmin = props.setIsAdmin;
    const [modalVisible, setModalVisible] = useState(false);

    const initial = useSelector(state => state.adminReducer)
    const [productList, setProductList] = useState(initial);
    const [refr, setRefe] = useState(true)
    const [totalEarning, setTotalEarning] = useState(0);




    useEffect(() => {
        getTotalEarning()
        setProductList(initial);
    }, [initial, refr]);

    useEffect(() => {
        setProductList(dispatch(fetchAdminProducts()));
    }, []);

    const getTotalEarning = async()=>{
        let res = await axios.get(`${apiEndPoint}/totalPrice.json`);
        res = res.data;
        setTotalEarning(res); 
    }

    const renderList = ({ item, index }) => {
        if (item) {
            return (
                <ItemCard pid={item.pid} handleDecrease={handleDecrease} handleIncrease={handleIncrease} sr={index + 1} pname={item.pname} qty={item.pqty} />
            )
        }
    }
    const dispatch = useDispatch();

    const handleIncrease = async (pid) => {
        dispatch(adminUpdateQuantity(pid, "ADD"));
        setRefe(!refr);
    }

    const handleDecrease = async (pid) => {
        dispatch(adminUpdateQuantity(pid, "DELETE"));
        setRefe(!refr);
    }

    const handleSearch = (text) => {
        var newList = productList.filter((item) => item.pname.toLowerCase().startsWith(text.toLowerCase()))
        setProductList(newList)
    }

    const logoutHandler = () => {
        dispatch(authActions.logout());
    }

    const setModal = ()=>{
        setModalVisible(false)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Modal 
                visible = {modalVisible} 
                animationType='slide' 
                onRequestClose={()=>{setModalVisible(false)}}
            >
                <AddnewProduct setModal = {setModal} />
            </Modal>
            <View style={styles.container} >
                <Text style={{marginBottom: 10}}>Total Earning - Rs. {totalEarning}</Text>
                <Button title="Logout" onPress={logoutHandler} />
                <View style={styles.searchCont}>
                    <TextInput style={{color: 'red'}} placeholderTextColor={'black'} style={styles.textinput} onChangeText ={handleSearch} placeholder="Search..." />
                    <Ionicons name="search" size={45} style={styles.iconSearch} />
                </View>
                <View style={styles.prodCont}>
                    <View style={styles.header}>
                        <Text style={[styles.border, { flex: 0.18, }]} >Sr. No.</Text>
                        <Text style={[styles.border, { flex: 0.7, }]}>Product Name</Text>
                        <Text style={[styles.border, { flex: 0.2 }]}>Qty.</Text>
                        <Text style={[styles.border, { flex: 0.35 }]}>Actions</Text>
                    </View>
                    {productList.length !== 0 ? <FlatList
                        data={productList}
                        keyExtractor={(item) => item.pid.toString()}
                        renderItem={renderList}
                    /> : <Text>No Items Yet</Text>}
                </View>
                <View style={[styles.but, { backgroundColor: '#00bfff', alignItems: 'center' }]}>
                    <TouchableOpacity style={styles.mybutton} onPress={()=>{setModalVisible(true)}}>
                        <Text style={{ color: 'white' }}>Add new Product</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        margin: 0,
        marginTop: 10,
    },
    textinput: {
        flex: 0.85,
        marginTop: 40,
        padding: 9,
        color: 'black',
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: '#00bfff',
        color: 'black',
        height: 50
    },
    searchCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 0.1,
    },
    iconSearch: {
        flex: 0.2,
        alignSelf: 'flex-end',
        textAlign: 'center',
        color: '#00bfff'
    },
    prodCont: {
        flex: 0.8,
        marginTop: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    border: {
        borderWidth: 2,
        textAlign: 'center',
        padding: 10,
        color: 'black',
        backgroundColor: 'white',
        borderColor: '#0BE881'
    },
    mybutton: {
        backgroundColor: '#00bfff',
        borderWidth: 1,
        padding: 10,
        marginTop: 20,
        alignItems: 'center',
        width: '50%',
        alignSelf: 'center',
        borderColor: 'white'
    },
    but: {
        flex: 0.1
    }
})


export default Admin