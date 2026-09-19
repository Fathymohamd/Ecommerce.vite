import { FaArrowRight, FaBolt } from "react-icons/fa";
import { useTranslation } from "react-i18next";



function BigDeals() {
  const { t } = useTranslation();
  return (
<section className="big-deals">
  <div className="big-deals-container">
    <div className="deal-content">

      <div className="deal-label">
        <FaBolt />
        {t("bigDeals.limitedTimeOffer")}
      </div>

      <h2>
        {t("bigDeals.bigDeals")}
        <br />
        {t("bigDeals.bigSavings")}
      </h2>

      <p>
        {t("bigDeals.description")}
      </p>

      <div className="deal-discount">
        <strong>{t("bigDeals.upTo")}</strong>
        <span>50%</span>
        <strong>{t("bigDeals.off")}</strong>
      </div>

      <a
        href="/productsShopNow"
        className="deal-button"
      >
        {t("bigDeals.shopDeals")}
        <FaArrowRight />
      </a>

    </div>

    <div className="deal-image">
      <img
        src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1000&q=80"
        alt={t("bigDeals.bigDeals")}
      />
    </div>

  </div>
</section>
  );
}

export default BigDeals;