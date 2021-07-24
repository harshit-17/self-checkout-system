import { CREATE_ADMIN_PRODUCT } from '../actions/products'
import adminProduct from "../../models/adminProduct"

const initialStateAdmin = []

export const adminReducer = (state = initialStateAdmin, action) => {
    switch (action.type) {
        case "ADMIN/REDUCEQUANTITY":
            var newState = state
            state.every((item, index)=>{
                if(action.payload.toString() === item.pid.toString()){
                    newState[index].pqty = Number(newState[index].pqty) - 1
                    if(Number(newState[index].pqty) === 0)
                    {
                        newState.splice(index, 1)
                    }
                    return false
                }else{
                    return true;
                }
            })
            return newState

        case "ADMIN/INCREASEQUANTITY":
            var newState = state
            state.forEach((item, index)=>{
                if(action.payload.toString() === item.pid.toString()){
                    newState[index].pqty = Number(newState[index].pqty) + 1
                }
            })
            return newState

        case CREATE_ADMIN_PRODUCT:
            return [...state, new adminProduct(action.id, action.name, action.price, action.weight, action.barcode, action.quantity)]
        default:
            return state
    }
}