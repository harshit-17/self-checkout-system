import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TextInput, Pressable, TouchableOpacity, ScrollView, Button } from 'react-native'
import AuthCard from '../components/AuthCard'
import Input from '../components/Input'
// import { useDispatch } from 'react-redux'
const Login = () => {

    return (
        <AuthCard label={'Login'}>
            <ScrollView>
                <Input label="E-Mail" type="emailAddress" />
                <Input label="Password" type="password" secureTextEntry={true} />
                <TouchableOpacity style={styles.mybutton}>
                    <Text style={styles.text}>Login</Text>
                </TouchableOpacity>
                <Text style={styles.help}>Do not have an account, </Text>
                <View style={styles.btn}>
                    <Button title="Register Here" color='yellow' onPress={() => { }} />
                </View>
            </ScrollView>
        </AuthCard>
    )
}

const styles = StyleSheet.create({
    mybutton: {
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
    help: {
        color: 'white',
        margin: 30,
        fontSize: 15,
        alignSelf: 'center'
    },
    btn: {

    }
})

export default Login