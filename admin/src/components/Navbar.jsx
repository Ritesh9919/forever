import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img className="custom-min-width" src={assets.logo} alt="" />
      <button
        onClick={logout}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
