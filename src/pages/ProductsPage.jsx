// pages/ProductsPage.jsx

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts, filterProducts, searchProducts, sortProducts } from '../features/products/productsSlice';
import ProductCard from '../components/Product/ProductCard';
import { selectFilteredProducts, selectProductsStatus } from '../features/products/productsSlice';
import '../styles/ProductsPage.css'
const ProductsPage = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectFilteredProducts);
    const status = useSelector(selectProductsStatus);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        category: '',
        minPrice: '',
        maxPrice: '',
    });

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllProducts());  // Triggers API call
        }
    }, [status, dispatch]);

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(searchProducts(searchTerm));
    };

    const handleFilter = () => {
        dispatch(filterProducts(filters));
    };

    const handleSort = (sortBy) => {
        dispatch(sortProducts(sortBy));
    };

    return (
        <div className="products-page">
            <div className="filters">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>

                <div className="filter-options">
                    <select
                        value={filters.category}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    >
                        <option value="">All Categories</option>
                        <option value="furniture">Furniture</option>
                        <option value="beauty">Beauty</option>
                        <option value="fragrances">Fragrances</option>
                        <option value="groceries">Groceries</option>
                        {/* Add more categories */}
                    </select>

                    <input
                        type="number"
                        placeholder="Min price"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    />

                    <input
                        type="number"
                        placeholder="Max price"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    />

                    <button type="button" onClick={handleFilter}>
                        Apply Filters
                    </button>
                </div>

                <div className="sort-options">
                    <button onClick={() => handleSort('price-low')}>Price: Low to High</button>
                    <button onClick={() => handleSort('price-high')}>Price: High to Low</button>
                    <button onClick={() => handleSort('rating')}>Top Rated</button>
                </div>
            </div>

            <div className="products-grid">
                {status === 'loading' && <p>Loading...</p>}
                {status === 'succeeded' && products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                {status === 'succeeded' && products.length === 0 && (
                    <p>No products found matching your criteria.</p>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;