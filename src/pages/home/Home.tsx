import Banner from "../../components/banner/Banner";
import Brands from "../../components/brands/Brands";
import Categories from "../../components/categories/Categories";
import Features from "../../components/features/Features";
import LatestProducts from "../../components/latestProducts/Latest";
import ShopLocation from "../../components/location/ShopLocation";
import Review from "../../components/review/Review";
import Products from "../products/Products";

export default function Home() {
  return (
    <div>
      <Banner />
      <LatestProducts />
      <Products />
      <Categories />
      <Brands />
      <Features />
      <Review />
      <ShopLocation />
    </div>
  );
}
