import { Product } from "@prisma/client";
import ProductGallery from "@/components/ProductGallery/ProductGallery";
import { PRODUCTS_ENDPOINT } from "../../../public/config/constants";

const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(PRODUCTS_ENDPOINT);
  const data: Product[] = await res.json();

  return data;
};

export default async function Products() {
  const products: Product[] = await getProducts();
  console.log("products: ", products);

  return (
    <div>
      <ProductGallery products={products} />
    </div>
  );
}
