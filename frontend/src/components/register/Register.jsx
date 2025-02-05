import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirm: "",
  });

  const navigate = useNavigate();

  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (event) => {
    setPasswordError(false);
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      formData.email === "" ||
      formData.password === "" ||
      formData.fullName === "" ||
      formData.confirm === ""
    ) {
      enqueueSnackbar("Please fill the form completely", { variant: "error" });
      return;
    }

    if (formData.password.length < 5) {
      enqueueSnackbar("Password length must be greater than 5", {
        variant: "error",
      });
      return;
    }

    if (formData.password !== formData.confirm) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      enqueueSnackbar("User Registered Successfully", { variant: "success" });
      navigate("/login");
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <div className="flex justify-around items-center h-[90vh]">
      <img
        className="w-1/2 h-5/6"
        src="https://img.freepik.com/free-vector/registration-form-template-with-flat-design_23-2147971970.jpg"
      />

      <form
        className="flex flex-col border-2 shadow-lg rounded-lg p-6 w-1/3"
        onSubmit={handleSubmit}
      >
        <h1 className="font-semibold text-2xl">Register with us</h1>

        <label htmlFor="fullName" className="mt-3">
          <strong>Full Name</strong>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="border rounded p-1"
        />

        <label htmlFor="email" className="mt-3">
          <strong>Email</strong>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="border rounded p-1"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="password" className="mt-3">
          <strong>Password</strong>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="border rounded p-1"
          value={formData.password}
          onChange={handleChange}
        />
        {passwordError && (
          <p className="text-red-600 text-sm">
            Password length must be greater than 5*
          </p>
        )}

        <label htmlFor="confirmPassword" className="mt-3">
          <strong>Confirm Password</strong>
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirm"
          className="border rounded p-1"
          value={formData.confirm}
          onChange={handleChange}
        />

        <div>
          <button
            className="p-2 bg-blue-500 text-sm text-white my-2 rounded-lg"
            type="submit"
          >
            Register
          </button>
        </div>

        <p>
          Already have an account?
          <span className="text-blue-700">
            <Link to={"/"}> Login Now</Link>
          </span>
        </p>
      </form>
    </div>
  );
}
export default Register;
