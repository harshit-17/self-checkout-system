import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Platform, Button, FlatList } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import BarcodeScanner from '../components/BarcodeScanner'
import ItemCard from '../components/ItemCard'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { apiEndPoint } from '../env/googleApi'
import AdminProduct from '../models/adminProduct'
//import { products } from '../components/prodcuts'


const ShopListScreen = (props) => {
  const dispatch = useDispatch();
  const [openScanner, setOpenScanner] = useState(false)
  const [refr, setRefr] = useState(true)
  const [allProducts, setAllProducts] = useState([])
  const [userProducts, setUserProducts] = useState([])
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
    scanItems(text)
  }

  const getAdminData = async ()=>{
    let resData = await axios.get(`${apiEndPoint}/adminProducts.json`)
    // console.log(res.data)
    resData = resData.data
    const fetchProducts = [];
    for (const key in resData) {
        const attr = resData[key];
        fetchProducts.push(new AdminProduct(
            key,
            attr.pname,
            attr.pprice,
            attr.pweight,
            attr.pbarcode,
            attr.pqty
        ))
    };
    console.log(fetchProducts)
    setAllProducts(fetchProducts)
    // const res = dispatch(fetchAdminProducts())
    // console.log(res)
  }

  useEffect(()=>{
    getAdminData()
  }, [])
  
  const scanItems = (barVal)=>{
    let initialProducts = userProducts
    //console.log(allProducts)
    let flag1 = 0, flag2 = 0;
    initialProducts.forEach((item, index)=>{
      if(item["pbarcode"] === barVal && !flag1 ){
        initialProducts[index]["pqty"]+= 1
        console.log(initialProducts)
        flag1 = 1
        return false;
      }
    })
    if(!flag1){
      allProducts.map((item, index)=>{
        console.log("item",item.pbarcode===barVal)
        if(!flag2 && item.pbarcode === barVal){
          let temp = item;
          temp.pqty = 1;
          initialProducts.push(temp)
          flag2 =1;
          return false
        }
      })
    }
    if(flag1===0 && flag2===0)
    {
      alert("Barcode is incorrectly scanned");
    }
    else{
      setUserProducts(initialProducts)
      setBarVal("")
      setPandW()
    }
  }

  const handleDecrease = (pid)=>{
    let initialProducts = userProducts;
    for(let i in initialProducts)
    {
      if(initialProducts[i].pid === pid){
        initialProducts[i].pqty -= 1;
        if(initialProducts[i].pqty === 0)
        {
          initialProducts.splice(i,1)
        }
        break;
      }
    }
    console.log(initialProducts)
    setUserProducts(initialProducts)
    setPandW()
    // setRefr(!refr)
  }

  const handleIncrease = (pid) =>{
    let initialProducts = userProducts;
    for(let i in initialProducts)
    {
      if(initialProducts[i].pid === pid){
        initialProducts[i].pqty += 1;
        break;
      }
    }
    console.log(initialProducts)
    setUserProducts(initialProducts)
    setPandW()
    // setRefr(!refr)
  }

  const renderList = ({ item, index }) => {
      if (item) {
          return (
              <ItemCard pid={item.pid} sr={index + 1} pname={item.pname} qty={item.pqty} handleDecrease={handleDecrease} handleIncrease = {handleIncrease} />
          )
      }
  }

  const setPandW= ()=>{
    let p=0, w= 0;
    for(let i in userProducts){
      p+= userProducts[i].pprice * userProducts[i].pqty;
      w += userProducts[i].pweight * userProducts[i].pqty;
    }
    setTotalPrice(p);
    setTotalWeight(w);
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
        {userProducts.length !== 0 ? <FlatList
            data={userProducts}
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
