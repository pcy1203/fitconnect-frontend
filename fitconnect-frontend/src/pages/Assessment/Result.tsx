import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

import { useAuth } from "../../components/AuthContext";
import colors from "../../styles/colors";
import axios from "axios";
import talent from '../../assets/talent.png';
import company from '../../assets/company.png';

import { CardContainer, Card, CardFace, CardBack, ProfileContainer, ProfileImage, ProfileName, ProfileContent,
  Introduction, ContentContainer, Content, ContentTitle, ContentParagraph, Analysis, Tag, 
  CardBackContainer, CardBackRegion, BackRegion, BackTitle, BackContent, BackButton, BackLine } from "../../components/Card";

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
`;

// const CardContainer = styled.div`
//   perspective: 1000px;
//   margin-top: 20px;
//   margin-bottom: 50px;
// `;

// const Card = styled.div.withConfig({
//   shouldForwardProp: (prop) => prop !== "flipped",
// })<{ role?: string, flipped: boolean }>`
//   width: 500px;
//   height: 640px;
//   left: 350px;
//   position: relative;
//   background: ${({ role }) => (role === "company" ? "linear-gradient(180deg, #ffffffff 0%, #f1dcdcff 100%)" : "linear-gradient(180deg, #ffffffff 0%, #dce3f1ff 100%)" )};
//   transform-style: preserve-3d;
//   transition: transform 0.3s ease, box-shadow 0.3s ease;
//   transform: ${({ flipped }) => (flipped ? "rotateY(180deg)" : "rotateY(0deg)")};
//   border: 3px solid ${({ role }) => (role === "company" ? colors.company_light : colors.talent_light )};
//   border-radius: 20px;
//   box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1),
//               0 0 10px ${({ role }) => (role === "company" ? colors.company_light : colors.talent_light )};
//   &:hover {
//     transform: ${({ flipped }) => (flipped ? "rotateY(180deg) translateY(-10px)" : "rotateY(0deg) translateY(-10px)")};
//     box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2),
//                 0 0 20px ${({ role }) => (role === "company" ? colors.company : colors.talent )};
//   }
// `;

// const CardFace = styled.div`
//   backface-visibility: hidden;
// `;

// const CardBack = styled(CardFace)`
//   transform: rotateY(180deg);
//   width: 100%;
//   margin-top: 40px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

// const ProfileContainer = styled.div<{ role?: string }>`
//   width: calc(100% + 2px);
//   height: 90px;
//   margin-top: -1px;
//   background: ${({ role }) => (role === "company" ? colors.company_light : colors.talent_light )};
//   border-radius: 15px 15px 0 0;
// `;

// const ProfileImage = styled.div`
//   width: 200px;
//   height: 50px;
//   background: #FFFFFF;
//   border-radius: 50px;
//   text-align: center;
//   position: relative;
//   left: 40px;
//   top: 20px;
//   & > img {
//     position: relative;
//     left: -50px;
//     margin-top: 5px;
//   }
// `;

// const ProfileName = styled.div`
//   color: black;
//   position: relative;
//   left: 120px;
//   top: -25px;
//   font-size: 25px;
//   font-weight: 600;
// `;

// const ProfileContent = styled.div`
//   color: black;
//   font-size: 16px;
//   font-weight: 500;
//   position: relative;
//   left: 256px;
//   top: -65px;
// `;

// const Introduction = styled.div`
//   width: 450px;
//   margin-top: 25px;
//   margin-bottom: 10px;
//   margin-left: 25px;
//   border-radius: 10px;
//   color: black;
//   font-size: 16px;
//   line-height: 30px;
//   text-align: center;
// `;

// const ContentContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: 20px;
//   align-items: center;
//   justify-content: center;
// `;

// const Content = styled.div<{ role?: string }>`
//   width: 200px;
//   margin-top: 10px;
//   color: black;
//   background: ${({ role }) => (role === "company" ? "#f7e7e7ff" : "#dde6f3ff" )};
//   box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
// `;

