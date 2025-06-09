// components/Product/ProductCard.jsx
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import { selectCurrentToken } from '../../features/auth/authSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <p>Rating: {product.rating}</p>
      
      <div className="product-actions">
        <Link to={`/products/${product.id}`}>
          <button>View Details</button>
        </Link>
        {token && (
          <button onClick={handleAddToCart}>Add to Cart</button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;