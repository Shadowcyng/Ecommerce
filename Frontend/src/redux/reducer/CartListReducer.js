import {  
    ADD_TO_CART, 
    REMOVE_FROM_CART,
    CART_SAVE_SHIPPING,
    CART_SAVE_PAYMENT
} from '../type'

const initialState = {
cartItems : [],
shipping : {},
payment : {},
}
export const CartListReducer = (state=initialState, action) => {

switch(action.type){
    case ADD_TO_CART :
        const item = action.payload
        const product = state.cartItems.find(cartItem => cartItem.productId === item.productId );
        if(product){
            return {
                cartItems : state.cartItems.map(cartItem => ( cartItem.productId === product.productId ) ? item : cartItem)
            }
        }else{
            return { 
                cartItems : [...state.cartItems , item]
            }
            
        }
    case REMOVE_FROM_CART :
        const productId = action.payload;
            return {
                cartItems : state.cartItems.filter(item => item.productId !== productId)
        }
    case CART_SAVE_SHIPPING :
        const shippingAddress = action.payload;
            return {
               ...state, shipping: shippingAddress
        }
    case CART_SAVE_PAYMENT :
            return {
               ...state, payment: action.payload
        }

default : return state
}
}

