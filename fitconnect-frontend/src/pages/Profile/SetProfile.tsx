import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";

import React from "react";
import colors from "../../styles/colors";
import styled from "styled-components";

const color = '#F7F8FA'; // 부모 컴포넌트 전달

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
})<{ width?: string, hasError?: boolean }>`
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
        background-color: #6399FB;
        border: none;
        border-radius: 20px;
        color: white;
        cursor: pointer;
    }
    &::file-selector-button:hover {
        background-color: #87B2FF;
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

export default function SetProfile() {
    const { token, setToken, role, setRole } = useAuth();
    const [page, setPage] = useState(1);

    const [primaryInfo, setPrimaryInfo] = useState({ name: "", birth: "", email: "", phone: "", intro: ""});
    const [educationList, setEducationList] = useState([{ school: "", major: "", entrance: "", graduation: "", status: "" }]);
    const [careerList, setCareerList] = useState([{ company: "", role: "", join: "", leave: "", reason: "", description: ""}]);
    const [activityList, setActivityList] = useState([{ name: "", type: "", description: "" }]);
    const [certificateList, setCertificateList] = useState([{ name: "", score: "", date: "" }]);

    const [errors, setErrors] = useState<{ birth?: string; email?: string; phone?: string }>({});
    const navigate = useNavigate();

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

    const status = ["재학","휴학","졸업 예정","졸업 유예","졸업","중퇴"]
    const desiredJobs = ["직무 무관","고객지원/CX","개발/엔지니어","기획/PM","디자인","데이터 분석","마케팅","연구개발","영업","인사","재무/회계","전략/비즈니스","콘텐츠 제작","QA","기타"];
    const desiredSalary = ["연봉 무관","2000만 ~ 3000만","3000만 ~ 4000만","4000만 ~ 5000만","5000만 ~ 6000만","6000만 ~ 7000만","7000만 ~ 8000만","8000만 ~ 9000만","9000만 ~ 1억","1억 ~ 1.2억","1.2억 ~ 1.5억","1.5억 이상"];
    const desiredIndustry = ["산업 무관","IT/소프트웨어","게임","핀테크/금융","제조/공장","교육/연구","헬스케어/의료","미디어/콘텐츠","광고","유통/리테일","물류/운송","공공/정부","법률/회계","스타트업/벤처","외국계"];
    const desiredCompanySize = ["규모 무관","1 ~ 10명","10 ~ 50명","50 ~ 100명","100 ~ 200명","200 ~ 500명","500 ~ 1000명","1000명 이상"];
    const residence = ["서울","경기","인천","부산","대구","대전","광주","울산","강원","충북","충남","전북","전남","경북","경남"];
    const desiredWorkplace = ["서울","경기","인천","부산","대구","대전","광주","울산","강원","충북","충남","전북","전남","경북","경남"];

    const getNextPage = () => {
        if (errors.birth || errors.email || errors.phone) {
            alert("입력하신 정보를 다시 한 번 확인해주세요!");
        } else if (role === 'company' && page >= 2) {
            navigate("/profile/jobprofile");
        } else if ((role === 'talent' || !role) && page >= 5) {
            navigate("/assessment/interview");
        } else {
            setPage(page + 1);
        }
    };

    if (role === "talent" || !role) {
        return (
          <Container>
            <Title>✏️ 인재 프로필 입력</Title>
            <ProgressBarContainer>
              <Progress progress={page * 20} role={role}></Progress>
              <ProgressText>{page} / 5</ProgressText>
            </ProgressBarContainer>

            {page == 1 && (
              <Form>
                <FormTitle>기본정보 입력</FormTitle>
                <InputContainer>
                  <Label>이름</Label>
                  <Input placeholder="이름"></Input>
                </InputContainer>
                <InputContainer>
                  <Label>생년월일</Label>
                  <Input placeholder="2025-01-01" value={primaryInfo.birth} onChange={(e) => setPrimaryInfo((prev) => ({ ...prev, birth: e.target.value }))} hasError={!!errors.birth}></Input>
                  {errors.birth && <ErrorText>{errors.birth}</ErrorText>}
                </InputContainer>
                <InputContainer>
                  <Label>이메일</Label>
                  <Input placeholder="fitconnect@gmail.com" value={primaryInfo.email} onChange={(e) => setPrimaryInfo((prev) => ({ ...prev, email: e.target.value }))} hasError={!!errors.email}></Input>
                  {errors.email && <ErrorText>{errors.email}</ErrorText>}
                </InputContainer>
                <InputContainer>
                  <Label>휴대전화</Label>
                  <Input placeholder="010-0000-0000" value={primaryInfo.phone} onChange={(e) => setPrimaryInfo((prev) => ({ ...prev, phone: e.target.value }))} hasError={!!errors.phone}></Input>
                  {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
                </InputContainer>
                <InputContainer width="1000px">
                  <Label>한 줄 소개</Label>
                  <Input placeholder="나를 한 줄로 표현해주세요!" width="800px"></Input>
                </InputContainer>
              </Form>
            )}
            
            {page == 2 && (
              <Form>
                <FormTitle>학력사항 입력</FormTitle>
                {educationList.map((education, idx) => (
                  <React.Fragment key={idx}>
                    {idx >= 1 && <Line></Line>}
                    <InputContainer width="325px">
                      <Label>학교</Label>
                      <Input placeholder="학교명" width="150px"></Input>
                    </InputContainer>
                    <InputContainer width="650px">
                      <Label>전공</Label>
                      <Input placeholder="전공명" width="475px"></Input>
                    </InputContainer>
                    <InputContainer width="325px">
                      <Label>입학연도</Label>
                      <Input type="month" width="150px"></Input>
                    </InputContainer>
                    <InputContainer width="325px">
                      <Label>졸업연도</Label>
                      <Input type="month" width="150px"></Input>
                    </InputContainer>
                    <InputContainer width="300px">
                      <Label>재학/졸업</Label>
                      <Select width="174px">
                        {status.map((value) => (<option key={value} value={value}>{value}</option>))}
                      </Select>
                    </InputContainer>
                  </React.Fragment>
                ))}
                <AddButton onClick={() => setEducationList([...educationList, { school: "", major: "", entrance: "", graduation: "", status: ""}])}>+ 학력 추가</AddButton>
                <Padding></Padding>
                <FormTitle>경력사항 입력</FormTitle>
                {careerList.map((career, idx) => (
                  <React.Fragment key={idx}>
                    {idx >= 1 && <Line></Line>}
                    <InputContainer width="325px">
                      <Label>직장</Label>
                      <Input placeholder="회사명" width="150px"></Input>
                    </InputContainer>
                    <InputContainer width="650px">
                      <Label>직무</Label>
                      <Input placeholder="직무명" width="475px"></Input>
                    </InputContainer>
                    <InputContainer width="325px">
                      <Label>입사일</Label>
                      <Input type="month" width="150px"></Input>
                    </InputContainer>
                    <InputContainer width="325px">
                      <Label>퇴사일</Label>
                      <Input type="month" width="150px"></Input>
                    </InputContainer>
                    <InputContainer width="300px">
                      <Label>퇴사사유</Label>
                      <Input placeholder="이직 등" width="150px"></Input>
                    </InputContainer>
                    <InputContainer width="1000px">
                      <Label>업무 내용</Label>
                      <Input placeholder="담당했던 핵심 업무 내용" width="800px"></Input>
                    </InputContainer>
                  </React.Fragment>
                ))}
                <AddButton onClick={() => setCareerList([...careerList, { company: "", role: "", join: "", leave: "", reason: "", description: "" }])}>+ 경력 추가</AddButton>
              </Form>
            )}

            {page == 3 && (
              <Form>
                <FormTitle>활동내역 입력</FormTitle>
                {activityList.map((activity, idx) => (
                  <React.Fragment key={idx}>
                    {idx >= 1 && <Line></Line>}
                    <InputContainer>
                      <Label>활동명</Label>
                      <Input placeholder="활동명"></Input>
                    </InputContainer>
                    <InputContainer>
                      <Label>구분</Label>
                      <Input placeholder="봉사활동, 동아리활동 등"></Input>
                    </InputContainer>
                    <InputContainer width="1000px">
                      <Label>내용</Label>
                      <Input placeholder="진행했던 핵심 활동 내용" width="800px"></Input>
                    </InputContainer>
                  </React.Fragment>
                ))}
                <AddButton onClick={() => setActivityList([...activityList, { name: "", type: "", description: "" }])}>+ 활동 추가</AddButton>
                <Padding></Padding>
                <FormTitle>자격사항 입력</FormTitle>
                {certificateList.map((certificate, idx) => (
                  <React.Fragment key={idx}>
                    {idx >= 1 && <Line></Line>}
                    <InputContainer width="325px">
                      <Label>자격증</Label>
                      <Input placeholder="자격증 이름" width="150px"></Input>
                    </InputContainer>
                    <InputContainer width="325px">
                      <Label>점수/급수</Label>
                      <Input placeholder="990 / 1급" width="150px"></Input>
                    </InputContainer>
                    <InputContainer width="300px">
                      <Label>취득 시기</Label>
                      <Input type="month" width="150px"></Input>
                    </InputContainer>
                  </React.Fragment>
                ))}
                <AddButton onClick={() => setCertificateList([...certificateList, { name: "", score: "", date: "" }])}>+ 자격 추가</AddButton>
              </Form>
            )}

            {page == 4 && (
              <Form>
                <FormTitle>파일 업로드</FormTitle>
                <InputContainer width="1000px">
                  <Label>경력기술서</Label>
                  <Input type="file" placeholder="경력기술서 파일을 업로드 해주세요." width="800px"></Input>
                </InputContainer>
                <InputContainer width="1000px">
                  <Label>자기소개서</Label>
                  <Input type="file" placeholder="자기소개서 파일을 업로드 해주세요." width="800px"></Input>
                </InputContainer>
                <InputContainer width="1000px">
                  <Label>포트폴리오</Label>
                  <Input type="file" placeholder="포트폴리오 파일을 업로드 해주세요." width="800px"></Input>
                </InputContainer>
              </Form>
            )}

            {page == 5 && (
              <Form>
                <FormTitle>관심내용 입력</FormTitle>
                <InputContainer>
                  <Label>희망 직무</Label>
                  <Select>
                    {desiredJobs.map((value) => (<option key={value} value={value}>{value}</option>))}
                  </Select>
                </InputContainer>
                <InputContainer>
                  <Label>희망 연봉</Label>
                  <Select>
                    {desiredSalary.map((value) => (<option key={value} value={value}>{value}</option>))}
                  </Select>
                </InputContainer>
                <InputContainer>
                  <Label>희망 업종</Label>
                  <Select>
                    {desiredIndustry.map((value) => (<option key={value} value={value}>{value}</option>))}
                  </Select>
                </InputContainer>
                <InputContainer>
                  <Label>희망 규모</Label>
                  <Select>
                    {desiredCompanySize.map((value) => (<option key={value} value={value}>{value}</option>))}
                  </Select>
                </InputContainer>
                <InputContainer>
                  <Label>주거지</Label>
                  <Select>
                    {residence.map((value) => (<option key={value} value={value}>{value}</option>))}
                  </Select>
                </InputContainer>
                <InputContainer>
                  <Label>희망 근무지</Label>
                  <Select>
                    {desiredWorkplace.map((value) => (<option key={value} value={value}>{value}</option>))}
                  </Select>
                </InputContainer>
                <InputContainer width="1000px">
                  <Label>기타 사항</Label>
                  <Input placeholder="희망하는 기업/포지션에 대해 자유롭게 이야기해주세요." width="800px"></Input>
                </InputContainer>
              </Form>
            )}
            <Button onClick={getNextPage}>{page <= 4 ? "다음으로" : "작성 완료"}</Button>
          </Container>
        );
    } else if (role === "company") {
        return (
          <Container>
            <Title>✏️ 기업 정보 입력</Title>
            <ProgressBarContainer>
              <Progress progress={page * 50} role={role}></Progress>
              <ProgressText>{page} / 2</ProgressText>
            </ProgressBarContainer>

            {page == 1 && (
              <Form>
                <FormTitle>기본정보 입력</FormTitle>
                <InputContainer>
                  <Label>회사명</Label>
                  <Input placeholder="회사명"></Input>
                </InputContainer>
                <InputContainer>
                  <Label>업종</Label>
                  <Select>
                    {desiredIndustry.slice(1).map((value) => (<option key={value} value={value}>{value}</option>))}
                  </Select>
                </InputContainer>
                <InputContainer>
                  <Label>회사 규모</Label>
                  <Select>
                    {desiredCompanySize.slice(1).map((value) => (<option key={value} value={value}>{value}</option>))}
                  </Select>
                </InputContainer>
                <InputContainer>
                  <Label>회사 위치</Label>
                  <Select>
                    {residence.map((value) => (<option key={value} value={value}>{value}</option>))}
                  </Select>
                </InputContainer>
                <InputContainer>
                  <Label>대표 사이트</Label>
                  <Input placeholder="https://fitconnect.com"></Input>
                </InputContainer>
                <InputContainer>
                  <Label>채용 사이트</Label>
                  <Input placeholder="https://fitconnect.com/recruit"></Input>
                </InputContainer>
                <InputContainer width="1000px">
                  <Label>한 줄 소개</Label>
                  <Input placeholder="회사를 한 줄로 소개해주세요!" width="800px"></Input>
                </InputContainer>
              </Form>
            )}
            
            {page == 2 && (
              <Form>
                <FormTitle>회사 소개 입력</FormTitle>
                  <InputContainer width="1000px">
                    <Label>비전/미션</Label>
                    <Input placeholder="회사의 비전, 미션 등을 자유롭게 소개해 주세요." width="800px"></Input>
                  </InputContainer>
                  <InputContainer width="1000px">
                    <Label>사업 영역</Label>
                    <Input placeholder="회사의 핵심 사업 내용을 입력해 주세요." width="800px"></Input>
                  </InputContainer>
                  <InputContainer width="1000px">
                    <Label>인재상</Label>
                    <Input placeholder="회사가 추구하는 인재의 모습을 소개해 주세요." width="800px"></Input>
                  </InputContainer>
                  <InputContainer width="1000px">
                    <Label>조직문화</Label>
                    <Input placeholder="회사의 조직문화와 일하는 방식을 소개해 주세요." width="800px"></Input>
                  </InputContainer>
                  <InputContainer width="1000px">
                    <Label>복리후생</Label>
                    <Input placeholder="회사의 복리후생을 소개해 주세요." width="800px"></Input>
                  </InputContainer>
              </Form>
            )}
            <Button onClick={getNextPage} role={role}>{page <= 1 ? "다음으로" : "작성 완료"}</Button>
          </Container>
        )
    }
}