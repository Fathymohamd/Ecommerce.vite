import React from "react";

import { useParams, useNavigate } from "react-router-dom";

function AdminOrderDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  return (
    <div>
      {/* Page Title */}
      <div className="admin-page-title">
        <div>
          <h1>Order Details</h1>
          <p>Order #{id}</p>
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
              <strong>Name:</strong> Ahmed Mohamed
            </p>

            <p>
              <strong>Email:</strong> ahmed@example.com
            </p>

            <p>
              <strong>Phone:</strong> +20 100 000 0000
            </p>

            <p>
              <strong>Address:</strong> Zagazig, Egypt
            </p>
          </div>
        </div>

        {/* Order Information */}
        <div className="admin-dashboard-card">
          <h2>Order Information</h2>

          <div className="admin-details-list">
            <p>
              <strong>Order ID:</strong> #{id}
            </p>

            <p>
              <strong>Payment:</strong> Paid
            </p>

            <p>
              <strong>Status:</strong> Completed
            </p>

            <p>
              <strong>Total:</strong> $120
            </p>
          </div>
        </div>

      </div>

      {/* Products */}
      <div className="admin-dashboard-card admin-order-products">
        <h2>Products</h2>

        <div className="admin-order-product">
          <div>
            <strong>iPhone 15 Pro</strong>
            <p>Quantity: 1</p>
          </div>

          <strong>$999</strong>
        </div>
      </div>
    </div>
  );
}

export default AdminOrderDetails;