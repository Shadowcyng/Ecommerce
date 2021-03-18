import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
//redux
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/actions/productsAction/CartActions';

function Cart(props) {
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    const cartList = useSelector(state=> state.cartList)
    const { cartItems } = cartList;
    const dispathch = useDispatch()

    useEffect(() => {
        dispathch(addToCart(productId,qty))    
    }, [productId, qty])

    const removeCartHandler = (productId) =>{
        dispathch(removeFromCart(productId))
    }

    const handleQtyChange = (productId,event)  =>{
        dispathch(addToCart(productId, event.target.value))
    }

    const handleCheckout = () =>{
        props.history.push('/signin?redirect=shipping')
    }

    return (
        <div className='cart'>
            <div className='cart-list'>
                <ul className='cart-list-container'>
                    <li>
                        <h3>
                            Shopping cart 
                        </h3>
                        <div>
                            Price  
                        </div>
                    </li>
                    {
                        cartItems?.length === 0 ?
                        <div> Cart is empty </div>
                        :
                        cartItems?.map(item =>(
                            <li key={item.productId}>
                                <div className='cart-image'>
                                <img src={`/${item.image}`} alt='product' />
                                </div>
                                <div className='cart-name'>
                                    <div>
                                        <Link to={`/product/${item.productId}`} >
                                        {item.name}
                                        </Link>
                                </div>
                                <div>
                                  Qty:
                                    <select style={{marginLeft:'.5rem'}} value={item.qty} onChange={(e)=>handleQtyChange(item.productId,e)}>
                                    {[...Array(item.countInStock).keys()].map(num =>(
                                    <option key={num+1} value={num + 1}>{num + 1}</option>          //num = 1 bcoz array starts with 0 
                                ))}
                                  </select>
                                  <button  style={{marginLeft:'.5rem'}} className='button' onClick={()=>removeCartHandler(item.productId)}>Remove</button>
                                </div>
                                </div>
                                <div className='cart-price'> ${item.price} </div>
                            </li>
                        ) 
                    )
                }
                 </ul>
                </div>
                <div className='cart-action'>
                    <h3>
                        Subtotal ( {  cartItems?.reduce(( a, c )=> a + Number(c.qty), 0)} items )
                    : ${ cartItems?.reduce((a, c)=> a + (Number(c.price) * Number(c.qty)) , 0) }
                    </h3>
                    <button onClick={handleCheckout} className='button primary full-width' disabled={cartItems?.length === 0} >
                        Proceed to Checkout
                    </button>
                </div>
        </div>
    )
}

export default Cart
