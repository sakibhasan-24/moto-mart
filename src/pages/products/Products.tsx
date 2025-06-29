// @ts-ignore
import React, { useEffect } from "react";
import { useGetProductsMutation } from "../../redux/api/productsApi";
import Product from "./Product";
import HeaderText from "../../components/NavbarLogo/HeaderText";

import ViewMore from "../../components/shared-button/ViewMore";
import ProductSkeleton from "../../components/skeleton/Skeleton";

export default function Products() {
  const [getProducts, { data, isLoading, error }] = useGetProductsMutation();

  useEffect(() => {
    getProducts({
      limit: 3,
      page: 1,
      searchTerm: "",
      minPrice: 0,
      maxPrice: 0,
      category: "",
    });
  }, [getProducts]);
  const products = data?.data?.data || [];
  console.log(products);
  if (isLoading) return <ProductSkeleton />;
  if (error) return <p>Error occurred: {JSON.stringify(error)}</p>;

  return (
    <div className="w-full  py-12  sm:max-w-6xl sm:mx-auto my-2">
      <h1 className="text-4xl sm:text-6xl text-center my-12 border-none sm:border-b-4 border-red-500">
        <HeaderText color="blue" text="Product" />
      </h1>
      <div className=" grid grid-cols-1 sm:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
      <ViewMore />
    </div>
  );
}
