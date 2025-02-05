import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import NotFound from "./components/NotFound/NotFound";
import Header from "./components/header/Header";
import { useContext } from "react";
import { AuthContext } from "./components/auth/auth";

function App() {
  const { isLogin } = useContext(AuthContext);
  return (
    <>
      <Header />
      <Routes>
        {isLogin ? (
          <>
            <Route path="/" element={<Home />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
