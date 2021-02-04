import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from './services/useFetch';
import Spinner from './Spinner';
import PageNotFound from './PageNotFound';

const Detail = (props) => {
  const { id } = useParams();
  const skuRef = useRef();
  const navigate = useNavigate();

  const { data: product, loading, error } = useFetch('products/' + id);
  if (loading) return <Spinner />;
  if (!product) return <PageNotFound />;
  if (error) throw error;

  return (
    <div className="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p className="price">${product.price} </p>
      <select id="size" ref={skuRef}>
        <option value="">What size?</option>
        {product.skus.map((item) => (
          <option key={item.sku} value={item.sku}>
            {item.size}
          </option>
        ))}
      </select>
      <p>
        <button
          onClick={() => {
            const sku = skuRef.current.value;
            if (!sku) return alert('Select size');
            props.addToCart(id, sku);
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
