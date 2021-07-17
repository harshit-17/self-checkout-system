import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TextInput, Pressable, TouchableOpacity } from 'react-native'
import AuthCard from '../components/AuthCard'
import Input from '../components/Input'

const Register = ()=>{
    return(
        <AuthCard label={'Register'}>
            <Input label="E-Mail" type="emailAddress" />
            <Input label="Password" type="password" secureTextEntry={true} />
            <Input label="Confirm Password" type="password" secureTextEntry={true} />
            <TouchableOpacity style={styles.mybutton}>
                <Text style={styles.text}>Register</Text>
            </TouchableOpacity>
            <Text style={styles.help}>Already have an account, <Text style={{color: 'lightgreen'}}>Login</Text> here!!</Text>
        </AuthCard>
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
    text: {
        color: 'black',
        fontWeight: '900',
        fontSize: 20
    },
    help:{
        color: 'white',
        margin: 30,
        fontSize: 15,
        alignSelf: 'center'
    }
})

export default Register