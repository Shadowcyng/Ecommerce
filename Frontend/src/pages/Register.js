import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
//REDUX STUFF
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../redux/actions/userActions/UserAction'
import Loading from '../components/Loading'

const Register = (props) => {

    const [name, setName] = useState('') 
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const user = useSelector(state=> state.user)
    const dispatch = useDispatch();

    const { loading, userInfo, error} = user
    const redirectTo = props.location.search ? props.location.search.split("=")[1]: '/'   //shipping or home page

    useEffect(() => {
        if(userInfo){
            props.history.push(redirectTo)
        }
    }, [userInfo])
    
    const handleSubmit = (event) =>{
        event.preventDefault()
        dispatch(register(email, password, name, confirmPassword))
    }
    return (
        <div style={{minHeight: '88vh'}}>
        <div className='form'>
            <form onSubmit={handleSubmit} >
                <ul className='form-container'>
                    <li>
                        <h2>Create Account</h2>
                    </li>
                     { loading && <li><Loading></Loading></li> }
                    <li>
                        <label htmlFor='name'>Name</label>
                        <input type='name' name='name' id='name' value={name} onChange={(e)=> setName(e.target.value)} required/>
                    </li>
                    <li>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' id='email' value={email} onChange={(e)=> setEmail(e.target.value)} required/>
                    </li>
                    <li>
                        <label htmlFor='password'>Password</label>
                        <input type='password' name='password' id='password' value={password} onChange={(e)=> setPassword(e.target.value)} required/>
                    </li>
                    <li>
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input type='password' name='confirmPassword' id='confirmPassword' value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} required/>
                    </li>
                    <li>
                        <button type='submit' className='button primary'>Submit</button>
                    </li>
                    
                    { error && <li> <div style={{color: 'red', textAlign:'center'}}>Invalid User Data</div></li> } 

                    <li className='text-center'> Already have an account? </li>
                    <li>
                      <Link to={redirectTo === '/' ? 'signin' : `register?redirect=${redirectTo}`} className='button secondary text-center'>Sign-in</Link>
                    </li>
                </ul>
            </form>
        </div>
        </div>
    )
}

export default Register
