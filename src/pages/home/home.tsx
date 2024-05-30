import Carousel from "../../components/banner/banner"
import categories from "../../constants/categories";
import ProductCategories from "../product-categories/product-categories"
import SearchResults from "../search-results/search-results";
import { useSelector } from "react-redux";

const Home = () => {
  const isLoggedin = useSelector((state: any) => state?.reducer?.auth?.isAuth);
  const searchState = useSelector((state:any) => state?.reducer?.search)
  const { searchTerm, searchResults } = searchState;
  return (
    <div>
      {/* <Carousel /> */}
      {categories.map((category) => (
        <ProductCategories category={category} key={category?.id} />
      ))}
    </div>
  )
}

export default Home