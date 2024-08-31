import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Products } from '../data';
import { addToCart, selectCartItems } from '../redux/cartSlice';

const Product = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const [message, setMessage] = useState('');

  const handleAddToCart = (item) => {
    const itemInCart = cartItems.find(cartItem => cartItem.id === item.id);

    if (itemInCart) {
      setMessage("Item already added to the cart!!!");
      setTimeout(() => setMessage(''), 3000); 
    } else {
      const uniqueId = '_' + Math.random().toString(36).substr(2, 9);
      dispatch(addToCart({ ...item, uniqueId}));
      setMessage("Item added to the cart!!!");
      setTimeout(() => setMessage(''), 3000);  
    }
  };

  const filteredProducts = category
    ? Products.filter(product => product.category.toLowerCase() === category.toLowerCase())
    : Products;

  return (
    <div className="container my-3">
      {message && <div className="alert alert-info text-center sticky-top">{message}</div>}
      <div className="row">
        {filteredProducts.map((item, index) => (
          <div key={`${item.id}-${index}`} className='col-md-6 col-lg-4 mb-5'>
            <div className='card bg-dark' style={{ width: '18rem' }}>
              <div className='p-3 d-flex justify-content-center align-items-center'>
                <img src={item.imgSrc} className='card-img-top' alt={item.title} style={{ width: '200px', height: '200px', borderRadius: '10px' }} />
              </div>
              <div className='card-body text-light text-center'>
                <h5 className='card-title'>{item.title}</h5>
                <p className='card-text'>{item.description}</p>
                <button className="btn btn-primary price">PKR {item.price}</button>
                <button onClick={() => handleAddToCart(item)} className="btn btn-warning mx-1 blue">Add To Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Product;
