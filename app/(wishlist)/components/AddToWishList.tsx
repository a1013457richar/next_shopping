"use client";

import { FaHeartCirclePlus } from "react-icons/fa6";
import { useWishlistStore } from "@/store/useWishList";
import { ProductType } from "@/types/ProductTypes";
import toast from "react-hot-toast";

const AddToWishList = ({
  name,
  id,
  image,
  unit_amount,
  quantity,
}: ProductType) => {
  const wishListStore = useWishlistStore();
  const addToWishList = () => {
    const existingItem = wishListStore.wishList.find((item) => item.id === id);
    if (existingItem) {
      toast.error(`${name} already in wishlist`);
    } else {
      wishListStore.addToWishlist({
        id,
        name,
        image,
        unit_amount,
        quantity: 1,
      });
      toast.success(`${name} added to wishlist`);
    }
  };
  return (
    <div onClick={addToWishList}>
        <FaHeartCirclePlus/>
    </div>
  );
};

export default AddToWishList;
