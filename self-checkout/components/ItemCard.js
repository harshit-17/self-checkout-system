import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableOpacityBase } from 'react-native'
import { Entypo } from '@expo/vector-icons'

const ItemCard = ({ sr, pname, qty }) => {
    return (
        <TouchableOpacity onPress={() => { }}>
            <View style={styles.itemCont}>
                <View style={styles.header}>
                    <Text style={styles.border} >{sr}</Text>
                    <Text style={[styles.border, { flex: 0.7, }]}>{pname}</Text>
                    <Text style={[styles.border, { flex: 0.2 }]}>{qty}</Text>
                    <View style={[styles.actions, { flex: 0.3 }]}>
                        <Entypo.Button style={styles.icon} backgroundColor="red" name="minus" />
                        <Entypo.Button style={styles.icon} backgroundColor="green" name="plus" />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    itemCont: {
    },
    header: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#0BE881'
    },
    border: {
        textAlign: 'center',
        padding: 10,
    },
    actions: {
        flexDirection: 'row',
        padding: 10,
    },
    icon: {
        fontSize: 18,
        padding: 3,
        textAlign: 'center',
    }
})

export default ItemCard