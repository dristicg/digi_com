
import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { useToast } from "../ui/use-toast";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  //const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();
  const [user, setUser] = useState(null);

  function handleManageAddress(event) {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: "You can add max 3 addresses",
        variant: "destructive",
      });

      return;
    }

    console.log("User Object from Firebase:", user);
    console.log("User ID from Firebase:", user?.uid);

    currentEditedId !== null
  ? dispatch(
      editaAddress({
        userId: user?.uid,
        addressId: currentEditedId,
        formData,
      })
    ).then((data) => {
      console.log("Edit Address - Sent Data:", {
        userId: user?.uid,
        addressId: currentEditedId,
        formData,
      });

      console.log("Edit Address - Response Data:", data);

      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.uid));
        setCurrentEditedId(null);
        setFormData(initialAddressFormData);
        toast({
          title: "Address updated successfully",
        });
      }
    })
    
  : dispatch(
      addNewAddress({ 
        ...formData,
        userId: user?.uid,
      })
    ).then((data) => {
      console.log("Add New Address - Sent Data:", {
        ...formData,
        userId: user?.uid,
      });
      console.log(
        "Sending this data to API:", 
        JSON.stringify({
          ...formData,
          userId: user?.uid,
        })
      );

      console.log("Add New Address - Response Data:", data);

      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.uid));
        setFormData(initialAddressFormData);
        toast({
          title: "Address added successfully",
        });
      }
    });
  }


  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.uid, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.uid));
        toast({
          title: "Address deleted successfully",
        });
      }
    });
  }

  function handleEditAddress(getCuurentAddress) {
    setCurrentEditedId(getCuurentAddress?._id);
    setFormData({
      ...formData,
      address: getCuurentAddress?.address,
      city: getCuurentAddress?.city,
      phone: getCuurentAddress?.phone,
      pincode: getCuurentAddress?.pincode,
      notes: getCuurentAddress?.notes,
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchAllAddresses(user?.uid));
    }
  }, [dispatch, user?.uid]);

  useEffect(() => {
    console.log("Updated Address List:", addressList);
  }, [addressList]);
  

  useEffect(() => {
    if (user) {
      console.log("Firebase User Loaded:", user);
    }
  }, [user]);

    // 🔹 Fetch authenticated user from Firebase
    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        console.log("Firebase Auth User:", currentUser);
      });
      return () => unsubscribe(); // Cleanup on unmount
    }, []);

  console.log(addressList, "addressList");

  return (
    <Card key={addressList.length}>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
            <AddressCard
              selectedId={selectedId}
              handleDeleteAddress={handleDeleteAddress}
              addressInfo={singleAddressItem}
              handleEditAddress={handleEditAddress}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
            />
          ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;