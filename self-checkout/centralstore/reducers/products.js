import { 
    ADMIN_CREATE_PRODUCT,
    ADMIN_UPDATE_PRODUCT_QUANTITY,
    ADMIN_FETCH_PRODUCTS,
    ADMIN_DELETE_PRODUCT
} from '../actions/products';
import AdminProduct from "../../models/adminProduct"

const initialStateAdmin = []

export const adminReducer = (state = initialStateAdmin, action) => {
    switch (action.type) {
        case ADMIN_UPDATE_PRODUCT_QUANTITY:
            let newState = state;
            for(let i=0; i < newState.length; i++){
                if (newState[i].pid === action.pid) {
                    newState[i].pqty = action.updatedProduct.pqty;
                    break;
                }
            }
            return newState;

        case ADMIN_CREATE_PRODUCT:
            return [...state, new AdminProduct(action.id, action.name, action.price, action.weight, action.barcode, action.quantity)]

        case ADMIN_FETCH_PRODUCTS:
            return action.loadedProducts

        case ADMIN_DELETE_PRODUCT:
            return state.filter((item) => item.pid !== action.id);

        default:
            return state
    }
}
