import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";
import colors from "../../styles/colors";
import company from '../../assets/company.png';
import arrowCompany from '../../assets/arrow-company.png';
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
        // content: " *";
        // color: #ff7070ff;
        // font-weight: 600;
    }
`;

const Input = styled.input.withConfig({
    shouldForwardProp: (prop) => prop !== "hasError"
})<{ width?: string, hasError?: boolean, role?: string }>`
    width: ${(props) => props.width || "300px"};
    height: 30px;
    background: #FFFFFF;
    color: #333;
    border: 1px solid #9E9E9E;
    padding: 2px 10px;
    &:focus {
        outline: none;
        // border: 2px solid ${(props) => (props.hasError ? "#fc734dff" : "#f9aaadff")};
        // box-shadow: 0 0 6px rgba(99, 153, 251, 0.5);
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

const Paragraph = styled.div`
  width: 1000px;
  color: black;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 10px;
  padding: 0px 100px 0px 100px;
`;


const JobContainer = styled.div`
    position: relative;
    top: 0px;
    left: 300px;
    width: 610px;
    height: 1px;
`;

const JobRegion = styled.div<{ role?: string }>`
  height: 620px;
  overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 12px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #bbb;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background-color: #ffffffff;
        border-radius: 10px;
        border: 2px solid #cccccc;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #ddd;
    }
`;

const JobPosting = styled.div`
    width: 560px;
    height: 100px;
    margin-top: 15px;
    margin-bottom: 15px;
    margin-left: 5px;
    background: rgba(255, 255, 255, 1);
    border: 2px solid #b2b2b2ff;
    border-radius: 5px;
    box-shadow: 1px 1px 1px rgba(171, 171, 171, 0.2);
    transition: transform 0.1s ease;
    &:hover {
      background: rgba(247, 247, 247, 1);
    }
    &:hover div {
      visibility: visible;
    }
    &:active {
      transform: scale(0.98);
    }
`;

const JobImage = styled.div`
    margin-left: 15px;
    margin-top: 15px;
    width: 30px;
`;

const JobTitle = styled.div`
    width: 500px;
    font-size: 14px;
    font-weight: 600;
    color: #242424ff;
    position: relative;
    top: -25px;
    left: 41px;
`;

const JobContent = styled.div`
    width: 320px;
    font-size: 12px;
    color: #242424ff;
    position: relative;
    top: -38px;
    left: 20px;
    line-height: 22px;
`;

const JobButton = styled.div<{ role?: string }>`
    all: unset;
    visibility: hidden;
    width: 50px;
    height: 22px;
    text-align: center;
    position: relative;
    cursor: pointer;
    font-size: 16px;
    top: -21px;
    left: 400px;
    font-weight: 600;
    color: ${({ role }) => (role === "company" ? colors.company : colors.talent )};
    transition: transform 0.1s ease;
    &:active {
      transform: scale(0.95);
    }
`;

const Padding = styled.div`
  width: 1000px;
  height: 80px;
`

export default function MyJobProfile() {
    const { token, setToken, role, setRole, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const queryJobId = new URLSearchParams(location.search).get("job");
    
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

    const [jobInfo, setJobInfo] = useState({ title: "", position: "", department: "", location: "", employment: "", salary: "", career: "", education: "", join: "", period: "", homepage: "", deadline: "", contact_email: "", contact_phone: "" });
    const [additionalInfo, setAdditionalInfo] = useState({ role: "", requirement: "", preference: "", capacity: ""});
    const [jobDescriptionFile, setJobDescriptionFile] = useState<File | null>(null);
    const [jobPostingFile, setJobPostingFile] = useState<File | null>(null);
    const [jobList, setJobList] = useState(null);

    // Validation
    const [errors, setErrors] = useState<{ title?: string; deadline?: string}>({});

    const submitJobId = (id) => {
      const params = new URLSearchParams(location.search);
      params.set("job", id);
      navigate(`${location.pathname}?${params.toString()}`);
    }

    useEffect(() => {
        if (role === 'company' && !queryJobId) {
          axios.get(`${baseURL}/api/me/company/job-postings`, { headers: { Authorization: `Bearer ${token}` } })
          .then((response) => {
            setJobList(response.data.data);
          })
          .catch((error) => {
            console.error("데이터 불러오기 실패:", error);
          });
        } else if (role === 'company' && queryJobId) {
          const query = new URLSearchParams(location.search);
          const jobId = query.get("job");
          axios.get(`${baseURL}/api/job-postings/${jobId}`, { headers: { Authorization: `Bearer ${token}` } })
          .then((response) => {
            const data = response.data.data;
            setJobInfo({
              title: data.title || "",
              position: data.position || jobs[0],
              department: data.department || "",
              location: data.location_city || residence[0],
              employment: data.employment_type || employment[0],
              salary: data.salary_range || salary[0],
              career: data.career_level || career[0],
              education: data.education_level || education[0],
              join: data.start_date || "",
              period: data.term_months || "",
              homepage: data.homepage_url || "",
              deadline: data.deadline_date || "",
              contact_email: data.contact_email || "",
              contact_phone: data.contact_phone || "",
            });
            setAdditionalInfo({
              role: data.responsibilities || "",
              requirement: data.requirements_must || "",
              preference: data.requirements_nice || "",
              capacity: data.competencies || "",
            });
          })
          .catch((error) => {
            console.error("데이터 불러오기 실패:", error);
          });
        }
    }, [loading, location.search]);


    if (role === "talent") {
        navigate("/");
    } else if (role === 'company' && !queryJobId) {
      return (
        <Container>
          <Title style={{'marginBottom': '20px'}}>📰 공고 목록</Title>
            <Paragraph>공고를 선택해주세요.</Paragraph>
            <JobContainer>
              <JobRegion>
                {jobList?.map((job) => (
                  <JobPosting onClick={() => submitJobId(job.id)} key={job.id}>
                    <JobImage><img src={company} alt="Logo" width={24*0.8} height={27*0.8}></img></JobImage>
                    <JobTitle>{job.title}</JobTitle>
                    <JobButton role="company">
                      공고 내용 확인<img src={arrowCompany} alt="Logo" style={{'transform': 'rotate(180deg)', 'position': 'absolute', 'marginLeft': '5px', 'marginTop': '3px'}} width={24*0.8} height={24*0.8}></img>
                    </JobButton>
                    <JobContent>· {job?.employment_type}  |  {job?.career_level}<br/>· {job?.department} | {job?.deadline_date.replace("-", ".").replace("-", ".")} 마감</JobContent>
                  </JobPosting>
                ))}
              </JobRegion>
            </JobContainer>
        </Container>
      )
    } else if (role === "company") {
        return (
          <Container>
            <Title>📰 공고 목록</Title>
              <Padding style={{"height": "20px"}}></Padding>

              <Form>
                <FormTitle>공고 기본정보</FormTitle>
                <InputContainer>
                  <Label className="required">공고명</Label>
                  <Input readOnly value={jobInfo.title} onChange={(e) => setJobInfo((prev) => ({ ...prev, title: e.target.value }))} hasError={!!errors.title}></Input>
                </InputContainer>
                <InputContainer>
                  <Label className="required">포지션</Label>
                  <Input readOnly value={jobInfo.position} onChange={(e) => setJobInfo((prev) => ({ ...prev, position: e.target.value }))}>
                  </Input>
                </InputContainer>
                <InputContainer>
                  <Label className="required">공고 마감</Label>
                  <Input readOnly value={jobInfo.deadline} onChange={(e) => setJobInfo((prev) => ({ ...prev, deadline: e.target.value }))} hasError={!!errors.deadline}></Input>
                </InputContainer>
                <InputContainer>
                  <Label className="required">회사 위치</Label>
                  <Input readOnly value={jobInfo.location} onChange={(e) => setJobInfo((prev) => ({ ...prev, location: e.target.value }))}>
                  </Input>
                </InputContainer>
                <InputContainer>
                  <Label className="required">고용 형태</Label>
                  <Input readOnly value={jobInfo.employment} onChange={(e) => setJobInfo((prev) => ({ ...prev, employment: e.target.value }))}>
                  </Input>
                </InputContainer>
                <InputContainer>
                  <Label className="required">연봉</Label>
                  <Input readOnly value={jobInfo.salary} onChange={(e) => setJobInfo((prev) => ({ ...prev, salary: e.target.value }))}>
                  </Input>
                </InputContainer>
                <InputContainer>
                  <Label className="required">신입/경력</Label>
                  <Input readOnly value={jobInfo.career} onChange={(e) => setJobInfo((prev) => ({ ...prev, career: e.target.value }))}>
                  </Input>
                </InputContainer>
                <InputContainer>
                  <Label className="required">학력</Label>
                  <Input readOnly value={jobInfo.education} onChange={(e) => setJobInfo((prev) => ({ ...prev, education: e.target.value }))}>
                  </Input>
                </InputContainer>
                <InputContainer>
                  <Label>근무 시작</Label>
                  <Input readOnly value={jobInfo.join} onChange={(e) => setJobInfo((prev) => ({ ...prev, join: e.target.value }))}></Input>
                </InputContainer>
                <InputContainer>
                  <Label>근무 기간</Label>
                  <Input readOnly value={jobInfo.period} onChange={(e) => setJobInfo((prev) => ({ ...prev, period: e.target.value }))}></Input>
                </InputContainer>
                <InputContainer>
                  <Label>근무 부서</Label>
                  <Input readOnly value={jobInfo.department} onChange={(e) => setJobInfo((prev) => ({ ...prev, department: e.target.value }))}></Input>
                </InputContainer>
                <InputContainer>
                  <Label>홈페이지</Label>
                  <Input readOnly value={jobInfo.homepage} onChange={(e) => setJobInfo((prev) => ({ ...prev, homepage: e.target.value }))}></Input>
                </InputContainer>
                <InputContainer>
                  <Label>문의 메일</Label>
                  <Input readOnly value={jobInfo.contact_email} onChange={(e) => setJobInfo((prev) => ({ ...prev, contact_email: e.target.value }))}></Input>
                </InputContainer>
                <InputContainer>
                  <Label>문의 연락처</Label>
                  <Input readOnly value={jobInfo.contact_phone} onChange={(e) => setJobInfo((prev) => ({ ...prev, contact_phone: e.target.value }))}></Input>
                </InputContainer>
              <Padding></Padding>
            
                <FormTitle>공고 세부내용</FormTitle>
                <InputContainer width="1000px">
                  <Label>직무기술서</Label>
                  <Input readOnly role={role} onChange={(e) => setJobDescriptionFile(e.target.files?.[0] || null)} width="800px"></Input>
                </InputContainer>
                <InputContainer width="1000px">
                  <Label>공고 자료</Label>
                  <Input readOnly role={role} onChange={(e) => setJobPostingFile(e.target.files?.[0] || null)} width="800px"></Input>
                </InputContainer>
                <InputContainer width="1000px">
                  <Label style={{ 'marginTop': '20px', 'marginBottom': '30px' }}>업무 내용</Label>
                  <Textarea readOnly style={{ 'height': '200px', 'marginTop': '20px', 'marginBottom': '30px' }} value={additionalInfo.role} onChange={(e) => setAdditionalInfo((prev) => ({ ...prev, role: e.target.value }))} width="800px"></Textarea>
                </InputContainer>
                <InputContainer width="1000px">
                  <Label style={{ 'marginBottom': '30px' }}>필수 요건</Label>
                  <Textarea readOnly style={{ 'height': '200px', 'marginBottom': '30px' }} value={additionalInfo.requirement} onChange={(e) => setAdditionalInfo((prev) => ({ ...prev, requirement: e.target.value }))} width="800px"></Textarea>
                </InputContainer>
                <InputContainer width="1000px">
                  <Label style={{ 'marginBottom': '30px' }}>우대 사항</Label>
                  <Textarea readOnly style={{ 'height': '200px', 'marginBottom': '30px' }} value={additionalInfo.preference} onChange={(e) => setAdditionalInfo((prev) => ({ ...prev, preference: e.target.value }))} width="800px"></Textarea>
                </InputContainer>
                <InputContainer width="1000px">
                  <Label style={{ 'marginBottom': '30px' }}>요구 역량</Label>
                  <Textarea readOnly style={{ 'height': '200px', 'marginBottom': '30px' }} value={additionalInfo.capacity} onChange={(e) => setAdditionalInfo((prev) => ({ ...prev, capacity: e.target.value }))} width="800px"></Textarea>
                </InputContainer>
              </Form>
              <Padding></Padding>
          </Container>
        )
    }
}