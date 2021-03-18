import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { ProductListReducer, ProductDetailsReducer, ProductSaveReducer, ProductDeleteReducer } from './reducer/ProductListReducer';
import { CartListReducer } from './reducer/CartListReducer';
import thunk from 'redux-thunk'
import Cookie from 'js-cookie'
import { userReducer } from './reducer/UserReducer';

const reducer = combineReducers({
    productList: ProductListReducer,
    productDetails : ProductDetailsReducer,
    cartList : CartListReducer,
    user : userReducer,
    // userRegister : userRegisterReducer,
    productSave : ProductSaveReducer,
    productDelete: ProductDeleteReducer
});
    const cartItems = Cookie.getJSON('cartItems') || [];
    const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = { 
    cartList :  { cartItems: cartItems, shipping: {}, payment: {} }, 
    user: { userInfo: userInfo } 
};
const middleware = [thunk,];
const store = createStore(reducer, initialState , compose(applyMiddleware(...middleware), 
window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f));

export default store;
