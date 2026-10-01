import React from "react";

import {
  FaDollarSign,
  FaCartShopping,
  FaBoxOpen,
  FaUsers,
} from "react-icons/fa6";

function AdminDashboard() {
  const stats = [
    {
      title: "Total Sales",
      value: "$25,400",
      icon: <FaDollarSign />,
    },
    {
      title: "Total Orders",
      value: "580",
      icon: <FaCartShopping />,
    },
    {
      title: "Total Products",
      value: "194",
      icon: <FaBoxOpen />,
    },
    {
      title: "Total Users",
      value: "1,250",
      icon: <FaUsers />,
    },
  ];

  const orders = [
    {
      id: "#1001",
      customer: "Ahmed Mohamed",
      date: "Sep 29, 2026",
      total: "$120",
      status: "Completed",
    },
    {
      id: "#1002",
      customer: "Mohamed Ali",
      date: "Sep 28, 2026",
      total: "$250",
      status: "Pending",
    },
    {
      id: "#1003",
      customer: "Sara Ahmed",
      date: "Sep 28, 2026",
      total: "$85",
      status: "Processing",
    },
    {
      id: "#1004",
      customer: "Omar Hassan",
      date: "Sep 27, 2026",
      total: "$310",
      status: "Completed",
    },
  ];

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
              <div style={{ height: "40%" }}></div>
              <div style={{ height: "65%" }}></div>
              <div style={{ height: "50%" }}></div>
              <div style={{ height: "80%" }}></div>
              <div style={{ height: "60%" }}></div>
              <div style={{ height: "90%" }}></div>
              <div style={{ height: "75%" }}></div>
            </div>

            <div className="admin-chart-days">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="admin-dashboard-card">
          <div className="admin-card-header">
            <h2>Recent Orders</h2>
          </div>

          <div className="admin-recent-orders">
            {orders.map((order) => (
              <div
                className="admin-recent-order"
                key={order.id}
              >
                <div>
                  <strong>{order.id}</strong>
                  <p>{order.customer}</p>
                </div>

                <div>
                  <strong>{order.total}</strong>

                  <span
                    className={`admin-status ${order.status.toLowerCase()}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;