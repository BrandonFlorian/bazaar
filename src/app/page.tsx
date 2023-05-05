import Image from "next/image";
import { User, Product } from "@prisma/client";
const getProducts = async () => {
  const res = await fetch("http://localhost:3000/api/products");
  const data = await res.json();

  return data;
};

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product: Product) => (
          <div
            className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-md"
            key={product.id}
          >
            {/* {product.imageUrl && (
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={200}
                height={200}
              />
            )} */}
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-500">{product.description}</p>
            <p className="text-gray-500">{product.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
