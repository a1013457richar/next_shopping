"use client";

import { useState } from "react";
import Image from "next/image";
import { FaHeartCirclePlus, FaEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import { ProductType } from "@/types/ProductTypes";
import AddCart from "@/app/(shoppingcart)/components/ui/AddCart";
import formatPrice from "@/utils/formatPrice";
import AddToWishlistButton from "@/app/(wishlist)/components/AddToWishList";

const ProductCard = ({ product }: { product: ProductType }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const isSizeSelected = selectedSize !== "";
  const showToast = () => {
    toast.error("Please select a size");
  }
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative group">
        <Image
          src={product.image}
          alt={`${product.name}`}
          width={300}
          height={300}
          className="cursor-pointer "
        />
        <div className="hidden absolute top-5 items-center justify-center group-hover:flex flex-col gap-3">
          <button className="mx-2 bg-gray-900 border text-white p-2 rounded-md hover:bg-gray-900/75">
            <AddToWishlistButton
              name={product.name}
              image={product.image}
              id={product.id}
              unit_amount={product.unit_amount}
              quantity={product.quantity}
            />
          </button>
          <button className="mx-2 bg-gray-900 border text-white p-2 rounded-md hover:bg-gray-900/75">
            <FaEye />
          </button>
        </div>
      </div>
      <h3 className="font-bold tracking-wide">{product.name}</h3>
      <span>{formatPrice(product.unit_amount)}</span>
      <select
        value={selectedSize}
        onChange={(e) => setSelectedSize(e.target.value)}
        className="my-2 p-2 border rounded-md"
      >
        <option value="">Select Size</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
      <AddCart
        name={product.name}
        image={product.image}
        price={product.unit_amount}
        id={product.price_id!}
        sizeSelect={isSizeSelected}
        size={selectedSize}
        onClick={!isSizeSelected ? showToast : undefined}
        currency="USD"
      />
    </div>
  );
};

export default ProductCard;
