import React, { useState, Fragment, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import {  updateUser, signoutUser } from '../redux/actions/userActions/UserAction'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Loading from '../components/Loading';
import { red } from '@material-ui/core/colors';

function Profile(props) {
    
    const user = useSelector(state=> state.user)
    const dispatch = useDispatch();
    const { loading, userInfo, error} = user

    const [open, setOpen] = useState(false) 
    const [name, setName] = useState('') 
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('')
    
        if(userInfo === null){
            props.history.push('/')
        }
    
    const handleSubmit = (event) =>{
        event.preventDefault();
        const id = props.match.params.id
        const userData = {
            name, email, password
        }
        dispatch(updateUser(userData ,id, userInfo.token));

        (error =='') && setOpen(true)
        
    }
    const handleClose = () =>{
        setOpen(false)
    }
    const handleSignout = (event) =>{
        event.preventDefault();
        dispatch(signoutUser())
     }
    useEffect(() => {
        setName(userInfo.name)
        setEmail(userInfo.email)
    }, [])
    return (
        <div style={{minHeight: '88vh'}} >
        <Snackbar style={{marginBottom:'4rem'}} open={open} autoHideDuration={4000} onClose={handleClose}>
        <MuiAlert  elevation={10}   variant="filled" onClose={handleClose} severity="success">
         User has been Updated 
        </MuiAlert>
        </Snackbar>
    
        <div className='form'>
            <form onSubmit={handleSubmit} >
                <ul className='form-container'>
                    <li>
                        <h2>Update Profile</h2>
                    </li>
                    
                     { error && <li><div>{error.message}</div></li>  } 
                    <li>
                        <label htmlFor='name'>Name</label>
                        <input type='name' name='name' id='name' value={name} onChange={(e)=> setName(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' id='email' value={email} onChange={(e)=> setEmail(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='password'>Password</label>
                        <input type='password' name='password' id='password' placeholder='*********' value={password} onChange={(e)=> setPassword(e.target.value)} />
                    </li>
                    <li>
                        <button disabled={!name && !email && ! password} type='submit' className='button primary'>Update</button>
                    </li>
                    <li>
                        <button onClick={handleSignout}  type='submit' className='button secondary'>Logout</button>
                        { loading && <li style={{color: 'green', textAlign: 'center'}}><div>Loading...</div></li> }
                    </li>
                    {error == null || error == '' ? null : <li><div style={{color: 'red', textAlign:'center'}}>Something went wrong. Try Again!</div></li>}
                </ul>
            </form>
        </div>
        </div>
    )
    
    }

export default Profile
