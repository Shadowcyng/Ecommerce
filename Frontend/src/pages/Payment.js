import React, {  useState } from 'react'

//REDUX STUFF
import { useDispatch, useSelector } from 'react-redux'
import { savePayment } from '../redux/actions/productsAction/CartActions'
import CheckoutSteps from '../components/CheckoutSteps'


const Payment = (props) => {
    const [paymentMethod, setPaymentMethod] = useState('') 
    const dispatch = useDispatch();

    const cartList = useSelector(state => state.cartList)
    const { shipping } = cartList;
    if(!shipping.address){
        props.history.push('/shipping')
    } 

    const handleSubmit = (event) =>{
        event.preventDefault()
        dispatch(savePayment({paymentMethod:paymentMethod}))
        props.history.push('/placeOrder')
    }
    return (
        <div style={{minHeight: '86vh'}}>
             <CheckoutSteps step1 step2 step3 />
             <div className='form'>
            <form onSubmit={handleSubmit} >
                <ul className='form-container'>
                    <li>
                        <h2>Payment</h2>
                    </li>
                    <li>
                        <div>
                        <input type='radio' name='paymentMethod' id='paymentMethod' value='paypal' onChange={(e)=> setPaymentMethod(e.target.value)} />
                        <label htmlFor='paypal'> Paypal </label>
                        </div> 
                        <div>
                        <input type='radio' name='paymentMethod' id='paymentMethod' value='UPI' onChange={(e)=> setPaymentMethod(e.target.value)} />
                        <label htmlFor='paypal'> UPI </label>
                        </div> 
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

export default Payment
