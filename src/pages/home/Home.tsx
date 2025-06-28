import Banner from "../../components/banner/Banner";
import Categories from "../../components/categories/Categories";
import Products from "../products/Products";

export default function Home() {
  return (
    <div>
      <Banner />
      <Products />
      <Categories />
    </div>
  );
}
