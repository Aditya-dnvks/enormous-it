import { useContext, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/auth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { setLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.email === "" || formData.password === "") {
      enqueueSnackbar("Please fill the form completely", { variant: "error" });
      return;
    }

    if (formData.password.length < 5) {
      enqueueSnackbar("Password length must be greater than 5", {
        variant: "error",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      setLogin(true);

      localStorage.setItem("token", JSON.stringify(data.token));

      enqueueSnackbar("Login completed successfully", { variant: "success" });
      navigate("/");
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <div className="flex justify-around items-center min-h-[90vh]">
      <img
        className="w-1/2"
        src="https://img.freepik.com/free-vector/money-loan-contract-e-payment-application-finances-management_335657-3150.jpg"
      />
      <form
        className="flex flex-col border-2 shadow-lg rounded-lg p-6 w-1/3"
        onSubmit={handleSubmit}
      >
        <h1 className="font-semibold text-2xl">Welcome to Enormous IT</h1>
        <p>Please login to avail our Invoice Management system</p>
        <label htmlFor="email" className="mt-3">
          <strong>Email</strong>
        </label>
        <input
          type="email"
          id="email"
          className="border rounded p-1"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />

        <label htmlFor="password" className="mt-3">
          <strong>Password</strong>
        </label>
        <input
          type="password"
          id="password"
          className="border rounded p-1"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <div>
          <button
            className="p-2 bg-blue-500 text-sm text-white my-2 rounded-lg"
            type="submit"
          >
            Login
          </button>
        </div>

        <p>
          Don't have an account?
          <span className="text-blue-700">
            <Link to={"/register"}> Register Now</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
