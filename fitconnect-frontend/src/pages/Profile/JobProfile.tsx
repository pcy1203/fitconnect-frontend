import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";

import React from "react";
import colors from "../../styles/colors";
import styled from "styled-components";

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

const ProgressBarContainer = styled.div`
  width: 600px;
  margin-left: 300px;
  margin-bottom: 40px;
  height: 20px;
  background: #e0e0e0;
  border-radius: 10px;
  position: relative;
`;

const Progress = styled.div<{ progress?: number, role?: string }>`
  width: ${(props) => props.progress}%;
  height: 100%;
  background: linear-gradient(90deg, ${({ role }) => (role === "company" ? colors.company_light : colors.talent_light )}, ${({ role }) => (role === "company" ? colors.company : colors.talent )});
  border-radius: 10px;
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  position: absolute;
  top: 3px;
  left: 550px;
  font-size: 14px;
  color: #000000;
`;

const Form = styled.div`
    width: 1000px;
    left: 100px;
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

const FormTitle = styled.div`
    width: 1000px;
    height: 50px;
    position: relative;
    padding-left: 40px;
    color: black;
    font-size: 20px;
    font-weight: 600;
    line-height: 50px;
`

const InputContainer = styled.div<{ width?: string }>`
    width: ${(props) => props.width || "500px"};
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`

const Label = styled.div`
    width: 80px;
    height: 70px;
    position: relative;
    padding-left: 40px;
    color: black;
    font-size: 16px;
    line-height: 70px;
`;

const Input = styled.input.withConfig({
    shouldForwardProp: (prop) => prop !== "hasError"
})<{ width?: string, hasError?: boolean, role?: string }>`
    width: ${(props) => props.width || "300px"};
    height: 30px;
    background: #FFFFFF;
    color: #000000;
    border: 1px solid #9E9E9E;
    padding: 2px 10px;
    &:focus {
        outline: none;
        border: 2px solid ${(props) => (props.hasError ? "#FB8565" : "#6399fb")};
        box-shadow: 0 0 6px rgba(99, 153, 251, 0.5);
    }
    &::placeholder {
        color: #dbdbdb;
    }
    &::file-selector-button {
        width: 80px;
        padding: 5.5px;
        margin-right: 10px;
        background-color: ${({ role }) => (role === "company" ? colors.company : colors.talent )};
        border: none;
        border-radius: 20px;
        color: white;
        cursor: pointer;
    }
    &::file-selector-button:hover {
        background-color: ${({ role }) => (role === "company" ? colors.company_light : colors.talent_light )};
    }
`;

const Select = styled.select<{ width?: string }>`
    width: ${(props) => props.width || "322px"};
    height: 36px;
    background: #FFFFFF;
    color: #000000;
    border: 1px solid #9E9E9E;
    padding: 2px 10px;
    &:focus {
        outline: none;
        border: 2px solid #6399fb;
        box-shadow: 0 0 6px rgba(99, 153, 251, 0.5);
    }
`;

const ErrorText = styled.div`
    position: absolute;
    color: red;
    font-size: 12px;
    margin-left: 135px;
    margin-top: 60px;
`;

const AddButton = styled.button`
    all: unset;
    width: 120px;
    height: 30px;
    position: relative;
    left: 830px;
    background: #9e9e9eff;
    color: #FFFFFF;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    border: 1px solid #9E9E9E;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    transition: transform 0.1s ease;
    &:hover {
      background-color: #b2b2b2ff;
    }
    &:active {
      transform: scale(0.95);
    }
`;

const Padding = styled.div`
  width: 1000px;
  height: 80px;
`

const Button = styled.button<{ role?: string }>`
    all: unset;
    width: 200px;
    height: 40px;
    background: ${({ role }) => (role === "company" ? colors.company : colors.talent )};
    margin-top: 30px;
    margin-left: 900px;
    margin-bottom: 150px;
    color: #FFFFFF;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    border: 1px solid #9E9E9E;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.1s ease;
    &:hover {
      background-color: ${({ role }) => (role === "company" ? colors.company_light : colors.talent_light )};
    }
    &:active {
      transform: scale(0.95);
    }