// const ContentTitle = styled.div`
//   padding-left: 10px;
//   padding-top: 15px;
//   font-size: 16px;
//   font-weight: 600;
//   color: black;
// `;

// const ContentParagraph = styled.div`
//   color: black;
//   padding-left: 15px;
//   padding-bottom: 15px;
//   width: 170px;
//   padding-top: 10px;
//   font-size: 12px;
//   white-space: pre-line;
//   line-height: 25px;
// `;

// const Analysis = styled.div`
//   color: black;
//   margin-left: 50px;
//   margin-top: 15px;
//   width: 400px;
//   padding-top: 10px;
//   font-size: 12px;
//   white-space: pre-line;
//   line-height: 25px;
// `;

// const Tag = styled.span`
//     background: #fac3c3ff;
//     border: 1px solid #e64040ff;
//     color: #c01010ff;
//     border-radius: 15px;
//     margin-left: 5px;
//     padding: 1px 5px;
//     position: relative;
//     top: -1px;
// `;

const ButtonContainer = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 50px;
    margin-left: 395px;
    padding-bottom: 50px;
`;

const SearchButton = styled.button<{ role?: string }>`
    all: unset;
    width: 200px;
    height: 40px;
    background: ${({ role }) => (role === "company" ? colors.company : colors.talent )};
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

