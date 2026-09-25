import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
  FaBox,
  FaArrowLeft,
  FaTruck,
  FaCheck,
  FaSpinner
} from "react-icons/fa6";

import { useTranslation } from "react-i18next";

const Orders = () => {

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

 if(loading){
  return <div className="loading-container">
  <FaSpinner className="loader-icon" />
</div>
 }

  if (error) {

    return (

      <div className="orders-page">

        <div className="orders-error">

          <h2>{error}</h2>

        </div>

      </div>

    );

  }

  return (

    <div className="orders-page">

      {/* Header */}

      <div className="orders-header">

        <div>

          <h1>{t("orders.myOrders")}</h1>

          <p>{t("orders.trackAndManage")}</p>

        </div>

        <Link
          to="/productsShopNow"
          className="continue-shopping"
        >

          <FaArrowLeft />

          {t("orders.continueShopping")}

        </Link>

      </div>


      {orders.length === 0 ? (

        <div className="empty-orders">

          <FaBox className="empty-icon" />

          <h2>{t("orders.noOrdersYet")}</h2>

          <p>

            {t("orders.noOrdersDescription")}

          </p>

          <Link to="/productsShopNow">

            {t("orders.startShopping")}

          </Link>

        </div>

      ) : (

        <div className="orders-list">

          {orders.map((order) => (

            <div
              className="order-card"
              key={order._id}
            >

              {/* Order Top */}

              <div className="order-top">

                <div>

                  <span>{t("orders.orderId")}</span>

                  <strong>

                    #{order._id?.slice(0, 8)}

                  </strong>

                </div>

                <div>

                  <span>{t("orders.orderDate")}</span>

                  <strong>

                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}

                  </strong>

                </div>

                <div>

                  <span>{t("orders.total")}</span>

                  <strong>

                    $

                    {Number(
                      order.finalPrice || 0
                    ).toFixed(2)}

                  </strong>

                </div>

                <div
                  className={`order-status ${
                    order.status?.toLowerCase() || "pending"
                  }`}
                >

                  {order.status === "Pending"
                    ? t("orders.pending")
                    : order.status}

                </div>

              </div>


              <div className="order-products">

                {order.products?.map((item, index) => {

                  console.log("ORDER PRODUCT:", item);

                  const productImage =
                    item.image || item.images?.[0];

                  return (

                    <div
                      className="order-product"
                      key={
                        item.id ||
                        item._id ||
                        index
                      }
                    >

                      <img
                        src={productImage}
                        alt={t(
                          `products.${item.id}.title`,
                          {
                            defaultValue: item.title
                          }
                        )}
                      />

                      <div className="product-info">

                        <h3>

                          {t(
                            `products.${item.id}.title`,
                            {
                              defaultValue: item.title
                            }
                          )}

                        </h3>

                        <p>

                          {t("orders.quantity")}:{" "}

                          {item.quantity || 1}

                        </p>

                        <strong>

                          $

                          {Number(
                            item.price || 0
                          ).toFixed(2)}

                        </strong>

                      </div>

                    </div>

                  );

                })}

              </div>

              {/* Bottom */}

              <div className="order-bottom">

                <div className="delivery-info">

                  {order.status === "Delivered" ? (

                    <>

                      <FaCheck />

                      <span>

                        {t(
                          "orders.deliveredSuccessfully"
                        )}

                      </span>

                    </>

                  ) : (

                    <>

                      <FaTruck />

                      <span>

                        {t(
                          "orders.orderOnTheWay"
                        )}

                      </span>

                    </>

                  )}

                </div>

                <button
                  type="button"
                  className="view-order"
                >

                  {t(
                    "orders.viewOrderDetails"
                  )}

                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

};

export default Orders;