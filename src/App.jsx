import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Subscription from "./pages/Subscriptions";
import Plan from "./pages/Plan";
import { useState } from "react";
import UserContext from "./context/UserContext";
import axios from "axios";

export default function App() {
  const tokenLocalStorage = localStorage.getItem("token");
  const userLocalStorage = localStorage.getItem("user");
  const [token, setToken] = useState(tokenLocalStorage);
  const [user, setUser] = useState(JSON.parse(userLocalStorage));

  function saveToken(token) {
    setToken(token);
    localStorage.setItem("token", token);
  }

  function saveUser(user) {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  return (
    <UserContext.Provider
      value={{ token, setToken, saveToken, user, setUser, saveUser }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/subscriptions" element={<Subscription />} />
          <Route path="/subscriptions/:idPlano" element={<Plan />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
