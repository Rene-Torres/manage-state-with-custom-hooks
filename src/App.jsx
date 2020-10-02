import React from 'react';
import './App.css';
import Footer from './Footer';
import Header from './Header';
import Products from './Products';
import Detail from './Detail';
import Cart from './Cart';

import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Homepage</h1>}></Route>
            <Route path="/:category" element={<Products />}></Route>
            <Route path="/:category/:id" element={<Detail />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
