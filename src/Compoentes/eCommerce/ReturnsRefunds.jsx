import {
  FaRotateLeft,
  FaMoneyBillTransfer,
  FaBoxOpen,
  FaCircleCheck,
} from "react-icons/fa6";

import { useTranslation } from "react-i18next";

const ReturnsRefunds = () => {
  const { t } = useTranslation();

  const returnSteps = [
    {
      icon: <FaBoxOpen />,
      title: t("returnsRefunds.requestReturn"),
      text: t("returnsRefunds.requestReturnText"),
    },
    {
      icon: <FaCircleCheck />,
      title: t("returnsRefunds.productInspection"),
      text: t("returnsRefunds.productInspectionText"),
    },
    {
      icon: <FaMoneyBillTransfer />,
      title: t("returnsRefunds.getRefund"),
      text: t("returnsRefunds.getRefundText"),
    },
  ];

  return (
    <div className="returns-page">
      <div className="returns-hero">
        <FaRotateLeft />

        <h1>{t("returnsRefunds.title")}</h1>

        <p>{t("returnsRefunds.description")}</p>
      </div>

      <section className="returns-container">
        <div className="returns-intro">
          <h2>{t("returnsRefunds.ourReturnPolicy")}</h2>

          <p>{t("returnsRefunds.policyDescription")}</p>
        </div>

        <div className="return-cards">
          {returnSteps.map((item, index) => (
            <div className="return-card" key={index}>
              <div className="return-icon">
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <div className="return-conditions">
          <h2>{t("returnsRefunds.returnConditions")}</h2>

          <ul>
            <li>{t("returnsRefunds.condition1")}</li>
            <li>{t("returnsRefunds.condition2")}</li>
            <li>{t("returnsRefunds.condition3")}</li>
            <li>{t("returnsRefunds.condition4")}</li>
            <li>{t("returnsRefunds.condition5")}</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ReturnsRefunds;