import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { AuthContext } from "../auth/auth";

function Header() {
  const { isLogin, setLogin } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogin(false);
    navigate("/login");
    enqueueSnackbar("Logout done successfully", { variant: "info" });
  };

  return (
    <nav className="flex justify-between items-center px-6 bg-slate-400">
      <img
        height={70}
        width={70}
        className="py-1"
        src="https://static.vecteezy.com/system/resources/previews/047/656/219/large_2x/abstract-logo-design-for-any-corporate-brand-business-company-vector.jpg"
      />
      <ul className="flex gap-6 px-6 items-center">
        {isLogin ? (
          <>
            <li className="font-semibold">
              <button>
                <Link to={"/"}>Home</Link>
              </button>
            </li>
            <li className="font-semibold">
              <button>Contact Us</button>
            </li>
            <li className="font-semibold">
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="font-semibold">
              <button>
                <Link to={"/login"}>Login</Link>
              </button>
            </li>
            <li className="font-semibold">
              <Link to={"/register"}>Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;
