// pages/CartPage.jsx

import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';
import '../styles/CartPage.css';

const CartPage = () => {
  const items = useSelector((state) => state.cart.items);
  const total = useSelector((state) => 
    state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  const dispatch = useDispatch();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything to your cart yet</p>
        <Link to="/products" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>
      
      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-image">
              <img src={item.thumbnail} alt={item.title} />
            </div>
            
            <div className="item-details">
              <h3>{item.title}</h3>
              <p>{item.brand}</p>
              <p className="price">${item.price.toFixed(2)}</p>
              
              <div className="quantity-controls">
                <button 
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                  +
                </button>
              </div>
              
              <button 
                onClick={() => dispatch(removeFromCart(item.id))}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
            
            <div className="item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        
        <button 
          onClick={() => dispatch(clearCart())} 
          className="clear-cart"
        >
          Clear Cart
        </button>
        
        <button className="checkout-btn">
          Proceed to Checkout
        </button>
        
        <Link to="/products" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default CartPage;