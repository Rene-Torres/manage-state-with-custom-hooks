import React, { useState, useEffect } from 'react';
import './App.css';
import Footer from './Footer';
import Header from './Header';
import Products from './Products';
import Detail from './Detail';
import Cart from './Cart';

import { Routes, Route } from 'react-router-dom';

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) ?? [];
    } catch {
      console.error('The cart could not be parsed');
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart), [cart]);
  });

  function addToCart(id, sku) {
    setCart((items) => {
      const itemInCart = items.find((item) => item.sku === sku);
      if (itemInCart) {
        return items.map((item) =>
          item.sku === sku ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...items, { id, sku, quantity: 1 }];
      }
    });
  }

  function updateQuantity(sku, quantity) {
    setCart((items) => {
      return quantity === 0
        ? items.filter((item) => item.sku !== sku)
        : items.map((item) =>
            item.sku === sku ? { ...item, quantity } : item
          );
    });
  }
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Homepage</h1>}></Route>
            <Route path="/:category" element={<Products />}></Route>
            <Route
              path="/:category/:id"
              element={<Detail addToCart={addToCart} />}
            ></Route>
            <Route
              path="/cart"
              element={<Cart updateQuantity={updateQuantity} cart={cart} />}
            ></Route>
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
