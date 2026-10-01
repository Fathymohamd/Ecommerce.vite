import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaPen,
  FaTrash,
  FaMagnifyingGlass,
} from "react-icons/fa6";

function AdminProducts() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");

  const [products, setProducts] = useState([
    {
      id: "1",
      name: "iPhone 15 Pro",
      category: "Smartphones",
      price: 999,
      stock: 20,
    },
    {
      id: "2",
      name: "MacBook Pro M3",
      category: "Laptops",
      price: 1599,
      stock: 12,
    },
    {
      id: "3",
      name: "Samsung Galaxy S24",
      category: "Smartphones",
      price: 899,
      stock: 30,
    },
    {
      id: "4",
      name: "iPad Pro",
      category: "Tablets",
      price: 799,
      stock: 15,
    },
  ]);

  const deleteProduct = (id) => {
    setProducts(
      products.filter((product) => product.id !== id)
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All Categories" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="admin-products-page">

      {/* Page Header */}
      <div className="admin-page-title admin-product-title">
        <div>
          <h1>Products</h1>
          <p>Manage your store products</p>
        </div>

        <Link
          to="/admin/products/add"
          className="admin-primary-btn"
        >
          <FaPlus />
          <span>Add Product</span>
        </Link>
      </div>

      {/* Products Card */}
      <div className="admin-products-card">

        {/* Toolbar */}
        <div className="admin-products-toolbar">

          {/* Search */}
          <div className="admin-products-search">
            <FaMagnifyingGlass />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Category */}
          <select
            className="admin-products-filter"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All Categories</option>
            <option>Smartphones</option>
            <option>Laptops</option>
            <option>Tablets</option>
          </select>

        </div>

        {/* Products Count */}
        <div className="admin-products-count">
          <span>
            Showing <strong>{filteredProducts.length}</strong> products
          </span>
        </div>

        {/* Table */}
        <div className="admin-table-container">
          <table className="admin-table">

            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id}>

                    <td>
                      <div className="admin-product-info">
                        <div className="admin-product-image">
                          {product.name.charAt(0)}
                        </div>

                        <div>
                          <strong>{product.name}</strong>
                          <small>ID: #{product.id}</small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="admin-category-badge">
                        {product.category}
                      </span>
                    </td>

                    <td>
                      <strong className="admin-product-price">
                        ${product.price}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={
                          product.stock <= 10
                            ? "admin-stock low"
                            : "admin-stock"
                        }
                      >
                        {product.stock} in stock
                      </span>
                    </td>

                    <td>
                      <div className="admin-table-actions">

                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          className="admin-edit-btn"
                          title="Edit Product"
                        >
                          <FaPen />
                        </Link>

                        <button
                          className="admin-delete-btn"
                          onClick={() =>
                            deleteProduct(product.id)
                          }
                          title="Delete Product"
                        >
                          <FaTrash />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="admin-no-products"
                  >
                    No products found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;