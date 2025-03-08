import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { useToast } from "@/components/ui/use-toast";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function ShoppingCheckout() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { cartItems } = useSelector((state) => state.shopCart);
  const shopOrder = useSelector((state) => state.shopOrder) || {}; // Ensure it's not undefined
  const { approvalURL } = shopOrder;


  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const [user, setUser] = useState(null);

  const auth = getAuth();

  // Firebase Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser); // ✅ Ensures we always have the latest user state
    });

    return () => unsubscribe();
  }, []);

  console.log(currentSelectedAddress, "cartItems");

  // Calculate Total Cart Amount
  const totalCartAmount =
    cartItems?.items?.length > 0
      ? cartItems.items.reduce(
          (sum, item) =>
            sum +
            (item?.salePrice > 0 ? item?.salePrice : item?.price) * item?.quantity,
          0
        )
      : 0;

  function handleInitiatePaypalPayment() {
    if (!user) {
      toast({ title: "You need to log in to proceed.", variant: "destructive" });
      return;
    }

    if (!cartItems?.items?.length) {
      toast({ title: "Your cart is empty. Please add items to proceed", variant: "destructive" });
      return;
    }

    if (!currentSelectedAddress) {
      toast({ title: "Please select an address to proceed.", variant: "destructive" });
      return;
    }

    const orderData = {
      userId: user.uid, // ✅ Firebase uses `uid` instead of `id`
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price: singleCartItem?.salePrice > 0 ? singleCartItem?.salePrice : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      console.log(data, "Order Response");
      setIsPaymentStart(data?.payload?.success || false);
    });
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems?.items?.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent key={item.productId} cartItem={item} />
              ))
            : <p className="text-gray-500">Your cart is empty.</p>}

          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">₹{totalCartAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-4 w-full">
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
              {isPaymentStart ? "Processing Paypal Payment..." : "Checkout with Paypal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
