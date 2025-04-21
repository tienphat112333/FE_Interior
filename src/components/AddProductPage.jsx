import React, { useState, useEffect } from "react";
import axios from "axios";  // Đảm bảo axios đã được cài đặt

const categoryOptions = {
  SO: "Sofa",
  TA: "Table",
  CH: "Chair",
  BE: "Bed",
  SH: "Shelf",
  DE: "Desk",
  DR: "Dresser",
  WA: "Wardrobe",
  ST: "Stool",
  CO: "Couch",
  BO: "Bookshelf",
  TV: "TV Stand",
  CA: "Cabinet",
  DO: "Door",
  LA: "Lamp",
};

function AddProductPage() {
  const [category, setCategory] = useState("SO");
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [material, setMaterial] = useState("");
  const [image, setImage] = useState(null);
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [productId, setProductId] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Chỉ tạo ID khi:
  // 1. Lần đầu load component
  // 2. Khi category thay đổi và chưa có thông tin sản phẩm được nhập
  useEffect(() => {
    const generateId = async () => {
      try {
        const response = await axios.post("https://interior-api-h7g8.onrender.com/api/products/generate-id", {
          category
        });
        setProductId(response.data.id);
      } catch (err) {
        console.error("Lỗi khi tạo ID:", err);
        setProductId("Lỗi khi tạo ID");
      }
    };

    generateId();
  }, [category]); // Chỉ chạy khi category thay đổi

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("color", color);
    formData.append("material", material);
    formData.append("image", image);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("id", productId);

    try {
      const response = await axios.post("https://interior-api-h7g8.onrender.com/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Sản phẩm đã được thêm:", response.data);
      
      // Reset form sau khi lưu thành công
      setName("");
      setColor("");
      setMaterial("");
      setImage(null);
      setBrand("");
      setPrice("");
      setCategory("SO");
      setIsInitialLoad(true); // Cho phép tạo ID mới khi bắt đầu thêm sản phẩm tiếp theo
      alert("Thêm sản phẩm thành công!");
    } catch (err) {
      console.error("Lỗi khi thêm sản phẩm:", err);
      alert("Thêm sản phẩm thất bại!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Thêm sản phẩm mới</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-semibold">Phân loại sản phẩm:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {Object.entries(categoryOptions).map(([code, label]) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">Mã sản phẩm (ID):</label>
          <input
            type="text"
            value={productId}
            className="w-full p-2 border rounded bg-gray-100"
            readOnly
          />
        </div>

        <div>
          <label className="font-semibold">Tên sản phẩm:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Màu sắc:</label>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Chất liệu:</label>
          <input
            type="text"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Ảnh:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full"
          />
        </div>

        <div>
          <label className="font-semibold">Thương hiệu:</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Giá:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Thêm sản phẩm
        </button>
      </form>
    </div>
  );
}

export default AddProductPage;
