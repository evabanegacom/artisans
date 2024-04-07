import Carousel from "../../components/banner/banner"
import ProductCategories from "../product-categories/product-categories"
import SearchResults from "../search-results/search-results";
import { useSelector } from "react-redux";

const Home = () => {
  const categories = ['Electronics', 'Digital art']
  const isLoggedin = useSelector((state: any) => state?.reducer?.auth?.isAuth);
  const searchState = useSelector((state:any) => state?.reducer?.search)
  const { searchTerm, searchResults } = searchState;
  console.log({searchTerm})
  console.log({searchResults})
  return (
    <div>
      <Carousel />
      {categories.map((category) => (
        <ProductCategories category={category} key={category} />
      ))}
    </div>
  )
}

export default Home