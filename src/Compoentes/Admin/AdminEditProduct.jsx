
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error , setError] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "smartphones",
    description: "",
    images: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  // Check empty fields
  if (!formData.title.trim()) {
    setError("Product name is required");
    return;
  }

  if (!formData.price) {
    setError("Price is required");
    return;
  }

  if (!formData.category) {
    setError("Category is required");
    return;
  }

  if (!formData.description.trim()) {
    setError("Description is required");
    return;
  }

  if (!formData.image.trim()) {
    setError("Product image URL is required");
    return;
  }

  
  if (Number(formData.price) <= 0) {
    setError("Price must be greater than 0");
    return;
  }

  try {
    const response = await fetch(
      `https://ecommerce-vite-two.vercel.app/api/updatedProduct/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: formData.title.trim(),
          description: formData.description.trim(),
          category: formData.category,
          price: Number(formData.price),
          images: [formData.images.trim()],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    toast("Product updated successfully");

    navigate("/admin/products");
  } catch (error) {
    console.error("Update product error:", error);
    alert("Something went wrong. Please try again.");
  }
};

  return (
    <div>
          {error && (
              <div className="error-message">
                {error}
              </div>
            )}
      <div className="admin-page-title">
        <h1>Edit Product</h1>
        <p>Update product information</p>
      </div>

      {/* Form */}
      <div className="admin-form-card">
        <form onSubmit={handleSubmit}>
          <div className="admin-form-grid">

            {/* Product Title */}
            <div className="admin-form-group">
              <label>Product Name</label>

              <input
                type="text"
                name="title"
                value={formData.title}
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
  <option value="beauty">Beauty</option>

  <option value="fragrances">Fragrances</option>

  <option value="furniture">Furniture</option>

  <option value="groceries">Groceries</option>

  <option value="home-decoration">Home Decoration</option>

  <option value="kitchen-accessories">Kitchen Accessories</option>

  <option value="laptops">Laptops</option>

  <option value="mens-shirts">Men's Shirts</option>

  <option value="mens-shoes">Men's Shoes</option>

  <option value="mens-watches">Men's Watches</option>

  <option value="mobile-accessories">Mobile Accessories</option>

  <option value="motorcycle">Motorcycle</option>

  <option value="skin-care">Skin Care</option>

  <option value="smartphones">Smartphones</option>

  <option value="sports-accessories">Sports Accessories</option>

  <option value="sunglasses">Sunglasses</option>

  <option value="tablets">Tablets</option>

  <option value="tops">Tops</option>

  <option value="vehicle">Vehicle</option>

  <option value="womens-bags">Women's Bags</option>

  <option value="womens-dresses">Women's Dresses</option>

  <option value="womens-jewellery">Women's Jewellery</option>

  <option value="womens-shoes">Women's Shoes</option>

  <option value="womens-watches">Women's Watches</option>
</select>
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
              value={formData.images}
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

