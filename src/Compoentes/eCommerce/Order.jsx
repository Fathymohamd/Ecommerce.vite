import { useState  , useEffect} from "react";
import { motion } from "framer-motion";
 function MyOrders() {
    const [orders, setOrders] = useState([]);
  
useEffect(() => {
  fetch("https://ecommerce-vite-fgou.vercel.app/api/orders")
    .then((res) => res.json())
    .then((data) => setOrders(data));
}, []);
  return (
  <div>
{orders.length === 0 ? (
  <h2 id="orders_products">No orders yet.</h2>
) : (
  <div className="orders-container">
      <h1>My Orders</h1>

      {Array.isArray(orders) &&  orders?.map((order) => (
        <div className="order-card" key={order._id}>
          <div className="order-header">
            <div>
             <h2>Order #{order._id.slice(0,8)}</h2>
              <p>{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="status-box">
              <span className={`payment ${order.paymentStatus.toLowerCase()}`}>
                {order.paymentStatus}
              </span>

              <span className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>
          </div>

          <div className="products">
            {order.products.map((item) => (
              <div className="product" key={item.id}>
                <img src={item?.image || item.images?.[0]} alt={item.title} />

                <div className="product-info">
                  <h3>{item.title}</h3>
                  <p>Price : ${item.price}</p>
                  <p>Quantity : {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-footer">
           <h3>Total : ${order.finalPrice.toFixed(2)}</h3>

     {/*        <button>View Details</button> */}
          </div>
        </div>
      ))}
    </div>
)}

  </div>

  );
}

export default MyOrders;