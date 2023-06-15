import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './shared/components/Layout/Header';
import Footer from './shared/components/Layout/Footer';
import Home from './pages/Home';
import Menu from './shared/components/Layout/Menu';
import Slider from './shared/components/Layout/Slider';
import Sidebar from './shared/components/Layout/Sidebar';
import Category from './pages/Category';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import Product from './pages/Product';
import Search from './pages/Search';
import Success from './pages/Success';
import { getCategories } from './services/Api';
import store from './shared/redux-setup/store';
import { Provider } from 'react-redux';

const App = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then(({ data }) => setCategories(data.data.docs));
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <div id="body">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <Menu categories={categories} />
              </div>
            </div>
            <div className="row">
              <div id="main" className="col-lg-8 col-md-12 col-sm-12">
                <Slider />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/category-:id" element={<Category />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/ProductDetail-:id" element={<Product />} />
                  <Route path="/Search" element={<Search />} />
                  <Route path="/Success" element={<Success />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Sidebar />
            </div>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
