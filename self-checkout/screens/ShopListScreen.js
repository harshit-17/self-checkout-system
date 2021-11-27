import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Platform, Button, FlatList } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import BarcodeScanner from '../components/BarcodeScanner'
import ItemCard from '../components/ItemCard'
import { products } from '../components/prodcuts'


const ShopListScreen = (props) => {
  const [openScanner, setOpenScanner] = useState(false)
  const [myProducts, setMyProducts] = useState([])
  const [barVal, setBarVal] = useState("")
  const [totalWeight, setTotalWeight] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  const openScannerHandler = () => {
    setOpenScanner((oldValue) => {
      return !oldValue
    });
  }

  const changeBarVal = (text)=>{
    console.log(text)
    setBarVal(text)
    scanItems()

  }
  const scanItems = ()=>{
    let initialProducts = myProducts

    let flag1 = 0, flag2 = 0;
    initialProducts.forEach((item, index)=>{
      if(item["barcode"] === barVal && !flag1 ){
        initialProducts[index]["qty"]+= 1
        console.log(initialProducts)
        flag1 = 1
        return false;
      }
    })
    if(!flag1){
      products.map((item, index)=>{
        if(!flag2 && item.barcode === barVal){
          let temp = item;
          temp.qty = 1;
          initialProducts.push(temp)
          flag2 =1;
          return false
        }
      })
    }
    else if(!flag1 && !flag2)
    {
      alert("Barcode is incorrectly scanned");
    }
    setMyProducts(initialProducts)
    let weight = 0;
    initialProducts.map((item)=>{
      weight += (parseFloat(item.weight) * parseFloat(item.qty)  )
    })
    let price = 0;
    initialProducts.map((item)=>{
      price += (parseFloat(item.price) * parseFloat(item.qty)  )
    })
    setTotalPrice(price)
    setTotalWeight(weight)
  }
  const getWeight = ()=>{
    let weight = 0;
    myProducts.map((item)=>{
      weight += (parseFloat(item.weight) * parseFloat(item.qty)  )
    })
    return weight;
  }
  const getPrice = ()=>{
    let weight = 0;
    myProducts.map((item)=>{
      weight += (parseFloat(item.weight) * parseFloat(item.qty)  )
    })
    return price
  }
  const renderList = ({ item, index }) => {
      if (item) {
          return (
              <ItemCard pid={item.pid} sr={index + 1} pname={item.name} qty={item.qty} />
          )
      }
  }

  return (
    //will keep a list of cartItems card.
    <>
      <Button title={openScanner ? 'Close Scanner' : 'Open Scanner to add product'} onPress={openScannerHandler} />
      {openScanner && <BarcodeScanner toggleScanner = {setOpenScanner} changeBarVal = {changeBarVal}/>}
      <View style={styles.prodCont}>
        <View style={styles.header}>
            <Text style={[styles.border, { flex: 0.18, }]} >Sr. No.</Text>
            <Text style={[styles.border, { flex: 0.7, }]}>Product Name</Text>
            <Text style={[styles.border, { flex: 0.2 }]}>Qty.</Text>
            <Text style={[styles.border, { flex: 0.35 }]}>Actions</Text>
        </View>
        {myProducts.length !== 0 ? <FlatList
            data={myProducts}
            keyExtractor={(item) => item.pid.toString()}
            renderItem={renderList}
        /> : <Text>No Items Yet</Text>}
      </View>
      <View>
        <Text>Total Weight : {totalWeight}</Text> 
        <Text>Total Price : {totalPrice}</Text>
      </View>
      <Button title={"Proceed to Checkout"} />
    </>
  );
}
ShopListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Shop List',
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            iconName={Platform.OS === 'android' ? 'md-wallet' : 'ios-wallet'}
            title='ProceedCheckout'
            onPress={() => {
              navData.navigation.navigate('Checkout')
            }}
          />
        </HeaderButtons>
      )
    },
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            iconName={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
            title='Menu'
            onPress={() => {
              navData.navigation.toggleDrawer()
            }}
          />
        </HeaderButtons>
      )
    },
  }
}
const styles = StyleSheet.create({
  header: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  border: {
    borderWidth: 2,
    textAlign: 'center',
    padding: 10,
    color: 'black',
    backgroundColor: 'white',
    borderColor: '#0BE881'
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prodCont: {
    flex: 1,
    marginTop: 20,
},
})

export default ShopListScreen
