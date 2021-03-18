import React, {  useState } from 'react'

//REDUX STUFF
import { useDispatch } from 'react-redux'
import { saveShipping } from '../redux/actions/productsAction/CartActions'
import CheckoutSteps from '../components/CheckoutSteps'


const Shipping = (props) => {

    const [address, setAddress] = useState('') 
    const [city, setCity] = useState('') 
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')

    const dispatch = useDispatch();

  

    const handleSubmit = (event) =>{
        event.preventDefault()
        dispatch(saveShipping({address, city, postalCode, country}))
        props.history.push('/payment')
    }
    return (
        <div  style={{minHeight: '86vh'}}>
             <CheckoutSteps step1 step2 />
             <div className='form'>
            <form onSubmit={handleSubmit} >
                <ul className='form-container'>
                    <li>
                        <h2>Shipping</h2>
   
                        <label htmlFor='address'>Address</label>
                        <input type='address' name='address' id='address' value={address} onChange={(e)=> setAddress(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='city'>City</label>
                        <input type='city' name='city' id='city' value={city} onChange={(e)=> setCity(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='postalCode'>Postal Code</label>
                        <input type='postalCode' name='postalCode'  id='postalCode' value={postalCode} onChange={(e)=> setPostalCode(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='country'>Country</label>
                        <input type='country' name='country'  id='country' value={country} onChange={(e)=> setCountry(e.target.value)} />
                    </li>
                   
                    <li>
                        <button type='submit' className='button primary'>Continue</button>
                    </li>
            
                </ul>
            </form>
        </div>
        </div>
    )
}

export default Shipping
