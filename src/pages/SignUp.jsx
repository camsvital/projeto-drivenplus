import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const nav = useNavigate();

  function SignUp(e) {
    e.preventDefault();
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
      });
  }

  return (
    <PageContainer>
      <form onSubmit={SignUp}>
        <input
          data-test=""
          placeholder="Nome"
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          data-test=""
          placeholder="CPF"
          required
          type="text"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        ></input>
        <input
          data-test=""
          placeholder="Email"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <input
          data-test=""
          placeholder="Senha"
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <button data-test="" type="submit">
          CADASTRAR
        </button>

        <Link to={"/"}>
          <Cadastrar data-test="">Já possui uma conta? Entre</Cadastrar>
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

const Cadastrar = styled.p`
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
