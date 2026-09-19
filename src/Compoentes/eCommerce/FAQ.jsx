import { useState } from "react";
import {
  FaCircleQuestion,
  FaPlus,
  FaMinus,
} from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { t } = useTranslation();

const faqs = [
  {
    question: "faq.howPlaceOrder.question",
    answer: "faq.howPlaceOrder.answer",
  },
  {
    question: "faq.deliveryTime.question",
    answer: "faq.deliveryTime.answer",
  },
  {
    question: "faq.freeShipping.question",
    answer: "faq.freeShipping.answer",
  },
  {
    question: "faq.returnOrder.question",
    answer: "faq.returnOrder.answer",
  },
  {
    question: "faq.refund.question",
    answer: "faq.refund.answer",
  },
  {
    question: "faq.securePayment.question",
    answer: "faq.securePayment.answer",
  },
  {
    question: "faq.contactSupport.question",
    answer: "faq.contactSupport.answer",
  },
  
];


  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (

<div className="faq-page">

  <div className="faq-hero">
    <FaCircleQuestion />

    <h1>
      {t("faq.frequentlyAskedQuestions")}
    </h1>

    <p>
      {t("faq.description")}
    </p>
  </div>

  <section className="faq-container">

    <h2>
      {t("faq.howCanWeHelp")}
    </h2>

    <div className="faq-list">

      {faqs.map((faq, index) => (

        <div className="faq-item" key={index}>

          <button
            type="button"
            className="faq-question"
            onClick={() => toggleFAQ(index)}
          >

            <span>
              {t(faq.question)}
            </span>

            {openIndex === index ? (
              <FaMinus />
            ) : (
              <FaPlus />
            )}

          </button>

          {openIndex === index && (

            <div className="faq-answer">

              <p>
                {t(faq.answer)}
              </p>

            </div>

          )}

        </div>

      ))}

    </div>

  </section>

</div>

  );
};

export default FAQ;