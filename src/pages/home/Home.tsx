import Banner from "../../components/banner/Banner";
import Brands from "../../components/brands/Brands";
import Categories from "../../components/categories/Categories";
import LatestProducts from "../../components/latestProducts/Latest";
import Products from "../products/Products";

export default function Home() {
  return (
    <div>
      <Banner />
      <LatestProducts />
      <Products />
      <Categories />
      <Brands />
    </div>
  );
}
