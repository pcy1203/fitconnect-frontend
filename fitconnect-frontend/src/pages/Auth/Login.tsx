import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";
import styled from "styled-components";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000";

const Container = styled.div`
    width: 1200px;
    min-height: calc(100vh - 80px);
    margin: 0 auto;
    background: #F7F8FA;
`;

const Title = styled.div`
    width: 1200px;
    height: 50px;
    padding-top: 50px;
    padding-bottom: 10px;
    position: relative;
    color: black;
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    line-height: 50px;
`

const Form = styled.div`
    width: 800px;
    left: 200px;
    display: flex;
    flex-wrap: wrap;
    padding-top: 50px;
    padding-bottom: 70px;
    position: relative;
    background: #FFFFFF;
    border: 1px solid #9E9E9E;
    border-radius: 20px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const InputContainer = styled.div<{ width?: string }>`
    width: 800px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`

const Label = styled.div`
    width: 80px;
    height: 70px;
    position: relative;
    padding-left: 100px;
    color: black;
    font-size: 16px;
    line-height: 70px;
`;

const Input = styled.input<{ width?: string }>`
    width: 480px;
    height: 30px;
    background: #FFFFFF;
    color: #000000;
    border: 1px solid #9E9E9E;
    padding: 2px 10px;
    &:focus {
        outline: none;
        border: 2px solid #6399fb;
        box-shadow: 0 0 6px rgba(99, 153, 251, 0.5);
    }
    &::placeholder {
        color: #dbdbdb;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 30px;
    margin-left: 190px;
`;

const LoginButton = styled.button`
    all: unset;
    width: 200px;
    height: 40px;
    background: #6399FB;
    color: #FFFFFF;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    border: 1px solid #9E9E9E;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.1s ease;
    &:hover {
      background-color: #87B2FF;
    }
    &:active {
      transform: scale(0.95);
    }
`;

const SignupButton = styled.button`
    all: unset;
    width: 200px;
    height: 40px;
    background: #999999ff;
    color: #FFFFFF;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    border: 1px solid #9E9E9E;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.1s ease;
    &:hover {
      background-color: #c8c8c8ff;
    }
    &:active {
      transform: scale(0.95);
    }
`;

export default function Login() {
    const { setToken } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(`${baseURL}/auth/login/`, { email, password });
            if (res.data.code === 200) {
                const token = res.data.data.access_token;
                localStorage.setItem("jwt_token", token);
                setToken(token);
                console.log("로그인 성공 : " + token);
                navigate("/");
            } else {
                console.log("로그인 실패");
            }
        } catch (err) {
            console.error("로그인 오류 : ", err);
        }
    };

    return (
      <Container>
        <Title>로그인</Title>
          <Form>
            <InputContainer>
              <Label>아이디</Label>
              <Input placeholder="아이디" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
            </InputContainer>
            <InputContainer>
              <Label>비밀번호</Label>
              <Input placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
            </InputContainer>
            <ButtonContainer>
                <LoginButton onClick={handleLogin}>로그인</LoginButton>
                <Link to="/profile/setprofile"><SignupButton>회원가입</SignupButton></Link>
            </ButtonContainer>
          </Form>
      </Container>
    );
}