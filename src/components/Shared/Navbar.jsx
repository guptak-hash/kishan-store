// components/Shared/Navbar.jsx
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectCurrentToken } from '../../features/auth/authSlice';
import { selectCartItems } from '../../features/cart/cartSlice';
import '../../styles/Navbar.css'
import { toggleTheme } from '../../features/theme/themeSlice';

const Navbar = () => {
  const token = useSelector(selectCurrentToken);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const theme = useSelector((state) => state.theme.mode);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">Ecommerce</Link>

        <div className="navbar-links">
          <Link to="/products">Products</Link>

          {token ? (
            <>
              <Link to="/cart">
                Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})
              </Link>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
          
          {/* <button onClick={handleToggleTheme} className="theme-toggle">
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button> */}

        </div>
      </div>
    </nav>
  );



};

export default Navbar;