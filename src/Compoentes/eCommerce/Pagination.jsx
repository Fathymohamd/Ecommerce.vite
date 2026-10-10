import React, { useState, useEffect } from "react";

import { Link } from 'react-router-dom'

import { FaStar } from "react-icons/fa";

import { useSelector, useDispatch } from 'react-redux'

import { fetchAllProducts, addToCart } from "../../Redux/createSlice"

import { useTranslation } from "react-i18next"

import { toast } from "react-toastify";
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
  FaPen,
  FaTrash
} from "react-icons/fa6";
function Pagination() {
  
  const [currentPage, setCurrentPage] = useState(1);

  const [products, setProducts] = useState([]);

  const handleAddToCart = (product) => {

    dispatch(addToCart(product));

    toast.success(t("pagination.productAddedToCart"), {

      duration: 3000,

      position: "top-right",

      style: {
        background: "#ffffff",
        color: "#222",
        border: "1px solid #e5e5e5",
        borderRadius: "12px",
        padding: "14px 18px",
        fontSize: "15px",
        fontWeight: "500",
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.12)",
      },

    });

  };


  const [search, setSearch] = useState("");

  const Data = useSelector((state) => state.counter.data);


  const dispatch = useDispatch();
const [selectedCategory , setselectedCategory] = useState("All Categories")

useEffect(()=>{
  dispatch(fetchAllProducts())
} , [dispatch])


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


  const deleteProduct = (id) => {
    setselectedCategory(
      selectedCategory.filter((product) => product.id !== id)
    );
  };



const filteredProducts = Data.filter((product) => {
  const matchesCategory =
    selectedCategory === "All Categories" ||
    product.category === selectedCategory;

  const matchesSearch = product.title
    ?.toLowerCase()
    .includes(search.toLowerCase());

  return matchesCategory && matchesSearch;
});



  // const productsToShow =
  //   selectedCategories.length === 0
  //     ? products
  //     : data.filter((item) =>
  //       selectedCategories.includes(item.category)
  //     );

  const { t, i18n } = useTranslation()

  useEffect(() => {

    dispatch(fetchAllProducts())

    paginationRouter(products);

  }, [dispatch])

  const pages = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20
  ];

  const paginationRouter = async (page) => {

    const res = await fetch(
      `https://ecommerce-vite-two.vercel.app/api/product?page=${page}&limit=10`
    );

    const data = await res.json();

    setProducts(data.products);

  };

  const handlePageClick = (page) => {

    setCurrentPage(page);

    paginationRouter(page);

  };

  return (

    <div>


       


 {/* <div className="Raincoats1">
  {productsToShow.length > 0 ? (
    productsToShow.map((item) => (
      <div className="array" key={item.id}>
        <div className="products">

          <Link
            className="link"
            to={`/products/${item.id}`}
          >
            <img
              id="image"
              src={item.images?.[0]}
              alt={item.title}
            />

            <div
              className="title_item"
              title={t(`products.${item.id}.title`, {
                defaultValue: item.title,
              })}
            >
              {t(`products.${item.id}.title`, {
                defaultValue: item.title,
              })}
            </div>

            <div className="statr">
              <FaStar color="rgb(255, 255, 0)" />
              <FaStar color="rgb(255, 255, 0)" />
              <FaStar color="rgb(255, 255, 0)" />
              <FaStar color="rgb(255, 255, 0)" />
            </div>
          </Link>

          <div className="price">
            <span>$ {item.price}</span>

            <button
              className="buttonAdd"
              onClick={() => handleAddToCart(item)}
            >
              {t("pagination.addToCart")}
            </button>
          </div>

        </div>
      </div>
    ))
  ) : (
    <div className="no-products">
      No products found
    </div>
  )}
</div> */}


      <div className="pagination">

        <p>{t("pagination.prev")}</p>

        {pages.map((item) => (

          <p
            key={item}
            className={currentPage === item ? "active" : ""}
            onClick={() => handlePageClick(item)}
          >

            {item}

          </p>

        ))}

        <p>{t("pagination.next")}</p>

      </div>

    </div>

  );

}

export default Pagination;