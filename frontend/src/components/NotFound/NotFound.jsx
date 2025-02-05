import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/auth";

function NotFound() {
  const navigate = useNavigate();
  const { isLogin } = useContext(AuthContext);
  useEffect(() => {
    console.log(localStorage.getItem("token"));
    if (!isLogin || !localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="bg-info rounded">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStjDk7Q6b2BDpc0v2LFJlEjyYUDncgq_D9nQ&s"
        alt="not-found"
      />
    </div>
  );
}

export default NotFound;
