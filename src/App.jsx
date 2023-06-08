import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useState } from "react";
import AuthContext from "./context/Context";
import UserContext from "./context/UserContext";

/**
 * Context - 3 coisas:
 * 1 - criar o context
 * 2 - criar o provider para passar as informações para os componentes filhos
 * 3 - nos filhos, tem que ter uma forma de acessar as informações do provider *
 */

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(undefined);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
