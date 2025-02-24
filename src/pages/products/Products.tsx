import React, { useEffect } from "react";
import { useGetProductsMutation } from "../../redux/api/productsApi";
import Product from "./Product";

export default function Products() {
  const [getProducts, { data, isLoading, error }] = useGetProductsMutation();

  useEffect(() => {
    getProducts();
  }, [getProducts]);
  const products = data?.data?.data || [];
  console.log(products);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred: {JSON.stringify(error)}</p>;

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
      {products.map((product: any) => (
        <Product key={product._id} product={product}></Product>
      ))}
      <h1>Producs</h1>
    </div>
  );
}
