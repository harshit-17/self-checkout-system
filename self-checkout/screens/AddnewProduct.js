import React, { useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TextInput, Pressable, TouchableOpacity, ScrollView } from 'react-native'
import Input from '../components/Input'
import MyButton from '../components/MyButton'

const AddnewProduct = (props) => {
    const setIsAdmin = props.setIsAdmin;
    const [pname, setPname] = useState('')
    const [pprice, setPprice] = useState('')
    const [pweight, setPweight] = useState('')
    const [pbar, setPbar] = useState('')
    const [pqty, setPqty] = useState('0')
    const submitHandler = () => {
        setIsAdmin(true);
    }
    return (
        <ScrollView>
            <View style={styles.cont}>
                <Text style={styles.text}>Add The Product Details</Text>
                <Input value={pname} onChange={(text) => { setPname(text) }} labelStyle={styles.labelStyle} inputStyle={styles.inputStyle} label={'Product Name'} />
                <Input value={pprice} onChange={(text) => { setPprice(text) }} labelStyle={styles.labelStyle} inputStyle={styles.inputStyle} label={'Price'} />
                <Input value={pweight} onChange={(text) => { setPweight(text) }} labelStyle={styles.labelStyle} inputStyle={styles.inputStyle} label={'Weight'} />
                <Input value={pbar} onChange={(text) => { setPbar(text) }} labelStyle={styles.labelStyle} inputStyle={styles.inputStyle} label={'Bar Code'} />
                <Input value={pqty} onChange={(text) => { setPqty(text) }} keyboardType='numeric' labelStyle={styles.labelStyle} inputStyle={styles.inputStyle} label={'Quantity'} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <MyButton label={'Scan Bar Code'} buttonStyles={styles.sbutton} textStyles={styles.textStyle} />
                    <MyButton onPress={submitHandler} label={'Submit'} buttonStyles={styles.mbutton} textStyles={styles.textStyle} />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        padding: 25,
        justifyContent: 'center'
    },
    labelStyle: {
        color: 'black'
    },
    inputStyle: {
        borderColor: 'black',
        color: 'black'
    },
    text: {
        marginTop: 20,
        fontSize: 30,
        alignSelf: 'center',
        color: 'red'
    },
    mbutton: {
        backgroundColor: '#00bfff',
        flex: 0.4
    },
    textStyle: {
        color: 'white',
        fontSize: 20,
    },
    sbutton: {
        flex: 0.4,
        backgroundColor: 'black'
    }


})

export default AddnewProduct