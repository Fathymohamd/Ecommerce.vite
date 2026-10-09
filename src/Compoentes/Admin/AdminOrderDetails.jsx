
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById } from "../../Redux/oderproduct";

function AdminOrderDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
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

  if (loading) {
    return (
      <div className="loading-container">
        <FaSpinner className="loader-icon" />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!order) {
    return (
      <div className="order-not-found">
        <div className="order-not-found-icon">📦</div>
        <h2>{t("orderDetails.orderNotFound")}</h2>
        <p>{t("orderDetails.orderNotFoundDescription")}</p>
        <button onClick={() => navigate("/admin/orders")}>
          {t("orderDetails.backToOrders")}
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Page Title */}
      <div className="admin-page-title">
        <div>
          <h1>{t("orderDetails.title")}</h1>
          <p>{t("orderDetails.orderNumber")} #{order._id}</p>
        </div>

        <button
          className="admin-cancel-btn"
          onClick={() => navigate("/admin/orders")}
        >
          {t("orderDetails.backToOrders")}
        </button>
      </div>

      {/* Customer & Order Information */}
      <div className="admin-order-details-grid">
        {/* Customer Information */}
        <div className="admin-dashboard-card">
          <h2>{t("orderDetails.customerInformation")}</h2>

          <div className="admin-details-list">
            <p>
              <strong>{t("orderDetails.name")}:</strong>{" "}
              {order.firstName} {order.lastName}
            </p>

            <p>
              <strong>{t("orderDetails.email")}:</strong> {order.email}
            </p>

            <p>
              <strong>{t("orderDetails.phone")}:</strong> {order.phone}
            </p>

            <p>
              <strong>{t("orderDetails.country")}:</strong> {order.country}
            </p>

            <p>
              <strong>{t("orderDetails.city")}:</strong> {order.city}
            </p>

            <p>
              <strong>{t("orderDetails.address")}:</strong> {order.address}
            </p>
          </div>
        </div>

        {/* Order Information */}
        <div className="admin-dashboard-card">
          <h2>{t("orderDetails.orderInformation")}</h2>

          <div className="admin-details-list">
            <p>
              <strong>{t("orderDetails.orderId")}:</strong> #{order._id}
            </p>

            <p>
              <strong>{t("orderDetails.paymentMethod")}:</strong>{" "}
              {order.paymentMethod}
            </p>

            <p>
              <strong>{t("orderDetails.paymentStatus")}:</strong>{" "}
              {order.paymentStatus}
            </p>

            <p>
              <strong>{t("orderDetails.orderStatus")}:</strong>{" "}
              {order.status}
            </p>

            <p>
              <strong>{t("orderDetails.total")}:</strong>{" "}
              {order.finalPrice?.toFixed(2)} EGP
            </p>

            <p>
              <strong>{t("orderDetails.orderDate")}:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="admin-dashboard-card admin-order-products">
        <h2>{t("orderDetails.products")}</h2>

        {order.products?.length > 0 ? (
          order.products.map((product, index) => (
            <div
              className="admin-order-product"
              key={product._id || index}
            >
              <div>
                <strong>
                  {product.title ||
                    product.name ||
                    t("orderDetails.product")}
                </strong>

                <p>
                  {t("orderDetails.quantity")}: {product.quantity || 1}
                </p>

                {product.price && (
                  <p>
                    {t("orderDetails.unitPrice")}: {product.price} EGP
                  </p>
                )}
              </div>

              <strong>
                {product.price
                  ? (
                      product.price * (product.quantity || 1)
                    ).toFixed(2)
                  : "0.00"}{" "}
                EGP
              </strong>
            </div>
          ))
        ) : (
          <p>{t("orderDetails.noProducts")}</p>
        )}

        {/* Order Total */}
        <div className="admin-order-total">
          <span>{t("orderDetails.total")}</span>
          <strong>{order.finalPrice?.toFixed(2)} EGP</strong>
        </div>
      </div>
    </div>
  );
}

export default AdminOrderDetails;

