import React, { useState, useReducer, useCallback } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TextInput, Pressable, TouchableOpacity, ScrollView, Alert } from 'react-native'
import Input from '../components/Input'
import MyButton from '../components/MyButton'
import ValidationInput from '../components/ValidationInput'
import { useDispatch } from 'react-redux'
import BarcodeScanner from '../components/BarcodeScanner'
import { createAdminProduct } from '../centralstore/actions/products'
import { BarCodeScanner } from 'expo-barcode-scanner'


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'
const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        }
    }
    return state
}

const AddnewProduct = ({setModal}) => {
    //const setIsAdmin = props.setIsAdmin;
    const [openScanner, setOpenScanner] = useState(false)
    const [barVal, setBarVal] = useState('')
    const openScannerHandler = () => {
        setOpenScanner((oldValue) => {
            return !oldValue
        });
    }
    const dispatch = useDispatch();
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            pname: '',
            pprice: '',
            pweight: '',
            pbar: '',
            pqty: ''
        },
        inputValidities: {
            pname: false,
            pprice: false,
            pweight: false,
            pbar: false,
            pqty: false
        },
        formIsValid: false
    });

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            console.log(inputIdentifier, inputValidity, inputValue)
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            })
        }, [dispatchFormState])

    const submitHandler = () => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong Inputs', 'Kindly correct the form', [{ text: 'Okay!' }])
            return;
        }
        // console.log(formState)
        dispatch(createAdminProduct(formState.inputValues.pname, formState.inputValues.pprice, formState.inputValues.pweight, formState.inputValues.pbar, formState.inputValues.pqty))
        setModal();
    }

    const changeBarVal = (text)=>{
        setBarVal(text)
        inputChangeHandler("pbar", text, "true")
    }

    const barcodeHandler = ()=>{
        setBarcode(!openBarcode)
        console.log(barVal)
    }
    return (
        <ScrollView>
            <View style={styles.cont}>
                <Text style={styles.text}>Add The Product Details</Text>
                <ValidationInput
                    id="pname"
                    keyboardType='default'
                    label="Product Name"
                    required
                    autoCapitalize='words'
                    errorText="Please enter a valid name"
                    initialValue=""
                    onInputChange={inputChangeHandler}
                    labelStyle={styles.labelStyle}
                />
                <ValidationInput
                    id="pprice"
                    keyboardType='number-pad'
                    label="Price"
                    required
                    autoCapitalize="none"
                    errorText="Please enter a valid price"
                    initialValue=""
                    onInputChange={inputChangeHandler}
                    labelStyle={styles.labelStyle}
                    min={0.1}
                />

                <ValidationInput
                    id="pweight"
                    keyboardType='decimal-pad'
                    label="Weight"
                    required
                    autoCapitalize="none"
                    errorText="Please enter a valid weight"
                    initialValue=""
                    onInputChange={inputChangeHandler}
                    labelStyle={styles.labelStyle}
                    min={0.1}
                />
                <ValidationInput
                    id="pbar"
                    keyboardType='default'
                    label="Barcode"
                    required
                    autoCapitalize="none"
                    errorText="Please enter a valid barcode"
                    initialValue=""
                    onInputChange={inputChangeHandler}
                    labelStyle={styles.labelStyle}
                    value={barVal}
                />
                <ValidationInput
                    id="pqty"
                    keyboardType='number-pad'
                    label="Quantity"
                    required
                    autoCapitalize="none"
                    errorText="Please enter a valid quantity"
                    initialValue=""
                    onInputChange={inputChangeHandler}
                    labelStyle={styles.labelStyle}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <MyButton label={'Scan Bar Code'} buttonStyles={styles.sbutton} textStyles={styles.textStyle} onPress={openScannerHandler} />
                    <MyButton onPress={submitHandler} label={'Submit'} buttonStyles={styles.mbutton} textStyles={styles.textStyle} />
                </View>
                {openScanner && <BarcodeScanner changeBarVal={changeBarVal} toggleScanner={()=>{}}/>}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        padding: 25,
        justifyContent: 'center'
    },
    labelStyle: {
        color: 'black'
    },
    inputStyle: {
        borderColor: 'black',
        color: 'black'
    },
    text: {
        marginTop: 20,
        fontSize: 30,
        alignSelf: 'center',
        color: 'red'
    },
    mbutton: {
        backgroundColor: '#00bfff',
        flex: 0.4
    },
    textStyle: {
        color: 'white',
        fontSize: 20,
    },
    sbutton: {
        flex: 0.4,
        backgroundColor: 'black'
    }


})

export default AddnewProduct