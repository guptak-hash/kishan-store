import React from "react";
import "../styles/HomePage.css";

const products = [
  {
    id: 1,
    title: "iPhone 9",
    price: "$549",
    thumbnail: "https://dummyjson.com/image/i/products/1/thumbnail.jpg",
  },
  {
    id: 2,
    title: "Samsung Galaxy Book",
    price: "$1499",
    thumbnail: "https://dummyjson.com/image/i/products/8/thumbnail.jpg",
  },
  {
    id: 3,
    title: "Perfume Oil",
    price: "$13",
    thumbnail: "https://dummyjson.com/image/i/products/11/thumbnail.jpg",
  },
  {
    id: 4,
    title: "Casual Shirt",
    price: "$25",
    thumbnail: "https://dummyjson.com/image/i/products/35/thumbnail.jpg",
  },
];

const HomePage = () => {
  return (
    <div className="homepage">
      <section className="hero">
        <h1>Welcome to ShopEase</h1>
        <p>Discover quality products at unbeatable prices.</p>
        {/* <button className="shop-btn">Explore Now</button> */}
      </section>

      <section className="featured">
        <h2>Featured Products</h2>
        <div className="products">
          {products.map((item) => (
            <div className="product-card" key={item.id}>
              <img src={item.thumbnail} alt={item.title} />
              <h3>{item.title}</h3>
              <p className="price">{item.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
