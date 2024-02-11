import Products from "@/components/Products";
import { fetchStripeProduct } from "../actions/getStripeProduct";

const page = async () => {
  const products = await fetchStripeProduct();
  return <Products allProducts={products} />;
};

export default page;
