import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_SIGNOUT_SUCCESS,
    USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL
} from '../../type'
import axios from 'axios'
import Cookie from 'js-cookie'

export const signin = (email, password) => async (dispatch) =>{
    dispatch({ type : USER_SIGNIN_REQUEST, payload:  { email, password } })
    try{
        const { data } = await axios.post('/users/signin', {email, password});
        dispatch({ 
            type: USER_SIGNIN_SUCCESS, 
            payload: data })
        Cookie.set( 'userInfo', JSON.stringify(data) ) 
    } catch(error){
        dispatch( { type: USER_SIGNIN_FAIL, payload: error.message} );
    }
}
export const register = (email, password, name, confirmPassword) => async (dispatch) =>{
    dispatch({ type : USER_REGISTER_REQUEST})
    try{
        const { data } = await axios.post('/users/register', {email, password, name, confirmPassword});
        dispatch({ 
            type: USER_REGISTER_SUCCESS, 
            payload: data })
        Cookie.set('userInfo', JSON.stringify(data)) 
    } catch(error){
        dispatch({ type: USER_REGISTER_FAIL, payload: error.message});
    }
}

export const updateUser = (user,id, token) => async (dispatch, getState) => {
    dispatch( { type: USER_UPDATE_REQUEST } )   
    try{
        const userId = id;
        const { data } = await axios.put(`/users/${userId}`,  user ,{headers: {
            'Authorization' : `Bearer ${token}`
        }
    });
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data })
        Cookie.remove('userInfo')
        Cookie.set('userInfo', JSON.stringify(data)) 
    }catch(error){
        dispatch({ type: USER_UPDATE_FAIL, payload: error.message })
    }
    }


export const signoutUser = () => async (dispatch, getState) =>{
    try{
        dispatch({ type : USER_SIGNOUT_SUCCESS })
        Cookie.remove('userInfo')
        
    } catch(error){
      console.log('error', error) 
    }
}