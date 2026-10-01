import React from "react";

import { Link } from "react-router-dom";

function AdminOrders() {
  const orders = [
    {
      id: "1001",
      customer: "Ahmed Mohamed",
      date: "Sep 29, 2026",
      total: "$120",
      payment: "Paid",
      status: "Completed",
    },
    {
      id: "1002",
      customer: "Mohamed Ali",
      date: "Sep 28, 2026",
      total: "$250",
      payment: "Pending",
      status: "Pending",
    },
    {
      id: "1003",
      customer: "Sara Ahmed",
      date: "Sep 28, 2026",
      total: "$85",
      payment: "Paid",
      status: "Processing",
    },
    {
      id: "1004",
      customer: "Omar Hassan",
      date: "Sep 27, 2026",
      total: "$310",
      payment: "Paid",
      status: "Completed",
    },
  ];

  return (
    <div>
      {/* Page Title */}
      <div className="admin-page-title">
        <h1>Orders</h1>
        <p>Manage customer orders</p>
      </div>

      {/* Orders Table */}
      <div className="admin-dashboard-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <strong>#{order.id}</strong>
                  </td>

                  <td>{order.customer}</td>

                  <td>{order.date}</td>

                  <td>{order.total}</td>

                  <td>
                    <span className="admin-status">
                      {order.payment}
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
                      to={`/admin/orders/${order.id}`}
                      className="admin-view-btn"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;