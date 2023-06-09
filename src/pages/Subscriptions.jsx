import { useContext, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import UserContext from "../context/UserContext";

export default function Subscriptions() {
  const [planos, setPlanos] = useState(undefined);
  const { token } = useContext(UserContext);

  useEffect(() => {
    const req = axios.get(
      `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    req.then((resp) => {
      setPlanos(resp.data);
    });
    req.catch((resp) => console.log(resp.response.data));
  }, []);

  return (
    <PageContainer>
      <Title>Escolha um plano</Title>
      <Plans>
        {planos === undefined ? (
          <div></div>
        ) : (
          planos.map((p) => {
            return <Plano image={p.image} price={p.price} id={p.id} />;
          })
        )}
      </Plans>
    </PageContainer>
  );

  function Plano(props) {
    return (
      <Link key={props.id} to={`/subscriptions/${props.id}`}>
        <PlanContainer>
          <Image src={props.image} />
          <Price>R${props.price}</Price>
        </PlanContainer>
      </Link>
    );
  }
}

const Title = styled.h1`
  font-family: Roboto;
  font-size: 32px;
  font-weight: 700;
  line-height: 38px;
  color: #ffffff;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  margin: 29px 0 19px 0;
`;

const Plans = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PlanContainer = styled.div`
  width: 290px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 3px solid #7e7e7e;
  border-radius: 12px;
`;

const Image = styled.img`
  width: 140px;
`;

const Price = styled.h1`
  font-family: Roboto;
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  color: #ffffff;
  text-decoration: none;
`;
