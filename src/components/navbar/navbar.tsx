import { useNavigate } from "react-router-dom";
import LogoSvg from "../../logo-svg";
import { useState } from "react";
import useSearch from "../../search-hook";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../redux/actions";
import { searchProducts } from "../../redux/actions";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const searchState = useSelector((state:any) => state?.reducer?.search)
  console.log({searchState})
  const { searchTerm } = searchState;

  const dispatch = useDispatch();

  const handleSearch = (event:any) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const findProducts = (e:any) => {
    e.preventDefault();
    console.log('searching for products');
    dispatch(searchProducts(searchTerm) as any)
};

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button onClick={() => setIsExpanded(!isExpanded)} type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="absolute -inset-0.5"></span>

              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>

              <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:justify-start">
            <a href='/'><LogoSvg /></a>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Dashboard</a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Team</a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Projects</a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Calendar</a>
              </div>
            </div>
            <form onSubmit={findProducts} className="hidden md:flex md:flex-1 gap-3">
              <input
                type="text"
                className="bg-gray-700 text-white rounded-md px-3 py-2 text-sm font-medium focus:outline-none focus:ring-transparent ring-transparent flex-1"
                placeholder="Search..."
                onChange={handleSearch}
              />

              <button
                type="submit"
                className="hidden md:inline-block text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-orange-400 dark:hover:bg-orange-500 dark:focus:ring-orange-600"
              >
                Search
              </button>
            </form>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">View notifications</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
        </button> */}

            <div className="relative ml-3">
              <div>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                  <button onClick={() => setShowOptions(!showOptions)} type="button" className="hidden md:inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</button>
                  <button onClick={() => setShowOptions(!showOptions)} data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                  </button>
                </div>

                {/* <button onClick={() => setShowOptions(!showOptions)} type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">Open user menu</span>
              <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            </button> */}
              </div>


              {showOptions ? 
              // <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
              //   <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-0">Sell your art</a>
              //   <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-1">Create Account</a>
              //   <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-2">Sign out</a>
              // </div> 
              <div
  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
  role="menu"
  aria-orientation="vertical"
  aria-labelledby="user-menu-button"
>
  <a
    href="/seller-signUp"
    className="block px-4 py-2 text-sm text-white hover:text-gray-200 focus:text-gray-100 focus:bg-gray-700"
    role="menuitem"
    id="user-menu-item-0"
  >
    Sell your art
  </a>
  <a
    href="/sign-up"
    className="block px-4 py-2 text-sm text-white hover:text-gray-200 focus:text-gray-100 focus:bg-gray-700"
    role="menuitem"
    id="user-menu-item-1"
  >
    Create Account
  </a>
  <a
    href="#"
    className="block px-4 py-2 text-sm text-white hover:text-gray-200 focus:text-gray-100 focus:bg-gray-700"
    role="menuitem"
    id="user-menu-item-2"
  >
    Sign out
  </a>
</div>

              : null}

            </div>
          </div>
        </div>
      </div>

      {isExpanded ? <div className="sm:hidden" id="mobile-menu">

        <div className="space-y-1 px-2 py-1 border border-gray-700 rounded-md">
          <a
            href="#"
            className="bg-blue-700 text-white block rounded-md px-2 py-1 text-lg font-medium hover:bg-gray-800 hover:text-shadow-sm hover:text-white"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-2 py-1 text-lg font-medium"
          >
            Team
          </a>
          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-2 py-1 text-lg font-medium"
          >
            Projects
          </a>
          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-2 py-1 text-lg font-medium"
          >
            Calendar
          </a>
        </div>

      </div> : null}
    </nav>
  );
};

export default Navbar;





