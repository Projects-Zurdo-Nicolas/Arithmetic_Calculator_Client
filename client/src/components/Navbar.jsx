import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-3 px-10 rounded-lg">
      <h1 className="text-2xl font-bold">{isAuthenticated ? "WELCOME " + user.username + "!!" : "CALCULATOR APP"}</h1>

      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
              <Link
                to="/save_record"
                className="bg-indigo-500 px-4 py-1 rounded-sm"
              >
                Calculator
              </Link>
            </li>
            <li>
              <Link
                to="/records"
                className="bg-indigo-500 px-4 py-1 rounded-sm"
              >
                See your Operations
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="bg-indigo-500 px-4 py-1 rounded-sm">
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-indigo-500 px-4 py-1 rounded-sm"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
