import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'

const ItemCard2 = ({orderList, index, toggleModal})=>{

    const [totalP, setTotalP] = useState(0);
    const [totalW, setTotalW] = useState(0);
    
    useEffect(()=>{
        let p = 0;
        let w = 0;
        for(let i in orderList)
        {
            p += parseFloat(orderList[i].pprice);
            w += parseFloat(orderList[i].pweight);
        }
        //console.log(p, w);
        setTotalP(p);
        setTotalW(w);
    }, [])

    return(
        <TouchableOpacity style = {styles.header} onPress = {()=>{toggleModal(orderList)}}>
           
            <View style= {{width: "100%"}}>
                <Text>{index+1}.</Text>
                <Text style = {styles.text}>
                    Total Price = Rs.{totalP}
                </Text>
                <Text style = {styles.text}>
                    Total Weight = {totalP}g
                </Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    text: {
        color: "black",
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#5E42F2',
        width: "96%",
        margin: 8,
    }
})

export default ItemCard2