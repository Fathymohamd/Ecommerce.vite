import { Link } from "react-router-dom";

function PaymentFailed() {

  return (

    <div className="failed-container">

      <div className="failed-card">

        <div className="failed-icon">
          ✕
        </div>

        <h1>Payment Failed</h1>

        <p>

          Your payment could not be completed.

          <br />

          Please try again.

        </p>

        <div className="failed-buttons">

          <Link to="/checkout">
            <button>Try Again</button>
          </Link>

          <Link to="/">
            <button>Back Home</button>
          </Link>

        </div>

      </div>

    </div>

  );
}

export default PaymentFailed;