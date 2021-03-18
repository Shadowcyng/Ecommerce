import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,USER_SIGNOUT_SUCCESS,
    USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL 
} from '../type'

const initialState = {
    loading: false,
    userInfo : null,
    error: ''
}

export const userReducer = ( state= initialState, action ) =>{
    switch(action.type){
        case USER_SIGNIN_REQUEST:
            return{
                loading: true
            }
        case USER_SIGNIN_SUCCESS :
            return {
                loading : false,
            userInfo : action.payload,
        }
    case USER_SIGNIN_FAIL : 
    return {
        error: action.payload,
        loading: false
    }
    case  USER_SIGNOUT_SUCCESS:
        return {
            ...state, 
            userInfo : null
        }
        case USER_REGISTER_REQUEST:
            return{
                loading: true
            }
        case USER_REGISTER_SUCCESS :
            return {
                loading : false,
            userInfo : action.payload,
            
        }
    case USER_REGISTER_FAIL : 
    return {
        error: action.payload,
        loading: false
    }
    case USER_UPDATE_REQUEST:
        return{
            ...state,
            error: '',
            loading: true
        }
    case USER_UPDATE_SUCCESS :
        return {
        loading : false,
        userInfo : action.payload,
        error: '',
    }
case USER_UPDATE_FAIL : 
return {
    ...state,
    error: action.payload,
    loading: false,
}
    default : return state
    }
}