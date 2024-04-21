const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/4 px-4 mb-8">
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus sem. Nam vulputate lacinia pulvinar.</p>
          </div>
          <div className="w-full lg:w-1/4 px-4 mb-8">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-white">Category 1</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white">Category 2</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white">Category 3</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white">Category 4</a></li>
            </ul>
          </div>
          <div className="w-full lg:w-1/4 px-4 mb-8">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="leading-relaxed">123, Main Street<br />New York, NY 10001<br />contact@example.com<br />+1 (123) 456-7890</p>
          </div>
          <div className="w-full lg:w-1/4 px-4 mb-8">
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="leading-relaxed mb-4">Subscribe to our newsletter to get updates on our latest offers!</p>
            <div className="flex">
              <input type="email" placeholder="Your Email" className="w-full px-4 py-2 mr-2 rounded-l-md bg-gray-700 focus:outline-none" />
              <button className="px-6 py-2 rounded-r-md bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8">
          <p className="text-center text-sm">&copy; 2024 Your Website. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
