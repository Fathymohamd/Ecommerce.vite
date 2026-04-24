import React, { useEffect, useState } from 'react'
import { useSelector  , useDispatch } from "react-redux";
import { fetchAllProducts, addToCart , Remove  , increaseQuantity , decreaseQuantity } from "../Redux/createSlice";
import { Link } from 'react-router-dom';


function Cart() {
  const loading = useSelector((state) => state.counter.Loading);
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.counter.cartData);
  const totalPrice = cartData.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

return (
<div>
<div>

{loading ? (<h1>tt</h1>) : cartData.length === 0 ? 
(<p className='cart_is'>Cart is empty</p>) : (
    cartData?.map((item) => (
    <div className="ToCart" key={item.id}>
      <img id='item_ToCart' src={item.images?.[0] || item.image} alt={item.title} />
      <div className="cart_addtocart">
        <div className="nmber">
    <span onClick={() => dispatch(decreaseQuantity(item.id))}>-</span>
    <p>{item.quantity}</p>
    <span onClick={() => dispatch(increaseQuantity(item.id))}>+</span>
        </div>

        <div id='item_peice'>${item.price}</div>
      
      </div>

      <div className="Remove" onClick={()=>dispatch(Remove(item.id))}>Remove</div>
    </div>
  ))
)}
  <div className="hr"></div>
  <div className="checkout">
    <div className="checkout_button">
      <p>checkout</p>
      <Link to="/ContinueShopping" className='link'><p>Continue Shopping</p></Link>
    </div>

    <div className="PriceTootle">Total Price: ${totalPrice.toFixed(2)}</div>
  </div>
</div>
</div>

   )
}

export default Cart








