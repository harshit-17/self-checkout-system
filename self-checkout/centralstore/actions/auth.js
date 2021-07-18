import { AsyncStorage } from "react-native";
export const SIGNUP = 'SIGNUP'
export const SIGNIN = 'SIGNIN'
export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'

let timer;

export const authenticate = (userId, token, expiryDate) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryDate))
        dispatch({ type: AUTHENTICATE, userId: userId, token: token })

    }
}


const setLogoutTimer = expiryDate => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout())
        }, expiryDate)
    }
}

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer) // would clear all the timers
    }
}


export const logout = () => {
    // return async dispatch => {
    clearLogoutTimer();
    AsyncStorage.removeItem('userData')
    return { type: LOGOUT }
    // }
}


export const signup = (email, password) => {

    return async (dispatch) => {
        console.log('email:', email)
        console.log('password', password)
        const resp = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCAL-nAcEXivw5gUtYWugfngRhH70sQNlY', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        })
        console.log(resp)
        if (!resp.ok) {
            const errorResData = await resp.json();
            const errorId = errorResData.error.message
            let errMsg = 'Something went wrong!'
            if (errorId === 'EMAIL_EXISTS') {
                errMsg = 'This email exists'
            } else if (errorId === 'INVALID_PASSWORD') {
                errMsg = 'This password is not valid'
            }
            throw new Error(errMsg);
        }
        const resData = await resp.json();
        console.log(resData);
        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000))
        const expiryDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken, resData.localId, expiryDate)
    };
}

export const signin = (email, password) => {

    return async (dispatch) => {
        console.log('email:', email)
        console.log('password', password)
        const resp = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCAL-nAcEXivw5gUtYWugfngRhH70sQNlY', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        })
        console.log(resp)
        if (!resp.ok) {
            const errorResData = await resp.json();
            const errorId = errorResData.error.message
            let errMsg = 'Something went wrong!'
            if (errorId === 'EMAIL_NOT_FOUND') {
                errMsg = 'This email does not exist'
            } else if (errorId === 'INVALID_PASSWORD') {
                errMsg = 'This password is not valid'
            }
            throw new Error(errMsg);
        }

        const resData = await resp.json();
        console.log(resData);
        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000))
        const expiryDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken, resData.localId, expiryDate)
    };
}

const saveDataToStorage = (token, userId, expiryDate) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userId: userId,
            expiryDate: expiryDate.toISOString(),
        })
    )
}