import { FaEnvelope, FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function Newsletter() {

  const { t } = useTranslation();

  const handleSubmit = (e) => {

    e.preventDefault();

    const email = e.target.email.value;

    if (!email) return;

    console.log("Subscribed:", email);

    e.target.reset();

  };

  return (

    <section className="newsletter">

      <div className="newsletter-container">

        <div className="newsletter-content">

          <div className="newsletter-icon">

            <FaEnvelope />

          </div>

          <div className="newsletter-text">

            <span>
              {t("newsletter.stayUpdated")}
            </span>

            <h2>
              {t("newsletter.latestDeals")}
            </h2>

            <p>
              {t("newsletter.description")}
            </p>

          </div>

        </div>

        <form

          className="newsletter-form"

          onSubmit={handleSubmit}

        >

          <div className="email-input">

            <FaEnvelope />

            <input

              type="email"

              name="email"

              placeholder={t("newsletter.emailPlaceholder")}

              required

            />

          </div>

          <button type="submit">

            {t("newsletter.subscribe")}

            <FaArrowRight />

          </button>

        </form>

      </div>

    </section>

  );

}

export default Newsletter;