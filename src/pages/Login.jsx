import { useContext, useState, useEffect } from "react";
import GlobalStyle from "../styles/GlobalStyle";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import UserContext from "../context/UserContext";
import logo from "../assets/logo.png";

export default function Login() {
  const { saveToken } = useContext(UserContext);
  const { saveUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  function Login(e) {
    e.preventDefault();
    const loginInfo = {
      email: email,
      password: password,
    };
    const req = axios.post(
      `https://mock-api.driven.com.br/api/v4/driven-plus/auth/login`,
      loginInfo
    );
    req.then(resposta);
    req.catch((err) => alert("Usuario não encontrado!"));

    function resposta(resp) {
      saveToken(resp.data.token);
      saveUser(resp.data);
      if (resp.data.membership === null) {
        nav("/subscriptions");
      } else {
        nav("/home");
      }
    }
  }

  return (
    <PageContainer>
      <Logo>
        <img src={logo} alt="logo" />
      </Logo>

      <form onSubmit={Login}>
        <input
          data-test=""
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          data-test="password-input"
          type="password"
          id="password"
          placeholder="senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button data-test="" type="submit">
          ENTRAR
        </button>
      </form>
      <Link to={`/sign-up`}>
        <Cadastro data-test="">Não possui uma conta? Cadastre-se</Cadastro>
      </Link>
    </PageContainer>
  );
}

const Logo = styled.div`
  padding-bottom: 40px;
  img {
    width: 300px;
  }
`;
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  gap: 30px;
  padding-top: 150px;
`;

const Cadastro = styled.p`
  margin-top: 25px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: white;
`;
