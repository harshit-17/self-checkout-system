import React, {useState} from 'react'
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import ItemCard from '../components/ItemCard'


const Admin = ()=>{

    const [products, setProducts] = useState([])



    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container} >
                <View style={styles.searchCont}>
                    <TextInput style={styles.textinput} placeholder="Search..." />
                    <Ionicons name="search" size={45} style={styles.iconSearch}/>
                </View>
                <View style={styles.prodCont}>
                    <View style={styles.header}>
                        <Text style={[styles.border, {flex: 0.18,}]} >Sr. No.</Text>
                        <Text style={[styles.border,{flex: 0.7,}]}>Product Name</Text>
                        <Text style={[styles.border, {flex: 0.2}]}>Qty.</Text>
                        <Text style={[styles.border,{flex: 0.35}]}>Actions</Text>
                    </View>
                    <ScrollView nestedScrollEnabled = {true}>
                        <ItemCard sr= '1' pname="Kurkure" qty= "100" />
                        <ItemCard sr= '1' pname="Kurkure" qty= "100" />
                        <ItemCard sr= '1' pname="Kurkure" qty= "100" />
                        <ItemCard sr= '1' pname="Kurkure" qty= "100" />
                        <ItemCard sr= '1' pname="Kurkure" qty= "100" />
                        <ItemCard sr= '1' pname="Kurkure" qty= "100" />
                        <ItemCard sr= '1' pname="Kurkure" qty= "100" />
                        <ItemCard sr= '1' pname="Kurkure" qty= "100" />
                        <ItemCard sr= '1' pname="Kurkure" qty= "100" />
                        <ItemCard sr= '1' pname="Kurkure" qty= "100" />
                        <ItemCard sr= '1' pname="Kurkure" qty= "100" />
                        <ItemCard sr= '1' pname="Kurkure" qty= "100" />
                        <ItemCard sr= '1' pname="Kurkure" qty= "100" />
                    </ScrollView>
                </View>
                <View style={[styles.but, {backgroundColor: '#00bfff', alignItems: 'center'}]}>
                    <TouchableOpacity style={styles.mybutton}>
                        <Text style ={{color: 'white'}}>Add new Product</Text>
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
        color: 'white',
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
    border:{
        borderWidth: 2,
        textAlign: 'center',
        padding: 10,
        color: 'black',
        backgroundColor: 'white',
        borderColor: '#0BE881'
    },
    mybutton:{
        backgroundColor: '#00bfff',
        borderWidth: 1,
        padding: 10,
        marginTop: 20,
        alignItems: 'center',
        width: '50%',
        alignSelf: 'center',
        borderColor: 'white'
    },
    but :{
        flex: 0.1
    }
})

export default Admin