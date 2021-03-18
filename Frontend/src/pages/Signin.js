import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
//REDUX STUFF
import { useSelector, useDispatch } from 'react-redux'
import { signin } from '../redux/actions/userActions/UserAction'
import CheckoutSteps from '../components/CheckoutSteps'
import Loading from '../components/Loading'

const Signin = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const user = useSelector(state=> state.user)
    const dispatch = useDispatch();
    const redirectTo = props.location.search ? props.location.search.split("=")[1]: '/'   //shipping or home page
    const { loading, userInfo, error } = user
    
    useEffect(() => {
        if(userInfo){
            props.history.push(redirectTo)
        }
    }, [userInfo])
    
    const handleSubmit = (event) =>{
        event.preventDefault()
        dispatch(signin(email, password))
    }
    return  (
        <div style={{minHeight: '88vh'}}>
            {(redirectTo !== '/') &&  <CheckoutSteps step1 /> }
           
            <div className='form'>
            <form onSubmit={handleSubmit} >
                <ul className='form-container'>
                    <li>
                        <h2>Sign-In</h2>
                    </li>
                   { loading &&  <li> <div style={{color:'#000'}}>Loading...</div></li> } 
                    <li>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' id='email' onChange={(e)=> setEmail(e.target.value)} required/>
                    </li>
                    <li>
                        <label htmlFor='password'>Password</label>
                        <input type='password' name='password' id='password' onChange={(e)=> setPassword(e.target.value)} required/>
                    </li>
                    <li>
                        <button type='submit' className='button primary'>Submit</button>
                    </li>
                    { error && <li> <div style={{color: 'red', textAlign:'center'}}>Invalid Username/Password</div></li> } 

                    <li className='text-center'>
                        New to amazona
                    </li>
                    <li>
                        <Link to={redirectTo === '/' ? 'register' : `register?redirect=${redirectTo}`} className='button secondary text-center'>Create your amazona account</Link>
                    </li>
                </ul>
            </form>
        </div>

        </div>
    )
}

export default Signin
