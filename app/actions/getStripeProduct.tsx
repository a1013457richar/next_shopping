import Stripe from "stripe";
import { metadata } from "../layout";

export const fetchStripeProduct = async () => {
  const getProduct = async () => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: "2023-10-16",
    });
    const product = await stripe.products.list({
      limit: 99,
    });
    const priceMap = new Map();

    const prices = await stripe.prices.list({
      limit: 99,
    });
    prices.data.forEach((price) => {
      if (price.product) {
        if (!priceMap.has(price.product)) {
          //設定健值對
          priceMap.set(price.product, price);
        } else {
          const existingPrices = priceMap.get(price.product);
          if (price.created > existingPrices.created) {
            priceMap.set(price.product, price);
          }
        }
      }
    });
    const allProducts = product.data.map((product) => {
      const price = priceMap.get(product.id);
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        image: product.images[0],
        price_id: price ? price.id : null,
        unit_amount: price ? price.unit_amount : null,
        currency: price ? price.currency : null,
        metadata: product.metadata,
      };
    });
    return allProducts;
  };
  const products = await getProduct();
  return products;
};
