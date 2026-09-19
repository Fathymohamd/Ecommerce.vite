import {
  FaTruckFast,
  FaShieldHalved,
  FaHeadset,
  FaRotateLeft,
} from "react-icons/fa6";

import { useTranslation } from "react-i18next";

function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <FaTruckFast />,
      title: "features.fastFreeShipping.title",
      description: "features.fastFreeShipping.description",
    },
    {
      icon: <FaShieldHalved />,
      title: "features.securePayment.title",
      description: "features.securePayment.description",
    },
    {
      icon: <FaHeadset />,
      title: "features.customerSupport.title",
      description: "features.customerSupport.description",
    },
    {
      icon: <FaRotateLeft />,
      title: "features.easyReturns.title",
      description: "features.easyReturns.description",
    },
  ];

  return (
    <section className="features-section">
      <div className="features-container">

        {features.map((feature, index) => (
          <div
            className="feature-card"
            key={index}
          >
            <div className="feature-icon">
              {feature.icon}
            </div>

            <div className="feature-content">
              <h3>
                {t(feature.title)}
              </h3>

              <p>
                {t(feature.description)}
              </p>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}

export default Features;

