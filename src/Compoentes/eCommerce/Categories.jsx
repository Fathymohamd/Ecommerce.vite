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
import {  fetchProductsByCategory , toggleCategory } from "../../Redux/createSlice";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
function Categories() {
  let dispatch = useDispatch();
   const { t } = useTranslation();
const categories = [
  {
    id: 1,
    title: "Beauty",
    category: "beauty",
    icon: <FaSpa />,
  },
  {
    id: 2,
    title: "Fragrances",
    category: "fragrances",
    icon: <FaSprayCanSparkles />,
  },
  {
    id: 3,
    title: "Furniture",
    category: "furniture",
    icon: <FaCouch />,
  },
  {
    id: 4,
    title: "Groceries",
    category: "groceries",
    icon: <FaBasketShopping />,
  },
  {
    id: 5,
    title: "Home Decoration",
    category: "homeDecoration",
    icon: <FaHouse />,
  },
  {
    id: 6,
    title: "Kitchen Accessories",
    category: "kitchenAccessories",
    icon: <FaKitchenSet />,
  },
  {
    id: 7,
    title: "Laptops",
    category: "laptops",
    icon: <FaLaptop />,
  },
  {
    id: 8,
    title: "Men's Shirts",
    category: "mensShirts",
    icon: <FaShirt />,
  },
  {
    id: 9,
    title: "Men's Shoes",
    category: "mensShoes",
    icon: <FaShoePrints />,
  },
  {
    id: 10,
    title: "Men's Watches",
    category: "mensWatches",
    icon: <FaClock />,
  },
  {
    id: 11,
    title: "Mobile Accessories",
    category: "mobileAccessories",
    icon: <FaMobileScreenButton />,
  },
  {
    id: 12,
    title: "Motorcycle",
    category: "motorcycle",
    icon: <FaMotorcycle />,
  },
  {
    id: 13,
    title: "Skin Care",
    category: "skinCare",
    icon: <FaHeart />,
  },
  {
    id: 14,
    title: "Smartphones",
    category: "smartphones",
    icon: <FaMobileScreenButton />,
  },
  {
    id: 15,
    title: "Sports Accessories",
    category: "sportsAccessories",
    icon: <FaDumbbell />,
  },
  {
    id: 16,
    title: "Sunglasses",
    category: "sunglasses",
    icon: <FaGlasses />,
  },
  {
    id: 17,
    title: "Tablets",
    category: "tablets",
    icon: <FaTabletScreenButton />,
  },
  {
    id: 18,
    title: "Tops",
    category: "tops",
    icon: <FaShirt />,
  },
  {
    id: 19,
    title: "Vehicle",
    category: "vehicle",
    icon: <FaCar />,
  },
  {
    id: 20,
    title: "Women's Bags",
    category: "womensBags",
    icon: <FaBagShopping />,
  },
  {
    id: 21,
    title: "Women's Dresses",
    category: "womensDresses",
    icon: <FaPersonDress />,
  },
  {
    id: 22,
    title: "Women's Jewellery",
    category: "womensJewellery",
    icon: <FaGem />,
  },
  {
    id: 23,
    title: "Women's Shoes",
    category: "womensShoes",
    icon: <FaShoePrints />,
  },
  {
    id: 24,
    title: "Women's Watches",
    category: "womensWatches",
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
          <span>{t("categories.category")}</span>
        </h2>

        <p>
          {t("categories.description")}
        </p>
      </div>

      <a
        href="/productsShopNow"
        className="view-all"
      >
        {t("categories.viewAll")}
        <span>→</span>
      </a>

    </div>

    <div className="categories-grid">

      {categories.map((category) => (

        <Link
          className="link"
          to={`/category/${category.category}`}
        >

          <div
            onClick={() => {
              dispatch(toggleCategory(category));
              dispatch(fetchProductsByCategory(category));
            }}
            className="category-card"
            key={category.id}
          >

            <div className="category-icon">
              {category.icon}
            </div>

            <div className="category-info">
              <h3>{t(`categories.${category.category}`)}</h3>
             {/*  <p>{category.products}</p> */}
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