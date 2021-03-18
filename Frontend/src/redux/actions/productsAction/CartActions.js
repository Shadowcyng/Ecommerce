import axios from 'axios'
import { ADD_TO_CART, REMOVE_FROM_CART, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from '../../type'
import Cookie from 'js-cookie'

export const addToCart = (productId, qty ) => async (dispatch, getState) =>{
    try{
        const { data } = await axios.get(`/products/product/${productId}`);
        dispatch({
            type: ADD_TO_CART,
            payload : {
                productId: data._id,
                name : data.name,
                image: data.image,
                price: data.price,
                countInStock : data.countInStock,
                qty : qty 
            }
        })
        const{ cartList : { cartItems } } = getState() ;
        Cookie.set('cartItems', JSON.stringify(cartItems)); 
    }
    catch(error){
        console.log(error.message)
    }
}

export const removeFromCart = (productId) => async (dispatch, getState) =>{
    try {
        dispatch({
            type: REMOVE_FROM_CART,
            payload: productId
        })
        const{ cartList : { cartItems } } = getState() ;
        Cookie.set('cartItems', JSON.stringify(cartItems)); 
    } catch (error) {
        console.log(error.message)
    }
}
export const saveShipping = (data) => (dispatch, getState) =>{
    try {
        dispatch({
            type: CART_SAVE_SHIPPING,
            payload: data
        })
    } catch (error) {
        console.log(error.message)
    }
}
export const savePayment = (data) => (dispatch) =>{
    try {
        dispatch({
            type: CART_SAVE_PAYMENT,
            payload: data
        })
    } catch (error) {
        console.log(error.message)
    }
}

