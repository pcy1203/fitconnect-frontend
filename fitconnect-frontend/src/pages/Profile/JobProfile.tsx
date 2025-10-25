import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";
import colors from "../../styles/colors";
import styled from "styled-components";
import axios from "axios";

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

const FormContent = styled.div`
  width: 920px;
  color: black;
  margin-top: 20px;
  margin-left: 40px;
  margin-bottom: 40px;
  background: #e6e6e6ff;
  border-radius: 10px;
`;

const FormParagraph = styled.p`
  margin-left: 40px;
  margin-top: 30px;
  margin-bottom: 30px;
  color: black;
  line-height: 30px;
`;

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
    &.required::after {
        content: " *";
        color: #ff7070ff;
        font-weight: 600;
    }
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
        border: 2px solid ${(props) => (props.hasError ? "#fc734dff" : "#f9aaadff")};
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

const Textarea = styled.textarea.withConfig({
    shouldForwardProp: (prop) => prop !== "hasError"
})<{ width?: string, height?: string, hasError?: boolean, role?: string }>`
    width: ${(props) => props.width || "300px"};
    height: ${(props) => props.height || "30px"};
    background: #FFFFFF;
    color: #000000;
    border: 1px solid #9E9E9E;
    padding: 10px 10px;
    &:focus {
        outline: none;
        border: 2px solid ${ colors.company };
        box-shadow: 0 0 6px rgba(99, 153, 251, 0.5);
    }
    &::placeholder {
        color: #dbdbdb;
    }
    font-family: inherit;
    resize: none;
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
        border: 2px solid #f9aaadff;
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

const ButtonContainer = styled.div`
  width: 1200px;
  margin-top: 30px;
  margin-left: 100px;
  display: flex;
  flex-direction: row;
  gap: 598px;
`;

const Button = styled.button<{ role?: string }>`
    all: unset;
    width: 200px;
    height: 40px;
    background: ${({ role }) => (role === "company" ? colors.company : colors.talent )};
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

