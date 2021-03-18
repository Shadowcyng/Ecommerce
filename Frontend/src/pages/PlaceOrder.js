import React, { useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
//redux
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';

//material ui
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    modal: {
     display:"flex",
     justifyContent:'center',
     alignItems:'center'
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function PlaceOrder(props) {
    const classes = useStyles();


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const cartList = useSelector(state=> state.cartList)
    const user = useSelector(state=> state.user)
    const { cartItems, shipping, payment } = cartList;
    const {userInfo } = user
   
        if(!shipping.address){
             props.history.push('/shipping')
         }else{
         if(!payment.paymentMethod){
             props.history.push('/payment')
         }}
 
    const dispathch = useDispatch()

    const handlePlaceOrder = () =>{
     setOpen(true)
    }

    
    function makeid(length =10) {
       var result           = '';
       var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
       var charactersLength = characters.length;
       for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       return result;
    }
    
    console.log(makeid(5));
    const itemPrice = cartItems.reduce((a, c)=> Number(a + (Number(c.price) * Number(c.qty))) , 0);
    const shippingPrice = itemPrice > 100 ? 0 : 10;
    const taxPrice = 0.15 * itemPrice;
    const totalPrice = itemPrice + shippingPrice + taxPrice;

    return (
            <div>
                <CheckoutSteps step1 step2 step3 step4 />
                <div className='placeorder'>
            <div className='placeorder-info'>
                <div className=''>
                    <h3>
                        Shipping
                    </h3>
                    <div>
                        {cartList.shipping?.address}, { cartList.shipping?.city}  {cartList.shipping?.postalCode}, {cartList.shipping?.country}
                        
                    </div> 
                </div>
                
                <div>
                    <h3>
                        Payment
                    </h3>
                  Payment Method: {cartList.payment?.paymentMethod} 
                </div>
                <div>
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
                        cartItems.length === 0 ?
                        <div> PlaceOrder is empty </div>
                        :
                        cartItems.map(item =>(
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
                                  Qty: {item.qty}
                                </div>
                                </div>
                                <div className='cart-price'> ${item.price} </div>
                            </li>
                        ) 
                    )
                }
                 </ul>
                </div>
                </div>
                <div className='placeorder-action'>
                    <ul>
            
                        <li>
                            <h3>Order Summary</h3>
                        </li>
                        <li>
                            <div> Items </div>
                            <div> ${itemPrice}  </div>                                
                        </li>
                        <li>
                            <div> Shipping </div>
                            <div> ${shippingPrice}  </div>                                
                        </li>
                        <li>
                            <div> Tax </div>
                            <div> ${taxPrice}  </div>                                
                        </li>
                        <li>
                            <div>Order Total </div>
                            <div> ${totalPrice}  </div>                                
                        </li>
                        <li>
                        <button onClick={handlePlaceOrder} className='button primary full-width' disabled={cartItems.length === 0} >
                       Place Order
                    </button>
                        </li>
                    </ul>
                </div>
        </div>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
           <div className="order-placed">
            Your order has been placed successfully
           </div>
           <div className="order-details">
               <div className="order-item">
                   <div className="order-heading">Order Id</div>
      <div className="order-value">{makeid()}</div>
               </div>
               <div className="order-item">
                   <div className="order-heading">Name</div>
      <div className="order-value">{userInfo.name}</div>
               </div>
               <div className="order-item">
                   <div  className="order-heading">Email</div>
      <div className="order-value">{userInfo.email}</div>
               </div>
               <div className="order-item">
                   <div className="order-heading">Address</div>
      <div className="order-value">  {cartList.shipping?.address}, { cartList.shipping?.city}  {cartList.shipping?.postalCode}, {cartList.shipping?.country}</div>
               </div>
               <div className="order-item">
                   <div className="order-heading">Date</div>
      <div className="order-value">{new Date().toISOString().slice(0, 10)}</div>
               </div>
               <div className="order-item">
                   <div className="order-heading">Total</div>
      <div className="order-value">${totalPrice}</div>
               </div>
               <div className="order-item">
                   <div className="order-heading" >Cart Items</div>
      <div className="order-value">{cartItems.map(item =>(
          item.qty + "x" + item.name +" "
      ))} </div>
               </div>
           </div>
          </div>
        </Fade>
      </Modal>
            </div>
    )
}

export default PlaceOrder
