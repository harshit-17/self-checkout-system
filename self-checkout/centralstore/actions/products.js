import AdminProduct from "../../models/adminProduct";

const apiEndPoint = 'https://self-checkout-system-capstone-default-rtdb.firebaseio.com';

export const ADMIN_UPDATE_PRODUCT_QUANTITY = 'ADMIN/UPDATEPRODUCTQUANTITY';
export const ADMIN_CREATE_PRODUCT = 'ADMIN/CREATEPRODUCT';
export const ADMIN_FETCH_PRODUCTS = 'ADMIN/FETCHPRODUCTS';
export const ADMIN_DELETE_PRODUCT = 'ADMIN/DELETEPRODUCT';

export const adminUpdateQuantity = (id, operation) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${apiEndPoint}/adminProducts/${id}.json`);
            if (!response.ok) {
                throw new Error(`Cannot fetch the product with id: ${id}`);
            }
            let product = await response.json();
            if (operation === "DELETE") {
                product.pqty = Number(product.pqty) - 1;
                if(product.pqty === 0) {
                    const response = await fetch(`${apiEndPoint}/adminProducts/${id}.json`, {
                        method: 'DELETE',
                    });
        
                    if(!response.ok) {
                        throw new Error(`Something went wrong deleting the product with id: ${id}`);
                    }
        
                    dispatch({
                        type: ADMIN_DELETE_PRODUCT,
                        id,
                    });
                    return ;
                }
            } else {
                product.pqty = Number(product.pqty) + 1;
            }

            const resp = await fetch(`${apiEndPoint}/adminProducts/${id}.json`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pqty: product.pqty,
                }),
            });
            if (!resp.ok) {
                throw new Error('Cannot update the qty of item');
            }

            dispatch({
                type: ADMIN_UPDATE_PRODUCT_QUANTITY,
                updatedProduct: product,
                pid: id,
            });
        } catch (error) {
            throw error;
        }
    }
}

export const createAdminProduct = (name, price, weight, barcode, quantity) => {
    return async dispatch => {
        try {
            const response = await fetch(`${apiEndPoint}/adminProducts.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pname: name,
                    pprice: price,
                    pweight: weight,
                    pbarcode: barcode,
                    pqty: quantity
                })
            });
            
            if (!response.ok) {
                throw new Error('Product could not be created, try again!');
            }
            const resData = await response.json();
            dispatch({
                type: ADMIN_CREATE_PRODUCT,
                id: resData.name,
                name,
                price,
                weight,
                barcode,
                quantity,
            });
        } catch(error) {
            throw error;
        }
    }
}

export const fetchAdminProducts = () => {
    return async dispatch => {
        const response = await fetch(`${apiEndPoint}/adminProducts.json`);
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        const resData = await response.json();
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

        dispatch({
            type: ADMIN_FETCH_PRODUCTS,
            loadedProducts: fetchProducts,
        });
    }
}

export const deleteAdminProduct = (id) => {
    return async dispatch => {
        try {
            const response = await fetch(`${apiEndPoint}/adminProducts/${id}.json`, {
                method: 'DELETE',
            });

            if(!response.ok) {
                throw new Error(`Something went wrong deleting the product with id: ${id}`);
            }

            dispatch({
                type: ADMIN_DELETE_PRODUCT,
                id,
            });
        } catch(error) {
            throw error;
        }
    }
}