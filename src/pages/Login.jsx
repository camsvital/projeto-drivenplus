import { useContext, useState } from "react";
import GlobalStyle from "../styles/GlobalStyle";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import axios from "axios";
import AuthContext from "../context/Context";
import UserContext from "../context/UserContext";
import logo from "../assets/logo-home.png";

export default function Login() {
  const { setToken } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);

  function Login(e) {
    e.preventDefault();
    setDisable(true);
    const loginInfo = {
      email: email,
      password: password,
    };
    axios
      .post(
        `https://mock-api.driven.com.br/api/v4/driven-plus/auth/login`,
        loginInfo
      )
      .then((resp) => {
        setUser(resp.data);
        setToken(resp.data.token);
        navigate("/");
      })
      .catch((erro) => alert(erro.response.data.message));
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
          {disable ? (
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#ffffff"
              ariaLabel="three-dots-disable"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            "ENTRAR"
          )}
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
  img{
    width: 300px;
    }
`
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
