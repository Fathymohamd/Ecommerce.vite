import { Link } from "react-router-dom";

function PaymentSuccess() {
  return (
    <div className="success-container">

      <div className="success-card">

        <div className="success-icon">
          ✓
        </div>

        <h1>Payment Successful</h1>

        <p>
          Thank you for your purchase.
          <br />
          Your order has been placed successfully.
        </p>

        <div className="success-buttons">
          <Link to="/orders">
            <button>My Orders</button>
          </Link>

          <Link to="/">
            <button>Continue Shopping</button>
          </Link>
        </div>

      </div>

    </div>
  );
}

export default PaymentSuccess;