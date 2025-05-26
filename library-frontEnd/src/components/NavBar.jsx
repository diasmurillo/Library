import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <header className="bg-gray-800 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/">
          <h3 className="text-xl font-semibold">My Library</h3>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Links */}
        <ul
          className={`md:flex md:items-center md:space-x-6 text-lg font-medium absolute md:static top-16 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent px-4 md:px-0 transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <li className="py-2 md:py-0">
            <Link to="/" className="hover:text-gray-300 block">
              Home
            </Link>
          </li>
          <li className="py-2 md:py-0">
            <Link to="/books" className="hover:text-gray-300 block">
              Books
            </Link>
          </li>
          {token ? (
            <li className="py-2 md:py-0">
              <Link to="/profile" className="hover:text-gray-300 block">
                Profile
              </Link>
            </li>
          ) : (
            <>
              <li className="py-2 md:py-0">
                <Link to="/login" className="hover:text-gray-300 block">
                  Login
                </Link>
              </li>
              <li className="py-2 md:py-0">
                <Link to="/register" className="hover:text-gray-300 block">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
