import React, { useState, useEffect} from "react";
import axios from "axios"


export function ProductList() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Gọi API backend để lấy danh sách sản phẩm
    axios.get("https://interior-api-h7g8.onrender.com/api/products") // 
      .then((response) => {
        setItems(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi tải sản phẩm:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="px-4">
      <h1 className="text-3xl font-bold text-center mt-20 mb-8">Furniture List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item._id} className="bg-white shadow-lg rounded-2xl overflow-hidden">
            <img
              src={`https://interior-api-h7g8.onrender.com/${item.image}`} // hiển thị hình ảnh từ server
              alt={item.name}
              className="w-full h-[400px] object-cover object-center rounded-xl"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
              <p><strong>Material:</strong> {item.material}</p>
              <p><strong>Color:</strong> {item.color}</p>
              <p><strong>Price:</strong> ${item.price}</p>
              <p><strong>Brand:</strong> {item.brand}</p>
            </div>
          </div>
        ))}
      </div>
      {isLoading && <p className="text-center py-4 text-gray-600">Loading...</p>}
    </div>
  );
}

export default ProductList;