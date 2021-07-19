import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TextInput, Pressable, TouchableOpacity } from 'react-native'

const MyButton = ({label, buttonStyles, textStyles, onPress})=>{
    return(
        <TouchableOpacity onPress = {onPress} style={[styles.mybutton, buttonStyles]}>
            <Text style={[styles.text, textStyles]}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mybutton:{
        backgroundColor: 'white',
        padding: 10,
        marginTop: 20,
        alignItems: 'center',
        fontWeight: "800",
        width: '50%',
        alignSelf: 'center'
    },
})

export default MyButton