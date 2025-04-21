import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAddProduct = () => {
    navigate('/add-product');
  };

  const handleUpdateProduct = () => {
    navigate('/update-product');
  };
  const handleSearchProduct = () => {
    navigate('/search-product');
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('tokenChanged'));
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3">
      <div className="flex flex-wrap items-center justify-between max-w-7xl mx-auto">
        {/* Logo / Tên shop */}
        <div className="text-xl font-bold text-blue-600">(👉ﾟヮﾟ)👉 Furniture store</div>

        {/* Hamburger menu (mobile) */}
        <button
          className="sm:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Menu chính */}
        <div className={`${menuOpen ? 'block' : 'hidden'} w-full sm:flex sm:items-center sm:w-auto`}>
          <ul className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-3 sm:mt-0 text-gray-700 font-medium">
            <li>
              <button onClick={handleSearchProduct} className="hover:text-blue-600">
                Tìm kiếm
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/products')} className="hover:text-blue-600">
                Sản phẩm
              </button>
            </li>
            <li>
              <button onClick={handleAddProduct} className="hover:text-blue-600">
                Thêm sản phẩm
              </button>
            </li>
            <li>
              <button onClick={handleUpdateProduct} className="hover:text-blue-600">
                Cập nhật sản phẩm
              </button>
            </li>
            <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded transition"
            >
              Đăng xuất
            </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
