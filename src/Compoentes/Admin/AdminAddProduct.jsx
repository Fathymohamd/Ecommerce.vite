import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminAddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
    stock: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Product:", formData);

    alert("Product added successfully");

    navigate("/admin/products");
  };

  return (
    <div>
      <div className="admin-page-title">
        <h1>Add Product</h1>
        <p>Create a new product</p>
      </div>

      <div className="admin-form-card">
        <form onSubmit={handleSubmit}>

          <div className="admin-form-grid">

            {/* Product Name */}
            <div className="admin-form-group">
              <label>Product Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter product name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Price */}
            <div className="admin-form-group">
              <label>Price</label>

              <input
                type="number"
                name="price"
                placeholder="Enter price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            {/* Category */}
            <div className="admin-form-group">
              <label>Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option value="smartphones">Smartphones</option>
                <option value="laptops">Laptops</option>
                <option value="tablets">Tablets</option>
                <option value="electronics">Electronics</option>
              </select>
            </div>

            {/* Stock */}
            <div className="admin-form-group">
              <label>Stock</label>

              <input
                type="number"
                name="stock"
                placeholder="Enter stock"
                value={formData.stock}
                onChange={handleChange}
              />
            </div>

          </div>

          {/* Description */}
          <div className="admin-form-group">
            <label>Description</label>

            <textarea
              name="description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
            />
          </div>

          {/* Image */}
          <div className="admin-form-group">
            <label>Product Image URL</label>

            <input
              type="text"
              name="image"
              placeholder="Enter image URL"
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          {/* Buttons */}
          <div className="admin-form-buttons">

            <button
              type="button"
              className="admin-cancel-btn"
              onClick={() => navigate("/admin/products")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="admin-primary-btn"
            >
              Add Product
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default AdminAddProduct;