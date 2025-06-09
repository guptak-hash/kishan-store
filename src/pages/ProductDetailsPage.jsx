// pages/ProductDetailsPage.jsx

import { useEffect,useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '../api/productsAPI';
import { addToCart } from '../features/cart/cartSlice';
import { selectCurrentToken } from '../features/auth/authSlice';
import '../styles/ProductDetailsPage.css';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectCurrentToken);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await fetchProductDetails(id);
        setProduct(productData);
      } catch (err) {
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!token) {
      navigate('/login');
      return;
    }
    dispatch(addToCart(product));
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="not-found">Product not found</div>;

  return (
    <div className="product-details-container">
      <button onClick={() => navigate(-1)} className="back-button">
        &larr; Back to Products
      </button>
      
      <div className="product-details">
        <div className="product-gallery">
          <img src={product.thumbnail} alt={product.title} className="main-image" />
          <div className="thumbnail-grid">
            {product.images.map((img, index) => (
              <img key={index} src={img} alt={`${product.title} ${index}`} />
            ))}
          </div>
        </div>
        
        <div className="product-info">
          <h1>{product.title}</h1>
          <div className="rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < Math.floor(product.rating) ? 'filled' : ''}>
                ★
              </span>
            ))}
            <span>({product.rating})</span>
          </div>
          
          <div className="price-container">
            <span className="price">${product.price}</span>
            {product.discountPercentage && (
              <span className="discount">
                {Math.round(product.discountPercentage)}% off
              </span>
            )}
          </div>
          
          <p className="description">{product.description}</p>
          
          <div className="specs">
            <h3>Specifications</h3>
            <ul>
              <li><strong>Brand:</strong> {product.brand}</li>
              <li><strong>Category:</strong> {product.category}</li>
              <li><strong>Stock:</strong> {product.stock} available</li>
            </ul>
          </div>
          
          <button onClick={handleAddToCart} className="add-to-cart-btn">
            Add to Cart
          </button>
        </div>
      </div>
      
      <div className="reviews-section">
        <h2>Customer Reviews</h2>
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index} className="review">
              <div className="review-header">
                <span className="review-author">{review.user}</span>
                <span className="review-rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < review.rating ? 'filled' : ''}>★</span>
                  ))}
                </span>
              </div>
              <p className="review-text">{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;