import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddProductPage from './components/AddProductPage';
import SearchPage from './components/SearchPage';
import ProductList from './components/ProductList';
import UpdatePage from './components/UpdatePage';
import Login from './components/Login';
import Register from './components/Register';

//bảo vệ route
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [token, setToken] = useState(null);
  // Kiểm tra token khi component mount
  useEffect(() => {
    const initialToken = localStorage.getItem('token');
    setToken(initialToken);

    const handleStorageChange = () => {
      const newToken = localStorage.getItem('token');
      setToken(newToken);
    };

    window.addEventListener('tokenChanged', handleStorageChange);
    return () => window.removeEventListener('tokenChanged', handleStorageChange);
  }, []);

  // Kiểm tra các route không cần Navbar
  const shouldShowNavbar = () => {
    const publicRoutes = ['/login', '/register'];
    return token && !publicRoutes.includes(window.location.pathname);
  };
  return (
    <BrowserRouter>
      {shouldShowNavbar() && <Navbar onSearch={setSearchKeyword} />}
      <Routes>
        {/* Redirect mặc định */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Các route công khai */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Các route cần đăng nhập */}
        <Route
          path="/search-product"
          element={
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-product"
          element={
            <ProtectedRoute>
              <AddProductPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-product"
          element={
            <ProtectedRoute>
              <UpdatePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
