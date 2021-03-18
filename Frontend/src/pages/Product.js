import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
//REDUX STUFF
import { useSelector, useDispatch } from 'react-redux'
import { detailsProduct } from '../redux/actions/productsAction/ProductActions'
import ProductRating from '../components/ProductRating';
import Loading from '../components/Loading';
function Product(props) {

    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { loading, product, error } = productDetails;
    const dispatch = useDispatch();
    useEffect(() => {
        const productId = props.match.params.id
        dispatch(detailsProduct(productId))
     
    }, [])

    const handleCart = () =>{
       props.history.push(`/cart/${props.match.params.id}?qty=${qty}`)
    }

    return (
        <Fragment>
            <div className='back-to-results'>
                <Link to = '/'>Back to results</Link>
            </div>
            { loading ? <Loading></Loading>
            : error ? <div>{error}</div> 
            :
            (
            
            <div className='details'>
                <div className='details-image'>
                    <img src={`/${product.image}`} alt='product' />
                </div>
                <div className='details-info'>
                    <ul>
                        <li>
                            <h4> {product.name} </h4>
                        </li>
                        <li>
                           <ProductRating product = {product} />
                        </li>
                        <li>
                        Price: <strong> ${product.price} </strong>
                        </li>
                        <li>
                        <div>Description: {product.description}</div>
                        </li>
                    </ul>
                </div>
                <div className='details-action'>
                    <ul>
                        <li>
                            Price: {product.price}
                        </li>
                        <li>
                            Status: {product.countInStock > 0 ?  <span>In Stock</span> : <span>Out of Stock</span>}
                        </li>
                        <li>
                            Qty: <select value={qty} onChange={(e)=>setQty(e.target.value )}>
                                {[...Array(product.countInStock).keys()].map(num =>(
                                    <option key={num+1} value={num + 1}>{num + 1}</option>          //num = 1 bcoz array starts with 0 
                                ))}
                            </select>
                        </li>
                        <li>
                            {product.countInStock > 0 &&
                            <button onClick={handleCart} className='button primary'>Add to Cart</button>
                            }
                        </li>
                    </ul>
                </div>
            </div>)
        }
        </Fragment>
    )
}

export default Product
