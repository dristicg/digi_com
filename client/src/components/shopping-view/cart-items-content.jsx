

import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";


function UserCartItemsContent({ cartItem }) {
  const dispatch = useDispatch();
  const { toast } = useToast();

  // Get user info


  const auth = getAuth();
  const [user, setUser] = useState(null);

  

  // Get cart state
  const cartState = useSelector((state) => state.shopCart);
  const cartItems = cartState?.items || [];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser); // ✅ Set Firebase user state
    });

    return () => unsubscribe();
  }, []);

  // Get product list (if needed)
  const { productList } = useSelector((state) => state.shopProducts);

  console.log("🛒 Current cart items:", cartItems);
  console.log("🛒 Rendering UserCartItemsContent for:", cartItem);

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (!user) {
      console.warn("⚠️ No user logged in, cannot update cart.");
      return;
    }

    const newQuantity = typeOfAction === "plus" ? getCartItem.quantity + 1 : getCartItem.quantity - 1;

    if (newQuantity < 1) return; // Prevents negative quantities

    console.log("🔄 Button Clicked! Updating quantity for:", getCartItem);
    console.log("👉 Action:", typeOfAction, "| New Quantity:", newQuantity);


    console.log("📤 Dispatching updateCartQuantity with:", {
      userId: user?.uid,
      productId: getCartItem?.productId,
      quantity: newQuantity,
    });

    dispatch(updateCartQuantity({
      userId: user.uid,  // 🔥 Firebase uses `uid`, not `id`
      productId: getCartItem.productId,
      quantity: newQuantity,
    })).then((data) => {
      console.log("📤 Update Cart Response:", data); // Debug response
    
      if (data?.payload?.success) {
        toast({ title: "Cart item updated successfully" });
      } else {
        console.error("❌ Failed to update cart item", data);
        // console.error("📌 Payload:", data?.payload);
        // console.error("📌 Error:", data?.error);
      }
    });
    
  }

  function handleCartItemDelete(getCartItem) {
    if (!user) {
      console.warn("⚠️ No user logged in, cannot delete item.");
      return;
    }

    dispatch(deleteCartItem({ userId: user.uid, productId: getCartItem.productId }))
      .then((data) => {
        if (data?.payload?.success) {
          toast({ title: "Cart item deleted successfully" });
        } else {
          console.error("❌ Failed to delete cart item", data);
        }
      });
  }

  return (
    <div className="flex items-center space-x-4 border-b pb-4">
      {/* Product Image */}
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />

      {/* Product Details */}
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-1">
        {console.log("🛠 Rendering Buttons for:", cartItem)}
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
          </Button>

          <span className="font-semibold">{cartItem?.quantity ?? 1}</span>

          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Price & Delete */}
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          ₹{((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) * cartItem?.quantity).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;
