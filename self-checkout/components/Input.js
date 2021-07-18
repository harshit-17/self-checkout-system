import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TextInput } from 'react-native'

const Input = ({label, type="none", inputStyle, secureTextEntry, labelStyle, value, onChange, keyboardType})=>{
    return(
        <View>
            <Text style={[styles.label, labelStyle ]}>{label}</Text>
            <TextInput keyboardType={keyboardType} value={value} onChange = {onChange} secureTextEntry={secureTextEntry} textContentType={type} placeholderTextColor={'white'} style={[styles.textinput, inputStyle]} placeholder="Type Here" />
        </View>
    )
}

const styles = StyleSheet.create({
    label:{
        marginTop: 20 ,
        fontSize: 25,
        color: 'white',
    },
    textinput: {
        width: '100%',
        marginTop: 10,
        borderWidth: 2,
        borderColor: 'white',
        padding: 9,
        color: 'white',
    }
})

export default Input