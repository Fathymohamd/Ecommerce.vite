import {
  FaTruckFast,
  FaBox,
  FaLocationDot,
  FaClock,
  FaMapLocationDot,
} from "react-icons/fa6";

import { useTranslation } from "react-i18next";

const ShippingDelivery = () => {
  const { t } = useTranslation();

  const shippingOptions = [
    {
      icon: <FaTruckFast />,
      title: t("shippingDelivery.standardShipping"),
      text: t("shippingDelivery.standardShippingText"),
      price: "15 EGP",
    },
    {
      icon: <FaTruckFast />,
      title: t("shippingDelivery.freeShipping"),
      text: t("shippingDelivery.freeShippingText"),
      price: "FREE",
    },
    {
      icon: <FaClock />,
      title: t("shippingDelivery.expressShipping"),
      text: t("shippingDelivery.expressShippingText"),
      price: "50 EGP",
    },
  ];

  return (
    <div className="shipping-page">
      <div className="shipping-hero">
        <FaTruckFast />

        <h1>{t("shippingDelivery.title")}</h1>

        <p>{t("shippingDelivery.description")}</p>
      </div>

      <section className="shipping-container">
        <h2>{t("shippingDelivery.shippingOptions")}</h2>

        <div className="shipping-grid">
          {shippingOptions.map((item, index) => (
            <div className="shipping-card" key={index}>
              <div className="shipping-icon">
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <p>{item.text}</p>

              <strong>{item.price}</strong>
            </div>
          ))}
        </div>

        <div className="shipping-info">

          <div>
            <FaBox />

            <div>
              <h3>{t("shippingDelivery.orderProcessing")}</h3>

              <p>
                {t("shippingDelivery.orderProcessingText")}
              </p>
            </div>
          </div>

          <div>
            <FaLocationDot />

            <div>
              <h3>{t("shippingDelivery.deliveryAreas")}</h3>

              <p>
                {t("shippingDelivery.deliveryAreasText")}
              </p>
            </div>
          </div>

          <div>
            <FaMapLocationDot />

            <div>
              <h3>{t("shippingDelivery.trackYourOrder")}</h3>

              <p>
                {t("shippingDelivery.trackYourOrderText")}
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ShippingDelivery;