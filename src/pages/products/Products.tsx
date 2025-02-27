// @ts-ignore
import React, { useEffect } from "react";
import { useGetProductsMutation } from "../../redux/api/productsApi";
import Product from "./Product";
import HeaderText from "../../components/NavbarLogo/HeaderText";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";

export default function Products() {
  const [getProducts, { data, isLoading, error }] = useGetProductsMutation();

  useEffect(() => {
    getProducts({
      limit: 3,
      page: 1,
      searchTerm: "",
      minPrice: 0,
      maxPrice: 0,
    });
  }, [getProducts]);
  const products = data?.data?.data || [];
  console.log(products);
  if (isLoading) return <Loader />;
  if (error) return <p>Error occurred: {JSON.stringify(error)}</p>;

  return (
    <div className="w-full  py-12  sm:max-w-6xl sm:mx-auto my-12">
      <h1 className="text-4xl sm:text-6xl text-center my-12 border-none sm:border-b-4 border-red-500">
        <HeaderText color="blue" text="Product" />
      </h1>
      <div className=" grid grid-cols-1 sm:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
      <div className="my-12 flex items-center justify-center">
        <Link
          to="/all/products"
          className="bg-blue-800 text-xl font-semibold hover:bg-blue-500 p-4  rounded-md   w-[200px]  text-center   text-slate-100"
        >
          View More
        </Link>
      </div>
    </div>
  );
}
