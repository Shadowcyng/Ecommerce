import React, { Fragment, useEffect, useState } from 'react'
//REDUX STUFF
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../components/Loading'
import { saveProduct, listProducts, deleteProduct } from '../redux/actions/productsAction/ProductActions'
import Product from './Product'

const Products = (props) => {

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [brand, setBrand] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [formVisible, setFormVisible] =useState(false)
    

    
    const productSave = useSelector(state=> state.productSave)
    const { loading: loadingSave , success: successSave , error: errorSave } = productSave
    const productDelete = useSelector(state=> state.productDelete)
    const {  success: successDelete  } = productDelete

    const productList = useSelector(state=> state.productList)
    const { loading, products, error  } = productList    
    const dispatch = useDispatch();

    useEffect(() => {
        if(successSave ){
        setFormVisible(false)
        }
        dispatch(listProducts())
    }, [successSave, successDelete])
   
    const handleSubmit = (event) =>{
        event.preventDefault()
        dispatch(saveProduct({
            _id:id, name, price,  image, brand, category, countInStock, description
        })
        )}
    const handleDelete = (productId) =>{
        dispatch(deleteProduct(productId))
    }
   

    const openForm = (product) =>{
        setFormVisible(true)
        setId(product._id)
        setName(product.name)
        setBrand(product.brand)
        setPrice(product.price)
        setCategory(product.category)
        setImage(product.image)
        setDescription(product.description)
        setCountInStock(product.countInStock)
         }


    const CreateProductForm = formVisible && 
        (
            <div className='form'>
            <form onSubmit={handleSubmit} >
                <ul className='form-container'>
                    <li>
                        <h2>Create Product</h2>
                    </li>
                    {loadingSave &&  <li> <Loading></Loading></li>} 
                    {errorSave && <li> <div>{error}</div></li>} 
                    <li>
                        <label htmlFor='name'>Name</label>
                        <input value={name} type='text' name='name' id='name' onChange={(e)=> setName(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='price'>Price</label>
                        <input type='number' value={price} step="0.01" name='price' id='price' onChange={(e)=> setPrice(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='image'>Image</label>
                        <input type='text' value={image} name='image' id='image' onChange={(e)=> setImage(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='brand'>Brand</label>
                        <input type='text' value={brand} name='brand' id='brand' onChange={(e)=> setBrand(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='category'>Category</label>
                        <input type='text' value={category} name='category' id='category' onChange={(e)=> setCategory(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='countInStock'>Count In Stock</label>
                        <input type='number' value={countInStock} name='countInStock' id='countInStock' onChange={(e)=> setCountInStock(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='description'>Description</label>
                        <textarea  name='description'value={description } id='description' onChange={(e)=> setDescription(e.target.value)} />
                    </li>
                    <li>
                        <button type='submit' className='button primary'>
                            {id ? 'Update' : 'Create'}
                        </button>
                    </li>
                    <li>
                        <button type='button'  className='button secondary' onClick={()=> setFormVisible(false)}>Back</button>
                    </li>
                </ul>
            </form>
        </div>
    )
    return (
        <Fragment>
        {loading ? <Loading /> : 
            <div className='content content-margined'>
                <div className='product-header'>
                    <h3>Products</h3>
              { !formVisible  && <button className='button primary' onClick={()=> openForm({})}>Create Product </button>}
                </div>
                    {CreateProductForm}
                <div className='product-list'>  
                    <table className='table'>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Description</th>
                              <th>Action</th>
                        </tr>
                        </thead> 
                        <tbody>
                        {products?.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td className="desc">{product.description}</td>
                            <td style={{textAlign:'center'}}>
                                 <button style={{marginRight: '1rem', marginBottom: '1rem'}}  className='button' onClick={()=> openForm(product)}> Update </button>
                                <button style={{marginRight: '1rem'}} className='button' onClick={()=>handleDelete(product._id)}> Delete </button>
                            </td>
                        </tr>                           

                        ))}
                        </tbody>
                    </table>
                </div>
                </div>
}
        </Fragment>
    )
}

export default Products 
