import axios from "axios";
import Vector from "../assets/Vector.png";
import Vectorbeneficios from "../assets/Vectorbeneficios.png";
import Vectorpreco from "../assets/Vectorpreco.png"
import Vectorfechar from"../assets/Vectorfechar.png"
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import styled from "styled-components";

export default function Plan() {
  const [plan, setPlan] = useState(undefined);
  const [beneficios, setBeneficios] = useState(undefined);
  const [cardName, setCardName] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [secondNum, setSecondNum] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [able, setAble] = useState(false);
  const [memberId, setMemberId] = useState("");
  const navigate = useNavigate();
  const { user, setUser, token } = useContext(UserContext);
  const { idPlano } = useParams();

  useEffect(() => {
    const req = axios.get(
      `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${idPlano}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    req.then((resp) => {
      setPlan(resp.data);
      setBeneficios(resp.data.perks);
      setMemberId(resp.data.id);
    });
    req.catch((err) => console.log(err.response.data));
  }, []);

  function openModal(e) {
    e.preventDefault();
    setAble(true);
  }

  function subscription() {
    const dados = {
      membershipId: memberId,
      cardName: cardName,
      cardNumber: cardNum,
      securityNumber: Number(secondNum),
      expirationDate: cardDate,
    };
    const req = axios.post(
      `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions`,
      dados,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    req.then((resp) => {
      setUser({ ...user, membership: resp.data.membership });
      navigate("/home");
      console.log(resp);
    });
    req.catch((err) => alert("Deu errado!"));
  }

  if (plan !== undefined) {
    return (
      <>
        <Header>
          <img
            onClick={() => {
              navigate("/subscriptions");
            }}
            src={Vector}
            alt="voltar"
          />
        </Header>
        <PageContainer>
          <LogoContainer>
            <Logo src={plan.image} />
            <Title>{plan.name}</Title>
          </LogoContainer>
          <Beneficios>
            <Ben>
              <img src={Vectorbeneficios} />
              <Texto>Benefícios:</Texto>
            </Ben>
            {beneficios.map((b) => {
              return (
                <Beneficio>
                  {b.id}. {b.title}
                </Beneficio>
              );
            })}
          </Beneficios>
          <Preco>
            <PriceContainer>
              <img src={Vectorpreco} />
              <Texto>Preço:</Texto>
            </PriceContainer>
            <Price>R$ {plan.price} cobrados mensalmente</Price>
          </Preco>
          <Form onSubmit={openModal}>
            <input
              type="text"
              id="cardName"
              placeholder="Nome impresso no cartão"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              required
            />
            <input
              type="text"
              id="cardNum"
              placeholder="Digitos do cartão"
              value={cardNum}
              onChange={(e) => setCardNum(e.target.value)}
              required
            />
            <div>
              <input
                type="text"
                id="secondNum"
                placeholder="Código de segurança"
                value={secondNum}
                onChange={(e) => setSecondNum(e.target.value)}
                required
              />
              <input
                type="text"
                id="cardDate"
                placeholder="Validade"
                value={cardDate}
                onChange={(e) => setCardDate(e.target.value)}
                required
              />
            </div>
            <button type="submit">Cadastrar</button>
          </Form>
        </PageContainer>

        <OpenModal able={able}>
          <CloseModal onClick={() => setAble(false)}>
            <img src={Vectorfechar} />
          </CloseModal>
          <Modal>
            <Text>
              Tem certeza que deseja assinar o plano {plan.name} (R${" "}
              {plan.price})?
            </Text>
            <ChoiceButton>
              <No onClick={() => setAble(false)}>Não</No>
              <Yes onClick={subscription}>Sim</Yes>
            </ChoiceButton>
          </Modal>
        </OpenModal>
      </>
    );
  }
}

const Header = styled.div`
  width: 100%;
  height: 76px;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  gap: 12px;
  margin-bottom: 22px;
`;

const Logo = styled.img`
  height: 95px;
  width: 139px;
  margin-top: 35px;
`;

const Title = styled.h1`
  font-family: Roboto;
  font-size: 32px;
  font-weight: 700;
  line-height: 38px;
  color: #ffffff;
`;

const Beneficios = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 44px;
  margin-bottom: 14px;
`;

const Ben = styled.div`
  display: flex;
  margin-bottom: 8px;
  gap: 5px;
`;

const PriceContainer = styled.div`
  display: flex;
  margin-bottom: 5px;
  gap: 5px;
`;

const Texto = styled.h1`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  color: #ffffff;
`;

const Beneficio = styled.p`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  color: #ffffff;
`;

const Preco = styled.div`
  padding-left: 44px;
  margin-bottom: 34px;
`;

const Price = styled.p`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  color: #ffffff;
`;

const Form = styled.form`
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  div {
    display: flex;
    gap: 9px;
    margin-bottom: 4px;
    input {
      width: 145px;
    }
  }
`;
const img = styled.img`

`
const OpenModal = styled.div`
  min-height: 100vh;
  width: 100%;
  display: ${(props) => (props.able ? "flex" : "none")};
  flex-direction: column;
  position: fixed;
  position: relative;
  position: fixed;
  top: 0px;
  z-index: 1;
  background-color: rgba(14, 14, 19, 0.5);
`;

const CloseModal = styled.button`
  height: 24.5px;
  width: 28px;
  border-radius: 0px;
  background-color: #0e0e13;
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Modal = styled.div`
  height: 210px;
  width: 248px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: #ffffff;
  position: absolute;
  top: 220px;
  left: 17%;
`;

const ChoiceButton = styled.div`
  display: flex;
  gap: 14px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  color: #ffffff;
`;

const Yes = styled.button`
  height: 52px;
  width: 95px;
  border-radius: 8px;
`;

const No = styled.button`
  height: 52px;
  width: 95px;
  border-radius: 8px;
  background-color: #cecece;
`;

const Text = styled.h1`
  font-family: Roboto;
  font-size: 18px;
  font-weight: 700;
  line-height: 21px;
  text-align: center;
  color: #000000;
`;
