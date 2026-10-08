
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import {FaSpinner } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById } from "../../Redux/oderproduct";
function AdminOrderDetails() {
  const { id } = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { order, loading, error } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    if (id) {
      dispatch(getOrderById(id));
    }
  }, [id, dispatch]);


 if(loading){
  return <div className="loading-container">
  <FaSpinner className="loader-icon" />
</div>
 }


if (error) {
  return <p>{error}</p>;
}

if (!order) {
  return (
    <div className="order-not-found">
      <div className="order-not-found-icon">📦</div>

      <h2>Order Not Found</h2>

      <p>
        The order you are looking for does not exist or may have been
        removed.
      </p>

      <button onClick={() => navigate("/admin/orders")}>
        Back to Orders
      </button>
    </div>
  );
}

  return (
  <div>
  {/* Page Title */}
  <div className="admin-page-title">
    <div>
      <h1>Order Details</h1>
      <p>Order #{order._id}</p>
    </div>

    <button
      className="admin-cancel-btn"
      onClick={() => navigate("/admin/orders")}
    >
      Back to Orders
    </button>
  </div>

  {/* Customer & Order Information */}
  <div className="admin-order-details-grid">

    {/* Customer Information */}
    <div className="admin-dashboard-card">
      <h2>Customer Information</h2>

      <div className="admin-details-list">
        <p>
          <strong>Name:</strong>{" "}
          {order.firstName} {order.lastName}
        </p>

        <p>
          <strong>Email:</strong> {order.email}
        </p>

        <p>
          <strong>Phone:</strong> {order.phone}
        </p>

        <p>
          <strong>Country:</strong> {order.country}
        </p>

        <p>
          <strong>City:</strong> {order.city}
        </p>

        <p>
          <strong>Address:</strong> {order.address}
        </p>
      </div>
    </div>

    {/* Order Information */}
    <div className="admin-dashboard-card">
      <h2>Order Information</h2>

      <div className="admin-details-list">
        <p>
          <strong>Order ID:</strong> #{order._id}
        </p>

        <p>
          <strong>Payment Method:</strong>{" "}
          {order.paymentMethod}
        </p>

        <p>
          <strong>Payment Status:</strong>{" "}
          {order.paymentStatus}
        </p>

        <p>
          <strong>Order Status:</strong>{" "}
          {order.status}
        </p>

        <p>
          <strong>Total:</strong>{" "}
          {order.finalPrice?.toFixed(2)} EGP
        </p>

        <p>
          <strong>Order Date:</strong>{" "}
          {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  </div>

  {/* Products */}
  <div className="admin-dashboard-card admin-order-products">
    <h2>Products</h2>

    {order.products?.length > 0 ? (
      order.products.map((product, index) => (
        <div
          className="admin-order-product"
          key={product._id || index}
        >
          <div>
            <strong>
              {product.title || product.name || "Product"}
            </strong>

            <p>
              Quantity: {product.quantity || 1}
            </p>

            {product.price && (
              <p>
                Unit Price: {product.price} EGP
              </p>
            )}
          </div>

          <strong>
            {product.price
              ? (product.price * (product.quantity || 1)).toFixed(2)
              : "0.00"}{" "}
            EGP
          </strong>
        </div>
      ))
    ) : (
      <p>No products found in this order.</p>
    )}

    {/* Order Total */}
    <div className="admin-order-total">
      <span>Total</span>

      <strong>
        {order.finalPrice?.toFixed(2)} EGP
      </strong>
    </div>
  </div>
</div>
  );
}

export default AdminOrderDetails;