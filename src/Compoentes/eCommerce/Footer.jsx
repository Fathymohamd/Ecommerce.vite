
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";


function Footer() {
const { t } = useTranslation();
return (
  <footer className="footer">
  <div className="footer-top">
    <div className="footer-container">

      <div className="footer-column footer-brand">
        <a href="/" className="footer-logo">
          Shop<span>Zone</span>
        </a>

        <p>
          {t("footer.description")}
        </p>

        <div className="footer-social">
          <a
            href="https://www.facebook.com/"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>

          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>

          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <FaYoutube />
          </a>

          <a
            href="https://www.linkedin.com/in/fathy-mohamed-1231ba2a1/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      {/* SHOP */}
      <div className="footer-column">
        <h3>{t("footer.shop")}</h3>

        <ul>
          <li>
            <a href="/productsShopNow">
              {t("footer.allProducts")}
            </a>
          </li>

          <li>
            <a href="/categories">
              {t("footer.categories")}
            </a>
          </li>

          <li>
            <a href="/bestSellers">
              {t("footer.bestSellers")}
            </a>
          </li>

          <li>
            <a href="/newArrivals">
              {t("footer.newArrivals")}
            </a>
          </li>

          <li>
            <a href="/BigDeals">
              {t("footer.dealsOffers")}
            </a>
          </li>
        </ul>
      </div>

      {/* CUSTOMER SERVICE */}
      <div className="footer-column">
        <h3>{t("footer.customerService")}</h3>

        <ul>
          <li>
            <a href="/contact">
              {t("footer.contactUs")}
            </a>
          </li>

          <li>
            <a href="/features">
              {t("footer.shippingDelivery")}
            </a>
          </li>

          <li>
            <a href="/shipping-delivery">
              {t("footer.returnsRefunds")}
            </a>
          </li>

          <li>
            <a href="/faq">
              {t("footer.faq")}
            </a>
          </li>

          <li>
            <a href="/returns-refunds">
              {t("footer.privacyPolicy")}
            </a>
          </li>
        </ul>
      </div>

      {/* ACCOUNT */}
      <div className="footer-column">
        <h3>{t("footer.myAccount")}</h3>

        <ul>
          <li>
            <a href="/login">
              {t("footer.login")}
            </a>
          </li>

          <li>
            <a href="/register">
              {t("footer.createAccount")}
            </a>
          </li>

          <li>
            <a href="/order">
              {t("footer.myOrders")}
            </a>
          </li>

          <li>
            <a href="/cart">
              {t("footer.shoppingCart")}
            </a>
          </li>

          <li>
            <a href="/wishlis">
              {t("footer.wishlist")}
            </a>
          </li>
        </ul>
      </div>

      {/* CONTACT */}
      <div className="footer-column footer-contact">
        <h3>{t("footer.contactUs")}</h3>

        <div className="contact-item">
          <FaMapMarkerAlt />

          <span>
            123 Main Street,
            <br />
            Cairo, Egypt
          </span>
        </div>

        <div className="contact-item">
          <FaPhone />

          <span>
            +20 100 000 0000
          </span>
        </div>

        <div className="contact-item">
          <FaEnvelope />

          <span>
            support@shopzone.com
          </span>
        </div>
      </div>

    </div>
  </div>

  {/* ================= PAYMENT ================= */}
  <div className="footer-middle">
    <div className="footer-container footer-middle-container">

      <div className="secure-payment">
        <strong>
          {t("footer.securePayments")}
        </strong>

        <span>
          {t("footer.paymentProtected")}
        </span>
      </div>

      <div className="payment-methods">

        <div className="payment-icon">
          <FaCcVisa />
        </div>

        <div className="payment-icon">
          <FaCcMastercard />
        </div>

        <div className="payment-icon">
          <FaCcPaypal />
        </div>

      </div>
    </div>
  </div>

  {/* ================= BOTTOM ================= */}
  <div className="footer-bottom">
    <div className="footer-container footer-bottom-container">

      <p>
        © 2026 ShopZone. {t("footer.allRightsReserved")}
      </p>

      <div className="footer-bottom-links">

        <a href="#">
          {t("footer.privacy")}
        </a>

        <a href="#">
          {t("footer.terms")}
        </a>

        <a href="#">
          {t("footer.cookies")}
        </a>

      </div>

    </div>
  </div>
</footer>
)

}

export default Footer;