
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  FaDollarSign,
  FaCartShopping,
  FaBoxOpen,
  FaUsers,
} from "react-icons/fa6";
import { useTranslation } from "react-i18next";

function AdminDashboard() {
  const { t } = useTranslation();

  const [orders, setOrders] = useState([]);

  const totalProducts = orders.reduce(
    (total, order) => total + (order.products?.length || 0),
    0
  );

  const TotalSales = orders.reduce(
    (total, order) => total + (order.finalPrice || 0),
    0
  );

  const totalUsers = new Set(
    orders.map((order) => order.email)
  ).size;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
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
        console.log(
          error.message || t("orders.somethingWentWrong")
        );
      }
    };

    fetchOrders();
  }, []);

  const stats = [
    {
      title: t("adminDashboard.totalSales"),
      value: TotalSales.toFixed(2),
      icon: <FaDollarSign />,
    },
    {
      title: t("adminDashboard.totalOrders"),
      value: orders.length,
      icon: <FaCartShopping />,
    },
    {
      title: t("adminDashboard.totalProducts"),
      value: totalProducts,
      icon: <FaBoxOpen />,
    },
    {
      title: t("adminDashboard.totalUsers"),
      value: totalUsers,
      icon: <FaUsers />,
    },
  ];

  const salesByDay = orders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString();

    if (!acc[date]) {
      acc[date] = 0;
    }

    acc[date] += order.finalPrice || 0;

    return acc;
  }, {});

  const last7Days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    return date;
  });

  const chartData = last7Days.map((date) => {
    const dateKey = date.toLocaleDateString();

    return {
      date: dateKey,
      sales: salesByDay[dateKey] || 0,
    };
  });

  const maxSales = Math.max(
    ...chartData.map((item) => item.sales),
    1
  );

  return (
    <div>
      <div className="admin-page-title">
        <h1>{t("adminDashboard.title")}</h1>
        <p>{t("adminDashboard.overview")}</p>
      </div>

      {/* Stats */}
      <div className="admin-stats-grid">
        {stats.map((item, index) => (
          <div className="admin-stat-card" key={index}>
            <div className="admin-stat-icon">
              {item.icon}
            </div>
            <div>
              <p>{item.title}</p>
              <h2>{item.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Overview */}
      <div className="admin-dashboard-grid">
        <div className="admin-dashboard-card">
          <div className="admin-card-header">
            <h2>{t("adminDashboard.salesOverview")}</h2>
            <select>
              <option>{t("adminDashboard.last7Days")}</option>
              <option>{t("adminDashboard.last30Days")}</option>
              <option>{t("adminDashboard.last6Months")}</option>
            </select>
          </div>

          <div className="admin-fake-chart">
            <div className="admin-chart-bars">
              {chartData.map((item) => (
                <div
                  key={item.date}
                  style={{
                    height: `${(item.sales / maxSales) * 100}%`,
                  }}
                  title={`$${item.sales.toLocaleString()}`}
                ></div>
              ))}
            </div>

            <div className="admin-chart-days">
              {chartData.map((item) => (
                <span key={item.date}>
                  {new Date(item.date).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="admin-dashboard-card">
          <div className="admin-card-header">
            <h2>{t("adminDashboard.recentOrders")}</h2>
          </div>

          {orders.length === 0 ? (
            <div className="admin-no-orders">
              <FaBoxOpen />
              <h3>{t("adminDashboard.noRecentOrders")}</h3>
              <p>{t("adminDashboard.noOrdersDescription")}</p>
            </div>
          ) : (
            <div className="admin-recent-orders">
              {orders.map((order) => (
                <div
                  className="admin-recent-order"
                  key={order._id}
                >
                  <div>
                    <strong>#{order._id}</strong>
                    <p>
                      {order.firstName} {order.lastName}
                    </p>
                    <p>{order.email}</p>
                  </div>

                  <div>
                    <strong>
                      ${order.finalPrice?.toLocaleString()}
                    </strong>
                    <span
                      className={`admin-status ${order.status?.toLowerCase()}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

