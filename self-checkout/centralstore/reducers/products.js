import { CREATE_ADMIN_PRODUCT } from '../actions/products'
import adminProduct from "../../models/adminProduct"

const initialStateAdmin = []

export const adminReducer = (state = initialStateAdmin, action) => {
    switch (action.type) {
        case CREATE_ADMIN_PRODUCT:
            return [...state, new adminProduct(action.id, action.name, action.price, action.weight, action.barcode, action.quantity)]
        default:
            return state
    }
}