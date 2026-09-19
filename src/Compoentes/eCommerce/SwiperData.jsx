import {
  FaArrowRight,
  FaShippingFast,
  FaShieldAlt,
  FaHeadset,
  FaTags,
} from "react-icons/fa";

import { useTranslation } from "react-i18next";

function SwiperData() {
  const { t } = useTranslation();

  return (
    <main className="home">
      <section className="hero">
        <div className="hero-container">

          <div className="hero-content">
            <span className="hero-badge">
              {t("hero.newCollection")}
            </span>

            <h1>
              {t("hero.discoverProducts")}
              <br />
              {t("hero.youll")} <span>{t("hero.love")}</span>
            </h1>

            <p>
              {t("hero.description")}
            </p>

            <div className="hero-buttons">
              <a href="/productsShopNow" className="primary-btn">
                {t("hero.shopNow")}
                <FaArrowRight />
              </a>

              <a href="/wishlis" className="secondary-btn">
                {t("hero.viewWishlist")}
              </a>
            </div>

            {/* Small Stats */}
            <div className="hero-stats">
              <div>
                <strong>10K+</strong>
                <span>{t("hero.products")}</span>
              </div>

              <div>
                <strong>5K+</strong>
                <span>{t("hero.customers")}</span>
              </div>

              <div>
                <strong>4.9</strong>
                <span>{t("hero.rating")}</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="hero-image">
            <div className="hero-circle"></div>

            <div className="floating-card card-one">
              <FaTags />

              <div>
                <strong>50% OFF</strong>
                <span>{t("hero.specialOffers")}</span>
              </div>
            </div>

            <div className="floating-card card-two">
              <FaShippingFast />

              <div>
                <strong>{t("hero.freeShipping")}</strong>
                <span>{t("hero.onOrdersOver50")}</span>
              </div>
            </div>

            <div className="product-showcase">
              <div className="showcase-icon">🛍️</div>

              <h3>ShopZone</h3>

              <p>
                {t("hero.everythingYouNeed")}
                <br />
                {t("hero.allInOnePlace")}
              </p>
            </div>
          </div>

        </div>
      </section>

      <section className="features">
        <div className="features-container">

          <div className="feature">
            <div className="feature-icon">
              <FaShippingFast />
            </div>

            <div>
              <h3>{t("hero.fastDelivery")}</h3>
              <p>{t("hero.quickReliableDelivery")}</p>
            </div>
          </div>

          <div className="feature">
            <div className="feature-icon">
              <FaShieldAlt />
            </div>

            <div>
              <h3>{t("hero.securePayment")}</h3>
              <p>{t("hero.secureCheckout")}</p>
            </div>
          </div>

          <div className="feature">
            <div className="feature-icon">
              <FaHeadset />
            </div>

            <div>
              <h3>{t("hero.support247")}</h3>
              <p>{t("hero.alwaysHereToHelp")}</p>
            </div>
          </div>

          <div className="feature">
            <div className="feature-icon">
              <FaTags />
            </div>

            <div>
              <h3>{t("hero.bestPrices")}</h3>
              <p>{t("hero.greatDealsEveryDay")}</p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

export default SwiperData;