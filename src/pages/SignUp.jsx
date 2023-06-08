import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

export default function PaginaCadastro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [disable, setDisable] = useState(false);
  const nav = useNavigate();

  function SignUp(e) {
    e.preventDefault();
    setDisable(true);
    const Info = {
      email: email,
      name: name,
      cpf: cpf,
      password: password,
    };
    axios
      .post(
        `https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up`,
        Info
      )
      .then(() => {
        nav("/");
      })
      .catch((erro) => {
        console.log(erro);
        alert("Usuario já cadastrado");
        setDisable(false);
      });
  }

  return (
    <PageContainer>
      <form onSubmit={SignUp}>
        <input
          data-test=""
          placeholder="Nome"
          type="text"
          disabled={disable}
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          data-test=""
          placeholder="CPF"
          type="text"
          disabled={disable}
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        ></input>
        <input
          data-test=""
          placeholder="Email"
          type="email"
          disabled={disable}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <input
          data-test=""
          placeholder="Senha"
          type="password"
          disabled={disable}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <button data-test="" type="submit" disabled={disable}>
          "CADASTRAR"
        </button>

        <Link to={"/"}>
          <Cadastro data-test="">Já possui uma conta? Entre</Cadastro>
        </Link>
      </form>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  img {
    height: 180px;
    width: 180px;
    margin: 32px;
  }
`;

const Cadastro = styled.p`
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  margin-top: 25px;
  text-align: center;
  text-decoration-line: underline;
  color: white;
`;
