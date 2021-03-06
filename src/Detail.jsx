import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from './services/useFetch';
import Spinner from './Spinner';
import PageNotFound from './PageNotFound';
import { useCart } from './cartContext';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sku, setSku] = useState('');
  const { dispatch } = useCart();

  const { data: product, loading, error } = useFetch('products/' + id);
  if (loading) return <Spinner />;
  if (!product) return <PageNotFound />;
  if (error) throw error;

  return (
    <div className="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p className="price">${product.price} </p>
      <select id="size" value={sku} onChange={(e) => setSku(e.target.value)}>
        <option value="">What size?</option>
        {product.skus.map((item) => (
          <option key={item.sku} value={item.sku}>
            {item.size}
          </option>
        ))}
      </select>
      <p>
        <button
          disabled={!sku}
          onClick={() => {
            dispatch({ type: 'add', id, sku });
            navigate('/cart');
          }}
          className="btn btn-primary"
        >
          Add to Cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
};

export default Detail;
