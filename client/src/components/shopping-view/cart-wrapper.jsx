

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../store/shop/cart-slice";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function UserCartWrapper({ setOpenCartSheet }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Ensure cart data is correctly extracted from Redux state
  const cartData = useSelector((state) => state.shopCart);
  const cartItems = Array.isArray(cartData?.cartItems) ? cartData.cartItems : [];

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log("✅ User logged in:", user.uid);
        setUserId(user.uid);
      } else {
        console.warn("❌ User not logged in.");
        setUserId(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      // console.log("📥 Fetching cart for userId:", userId);
      dispatch(getCartItems());
    } else {
      // console.warn("⚠️ Skipping fetch, userId is undefined");
    }
  }, [userId, dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!userId) {
    return <p className="text-red-500">You must be logged in to view your cart.</p>;
  }

  // console.log("🛒 Cart Items Structure:", cartItems);

  if (!Array.isArray(cartItems)) {
   // console.error("❌ cartItems is not an array:", cartItems);
  }

  // ✅ Ensure the total price calculation handles both `salePrice` and `price`
  const totalCartAmount = cartItems.reduce(
    (sum, currentItem) =>
      sum + (currentItem?.salePrice || currentItem?.price || 0) * (currentItem?.quantity || 1),
    0
  );

  return (
    <SheetContent className="sm:max-w-md max-h-[100vh] overflow-y-auto">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>

      {/* <div className="mt-8 space-y-4">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            
            <div key={index}>
              <h2>{item.title ? item.title : "Unnamed Product"}</h2>
              <p>Quantity: {item.quantity ? item.quantity : "Not Available"}</p>
              <p>Price: ₹{item.price}</p>
              <img src={item.image} alt={item.title || "Product Image"} />
            </div>
          ))
        ) : (
          <p>🛒 Your cart is empty!</p>
        )}

      </div> */}

<div className="mt-8 space-y-4">
  {cartItems.length > 0 ? (
    cartItems.map((cartItem, index) => (
      <UserCartItemsContent key={index} cartItem={cartItem} />
    ))
  ) : (
    <p>🛒 Your cart is empty!</p>
  )}
</div>



      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">₹{totalCartAmount.toFixed(2)}</span>
        </div>
      </div>

      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6 bg-black text-white hover:bg-gray-900"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
