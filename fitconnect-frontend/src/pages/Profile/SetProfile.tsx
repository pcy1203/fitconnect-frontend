import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";
import React from "react";
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
})<{ width?: string, role?: string, hasError?: boolean }>`
    width: ${(props) => props.width || "300px"};
    height: 30px;
    background: #FFFFFF;
    color: #000000;
    border: 1px solid #9E9E9E;
    padding: 2px 10px;
    &:focus {
        outline: none;
        border: 2px solid ${(props) => (props.hasError ? "#fc734dff" : (props.role === "company" ? "#f9aaadff" : "#6399fb"))};
        box-shadow: 0 0 6px rgba(99, 153, 251, 0.5);
    }
    &::placeholder {
        color: #dbdbdb;
    }
    &::file-selector-button {
        width: 80px;
        padding: 5.5px;
        margin-right: 10px;
        background-color: ${(props) => (props.role === "company" ? "#f9aaadff" : "#6399fb")};
        border: none;
        border-radius: 20px;
        color: white;
        cursor: pointer;
    }
    &::file-selector-button:hover {
        background-color: #87B2FF;
    }
`;

const TextArea = styled.textarea.withConfig({
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
        border: 2px solid ${(props) => (props.hasError ? "#fc734dff" : (props.role === "company" ? "#f9aaadff" : "#6399fb"))};
        box-shadow: 0 0 6px rgba(99, 153, 251, 0.5);
    }
    &::placeholder {
        color: #dbdbdb;
    }
    font-family: inherit;
    resize: none;
`;

const Select = styled.select<{ width?: string, role?: string }>`
    width: ${(props) => props.width || "322px"};
    height: 36px;
    background: #FFFFFF;
    color: #000000;
    border: 1px solid #9E9E9E;
    padding: 2px 10px;
    &:focus {
        outline: none;
        border: 2px solid ${(props) => (props.role === "company" ? "#f9aaadff" : "#6399fb")};
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
    left: 690px;
    margin-left: 10px;
    margin-top: 20px;
    background: #9e9e9eff;
    color: #FFFFFF;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    border: 1px solid #9E9E9E;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    border-radius: 7px;
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

const Line = styled.hr`
    width: 950px;
    border: none;
    height: 1px;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: #b8b8b8ff;
`;

export default function SetProfile() {
    const { token, setToken, role, setRole, loading } = useAuth();
    const [page, setPage] = useState(1);
    const [submitPage, setSubmitPage] = useState(0);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!loading && (!token || !role)) navigate("/auth/login");
    }, [loading, token]);

    // Select Options
    const status = ["재학","휴학","졸업 예정","졸업 유예","졸업","중퇴"]
    const jobs = ["직무 무관","고객지원/CX","개발/엔지니어","기획/PM","디자인","데이터 분석","마케팅","연구개발","영업","인사","재무/회계","전략/비즈니스","콘텐츠 제작","QA","기타"];
    const salary = ["연봉 무관","2000만 ~ 3000만","3000만 ~ 4000만","4000만 ~ 5000만","5000만 ~ 6000만","6000만 ~ 7000만","7000만 ~ 8000만","8000만 ~ 9000만","9000만 ~ 1억","1억 ~ 1.2억","1.2억 ~ 1.5억","1.5억 이상"];
    const industry = ["산업 무관","IT/소프트웨어","게임","핀테크/금융","제조/공장","교육/연구","헬스케어/의료","미디어/콘텐츠","광고","유통/리테일","물류/운송","공공/정부","법률/회계","스타트업/벤처","외국계"];
    const companySize = ["규모 무관","1 ~ 10명","11 ~ 50명","51 ~ 100명","101 ~ 200명","201 ~ 500명","501 ~ 1000명","> 1000명"];
    const residence = ["지역 무관","서울","경기","인천","부산","대구","대전","광주","울산","강원","충북","충남","전북","전남","경북","경남"];
    
    // Talent
    const [primaryInfo, setPrimaryInfo] = useState({ name: "", birth: "", email: "", phone: "", intro: "" });
    const [educationList, setEducationList] = useState([]);
    const [careerList, setCareerList] = useState([]);
    const [activityList, setActivityList] = useState([]);
    const [certificateList, setCertificateList] = useState([]);
    // const [educationList, setEducationList] = useState([{ school: "", major: "", entrance: "", graduation: "", status: status[0] }]);
    // const [careerList, setCareerList] = useState([{ company: "", role: "", join: "", leave: "", reason: "", description: "" }]);
    // const [activityList, setActivityList] = useState([{ name: "", type: "", description: "" }]);
    // const [certificateList, setCertificateList] = useState([{ name: "", score: "", date: "" }]);
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
    const [portfolioFile, setPortfolioFile] = useState<File | null>(null);

    // Company
    const [basicInfo, setBasicInfo] = useState({ name: "", industry: industry[1], size: companySize[1], location: residence[1], homepage: "", recruit: "", intro: "" });
    const [additionalInfo, setAdditionalInfo] = useState({ vision: "", business: "", talent: "", culture: "", benefits: "" });
    
    // Validation
    const [errors, setErrors] = useState<{ name?: string; birth?: string; email?: string; phone?: string,
      career?: string; education?: string; activity?: string; certificate?: string; certificateDate?: string}>({});

    useEffect(() => {
        if (submitPage < 1 || primaryInfo.name) {
          setErrors((prev) => ({ ...prev, name: undefined }));
        } else {
          setErrors((prev) => ({ ...prev, name: "이름을 입력해주세요." }));
        }
    }, [primaryInfo.name, submitPage]);

    useEffect(() => {
        if ((submitPage < 1 && !primaryInfo.birth) || /^\d{4}-\d{2}-\d{2}$/.test(primaryInfo.birth)) {
          setErrors((prev) => ({ ...prev, birth: undefined }));
        } else {
          setErrors((prev) => ({ ...prev, birth: "YYYY-MM-DD 형식으로 입력해주세요." }));
        }
    }, [primaryInfo.birth, submitPage]);

    useEffect(() => {
        if ((submitPage < 1 && !primaryInfo.email) || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(primaryInfo.email)) {
          setErrors((prev) => ({ ...prev, email: undefined }));
        } else {
          setErrors((prev) => ({ ...prev, email: "이메일 형식으로 입력해주세요." }));
        }
    }, [primaryInfo.email, submitPage]);
    
    useEffect(() => {
        if ((submitPage < 1 && !primaryInfo.phone) || /^010-\d{4}-\d{4}$/.test(primaryInfo.phone)) {
          setErrors((prev) => ({ ...prev, phone: undefined }));
        } else {
          setErrors((prev) => ({ ...prev, phone: "010-0000-0000 형식으로 입력해주세요." }));
        }
    }, [primaryInfo.phone, submitPage]);

    useEffect(() => {
        if (submitPage >= 2 && educationList.some(education => !education.school)) {
          setErrors((prev) => ({ ...prev, education: "학력사항을 입력해주세요." }));
        } else {
          setErrors((prev) => ({ ...prev, education: undefined }));
        }
    }, [educationList, submitPage]);

    useEffect(() => {
        if (submitPage >= 2 && educationList.some(education => !education.school)) {
          setErrors((prev) => ({ ...prev, education: "학력사항을 입력해주세요." }));
        } else {
          setErrors((prev) => ({ ...prev, education: undefined }));
        }
    }, [educationList, submitPage]);

    useEffect(() => {
        if (submitPage >= 2 && careerList.some(career => !career.company)) {
          setErrors((prev) => ({ ...prev, career: "경력사항을 입력해주세요." }));
        } else {
          setErrors((prev) => ({ ...prev, career: undefined }));
        }
    }, [careerList, submitPage]);

    useEffect(() => {
        if (submitPage >= 3 && activityList.some(activity => !activity.name)) {
          setErrors((prev) => ({ ...prev, activity: "활동사항을 입력해주세요." }));
        } else {
          setErrors((prev) => ({ ...prev, activity: undefined }));
        }
    }, [activityList, submitPage]);

    useEffect(() => {
        if (submitPage >= 3 && certificateList.some(certificate => !certificate.name)) {
          setErrors((prev) => ({ ...prev, certificate: "자격사항을 입력해주세요." }));
        } else {
          setErrors((prev) => ({ ...prev, certificate: undefined }));
        }
    }, [certificateList, submitPage]);

    useEffect(() => {
        if (submitPage >= 3 && certificateList.some(certificate => !certificate.date)) {
          setErrors((prev) => ({ ...prev, certificateDate: "취득일을 입력해주세요." }));
        } else {
          setErrors((prev) => ({ ...prev, certificateDate: undefined }));
        }
    }, [certificateList, submitPage]);

    useEffect(() => {
        if (submitPage < 1 || basicInfo.name) {
          setErrors((prev) => ({ ...prev, name: undefined }));
        } else {
          setErrors((prev) => ({ ...prev, name: "회사명을 입력해주세요." }));
        }
    }, [basicInfo.name, submitPage]);

    const getNextPage = async () => {
        setSubmitPage(page);
        if (role === 'talent' &&
          (page == 1 && (!primaryInfo.name || !primaryInfo.birth || !primaryInfo.email || !primaryInfo.phone || errors.birth || errors.email || errors.phone))
          || (page == 2 && (educationList.some(education => !education.school) || careerList.some(career => !career.company)))
          || (page == 3 && (activityList.some(activity => !activity.name) || certificateList.some(certificate => !certificate.name || !certificate.date)))
        ) {
          alert("입력하신 정보를 다시 한 번 확인해주세요!");
        } else if (role === 'talent' && page >= 5) {
            try {
                // POST /api/me/talent/full
                // const formData = new FormData();
                // formData.append("basic", JSON.stringify({
                //     name: primaryInfo.name,
                //     birth_date: primaryInfo.birth || null,
                //     phone: primaryInfo.phone,
                //     tagline: primaryInfo.intro,
                //     is_submitted: true,
                // }));
                // formData.append("educations", JSON.stringify(
                //     educationList.filter(education => education.school).map(education => ({
                //         school_name: education.school,
                //         major: education.major,
                //         start_ym: education.entrance || null,
                //         end_ym: education.graduation || null,
                //         status: education.status,
                //     }))
                // ));
                // formData.append("experiences", JSON.stringify(
                //     careerList.filter(career => career.company).map(career => ({
                //         company_name: career.company,
                //         title: career.role,
                //         start_ym: career.join || null,
                //         end_ym: career.leave || null,
                //         reason: career.reason,
                //         summary: career.description,
                //     }))
                // ));
                // formData.append("activities", JSON.stringify(
                //     activityList.filter(activity => activity.name).map(activity => ({
                //         name: activity.name,
                //         category: activity.type,
                //         description: activity.description,
                //     }))
                // ));
                // formData.append("certifications", JSON.stringify(
                //     certificateList.filter(certificate => certificate.name).map(certificate => ({
                //         name: certificate.name,
                //         score_or_grade: certificate.score,
                //         acquired_ym: certificate.date,
                //     }))
                // ));
                // formData.append("submit", JSON.stringify(true));
                // if (resumeFile) formData.append("resume", resumeFile);
                // if (coverLetterFile) formData.append("cover_letter", coverLetterFile);
                // if (portfolioFile) formData.append("portfolio", portfolioFile);
                // const res = await axios.post(`${baseURL}/api/me/talent/full`, formData, {
                //     headers: {
                //         "Content-Type": "multipart/form-data",
                //         Authorization: `Bearer ${token}`,
                //     },
                // });
                const res = await axios.post(`${baseURL}/api/me/talent/full`, {
                    basic: {
                        name: primaryInfo.name,
                        email: primaryInfo.email,
                        birth_date: primaryInfo.birth || null,
                        phone: primaryInfo.phone,
                        tagline: primaryInfo.intro,
                        is_submitted: true,
                    },
                    educations: educationList.filter(education => education.school).map((education) => ({
                        school_name: education.school,  // 필수
                        major: education.major,
                        start_ym: education.entrance || null,
                        end_ym: education.graduation || null,
                        status: education.status,
                    })),
                    experiences: careerList.filter(career => career.company).map((career) => ({
                        company_name: career.company,  // 필수
                        title: career.role,
                        start_ym: career.join || null,
                        end_ym: career.leave || null,
                        leave_reason: career.reason,
                        summary: career.description,
                    })),
                    activities: activityList.filter(activity => activity.name).map((activity) => ({
                        name: activity.name,  // 필수
                        category: activity.type,
                        description: activity.description,
                    })),
                    certifications: certificateList.filter(certificate => certificate.name && certificate.date).map((certificate) => ({
                        name: certificate.name,  // 필수
                        score_or_grade: certificate.score,
                        acquired_ym: certificate.date,  // 필수
                    })),
                        documents: [], // 파일 업로드 구현 전
                        submit: true,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (res.status === 201) {
                    navigate("/assessment/interview");
                }
            } catch (err) {
                alert("프로필 설정에 실패했습니다.");
                console.log(err);
            }
          } else if (role === 'company' && !basicInfo.name) {
            alert("입력하신 정보를 다시 한 번 확인해주세요!");          
          } else if (role === 'company' && page >= 2) {
            try {
                // POST /api/me/company/full
                const res = await axios.post(`${baseURL}/api/me/company/full`, {
                    basic: {
                        name: basicInfo.name,  // 필수
                        industry: basicInfo.industry,
                        size: basicInfo.size,
                        location_city: basicInfo.location,
                        homepage_url: basicInfo.homepage,  // URL 형식 준수
                        career_page_url: basicInfo.recruit,  // URL 형식 준수
                        one_liner: basicInfo.intro,
                    },
                    about: {
                        vision_mission: additionalInfo.vision,
                        business_domains: additionalInfo.business,
                        ideal_talent: additionalInfo.talent,
                        culture: additionalInfo.culture,
                        benefits: additionalInfo.benefits,
                    },
                    submit: true,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (res.status === 201) {
                    navigate("/profile/jobprofile");
                }
            } catch (err) {
                alert("프로필 설정에 실패했습니다.");
            }
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
                  <Label className="required">이름</Label>
                  <Input placeholder="이름" value={primaryInfo.name} onChange={(e) => setPrimaryInfo((prev) => ({ ...prev, name: e.target.value }))} hasError={!!errors.name}></Input>
                  {errors.name && <ErrorText>{errors.name}</ErrorText>}
                </InputContainer>
                <InputContainer>
                  <Label className="required">생년월일</Label>
                  <Input placeholder="2025-01-01" value={primaryInfo.birth} onChange={(e) => setPrimaryInfo((prev) => ({ ...prev, birth: e.target.value }))} hasError={!!errors.birth}></Input>
                  {errors.birth && <ErrorText>{errors.birth}</ErrorText>}
                </InputContainer>
                <InputContainer>
                  <Label className="required">이메일</Label>
                  <Input placeholder="fitconnect@gmail.com" value={primaryInfo.email} onChange={(e) => setPrimaryInfo((prev) => ({ ...prev, email: e.target.value }))} hasError={!!errors.email}></Input>
                  {errors.email && <ErrorText>{errors.email}</ErrorText>}
                </InputContainer>
                <InputContainer>
                  <Label className="required">휴대전화</Label>
                  <Input placeholder="010-0000-0000" value={primaryInfo.phone} onChange={(e) => setPrimaryInfo((prev) => ({ ...prev, phone: e.target.value }))} hasError={!!errors.phone}></Input>
                  {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
                </InputContainer>
                <InputContainer width="1000px">
                  <Label>한 줄 소개</Label>
                  <Input placeholder="나를 한 줄로 표현해주세요!" value={primaryInfo.intro} onChange={(e) => setPrimaryInfo((prev) => ({ ...prev, intro: e.target.value }))} width="800px"></Input>
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
                      <Label className="required">학교</Label>
                      <Input placeholder="학교명" value={educationList[idx].school} onChange={(e) => {const newList = [...educationList]; newList[idx] = { ...newList[idx], school: e.target.value }; setEducationList(newList);}} hasError={!!errors.education} width="150px"></Input>
                      {errors.education && <ErrorText>{errors.education}</ErrorText>}
                    </InputContainer>
                    <InputContainer width="650px">
                      <Label>전공</Label>
                      <Input placeholder="전공명" value={educationList[idx].major} onChange={(e) => {const newList = [...educationList]; newList[idx] = { ...newList[idx], major: e.target.value }; setEducationList(newList);}} width="475px"></Input>
                    </InputContainer>
                    <InputContainer width="325px">
                      <Label>입학연도</Label>
                      <Input type="month" value={educationList[idx].entrance} onChange={(e) => {const newList = [...educationList]; newList[idx] = { ...newList[idx], entrance: e.target.value }; setEducationList(newList);}} width="150px"></Input>
                    </InputContainer>
                    <InputContainer width="325px">
                      <Label>졸업연도</Label>
                      <Input type="month" value={educationList[idx].graduation} onChange={(e) => {const newList = [...educationList]; newList[idx] = { ...newList[idx], graduation: e.target.value }; setEducationList(newList);}} width="150px"></Input>
                    </InputContainer>
                    <InputContainer width="300px">
                      <Label>재학/졸업</Label>
                      <Select width="174px" value={educationList[idx].status} onChange={(e) => {const newList = [...educationList]; newList[idx] = { ...newList[idx], status: e.target.value }; setEducationList(newList);}}>
                        {status.map((value) => (<option key={value} value={value}>{value}</option>))}
                      </Select>
                    </InputContainer>
                  </React.Fragment>
                ))}
                <AddButton onClick={() => setEducationList(educationList.slice(0, -1))}>- 학력 삭제</AddButton>
                <AddButton onClick={() => setEducationList([...educationList, { school: "", major: "", entrance: "", graduation: "", status: status[0]}])}>+ 학력 추가</AddButton>
                <Padding></Padding>
                <FormTitle>경력사항 입력</FormTitle>
                {careerList.map((career, idx) => (
                  <React.Fragment key={idx}>
                    {idx >= 1 && <Line></Line>}
                    <InputContainer width="325px">
                      <Label className="required">직장</Label>
                      <Input placeholder="회사명" value={careerList[idx].company} onChange={(e) => {const newList = [...careerList]; newList[idx] = { ...newList[idx], company: e.target.value }; setCareerList(newList);}} hasError={!!errors.career} width="150px"></Input>
                      {errors.career && <ErrorText>{errors.career}</ErrorText>}
                    </InputContainer>
                    <InputContainer width="650px">
                      <Label>직무</Label>
                      <Input placeholder="직무명" value={careerList[idx].role} onChange={(e) => {const newList = [...careerList]; newList[idx] = { ...newList[idx], role: e.target.value }; setCareerList(newList);}} width="475px"></Input>
                    </InputContainer>
                    <InputContainer width="325px">
                      <Label>입사일</Label>
                      <Input type="month" value={careerList[idx].join} onChange={(e) => {const newList = [...careerList]; newList[idx] = { ...newList[idx], join: e.target.value }; setCareerList(newList);}} width="150px"></Input>
                    </InputContainer>
                    <InputContainer width="325px">
                      <Label>퇴사일</Label>
                      <Input type="month" value={careerList[idx].leave} onChange={(e) => {const newList = [...careerList]; newList[idx] = { ...newList[idx], leave: e.target.value }; setCareerList(newList);}} width="150px"></Input>
                    </InputContainer>
                    <InputContainer width="300px">
                      <Label>퇴사사유</Label>
                      <Input placeholder="이직 등" value={careerList[idx].reason} onChange={(e) => {const newList = [...careerList]; newList[idx] = { ...newList[idx], reason: e.target.value }; setCareerList(newList);}} width="150px"></Input>
                    </InputContainer>
                    <InputContainer width="1000px">
                      <Label>업무 내용</Label>
                      <Input placeholder="담당했던 핵심 업무 내용" value={careerList[idx].description} onChange={(e) => {const newList = [...careerList]; newList[idx] = { ...newList[idx], description: e.target.value }; setCareerList(newList);}} width="800px"></Input>
                    </InputContainer>
                  </React.Fragment>
                ))}
                <AddButton onClick={() => setCareerList(careerList.slice(0, -1))}>- 경력 삭제</AddButton>
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
                      <Label className="required">활동명</Label>
                      <Input placeholder="활동명" value={activityList[idx].name} onChange={(e) => {const newList = [...activityList]; newList[idx] = { ...newList[idx], name: e.target.value }; setActivityList(newList);}} hasError={!!errors.activity}></Input>
                      {errors.activity && <ErrorText>{errors.activity}</ErrorText>}
                    </InputContainer>
                    <InputContainer>
                      <Label>구분</Label>
                      <Input placeholder="봉사활동, 동아리활동 등" value={activityList[idx].type} onChange={(e) => {const newList = [...activityList]; newList[idx] = { ...newList[idx], type: e.target.value }; setActivityList(newList);}}></Input>
                    </InputContainer>
                    <InputContainer width="1000px">
                      <Label>내용</Label>
                      <Input placeholder="진행했던 핵심 활동 내용" value={activityList[idx].description} onChange={(e) => {const newList = [...activityList]; newList[idx] = { ...newList[idx], description: e.target.value }; setActivityList(newList);}} width="800px"></Input>
                    </InputContainer>
                  </React.Fragment>
                ))}
                <AddButton onClick={() => setActivityList(activityList.slice(0, -1))}>- 활동 삭제</AddButton>
                <AddButton onClick={() => setActivityList([...activityList, { name: "", type: "", description: "" }])}>+ 활동 추가</AddButton>
                <Padding></Padding>
                <FormTitle>자격사항 입력</FormTitle>
                {certificateList.map((certificate, idx) => (
                  <React.Fragment key={idx}>
                    {idx >= 1 && <Line></Line>}
                    <InputContainer width="325px">
                      <Label className="required">자격증</Label>
                      <Input placeholder="자격증 이름" value={certificateList[idx].name} onChange={(e) => {const newList = [...certificateList]; newList[idx] = { ...newList[idx], name: e.target.value }; setCertificateList(newList);}} hasError={!!errors.certificate} width="150px"></Input>
                      {errors.certificate && <ErrorText>{errors.certificate}</ErrorText>}
                    </InputContainer>
                    <InputContainer width="325px">
                      <Label>점수/급수</Label>
                      <Input placeholder="990 / 1급" value={certificateList[idx].score} onChange={(e) => {const newList = [...certificateList]; newList[idx] = { ...newList[idx], score: e.target.value }; setCertificateList(newList);}} width="150px"></Input>
                    </InputContainer>
                    <InputContainer width="300px">
                      <Label className="required">취득 시기</Label>
                      <Input type="month" value={certificateList[idx].date} onChange={(e) => {const newList = [...certificateList]; newList[idx] = { ...newList[idx], date: e.target.value }; setCertificateList(newList);}} hasError={!!errors.certificateDate} width="150px"></Input>
                      {errors.certificateDate && <ErrorText>{errors.certificateDate}</ErrorText>}
                    </InputContainer>
                  </React.Fragment>
                ))}
                <AddButton onClick={() => setCertificateList(certificateList.slice(0, -1))}>- 자격 삭제</AddButton>
                <AddButton onClick={() => setCertificateList([...certificateList, { name: "", score: "", date: "" }])}>+ 자격 추가</AddButton>
              </Form>
            )}

            {page == 4 && (
              <Form>
                <FormTitle>파일 업로드</FormTitle>
                <InputContainer width="1000px">
                  <Label>경력기술서</Label>
                  <Input type="file" placeholder="경력기술서 파일을 업로드 해주세요." onChange={(e) => setResumeFile(e.target.files?.[0] || null)} width="800px"></Input>
                </InputContainer>
                <InputContainer width="1000px">
                  <Label>자기소개서</Label>
                  <Input type="file" placeholder="자기소개서 파일을 업로드 해주세요." onChange={(e) => setCoverLetterFile(e.target.files?.[0] || null)} width="800px"></Input>
                </InputContainer>
                <InputContainer width="1000px">
                  <Label>포트폴리오</Label>
                  <Input type="file" placeholder="포트폴리오 파일을 업로드 해주세요."  onChange={(e) => setPortfolioFile(e.target.files?.[0] || null)} width="800px"></Input>
                </InputContainer>
              </Form>
            )}

            {page == 5 && (
              <Form>
                <FormTitle>관심내용 입력</FormTitle>
                <InputContainer>
                  <Label>희망 직무</Label>
                  <Select>
                    {jobs.map((value) => (<option key={value} value={value}>{value}</option>))}
                  </Select>
                </InputContainer>
                <InputContainer>
                  <Label>희망 연봉</Label>
                  <Select>
                    {salary.map((value) => (<option key={value} value={value}>{value}</option>))}
                  </Select>
                </InputContainer>
                <InputContainer>
                  <Label>희망 업종</Label>
                  <Select>
                    {industry.map((value) => (<option key={value} value={value}>{value}</option>))}
                  </Select>
                </InputContainer>
                <InputContainer>
                  <Label>희망 규모</Label>
                  <Select>
                    {companySize.map((value) => (<option key={value} value={value}>{value}</option>))}
                  </Select>
                </InputContainer>
                <InputContainer>
                  <Label>주거지</Label>
                  <Select>
                    {residence.slice(1).map((value) => (<option key={value} value={value}>{value}</option>))}
                  </Select>
                </InputContainer>
                <InputContainer>
                  <Label>희망 근무지</Label>
                  <Select>
                    {residence.map((value) => (<option key={value} value={value}>{value}</option>))}
                  </Select>
                </InputContainer>
                <InputContainer width="1000px" style={{ 'marginTop': '25px' }}>
                  <Label style={{ 'marginBottom': '30px' }}>기타 사항</Label>
                  <TextArea role={role} style={{ 'height': '200px', 'marginBottom': '30px' }} placeholder="희망하는 기업/포지션에 대해 자유롭게 이야기해주세요." width="800px"></TextArea>
                </InputContainer>
              </Form>
            )}
            <ButtonContainer>
              <Button onClick={() => {setPage(page - 1)}} style={page === 1 ? { display: 'none' } : {}}>이전으로</Button>
              <Button onClick={getNextPage} style={page === 1 ? { marginLeft: '798px' } : {}}>{page <= 4 ? "다음으로" : "작성 완료"}</Button>
            </ButtonContainer>
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
                  <Label className="required">회사명</Label>
                  <Input role={role} placeholder="회사명" value={basicInfo.name} onChange={(e) => setBasicInfo((prev) => ({ ...prev, name: e.target.value }))} hasError={!!errors.name}></Input>
                  {errors.name && <ErrorText>{errors.name}</ErrorText>}
                </InputContainer>
                <InputContainer>
                  <Label className="required">업종</Label>
                  <Select role={role} value={basicInfo.industry} onChange={(e) => setBasicInfo((prev) => ({ ...prev, industry: e.target.value }))}>
                    {industry.slice(1).map((value) => (<option key={value} value={value}>{value}</option>))}
                  </Select>
                </InputContainer>
                <InputContainer>
                  <Label className="required">회사 규모</Label>
                  <Select role={role} value={basicInfo.size} onChange={(e) => setBasicInfo((prev) => ({ ...prev, size: e.target.value }))}>
                    {companySize.slice(1).map((value) => (<option key={value} value={value}>{value}</option>))}
                  </Select>
                </InputContainer>
                <InputContainer>
                  <Label className="required">회사 위치</Label>
                  <Select role={role} value={basicInfo.location} onChange={(e) => setBasicInfo((prev) => ({ ...prev, location: e.target.value }))}>
                    {residence.slice(1).map((value) => (<option key={value} value={value}>{value}</option>))}
                  </Select>
                </InputContainer>
                <InputContainer>
                  <Label>대표 사이트</Label>
                  <Input role={role} placeholder="https://fitconnect.com" value={basicInfo.homepage} onChange={(e) => setBasicInfo((prev) => ({ ...prev, homepage: e.target.value }))}></Input>
                </InputContainer>
                <InputContainer>
                  <Label>채용 사이트</Label>
                  <Input role={role} placeholder="https://fitconnect.com/recruit" value={basicInfo.recruit} onChange={(e) => setBasicInfo((prev) => ({ ...prev, recruit: e.target.value }))}></Input>
                </InputContainer>
                <InputContainer width="1000px">
                  <Label>한 줄 소개</Label>
                  <Input role={role} placeholder="회사를 한 줄로 소개해주세요!" value={basicInfo.intro} onChange={(e) => setBasicInfo((prev) => ({ ...prev, intro: e.target.value }))} width="800px"></Input>
                </InputContainer>
              </Form>
            )}
            
            {page == 2 && (
              <Form>
                <FormTitle style={{ 'marginBottom' : '20px' }}>회사 소개 입력</FormTitle>
                  <InputContainer width="1000px">
                    <Label style={{ 'marginBottom': '30px' }}>비전/미션</Label>
                    <TextArea role={role} style={{ 'height': '200px', 'marginBottom': '30px' }} placeholder="회사의 비전, 미션 등을 자유롭게 소개해 주세요." value={additionalInfo.vision} onChange={(e) => setAdditionalInfo((prev) => ({ ...prev, vision: e.target.value }))} width="800px"></TextArea>
                  </InputContainer>
                  <InputContainer width="1000px">
                    <Label style={{ 'marginBottom': '30px' }}>사업 영역</Label>
                    <TextArea role={role} style={{ 'height': '200px', 'marginBottom': '30px' }} placeholder="회사의 핵심 사업 내용을 입력해 주세요." value={additionalInfo.business} onChange={(e) => setAdditionalInfo((prev) => ({ ...prev, business: e.target.value }))} width="800px"></TextArea>
                  </InputContainer>
                  <InputContainer width="1000px">
                    <Label style={{ 'marginBottom': '30px' }}>인재상</Label>
                    <TextArea role={role} style={{ 'height': '200px', 'marginBottom': '30px' }} placeholder="회사가 추구하는 인재의 모습을 소개해 주세요." value={additionalInfo.talent} onChange={(e) => setAdditionalInfo((prev) => ({ ...prev, talent: e.target.value }))} width="800px"></TextArea>
                  </InputContainer>
                  <InputContainer width="1000px">
                    <Label style={{ 'marginBottom': '30px' }}>조직문화</Label>
                    <TextArea role={role} style={{ 'height': '200px', 'marginBottom': '30px' }} placeholder="회사의 조직문화와 일하는 방식을 소개해 주세요." value={additionalInfo.culture} onChange={(e) => setAdditionalInfo((prev) => ({ ...prev, culture: e.target.value }))} width="800px"></TextArea>
                  </InputContainer>
                  <InputContainer width="1000px">
                    <Label style={{ 'marginBottom': '30px' }}>복리후생</Label>
                    <TextArea role={role} style={{ 'height': '200px', 'marginBottom': '30px' }} placeholder="회사의 복리후생을 소개해 주세요." value={additionalInfo.benefits} onChange={(e) => setAdditionalInfo((prev) => ({ ...prev, benefits: e.target.value }))} width="800px"></TextArea>
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