import React, { useState  , useEffect} from "react";
import {useSelector} from "react-redux"
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
  (total, order) => total + (order.finalPrice || 0) , 0)

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
      title: "Total Sales",
      value: TotalSales.toFixed(2),
      icon: <FaDollarSign />,
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: <FaCartShopping />,
    },
    {
      title: "Total Products",
      value: totalProducts,
      icon: <FaBoxOpen />,
    },
    {
      title: "Total Users",
      value:  totalUsers,
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
        <h1>Dashboard</h1>
        <p>Overview of your store</p>
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
    <h2>Sales Overview</h2>

    <select>
      <option>Last 7 Days</option>
      <option>Last 30 Days</option>
      <option>Last 6 Months</option>
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
            <h2>Recent Orders</h2>
          </div>

  {orders.length === 0 ? 
  <div className="admin-no-orders">
    <FaBoxOpen />
    <h3>No Recent Orders</h3>
    <p>There are no orders to display yet.</p>
  </div>
  
  :(

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