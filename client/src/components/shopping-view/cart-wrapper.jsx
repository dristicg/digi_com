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

  let cartItems = [];
  try {
    cartItems = useSelector((state) => state.shoppingCart?.cartItems || []);
  } catch (error) {
    console.error("Error accessing Redux state:", error);
  }

  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("✅ User logged in:", user.uid);
        setUserId(user.uid);
        dispatch(getCartItems(user.uid));
      } else {
        console.warn("❌ User not logged in.");
        setUserId(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!userId) {
    return <p className="text-red-500">You must be logged in to view your cart.</p>;
  }

  const totalCartAmount = cartItems.reduce(
    (sum, currentItem) =>
      sum + (currentItem?.salePrice || currentItem?.price) * currentItem?.quantity,
    0
  );

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems.length > 0
          ? cartItems.map((item) => (
              <UserCartItemsContent key={item._id} cartItem={item} />
            ))
          : <p className="text-gray-500">Your cart is empty.</p>}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount}</span>
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