const InterviewButton = styled.button`
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

const formatYearMonth = (dateStr: string) => {
  if (!dateStr) return "";
  return dateStr.slice(0, 7).replace("-", ".");
};

export default function Result() {
    const { token, setToken, role, setRole, loading } = useAuth();
    const navigate = useNavigate();
    
    const [data, setData] = useState(null);
    const [companyData, setCompanyData] = useState(null);
    const [cardData, setCardData] = useState(null);
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        if (!loading && (!token || !role)) navigate("/auth/login");
    }, [loading, token]);

    useEffect(() => {
        if (!loading) {
          if (role === 'talent') {
            axios.get(`${baseURL}/api/me/talent/full`, { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
              setData(response.data.data);
              axios.get(`${baseURL}/api/talent_cards/${response.data.data?.basic.user_id}`, { headers: { Authorization: `Bearer ${token}` } })
                .then((response) => {
                  setCardData(response.data.data);
                })
                .catch((error) => {
                  console.error("데이터 불러오기 실패:", error);
                });
            })
            .catch((error) => {
              console.error("데이터 불러오기 실패:", error);
            });
          } else if (role === 'company') {
            const query = new URLSearchParams(location.search);
            const jobId = query.get("job");
            axios.get(`${baseURL}/api/me/company`, { headers: { Authorization: `Bearer ${token}` } })
              .then((response) => {
                setCompanyData(response.data.data);
              })
              .catch((error) => {
                console.error("데이터 불러오기 실패:", error);
              });
            axios.get(`${baseURL}/api/me/company/job-postings`, { headers: { Authorization: `Bearer ${token}` } })
              .then((response) => {
                setData(response.data.data.find(job => job.id === Number(jobId)));
                console.log(response.data.data);
              })
              .catch((error) => {
                console.error("데이터 불러오기 실패:", error);
              });
            axios.get(`${baseURL}/api/job_posting_cards/${jobId}`, { headers: { Authorization: `Bearer ${token}` } })
              .then((response) => {
                setCardData(response.data.data[0]);
              })
              .catch((error) => {
                console.error("데이터 불러오기 실패:", error);
              });
          }
        }
    }, [loading, location.search]);

    if (role === "talent") {
        return (
          <Container>
            <Title>📊 분석 결과: 역량 카드</Title>
            <CardContainer>
              <Card role={role} flipped={flipped} onClick={() => setFlipped(!flipped)}>
                <CardFace role={role}>
                  <ProfileContainer role={role}>
                    <ProfileImage><img src={role === "company" ? company : talent} alt="Logo" width={32} height={36}></img></ProfileImage>
                    <ProfileName>{data?.basic.name ? (data?.basic.name + "　") : "　"}</ProfileName>
                    <ProfileContent>🌠 {data?.experiences.at(-1)?.title} (경력 {data?.experience_total_years}년)</ProfileContent>
                    <ProfileContent>💼 {data?.experiences.at(-1)?.company_name} {data?.experiences.at(-1)?.status}</ProfileContent>
                  </ProfileContainer>
                  <Introduction>{data?.basic.tagline ? data?.basic.tagline : "안녕하세요, 잘 부탁드립니다!"}</Introduction>
                  <ContentContainer>
                    <Content role={role} style={{ borderRadius: '20px 0 20px 0' }}>
                      <ContentTitle>📂 주요 경험/경력</ContentTitle>
                      <ContentParagraph>
                        {cardData?.experiences.map((experience, idx) => (
                          <span key={idx}>
                            · {experience}
                            <br />
                          </span>
                        ))}
                      </ContentParagraph>
                    </Content>
                    <Content role={role} style={{ borderRadius: '0 20px 0 20px' }}>
                      <ContentTitle>🎯 강점</ContentTitle>
                      <ContentParagraph>
                        {cardData?.strengths.map((strength, idx) => (
                          <span key={idx}>
                            · {strength}
                            <br />
                          </span>
                        ))}
                      </ContentParagraph>
                    </Content>
                  </ContentContainer>
                  <ContentContainer>
                    <Content role={role} style={{ borderRadius: '0 20px 0 20px' }}>
                      <ContentTitle>🚀 핵심 일반 역량</ContentTitle>
                      <ContentParagraph>{cardData?.general_capabilities.map((skill, idx) => (
                        <span key={idx}>
                          · {skill.name} <Tag level={skill.level}>{skill.level == "high" ? "매우 우수" : (skill.level == "medium" ? "우수" : "보통")}</Tag>
                          <br />
                        </span>
                      ))}
                      </ContentParagraph>
                    </Content>
                    <Content role={role} style={{ borderRadius: '20px 0 20px 0' }}>
                      <ContentTitle>✏️ 핵심 직무 역량/기술</ContentTitle>
                      <ContentParagraph>{cardData?.job_skills.map((skill, idx) => (
                        <span key={idx}>
                          · {skill.name} <Tag level={skill.level}>{skill.level == "high" ? "매우 우수" : (skill.level == "medium" ? "우수" : "보통")}</Tag>
                          <br />
                        </span>
                      ))}
                      </ContentParagraph>
                    </Content>
                  </ContentContainer>
                  <Analysis>
                    📈 <b>직무 수행</b> : {cardData?.performance_summary}<br/>
                    👥 <b>협업 성향</b> : {cardData?.collaboration_style}<br/>
                    💪 <b>성장 가능성</b> : {cardData?.growth_potential}
                  </Analysis>
                </CardFace>
                <CardBack role={role}>
                  <CardBackContainer>
                    <CardBackRegion role={role}>
                      <BackRegion>
                        <BackTitle>👤 인적사항</BackTitle>
                        <BackContent><b>{data?.basic.name}</b>  |  🎂 {data?.basic.birth_date?.replace("-", ".").replace("-", ".")}  |  ✉️ 이메일  |  📞 {data?.basic.phone}</BackContent>
                      </BackRegion>
                      <BackRegion>
                        <BackTitle>🏫 학력사항</BackTitle>
                        {data?.educations.map((education) => (
                          <BackContent><b>{education.school_name}</b>  |  {education.major}  ({formatYearMonth(education.start_ym)} ~ {formatYearMonth(education.end_ym)}, {education.status})</BackContent>
                        ))}
                      </BackRegion>
                      <BackRegion>
                        <BackTitle>💼 경력사항</BackTitle>
                        {data?.experiences.map((experience) => (
                          <BackContent><b>{experience.company_name}</b>  |  {experience.title}  ({formatYearMonth(experience.start_ym)} ~ {formatYearMonth(experience.end_ym)})<br/>{experience.summary} {experience.leave_reason ? "(퇴사 사유 : {experience.leave_reason})" : ""}</BackContent>
                        ))}
                      </BackRegion>
                      <BackRegion>
                        <BackTitle>📒 활동내역</BackTitle>
                        {data?.activities.map((activity) => (
                          <BackContent><b>{activity.name}</b>  |  {activity.category}<br/>{activity.description}</BackContent>
                        ))}
                      </BackRegion>
                      <BackRegion>
                        <BackTitle>📜 자격사항</BackTitle>
                        {data?.certifications.map((certification) => (
                          <BackContent><b>{certification.name}</b>  |  {certification.score_or_grade}  ({formatYearMonth(certification.acquired_ym)})</BackContent>
                        ))}
                      </BackRegion>
                      <BackLine></BackLine>
                      <BackButton onClick={(e) => {e.stopPropagation();}}>🔗 자기소개서 확인하기</BackButton>
                      <BackButton onClick={(e) => {e.stopPropagation();}}>🔗 경력기술서 확인하기</BackButton>
                      <BackButton onClick={(e) => {e.stopPropagation();}}>🔗 포트폴리오 확인하기</BackButton>
                    </CardBackRegion>
                  </CardBackContainer>
                </CardBack>
              </Card>
              <ButtonContainer>
                <Link to="/search/recommendation"><SearchButton>공고 탐색하기</SearchButton></Link>
                <Link to="/assessment/interview"><InterviewButton>인터뷰 다시 하기</InterviewButton></Link>
              </ButtonContainer>
            </CardContainer>
          </Container>
        );
    } else if (role === "company") {
        return (
          <Container>
            <Title>📊 분석 결과: 공고 카드</Title>
            <CardContainer>
              <Card role={role} flipped={flipped} onClick={() => setFlipped(!flipped)}>
                <CardFace role={role}>
                  <ProfileContainer role={role}>
                    <ProfileImage><img src={role === "company" ? company : talent} alt="Logo" width={32} height={36}></img></ProfileImage>
                    <ProfileName>{companyData?.basic.name ? (companyData?.basic.name + "　") : "　"}</ProfileName>
                    <ProfileContent>🌠 {data?.title}</ProfileContent>
                    <ProfileContent>🗓️ {data?.deadline_date?.replace("-", ".").replace("-", ".")} 마감</ProfileContent>
                  </ProfileContainer>
                  <Introduction>{companyData?.basic.tagline ? companyData?.basic.tagline : `${data?.title} 공고 지원자를 기다립니다.`}</Introduction>
                  <ContentContainer>
                    <Content role={role} style={{ borderRadius: '20px 0 20px 0' }}>
                      <ContentTitle>📜 공고 정보</ContentTitle>
                      <ContentParagraph>
                        · {data?.employment_type} ({data?.career_level})<br/>· 근무 기간 : {data?.term_months}<br/>· 근무 부서 : {data?.department}<br/>· 연봉 : {data?.salary_range}
                        </ContentParagraph>
                    </Content>
                    <Content role={role} style={{ borderRadius: '0 20px 0 20px' }}>
                      <ContentTitle>📋 주요 역할/업무</ContentTitle>
                      <ContentParagraph>
                        {cardData?.responsibilities.map((responsibility, idx) => (
                          <span key={idx}>
                            · {responsibility}
                            <br />
                          </span>
                        ))}
                        </ContentParagraph>
                    </Content>
                  </ContentContainer>
                  <ContentContainer>
                    <Content role={role} style={{ borderRadius: '0 20px 0 20px' }}>
                      <ContentTitle>💡 자격 요건</ContentTitle>
                      <ContentParagraph>
                        {cardData?.requirements.map((requirement, idx) => (
                          <span key={idx}>
                            · {requirement}
                            <br />
                          </span>
                        ))}
                        </ContentParagraph>
                    </Content>
                    <Content role={role} style={{ borderRadius: '20px 0 20px 0' }}>
                      <ContentTitle>✏️ 요구 역량</ContentTitle>
                      <ContentParagraph>
                        {cardData?.required_competencies.map((requirement, idx) => (
                          <span key={idx}>
                            · {requirement}
                            <br />
                          </span>
                        ))}
                        </ContentParagraph>
                    </Content>
                  </ContentContainer>
                  <Analysis>
                    💼 <b>기업 정보</b> : {cardData?.company_info}<br/>
                    🎤 <b>인재상</b> : {cardData?.talent_persona}<br/>
                    💪 <b>도전 과제</b> : {cardData?.challenge_task}
                  </Analysis>
                </CardFace>
                <CardBack role={role}>
                  <CardBackContainer>
                    <CardBackRegion role={role}>
                      <BackRegion>
                        <BackTitle>💼 기업 정보</BackTitle>
                        <BackContent>{companyData?.basic.name}  |  {companyData?.basic.industry}  |  {companyData?.basic.size}  |  {companyData?.basic.location_city}</BackContent>
                        <BackContent>비전/미션 : {companyData?.about.vision_mission}</BackContent>
                        <BackContent>사업 영역 : {companyData?.about.business_domains}</BackContent>
                        <BackContent>인재상 : {companyData?.about.ideal_talent}</BackContent>
                        <BackContent>조직문화 : {companyData?.about.culture}</BackContent>
                        <BackContent>복리후생 : {companyData?.about.benefits}</BackContent>
                      </BackRegion>
                      <BackRegion>
                        <BackTitle>📚 공고 정보</BackTitle>
                        <BackContent>{data?.title}  |  {data?.employment_type}  |  {data?.career_level}</BackContent>
                        <BackContent>근무 기간 (근무 시작 : {data?.deadline_date?.replace("-", ".").replace("-", ".")})  |  {data?.department}</BackContent>
                        <BackContent>연봉  |  {data?.location_city}</BackContent>
                        <BackContent>업무 내용 : {data?.responsibilities}</BackContent>
                        <BackContent>문의 메일 {data?.contact_email}  |  문의 연락처 {data?.contact_phone}</BackContent>
                      </BackRegion>
                      <BackRegion>
                        <BackTitle>☑️ 자격 요건</BackTitle>
                        <BackContent>학력 : {data?.education_level}</BackContent>
                        <BackContent>필수 요건 : {data?.requirements_must}</BackContent>
                        <BackContent>우대 사항 : {data?.requirements_nice}</BackContent>
                        <BackContent>요구 역량 : {data?.competencies}</BackContent>
                      </BackRegion>
                      <BackLine></BackLine>
                      <BackButton onClick={(e) => {e.stopPropagation();}}>🔗 공고 확인하기</BackButton>
                      <BackButton onClick={(e) => {e.stopPropagation();}}>🔗 직무기술서 확인하기</BackButton>
                      <BackButton onClick={(e) => {e.stopPropagation();}}>🔗 공고 자료 확인하기</BackButton>
                      <BackButton onClick={(e) => {e.stopPropagation();}}>🔗 채용 홈페이지 확인하기</BackButton>
                      <BackButton onClick={(e) => {e.stopPropagation();}}>🔗 회사 홈페이지 확인하기</BackButton>
                    </CardBackRegion>
                  </CardBackContainer>
                </CardBack>
              </Card>
              <ButtonContainer>
                <Link to="/search/recommendation"><SearchButton role={role}>인재 탐색하기</SearchButton></Link>
                <Link to="/assessment/interview"><InterviewButton>인터뷰 다시 하기</InterviewButton></Link>
              </ButtonContainer>
            </CardContainer>
          </Container>
        );
    }
}
