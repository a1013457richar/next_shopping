import { fetchStripeProduct } from "../app/actions/getStripeProduct";
import ProductCard from "./ProductCard";
import Link from "next/link";
const NewProducts = async () => {
  const products = await fetchStripeProduct();
  const newProducts = products.filter(
    (product) => product.metadata?.new === "true"
  );
  return (
    <div className="py-10 border-t">
      <div className="main-container">
        <div className="flex justify-between items-center">
          <h1 className="text-xl uppercase border-b border-gray-900 text-gray-900">
            New Products
          </h1>
          <Link href={"/shop"} className="hover:underline">
            <span>View More &#8594;</span>
          </Link>
        </div>
        <div className="grid lg:grid-cols-4 gap-5 grid-cols-2">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewProducts;
