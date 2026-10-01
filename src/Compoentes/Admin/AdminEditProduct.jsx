import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

function AdminEditProduct() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "iPhone 15 Pro",
    price: "999",
    category: "smartphones",
    description: "Premium smartphone",
    image: "",
    stock: "20",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Updated Product:", id, formData);

    alert("Product updated successfully");

    navigate("/admin/products");
  };

  return (
    <div>
      {/* Page Title */}
      <div className="admin-page-title">
        <h1>Edit Product</h1>
        <p>Update product information</p>
      </div>

      {/* Form */}
      <div className="admin-form-card">
        <form onSubmit={handleSubmit}>

          <div className="admin-form-grid">

            {/* Product Name */}
            <div className="admin-form-group">
              <label>Product Name</label>

              <input
                type="text"
                name="name"
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
                <option value="smartphones">
                  Smartphones
                </option>

                <option value="laptops">
                  Laptops
                </option>

                <option value="tablets">
                  Tablets
                </option>

                <option value="electronics">
                  Electronics
                </option>
              </select>
            </div>

            {/* Stock */}
            <div className="admin-form-group">
              <label>Stock</label>

              <input
                type="number"
                name="stock"
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
              Save Changes
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default AdminEditProduct;