import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";
import styled from "styled-components";
import Vectoruser from "../assets/Vectoruser.png";

export default function Home() {
  const { user, saveUser, token } = useContext(UserContext);
  const nav = useNavigate();

  function cancel() {
    const req = axios.delete(
      `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    req.then((resposta) => {
      alert("Plano Cancelado!");
      saveUser({ ...user, membership: null });
      nav("/subscriptions");
    });
    req.catch((err) => console.log(err.response.data));
  }

  if (user.membership !== null) {
    return (
      <HomeContainer>
        <Logo src={user.membership.image} />
        <User>Olá, {user.name}</User>
        <Image src={Vectoruser} />
        <Menu>
          {user.membership.perks.map((o) => {
            return (
              <Options href={o.link}>
                <button>{o.title}</button>
              </Options>
            );
          })}
        </Menu>
        <ButtonContainer>
          <Link to="/subscriptions">
            <button>Mudar plano</button>
          </Link>
          <CancelButton onClick={cancel}>Cancelar plano</CancelButton>
        </ButtonContainer>
      </HomeContainer>
    );
  }
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const Logo = styled.img`
  height: 51px;
  position: absolute;
  top: 32px;
  left: 38px;
`;

const Image = styled.img`
  width: 34px;
  height: 33px;
  position: absolute;
  top: 22px;
  right: 22px;
`;

const User = styled.h1`
  font-family: Roboto;
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  color: #ffffff;
  margin-top: 100px;
  text-align: center;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 53px;
  margin-bottom: 150px;
  gap: 8px;
`;

const CancelButton = styled.button`
  background-color: #ff4747;
`;

const Options = styled.a`
  text-decoration: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;
