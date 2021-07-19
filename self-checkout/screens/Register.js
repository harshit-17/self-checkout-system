import React, { useState, useEffect, useReducer, useCallback } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Button, ScrollView, Alert, ActivityIndicator } from 'react-native'
import AuthCard from '../components/AuthCard'
import ValidationInput from '../components/ValidationInput'
import * as authActions from '../centralstore/actions/auth'
import { useDispatch } from 'react-redux'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

const Register = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const dispatch = useDispatch();
    const [isSignup, setIsSignUp] = useState(true)
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: '',
            redoPassword: ''
        },
        inputValidities: {
            email: false,
            password: false,
            redoPassword: false
        },
        formIsValid: false
    });

    const authHandler = async () => {
        console.log('hello', formState.inputValues.redoPassword)
        if (isSignup) {

            // if (formState.inputValues.password !== formState.inputValues.redoPassword) {
            //     Alert.alert("Passwords Don't Match", "Try Again", [
            //         { text: 'Okay' }
            //     ])
            //     return;
            // }
            setIsError(null);
            setIsLoading(true)
            try {
                await dispatch(
                    authActions.signup(
                        formState.inputValues.email,
                        formState.inputValues.password
                    )
                );
                props.navigation.navigate('Shop')
            } catch (err) {
                setIsError(err.message)
                setIsLoading(false)
            }
        }
        else {
            setIsError(null);
            setIsLoading(true);
            try {
                await dispatch(
                    authActions.signin(
                        formState.inputValues.email, formState.inputValues.password)
                )
                props.navigation.navigate('Shop')

            } catch (err) {
                setIsError(err.message)
                setIsLoading(false)

            }
        }
    };


    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );


    useEffect(() => {
        if (isError) {
            Alert.alert('An error occurred', isError, [{ text: 'Okay!' }])
        }
    }, [isError])

    return (
        <AuthCard label={`${isSignup ? 'Register' : 'Login'}`}>
            <ScrollView>
                <ValidationInput
                    id="email"
                    label="E-Mail"
                    keyboardType="email-address"
                    required
                    email
                    autoCapitalize="none"
                    errorText="Please enter a valid email address."
                    onInputChange={inputChangeHandler}
                    initialValue=""
                />
                <ValidationInput
                    id="password"
                    label="Password"
                    keyboardType="default"
                    secureTextEntry
                    type="password"
                    required
                    minLength={5}
                    autoCapitalize="none"
                    errorText="Please enter a valid password."
                    onInputChange={inputChangeHandler}
                    initialValue=""
                />
                {
                    (isSignup) &&
                    <ValidationInput
                        id="password"
                        type="password"
                        label="Confirm Password"
                        keyboardType="default"
                        secureTextEntry
                        required
                        minLength={5}
                        autoCapitalize="none"
                        errorText="Please enter a matching password."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                    />
                }
                {isLoading ? (<ActivityIndicator size='small' color='yellow' />) :
                    (<TouchableOpacity onPress={authHandler}
                        style={styles.mybutton}>
                        <Text style={styles.text}>
                            {isSignup && 'Register'}
                            {!isSignup && 'Login'}
                        </Text>
                    </TouchableOpacity>)
                }
                <Text style={styles.help}>
                    {isSignup && 'Already have an account'}
                    {!isSignup && 'Do not have an account'}
                </Text>
                <Button title={`Switch to ${isSignup ? 'Login' : 'Sign up'}`} color='yellow' onPress={() => {
                    setIsSignUp(prevState => !prevState);
                }} />
            </ScrollView>
        </AuthCard >
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
    }
})

export default Register