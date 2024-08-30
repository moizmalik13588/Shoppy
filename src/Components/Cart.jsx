import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, removeSingleItem, selectCartItems, selectCartTotalPrice } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);

  const handleRemoveItem = (id, uniqueId) => {
    dispatch(removeSingleItem({ id, uniqueId }));
  };

  return (
    <div className='container my-5'>
      {cartItems.length === 0 ? (
        <div className='text-center'>
          <h1>Your Cart is Empty</h1>
          <Link to="/" className="btn btn-warning">Continue Shopping...</Link>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.uniqueId} className='card mb-3 bg-dark text-light'>
              <div className='row g-0'>
                <div className='col-md-4 d-flex justify-content-center align-items-center'>
                  <img
                    src={item.imgSrc}
                    className='img-fluid p-4'
                    alt={item.title}
                  />
                </div>
                <div className='col-md-8 d-flex justify-content-between align-items-center'>
                  <div className="card-body text-light text-center text-md-start">
                    <h5 className='card-title'>{item.title}</h5>
                    <p className='card-text'>{item.description}</p>
                    <div className='btn-group'>
                      <button className='btn btn-primary my-1'>PKR {item.price}</button>
                      <button className="btn btn-warning my-1">Buy Now</button>
                      <button
                        onClick={() => handleRemoveItem(item.id, item.uniqueId)}
                        className="btn btn-danger my-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className='text-center mt-4'>
            <h3>Total Price: PKR {totalPrice}</h3>
            <button onClick={() => dispatch(clearCart())} className="btn btn-warning mt-3 mb-3">
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
