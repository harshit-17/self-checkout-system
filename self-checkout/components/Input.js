import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TextInput } from 'react-native'

const Input = ({label, type="text", style, secureTextEntry})=>{
    return(
        <View>
            <Text style={styles.label}>{label}</Text>
            <TextInput secureTextEntry={secureTextEntry} textContentType={type} placeholderTextColor={'white'} style={[style, styles.textinput]} placeholder="Type Here" />
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