import { useState } from "react";
import Carousel from "../../components/banner/banner"
import categories from "../../constants/categories";
import ProductCategories from "../product-categories/product-categories"
import SearchResults from "../search-results/search-results";
import { useSelector } from "react-redux";
import Loader from "../../constants/Loader";
import { toast } from "react-toastify";
import AuthService from "../../services/auth-service";

const Home = () => {
  const isLoggedin = useSelector((state: any) => state?.reducer?.auth?.isAuth);
  const searchState = useSelector((state:any) => state?.reducer?.search)
  const { searchTerm, searchResults } = searchState;
  const [sending, setSending] = useState(false);

  const user = useSelector((state: any) => state?.reducer?.auth?.user);

  const generateActivationLink = async (e: any) => {
    setSending(true)
    try {
      const response = await AuthService?.generateActivationLink(user?.email);
      // Handle success, redirect, or perform additional actions
      toast.success(response?.message)
    } catch (error:any) {
      // Handle error
      const errorMessages = error?.response?.data?.message
      toast.error(errorMessages)
      console.error('Error creating user:', error);
    } finally {
      setSending(false); // Set loading state to false regardless of success or failure
    }
  };

  return (
    <div>
      <Carousel />

      {isLoggedin && user?.activated === false ?
    <div className="text-center mt-3">
      <span className="text-red-500 font-bold text-sm mb-2">Your account is not activated</span>
      <button onClick={generateActivationLink} className="text-green-500 hover:text-green-700 ml-2">
        {sending ? <Loader /> : 'Click here'}
      </button>
      <span className="text-red-500 font-bold text-sm ml-2">to activate your account</span>
    </div> : null}
    
      {categories.map((category) => (
        <ProductCategories category={category} key={category?.id} />
      ))}
    </div>
  )
}

export default Home