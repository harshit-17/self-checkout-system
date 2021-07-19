export const adminReduceQuantity = (id)=>{
    return {
        type: "ADMIN/REDUCEQUANTITY",
        payload: id
    }
}
export const CREATE_ADMIN_PRODUCT = 'CREATE_ADMIN_PRODUCT'

export const createAdminProduct = (name, price, weight, barcode, quantity) => {
    return { type: CREATE_ADMIN_PRODUCT, id: new Date().getTime().toString(), name, price, weight, barcode, quantity }
}