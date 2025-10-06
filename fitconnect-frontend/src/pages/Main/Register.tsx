import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";
import styled from "styled-components";
import axios from "axios";
import talent from '../../assets/talent.png';
import company from '../../assets/company.png';

import { baseURL } from "../../env";

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

const SelectContainer = styled.div`
    margin-left: 285px;
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
`;

const Select = styled.div`
    width: 300px;
    height: 300px;
    background: #FFFFFF;
    border: 1px solid #9E9E9E;
    border-radius: 20px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    &:hover {
      background-color: #EFEFEF;
    }
    &:active {
      transform: scale(0.95);
    }
    & > img {
      margin-left: 114px;
      margin-top: 60px;
    }
`;

const SelectName = styled.div`
    color: #000;
    font-size: 28px;
    width: 300px;
    text-align: center;
    margin-top: 30px;
`;

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

const RegisterButton = styled.button`
    all: unset;
    width: 200px;
    height: 40px;
    background: #6399FB;
    margin-left: 300px;
    margin-top: 50px;
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

export default function Register() {
    const { setToken, setRole } = useAuth();
    const [page, setPage] = useState(1);
    const [type, setType] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const selectTalent = () => {
        setType("talent");
        setPage(page + 1);
    };

    const selectCompany = () => {
        setType("company");
        setPage(page + 1);
    };

    const handleRegister = async () => {
        try {
            // POST /auth/register
            const res = await axios.post(`${baseURL}/auth/register`, { email, password, "role": type });
            if (res.status === 200) {
                navigate("/auth/login");
            }
        } catch (err) {
            alert("이미 존재하는 아이디입니다.");
        }
    };

    return (
        <Container>
            <Title>👤 회원가입</Title>
            {page == 1 && (
                <SelectContainer>
                    <Select onClick={selectTalent}>
                        <img src={talent} alt="Logo" width={72} height={81}></img>
                        <SelectName><b>인재 회원</b>으로<br/>가입하기</SelectName>
                    </Select>
                    <Select onClick={selectCompany}>
                        <img src={company} alt="Logo" width={72} height={81}></img>
                        <SelectName><b>기업 회원</b>으로<br/>가입하기</SelectName>
                    </Select>
                </SelectContainer>
            )}
            {page == 2 && (
                <Form>
                    <InputContainer>
                    <Label>아이디</Label>
                    <Input placeholder="아이디 (이메일)" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                    </InputContainer>
                    <InputContainer>
                    <Label>비밀번호</Label>
                    <Input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
                    </InputContainer>
                    <RegisterButton onClick={handleRegister}>가입하기</RegisterButton>
                </Form>
            )}
        </Container>
    );
}