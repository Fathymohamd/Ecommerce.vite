
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function AdminOrders() {
  const { t } = useTranslation();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          "https://ecommerce-vite-two.vercel.app/api",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.message || t("orders.somethingWentWrong")
          );
        }

        setOrders(
          Array.isArray(data) ? data : data.orders || []
        );
      } catch (error) {
        setError(
          error.message || t("orders.somethingWentWrong")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      {/* Page Title */}
      <div className="admin-page-title">
        <h1>{t("orders.title")}</h1>
        <p>{t("orders.description")}</p>
      </div>

      {/* Orders Table */}
      {orders.length === 0 ? (
        <p className="no-products-message">
          {t("orders.noOrders")}
        </p>
      ) : (
        <div className="admin-dashboard-card">
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{t("orders.orderId")}</th>
                  <th>{t("orders.customer")}</th>
                  <th>{t("orders.date")}</th>
                  <th>{t("orders.total")}</th>
                  <th>{t("orders.payment")}</th>
                  <th>{t("orders.status")}</th>
                  <th>{t("orders.action")}</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <strong>#{order.user}</strong>
                    </td>

                    <td>{order.firstName}</td>
                    <td>{order.createdAt}</td>
                    <td>{order.finalPrice}</td>

                    <td>
                      <span className="admin-status">
                        {order.paymentMethod}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`admin-status ${order.status.toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td>
                      <Link
                        to={`/admin/orders/${order._id}`}
                        className="admin-view-btn"
                      >
                        {t("orders.viewDetails")}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
