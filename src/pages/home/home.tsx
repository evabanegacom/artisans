import Carousel from "../../components/banner/banner"
import ProductCategories from "../product-categories/product-categories"

const Home = () => {
  const categories = ['Electronics', 'Digital art']
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