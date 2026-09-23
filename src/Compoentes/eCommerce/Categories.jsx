import {
  FaSpa,
  FaSprayCanSparkles,
  FaCouch,
  FaBasketShopping,
  FaHouse,
  FaKitchenSet,
  FaLaptop,
  FaShirt,
  FaShoePrints,
  FaClock,
  FaMobileScreenButton,
  FaMotorcycle,
  FaHeart,
  FaDumbbell,
  FaGlasses,
  FaTabletScreenButton,
  FaCar,
  FaBagShopping,
  FaPersonDress,
  FaGem,
} from "react-icons/fa6";

import { useDispatch } from "react-redux";

import {
  fetchProductsByCategory,
  toggleCategory,
} from "../../Redux/createSlice";

import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

function Categories() {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const categories = [
    {
      id: 1,
      title: "Beauty",
      category: "beauty",
      translationKey: "beauty",
      icon: <FaSpa />,
    },
    {
      id: 2,
      title: "Fragrances",
      category: "fragrances",
      translationKey: "fragrances",
      icon: <FaSprayCanSparkles />,
    },
    {
      id: 3,
      title: "Furniture",
      category: "furniture",
      translationKey: "furniture",
      icon: <FaCouch />,
    },
    {
      id: 4,
      title: "Groceries",
      category: "groceries",
      translationKey: "groceries",
      icon: <FaBasketShopping />,
    },
    {
      id: 5,
      title: "Home Decoration",
      category: "home-decoration",
      translationKey: "homeDecoration",
      icon: <FaHouse />,
    },
    {
      id: 6,
      title: "Kitchen Accessories",
      category: "kitchen-accessories",
      translationKey: "kitchenAccessories",
      icon: <FaKitchenSet />,
    },
    {
      id: 7,
      title: "Laptops",
      category: "laptops",
      translationKey: "laptops",
      icon: <FaLaptop />,
    },
    {
      id: 8,
      title: "Men's Shirts",
      category: "mens-shirts",
      translationKey: "mensShirts",
      icon: <FaShirt />,
    },
    {
      id: 9,
      title: "Men's Shoes",
      category: "mens-shoes",
      translationKey: "mensShoes",
      icon: <FaShoePrints />,
    },
    {
      id: 10,
      title: "Men's Watches",
      category: "mens-watches",
      translationKey: "mensWatches",
      icon: <FaClock />,
    },
    {
      id: 11,
      title: "Mobile Accessories",
      category: "mobile-accessories",
      translationKey: "mobileAccessories",
      icon: <FaMobileScreenButton />,
    },
    {
      id: 12,
      title: "Motorcycle",
      category: "motorcycle",
      translationKey: "motorcycle",
      icon: <FaMotorcycle />,
    },
    {
      id: 13,
      title: "Skin Care",
      category: "skin-care",
      translationKey: "skinCare",
      icon: <FaHeart />,
    },
    {
      id: 14,
      title: "Smartphones",
      category: "smartphones",
      translationKey: "smartphones",
      icon: <FaMobileScreenButton />,
    },
    {
      id: 15,
      title: "Sports Accessories",
      category: "sports-accessories",
      translationKey: "sportsAccessories",
      icon: <FaDumbbell />,
    },
    {
      id: 16,
      title: "Sunglasses",
      category: "sunglasses",
      translationKey: "sunglasses",
      icon: <FaGlasses />,
    },
    {
      id: 17,
      title: "Tablets",
      category: "tablets",
      translationKey: "tablets",
      icon: <FaTabletScreenButton />,
    },
    {
      id: 18,
      title: "Tops",
      category: "tops",
      translationKey: "tops",
      icon: <FaShirt />,
    },
    {
      id: 19,
      title: "Vehicle",
      category: "vehicle",
      translationKey: "vehicle",
      icon: <FaCar />,
    },
    {
      id: 20,
      title: "Women's Bags",
      category: "womens-bags",
      translationKey: "womensBags",
      icon: <FaBagShopping />,
    },
    {
      id: 21,
      title: "Women's Dresses",
      category: "womens-dresses",
      translationKey: "womensDresses",
      icon: <FaPersonDress />,
    },
    {
      id: 22,
      title: "Women's Jewellery",
      category: "womens-jewellery",
      translationKey: "womensJewellery",
      icon: <FaGem />,
    },
    {
      id: 23,
      title: "Women's Shoes",
      category: "womens-shoes",
      translationKey: "womensShoes",
      icon: <FaShoePrints />,
    },
    {
      id: 24,
      title: "Women's Watches",
      category: "womens-watches",
      translationKey: "womensWatches",
      icon: <FaClock />,
    },
  ];

  return (
    <section className="categories-section">
      <div className="categories-container">

        <div className="categories-header">

          <div>

            <span className="section-label">
              {t("categories.exploreOurStore")}
            </span>

            <h2>
              {t("categories.shopBy")}{" "}
              <span>
                {t("categories.category")}
              </span>
            </h2>

            <p>
              {t("categories.description")}
            </p>

          </div>

          <Link
            to="/productsShopNow"
            className="view-all"
          >
            {t("categories.viewAll")}
            <span>→</span>
          </Link>

        </div>

        <div className="categories-grid">

          {categories.map((category) => (

            <Link
              className="link"
              to={`/category/${category.category}`}
              key={category.id}
            >

              <div
                onClick={() => {
                  dispatch(toggleCategory(category));

                  dispatch(
                    fetchProductsByCategory(
                      category.category
                    )
                  );
                }}
                className="category-card"
              >

                <div className="category-icon">
                  {category.icon}
                </div>

                <div className="category-info">

                  <h3>
                    {t(
                      `categories.${category.category}`
                    )}
                  </h3>

                </div>

                <span className="category-arrow">
                  →
                </span>

              </div>

            </Link>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Categories;