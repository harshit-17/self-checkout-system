import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const AuthCard = ({ children, label }) => {
    return (
        <View style={styles.cardConatiner} >
            <View style={styles.headingCont}>
                <Text style={styles.heading} >{label}</Text>
            </View>
            <View style={styles.card}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardConatiner: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: '#5E42F2',
        flex: 0.6,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        shadowColor: 'grey',
        padding: 30,
    },
    heading: {
        fontSize: 70,
        marginBottom: 30,
    },
    headingCont: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default AuthCard