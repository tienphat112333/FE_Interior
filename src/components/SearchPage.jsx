import React, { useState } from "react";
import axios from "axios";

function SearchPage() {
  const [filters, setFilters] = useState({
    name: "",
    color: "",
    material: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
  });

  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = async () => {
    const hasAnyFilter = Object.values(filters).some(value => value !== "");

    if (!hasAnyFilter) {
      alert("Vui lòng nhập ít nhất một tiêu chí tìm kiếm.");
      return;
    }
    try {
      const response = await axios.get("http://localhost:5000/api/products/search", {
        params: filters,
      });
      if (response.data.length === 0) {
        alert("Không tìm thấy sản phẩm nào.");
      }
      setResults(response.data);
    } catch (err) {
      console.error("Lỗi khi tìm kiếm sản phẩm:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Tìm kiếm sản phẩm</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Tên sản phẩm"
          value={filters.name}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="color"
          placeholder="Màu sắc"
          value={filters.color}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="material"
          placeholder="Chất liệu"
          value={filters.material}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="brand"
          placeholder="Thương hiệu"
          value={filters.brand}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Giá tối thiểu"
          value={filters.minPrice}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Giá tối đa"
          value={filters.maxPrice}
          onChange={handleChange}
          className="p-2 border rounded"
        />
      </div>

      <button
        onClick={handleSearch}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Tìm kiếm
      </button>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Kết quả:</h2>
        {results.length === 0 ? (
          <p>Không tìm thấy sản phẩm nào.</p>
        ) : (
          <ul className="space-y-4">
            {results.map((item) => (
              <li
                key={item.id}
                className="p-4 border rounded flex items-center space-x-4"
              >
                {item.image && (
                  <img
                    src={`http://localhost:5000/${item.image}`}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
                <div>
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p>Màu: {item.color}</p>
                  <p>Chất liệu: {item.material}</p>
                  <p>Thương hiệu: {item.brand}</p>
                  <p>Giá: {item.price} VND</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
