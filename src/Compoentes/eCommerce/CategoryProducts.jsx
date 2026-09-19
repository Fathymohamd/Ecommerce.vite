import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams , useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { fetchProductsByCategory } from "../../Redux/createSlice";
import {fetchAllProducts} from "../../Redux/createSlice"
import {getCart , addToCart} from "../../Redux/cartSlice"
import {getCartwishlist    , addToCartwishlist} from "../../Redux/wishlistSlice"
import {FaSpinner , FaHeart} from "react-icons/fa";

function CategoryProducts() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();
const products = useSelector((state) => state.counter.selectedCategories);
const Loading = useSelector((state) => state.counter.Loading)
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

useEffect(()=>{
  dispatch(fetchAllProducts())
  dispatch(getCart())
  dispatch(getCartwishlist())
  dispatch(fetchProductsByCategory(category));
} , [dispatch, category])


const handleAddToCart = async (product) => {

  if (!user) {
    toast.error(t("Please login first"));
    setTimeout(()=>{
      navigate("/login");
    }, 2000)
    return;
  }

  const result = await dispatch(addToCart({
      productId: product._id,
      productModel: "externalproducts",
    }));
 
  if (addToCart.fulfilled.match(result)) {
    toast.success(t("Product added to cart!"), {
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
  } else {
    toast.error(result.payload || t("Something went wrong"));
  }
};

const getCartwishlistState = async (product) => {
  if (!user) {
    toast.error(t("Please login first"));
    setTimeout(()=>{
      navigate("/login");
    }, 2000)
    return;
  }
const res = await dispatch(addToCartwishlist({
      productId: product._id,
      productModel: "externalproducts",
    }));
if(addToCartwishlist.fulfilled.match(res)){
  toast.success(t("Product added to wishlist!"), {
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
}else {
     toast.error(result.payload || t("Something went wrong"));
}
}


 if(Loading){
  return <div className="loading-container">
  <FaSpinner className="loader-icon" />
</div>
 }

  return (
    <section className="category-products">

   <section className="category-products">
  <div className="category-products-container">

    <h1>
      {t(`categories.${category}`)}
    </h1>

    <div className="products-grid">
      {products?.map((item) => {

        return(
          <div className="product-card" key={item._id}>

          <button
            className="wishlist-btn"
            onClick={() => getCartwishlistState(item)}
            aria-label={t("categoryProducts.addToWishlist")}
          >
            <FaHeart />
          </button>

          <Link
            className="link"
            to={`/products/${item.id}`}
          >
            <img
              src={item.images?.[0]}
            
            />

            <h3>
              {t(`products.${item.id}.title`)}
            </h3>
 
            <p>${item.price}</p>
          </Link>

          <button onClick={() => handleAddToCart(item)}>
            {t("categoryProducts.addToCart")}
          </button>

        </div>
        )
      })}
    </div>

  </div>
</section>

    </section>
  );
}

export default CategoryProducts;