`;

const Line = styled.hr`
    width: 950px;
    border: none;
    height: 1px;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: #9E9E9E;
`;

export default function JobProfile() {
    const { token, setToken, role, setRole } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!token || !role) navigate("/auth/login");
    }, []);

    const [page, setPage] = useState(1);

    const [primaryInfo, setPrimaryInfo] = useState({ name: "", birth: "", email: "", phone: "", intro: ""});
    const [educationList, setEducationList] = useState([{ school: "", major: "", entrance: "", graduation: "", status: "" }]);
    const [careerList, setCareerList] = useState([{ company: "", role: "", join: "", leave: "", reason: "", description: ""}]);
    const [activityList, setActivityList] = useState([{ name: "", type: "", description: "" }]);
    const [certificateList, setCertificateList] = useState([{ name: "", score: "", date: "" }]);

    const [errors, setErrors] = useState<{ birth?: string; email?: string; phone?: string }>({});

    useEffect(() => {
        if (!primaryInfo.birth || /^\d{4}-\d{2}-\d{2}$/.test(primaryInfo.birth)) {
          setErrors((prev) => ({ ...prev, birth: undefined }));
        } else {
          setErrors((prev) => ({ ...prev, birth: "YYYY-MM-DD 형식으로 입력해주세요." }));
        }
    }, [primaryInfo.birth]);

    useEffect(() => {
        if (!primaryInfo.email || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(primaryInfo.email)) {
          setErrors((prev) => ({ ...prev, email: undefined }));
        } else {
          setErrors((prev) => ({ ...prev, email: "이메일 형식으로 입력해주세요." }));
        }
    }, [primaryInfo.email]);
    
    useEffect(() => {
        if (!primaryInfo.phone || /^010-\d{4}-\d{4}$/.test(primaryInfo.phone)) {
          setErrors((prev) => ({ ...prev, phone: undefined }));
        } else {
          setErrors((prev) => ({ ...prev, phone: "010-0000-0000 형식으로 입력해주세요." }));
        }
    }, [primaryInfo.phone]);

    const jobs = ["고객지원/CX","개발/엔지니어","기획/PM","디자인","데이터 분석","마케팅","연구개발","영업","인사","재무/회계","전략/비즈니스","콘텐츠 제작","QA","기타"];
    const residence = ["서울","경기","인천","부산","대구","대전","광주","울산","강원","충북","충남","전북","전남","경북","경남"];
    const employment = ["정규직", "계약직", "파견직", "인턴", "기타"]
    const education = ["학력 무관","대학 재학 이상","대학 졸업 이상","석사 이상","박사 이상"];
    const career =["신입", "경력 2년 이하", "경력 3년 ~ 4년", "경력 5년 ~ 6년", "경력 7년 ~ 8년", "경력 9년 ~ 10년", "경력 11년 이상"];
    const salary = ["연봉 무관","2000만 ~ 3000만","3000만 ~ 4000만","4000만 ~ 5000만","5000만 ~ 6000만","6000만 ~ 7000만","7000만 ~ 8000만","8000만 ~ 9000만","9000만 ~ 1억","1억 ~ 1.2억","1.2억 ~ 1.5억","1.5억 이상"];
    
    const getNextPage = () => {
        if (page >= 2) {
            navigate("/assessment/interview");
        } else {
            setPage(page + 1);
        }
    };

    if (role === "talent") {
        navigate("/");
    } else if (role === "company") {
        return (
          <Container>
            <Title>📰 공고 등록</Title>
            <ProgressBarContainer>
              <Progress progress={page * 50} role={role}></Progress>
              <ProgressText>{page} / 2</ProgressText>
            </ProgressBarContainer>

            {page == 1 && (
              <Form>
                <FormTitle>공고 기본정보 입력</FormTitle>
                <InputContainer>
                  <Label>공고명</Label>
                  <Input placeholder="프론트엔드 개발자"></Input>
                </InputContainer>
                <InputContainer>
                  <Label>포지션 구분</Label>
                  <Select>
                    {jobs.map((value) => (<option key={value} value={value}>{value}</option>))}
                  </Select>
                </InputContainer>
                <InputContainer>
                  <Label>부서</Label>
                  <Input placeholder="개발팀"></Input>
                </InputContainer>
                <InputContainer>
                  <Label>회사 위치</Label>
                  <Select>
                    {residence.map((value) => (<option key={value} value={value}>{value}</option>))}
                  </Select>
                </InputContainer>
                <InputContainer>
                  <Label>고용 형태</Label>
                  <Select>
                    {employment.map((value) => (<option key={value} value={value}>{value}</option>))}
                  </Select>
                </InputContainer>
                <InputContainer>
                  <Label>연봉</Label>
                  <Select>
                    {salary.map((value) => (<option key={value} value={value}>{value}</option>))}
                  </Select>
                </InputContainer>
                <InputContainer>
                  <Label>신입/경력</Label>
                  <Select>
                    {career.map((value) => (<option key={value} value={value}>{value}</option>))}
                  </Select>
                </InputContainer>
                <InputContainer>
                  <Label>학력</Label>
                  <Select>
                    {education.map((value) => (<option key={value} value={value}>{value}</option>))}
                  </Select>
                </InputContainer>
                <InputContainer>
                  <Label>근무 시작일</Label>
                  <Input placeholder="예상 근무 시작 시기"></Input>
                </InputContainer>
                <InputContainer>
                  <Label>근무 기간</Label>
                  <Input placeholder="근무 기간 (O년 / O개월)"></Input>
                </InputContainer>
                <InputContainer>
                  <Label>홈페이지</Label>
                  <Input placeholder="홈페이지 링크"></Input>
                </InputContainer>
                <InputContainer>
                  <Label>공고 마감일</Label>
                  <Input type="date"></Input>
                </InputContainer>
                <InputContainer>
                  <Label>문의 메일</Label>
                  <Input placeholder="fitconnect@gmail.com"></Input>
                </InputContainer>
                <InputContainer>
                  <Label>문의 연락처</Label>
                  <Input placeholder="02-0000-0000"></Input>
                </InputContainer>
              </Form>
            )}
            
            {page == 2 && (
              <Form>
                <FormTitle>공고 세부내용 입력</FormTitle>
                <InputContainer width="1000px">
                  <Label>업무 내용</Label>
                  <Input placeholder="담당하게 될 업무 내용을 소개해주세요." width="800px"></Input>
                </InputContainer>
                <InputContainer width="1000px">
                  <Label>필수 요건</Label>
                  <Input placeholder="지원 자격/요건을 작성해주세요." width="800px"></Input>
                </InputContainer>
                <InputContainer width="1000px">
                  <Label>우대 사항</Label>
                  <Input placeholder="우대 사항을 작성해주세요." width="800px"></Input>
                </InputContainer>
                <InputContainer width="1000px">
                  <Label>요구 역량</Label>
                  <Input placeholder="요구하는 역량을 선택해주세요." width="800px"></Input>
                </InputContainer>
                <InputContainer width="1000px">
                  <Label>직무기술서</Label>
                  <Input type="file" role={role} width="800px"></Input>
                </InputContainer>
                <InputContainer width="1000px">
                  <Label>공고 자료</Label>
                  <Input type="file" role={role} width="800px"></Input>
                </InputContainer>
              </Form>
            )}
            <Button onClick={getNextPage} role={role}>{page <= 1 ? "다음으로" : "작성 완료"}</Button>
          </Container>
        )
    }
}