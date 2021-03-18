import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

//Redux stuff
import { listProducts } from '../redux/actions/productsAction/ProductActions';
import { useSelector, useDispatch } from 'react-redux';
import Rating from '../components/ProductRating';
import Loading from '../components/Loading';

import { addToCart } from '../redux/actions/productsAction/CartActions';

function Home(props) {
	const productList = useSelector((state) => state.productList);
	const { products, searchInput, loading, error } = productList;
	const dispatch = useDispatch();
	useEffect(() => {
		searchInput?.length >= 0 && dispatch(listProducts(searchInput));
	}, [searchInput]);

	//Products render
	const handleCart = (e, id) => {
		e.preventDefault();
		dispatch(addToCart(id));
	};
	const productMarkup = loading ? (
		<Loading></Loading>
	) : error ? (
		<div> {error} </div>
	) : (
		products?.map((product) => (
			<li key={product._id}>
				<div className='product'>
					<Link to={`/product/${product._id}`}>
						<img className='product-image' src={product.image} alt='product' />
					</Link>
					<div className='product-details'>
						<div className='product-name'>
							<Link to={`/product/${product._id}`}>{product.name}</Link>
						</div>
						<div className='product-rating'>
							<Rating product={product} />
						</div>
						<div className='product-brand'>{product.brand}</div>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<div className='product-price'>${product.price}</div>
							{product.countInStock == 0 && (
								<div style={{ color: 'red', fontSize: '18px' }}>
									Out Of Stock
								</div>
							)}
						</div>
					</div>
				</div>
			</li>
		))
	);
	return <ul className='products'>{productMarkup}</ul>;
}

export default Home;
