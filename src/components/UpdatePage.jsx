import React, { useState, useEffect} from "react";
import axios from 'axios';


export function UpdatePage() {
  const [items, setItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Sản phẩm đã chọn
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // Hiển thị popup xác nhận xóa
  const [showEditPopup, setShowEditPopup] = useState(false); // Hiển thị popup chỉnh sửa sản phẩm
  const [editedProduct, setEditedProduct] = useState(null); // Thông tin sản phẩm đang chỉnh sửa

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get('https://interior-api-h7g8.onrender.com/api/products');
        setItems(response.data);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
      }
    };

    fetchAllProducts();
  }, []);

  const handleDeleteProduct = (productId) => {
    setSelectedProduct(productId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`https://interior-api-h7g8.onrender.com/api/products/${selectedProduct}`);
      
      if (response.data.success) {
        setItems(prevItems => prevItems.filter(item => item._id !== selectedProduct));
        alert('Xóa sản phẩm thành công!');
      }
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm:", err);
      alert('Xóa sản phẩm thất bại!');
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  // Sửa hàm handleEditProduct
  const handleEditProduct = (productId) => {
    const product = items.find((item) => item._id === productId);
    // Kiểm tra nếu sản phẩm tồn tại
    if (!product) {
      alert('Không tìm thấy sản phẩm!');
      return;
    }
    setEditedProduct({...product});
    setShowEditPopup(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = async () => {
    const formData = new FormData();
    formData.append("name", editedProduct.name);
    formData.append("material", editedProduct.material);
    formData.append("color", editedProduct.color);
    formData.append("price", editedProduct.price);
    formData.append("brand", editedProduct.brand);
    
    // if (editedProduct.imageFile) {
    //   formData.append("image", editedProduct.imageFile);
    // }
  
    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/${editedProduct._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
  
      // Cập nhật state với dữ liệu mới
      setItems(prevItems =>
        prevItems.map(item =>
          item._id === editedProduct._id ? response.data : item
        )
      );
      setShowEditPopup(false);
      alert('Cập nhật sản phẩm thành công!');
    } catch (err) {
      console.error("Lỗi khi cập nhật sản phẩm:", err);
      alert('Cập nhật sản phẩm thất bại!');
    }
  };

  return (
    <div className="px-4">
      <h1 className="text-3xl font-bold text-center mt-20 mb-8">Furniture List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white shadow-lg rounded-2xl overflow-hidden">
            <img
              src={`https://interior-api-h7g8.onrender.com/${item.image}`}
              alt={item.name}
              className="w-full h-[400px] object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
              <p><strong>Material:</strong> {item.material}</p>
              <p><strong>Color:</strong> {item.color}</p>
              <p><strong>Price:</strong> ${item.price}</p>
              <p><strong>Brand:</strong> {item.brand}</p>

              {/* Nút sửa */}
              <button
                onClick={() => {
                  console.log('Editing product ID:', item._id);
                  handleEditProduct(item._id)
                  }
                }
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              >
                Sửa
              </button>

              {/* Nút xóa */}
              <button
                onClick={() => handleDeleteProduct(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-2 ml-2"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Popup xác nhận xóa */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg">Bạn có chắc chắn muốn xóa sản phẩm này?</p>
            <div className="mt-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              >
                Xóa
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup chỉnh sửa sản phẩm */}
      {showEditPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h3 className="text-xl font-semibold mb-4">Chỉnh sửa sản phẩm</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label className="block text-sm">Tên sản phẩm</label>
                <input
                  type="text"
                  name="name"
                  value={editedProduct.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm">Material</label>
                <input
                  type="text"
                  name="material"
                  value={editedProduct.material}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm">Color</label>
                <input
                  type="text"
                  name="color"
                  value={editedProduct.color}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm">Price</label>
                <input
                  type="number"
                  name="price"
                  value={editedProduct.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </div>
              {/* Sửa Brand */}
              <div className="mb-4">
                <label className="block text-sm">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={editedProduct.brand}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleSaveEdit}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Lưu
                </button>
                <button
                  onClick={() => setShowEditPopup(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdatePage;