export default function JobProfile() {
    const { token, setToken, role, setRole, loading } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!loading && (!token || !role)) navigate("/auth/login");
    }, [loading, token]);

    const jobs = ["고객지원/CX","개발/엔지니어","기획/PM","디자인","데이터 분석","마케팅","연구개발","영업","인사","재무/회계","전략/비즈니스","콘텐츠 제작","QA","기타"];
    const residence = ["서울","경기","인천","부산","대구","대전","광주","울산","강원","충북","충남","전북","전남","경북","경남"];
    const employment = ["정규직", "계약직", "파견직", "인턴", "기타"]
    const salary = ["연봉 추후 협상","2000만 ~ 3000만","3000만 ~ 4000만","4000만 ~ 5000만","5000만 ~ 6000만","6000만 ~ 7000만","7000만 ~ 8000만","8000만 ~ 9000만","9000만 ~ 1억","1억 ~ 1.2억","1.2억 ~ 1.5억","1.5억 이상"];
    const career =["신입", "경력 2년 이하", "경력 3년 ~ 4년", "경력 5년 ~ 6년", "경력 7년 ~ 8년", "경력 9년 ~ 10년", "경력 11년 이상"];
    const education = ["학력 무관","대학 재학 이상","대학 졸업 이상","석사 이상","박사 이상"];

    const [page, setPage] = useState(1);
    const [submitPage, setSubmitPage] = useState(0);

    const [jobInfo, setJobInfo] = useState({ title: "", position: jobs[0], department: "", location: residence[0], employment: employment[0], salary: salary[0], career: career[0], education: education[0], join: "", period: "", homepage: "", deadline: "", contact_email: "", contact_phone: "" });
    const [additionalInfo, setAdditionalInfo] = useState({ role: "", requirement: "", preference: "", capacity: ""});
    const [jobDescriptionFile, setJobDescriptionFile] = useState<File | null>(null);
    const [jobPostingFile, setJobPostingFile] = useState<File | null>(null);

    // Validation
    const [errors, setErrors] = useState<{ title?: string; deadline?: string}>({});

    useEffect(() => {
        if (submitPage < 1 || jobInfo.title) {
          setErrors((prev) => ({ ...prev, title: undefined }));
        } else {
          setErrors((prev) => ({ ...prev, title: "공고명을 입력해주세요." }));
        }
    }, [jobInfo.title, submitPage]);

    useEffect(() => {
        if (submitPage < 1 || jobInfo.deadline) {
          setErrors((prev) => ({ ...prev, deadline: undefined }));
        } else {
          setErrors((prev) => ({ ...prev, deadline: "마감일을 입력해주세요." }));
        }
    }, [jobInfo.deadline, submitPage]);

    const getNextPage = async () => {
        setSubmitPage(page);
        if (!jobInfo.title || !jobInfo.deadline) {
          alert("입력하신 정보를 다시 한 번 확인해주세요!");
        } else if (page >= 2) {
            try {
              console.log(token);
                // POST /api/me/company/job-postings
                const res = await axios.post(`${baseURL}/api/me/company/job-postings`, {
                    title: jobInfo.title,
                    position: jobInfo.position,
                    department: jobInfo.department,
                    location_city: jobInfo.location,
                    employment_type: jobInfo.employment,
                    salary_range: jobInfo.salary,
                    career_level: jobInfo.career,
                    education_level: jobInfo.education,
                    start_date: jobInfo.join,
                    term_months: jobInfo.period,
                    homepage_url: jobInfo.homepage,
                    deadline_date: jobInfo.deadline,
                    contact_email: jobInfo.contact_email,
                    contact_phone: jobInfo.contact_phone,
                    responsibilities: additionalInfo.role,
                    requirements_must: additionalInfo.requirement,
                    requirements_nice: additionalInfo.preference,
                    competencies: additionalInfo.capacity,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                // === TO-DO ===
                // const formData = new FormData();
                // Object.entries(additionalInfo).forEach(([key, value]) => {
                //     if (value) formData.append(key, value);
                // });
                // if (jobDescriptionFile) formData.append("job_description", jobDescriptionFile);
                // if (jobPostingFile) formData.append("job_posting", jobPostingFile);
                // const res = await axios.post(`${baseURL}/api/me/company/job-postings`, formData, {
                //     headers: {
                //         "Content-Type": "multipart/form-data",
                //         Authorization: `Bearer ${token}`,
                //     },
                // });
                if (res.status === 201) {
                    navigate(`/assessment/interview?job=${res.data.data.id}`);
                }
            } catch (err) {
                alert("공고 설정에 실패했습니다.");
            }
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
                  <Label className="required">공고명</Label>
                  <Input placeholder="프론트엔드 개발자" value={jobInfo.title} onChange={(e) => setJobInfo((prev) => ({ ...prev, title: e.target.value }))} hasError={!!errors.title}></Input>
                  {errors.title && <ErrorText>{errors.title}</ErrorText>}
                </InputContainer>
                <InputContainer>
                  <Label className="required">포지션</Label>
                  <Select value={jobInfo.position} onChange={(e) => setJobInfo((prev) => ({ ...prev, position: e.target.value }))}>
                    {jobs.map((value) => (<option key={value} value={value}>{value}</option>))}
                  </Select>
                </InputContainer>
                <InputContainer>
                  <Label className="required">공고 마감</Label>
                  <Input type="date" value={jobInfo.deadline} onChange={(e) => setJobInfo((prev) => ({ ...prev, deadline: e.target.value }))} hasError={!!errors.deadline}></Input>
                  {errors.deadline && <ErrorText>{errors.deadline}</ErrorText>}
                </InputContainer>
                <InputContainer>
                  <Label className="required">회사 위치</Label>
                  <Select value={jobInfo.location} onChange={(e) => setJobInfo((prev) => ({ ...prev, location: e.target.value }))}>
                    {residence.map((value) => (<option key={value} value={value}>{value}</option>))}
                  </Select>
                </InputContainer>
                <InputContainer>
                  <Label className="required">고용 형태</Label>
                  <Select value={jobInfo.employment} onChange={(e) => setJobInfo((prev) => ({ ...prev, employment: e.target.value }))}>
                    {employment.map((value) => (<option key={value} value={value}>{value}</option>))}
                  </Select>
                </InputContainer>
                <InputContainer>
                  <Label className="required">연봉</Label>
                  <Select value={jobInfo.salary} onChange={(e) => setJobInfo((prev) => ({ ...prev, salary: e.target.value }))}>
                    {salary.map((value) => (<option key={value} value={value}>{value}</option>))}
                  </Select>
                </InputContainer>
                <InputContainer>
                  <Label className="required">신입/경력</Label>
                  <Select value={jobInfo.career} onChange={(e) => setJobInfo((prev) => ({ ...prev, career: e.target.value }))}>
                    {career.map((value) => (<option key={value} value={value}>{value}</option>))}
                  </Select>
                </InputContainer>
                <InputContainer>
                  <Label className="required">학력</Label>
                  <Select value={jobInfo.education} onChange={(e) => setJobInfo((prev) => ({ ...prev, education: e.target.value }))}>
                    {education.map((value) => (<option key={value} value={value}>{value}</option>))}
                  </Select>
                </InputContainer>
                <InputContainer>
                  <Label>근무 시작</Label>
                  <Input placeholder="근무 시작일" value={jobInfo.join} onChange={(e) => setJobInfo((prev) => ({ ...prev, join: e.target.value }))}></Input>
                </InputContainer>
                <InputContainer>
                  <Label>근무 기간</Label>
                  <Input placeholder="O년 / O개월 (계약직, 인턴)" value={jobInfo.period} onChange={(e) => setJobInfo((prev) => ({ ...prev, period: e.target.value }))}></Input>
                </InputContainer>
                <InputContainer>
                  <Label>근무 부서</Label>
                  <Input placeholder="개발팀" value={jobInfo.department} onChange={(e) => setJobInfo((prev) => ({ ...prev, department: e.target.value }))}></Input>
                </InputContainer>
                <InputContainer>
                  <Label>홈페이지</Label>
                  <Input placeholder="홈페이지 링크" value={jobInfo.homepage} onChange={(e) => setJobInfo((prev) => ({ ...prev, homepage: e.target.value }))}></Input>
                </InputContainer>
                <InputContainer>
                  <Label>문의 메일</Label>
                  <Input placeholder="fitconnect@gmail.com" value={jobInfo.contact_email} onChange={(e) => setJobInfo((prev) => ({ ...prev, contact_email: e.target.value }))}></Input>
                </InputContainer>
                <InputContainer>
                  <Label>문의 연락처</Label>
                  <Input placeholder="02-0000-0000" value={jobInfo.contact_phone} onChange={(e) => setJobInfo((prev) => ({ ...prev, contact_phone: e.target.value }))}></Input>
                </InputContainer>
              </Form>
            )}
            
            {page == 2 && (
              <Form>
                <FormTitle>공고 세부내용 입력</FormTitle>
                <FormContent>
                  <FormParagraph>🤔 <b>공고 작성에 어려움을 겪고 계신가요?</b><br/>
                  필요한 내용만 간단히 입력 후 하단의 '작성 완료' 버튼을 누르면, <b>AI 분석 인터뷰</b>를 바로 진행할 수 있어요.<br/>
                  실무진 팀원들 · HR(인사팀) 담당자가 함께 논의하는 내용을 AI가 분석하여, <b>공고에 들어갈 내용을 추천</b>받을 수 있답니다!
                  </FormParagraph>
                </FormContent>
                <InputContainer width="1000px">
                  <Label>직무기술서</Label>
                  <Input type="file" role={role} onChange={(e) => setJobDescriptionFile(e.target.files?.[0] || null)} width="800px"></Input>
                </InputContainer>
                <InputContainer width="1000px">
                  <Label>공고 자료</Label>
                  <Input type="file" role={role} onChange={(e) => setJobPostingFile(e.target.files?.[0] || null)} width="800px"></Input>
                </InputContainer>
                <InputContainer width="1000px">
                  <Label style={{ 'marginTop': '20px', 'marginBottom': '30px' }}>업무 내용</Label>
                  <Textarea style={{ 'height': '200px', 'marginTop': '20px', 'marginBottom': '30px' }} placeholder="담당하게 될 업무 내용을 소개해주세요." value={additionalInfo.role} onChange={(e) => setAdditionalInfo((prev) => ({ ...prev, role: e.target.value }))} width="800px"></Textarea>
                </InputContainer>
                <InputContainer width="1000px">
                  <Label style={{ 'marginBottom': '30px' }}>필수 요건</Label>
                  <Textarea style={{ 'height': '200px', 'marginBottom': '30px' }} placeholder="지원 자격/요건을 작성해주세요." value={additionalInfo.requirement} onChange={(e) => setAdditionalInfo((prev) => ({ ...prev, requirement: e.target.value }))} width="800px"></Textarea>
                </InputContainer>
                <InputContainer width="1000px">
                  <Label style={{ 'marginBottom': '30px' }}>우대 사항</Label>
                  <Textarea style={{ 'height': '200px', 'marginBottom': '30px' }} placeholder="우대 사항을 작성해주세요." value={additionalInfo.preference} onChange={(e) => setAdditionalInfo((prev) => ({ ...prev, preference: e.target.value }))} width="800px"></Textarea>
                </InputContainer>
                <InputContainer width="1000px">
                  <Label style={{ 'marginBottom': '30px' }}>요구 역량</Label>
                  <Textarea style={{ 'height': '200px', 'marginBottom': '30px' }} placeholder="요구하는 역량을 선택해주세요." value={additionalInfo.capacity} onChange={(e) => setAdditionalInfo((prev) => ({ ...prev, capacity: e.target.value }))} width="800px"></Textarea>
                </InputContainer>
              </Form>
            )}
            <ButtonContainer>
              <Button onClick={() => {setPage(page - 1)}} role={role} style={page === 1 ? { display: 'none' } : {}}>이전으로</Button>
              <Button onClick={getNextPage} role={role} style={page === 1 ? { marginLeft: '798px' } : {}}>{page <= 1 ? "다음으로" : "작성 완료"}</Button>
            </ButtonContainer>
          </Container>
        )
    }
}