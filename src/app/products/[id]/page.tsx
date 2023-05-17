import { Product } from "@prisma/client";
import { PRODUCTS_ENDPOINT } from "../../../../public/config/constants";
import ProductDetails from "@/components/ProductDetails/ProductDetails";

const getProduct = async (id: string): Promise<Product> => {
  const res = await fetch(`${PRODUCTS_ENDPOINT}/?id=${id}`, {
    cache: "no-store",
  });
  const data: Product = await res.json();

  return data;
};

export default async function Products({ params }: { params: { id: string } }) {
  const product: Product = await getProduct(params.id);
  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
}
