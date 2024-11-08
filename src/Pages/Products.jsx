import React, { useState, useEffect } from 'react';
import '../Styles/Products.css';
import Spinner from '../Components/Spinner';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    setLoading(true);
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
      })
      .catch((error) => console.error('Error fetching products:', error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="products-container">
      <h2>Our Products</h2>
      {loading ? (
        <Spinner />
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.title} className="product-image" />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
