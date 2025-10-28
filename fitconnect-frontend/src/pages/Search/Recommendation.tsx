import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import { useAuth } from "../../components/AuthContext";
import Hexagon from "../../components/Hexagon";
import colors from "../../styles/colors";
import axios from "axios";
import talent from '../../assets/talent.png';
import company from '../../assets/company.png';
import arrowTalent from '../../assets/arrow-talent.png';
import arrowCompany from '../../assets/arrow-company.png';
import { baseURL } from "../../env";

import { CardFace, CardBack, ProfileContainer, ProfileImage, ProfileName, ProfileContent,
  Introduction, ContentContainer, Content, ContentTitle, ContentParagraph, Analysis, Tag, 
  CardBackContainer, CardBackRegion, BackRegion, BackTitle, BackContent, BackButton, BackLine } from "../../components/Card";

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

const Paragraph = styled.div`
  width: 1000px;
  color: black;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 10px;
  padding: 0px 100px 0px 100px;
`;

const CardContainer = styled.div`
  perspective: 1000px;
  margin-top: 20px;
  margin-bottom: 50px;
`;

const Card = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "flipped",
})<{ role?: string, flipped: boolean }>`
  width: 500px;
  height: 640px;
  left: 100px;
  position: relative;
  background: ${({ role }) => (role === "company" ? "linear-gradient(180deg, #ffffffff 0%, #f1dcdcff 100%)" : "linear-gradient(180deg, #ffffffff 0%, #dce3f1ff 100%)" )};
  transform-style: preserve-3d;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  transform: ${({ flipped }) => (flipped ? "rotateY(180deg)" : "rotateY(0deg)")};
  border: 3px solid ${({ role }) => (role === "company" ? colors.company_light : colors.talent_light )};
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1),
              0 0 10px ${({ role }) => (role === "company" ? colors.company_light : colors.talent_light )};
  &:hover {
    transform: ${({ flipped }) => (flipped ? "rotateY(180deg) translateY(-10px)" : "rotateY(0deg) translateY(-10px)")};
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2),
                0 0 20px ${({ role }) => (role === "company" ? colors.company : colors.talent )};
  }
`;

const HexagonContainer = styled.div`
    position: relative;
    top: -680px;
    left: 720px;
    height: 1px;
`;

const ButtonContainer = styled.div`
    width: 400px;
    top: -370px;
    height: 1px;
    position: relative;
    left: 680px;
`;

const Button = styled.button<{ role?: string }>`
  all: unset;
  width: 400px;
  height: 50px;
  background: #FFFFFF;
  color: #000000;
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 30px;
  border: 3px solid ${({ role }) => (role === "company" ? colors.company : colors.talent )};
  border-radius: 25px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.1s ease;
  &:hover {
    background-color: #f2f2f2ff;
  }
  &:active {
    transform: scale(0.95);
  }
  & > span {
    position: relative;
    top: -1px;
  }
`;

const ReactionContainer = styled.div`
  width: 406px;
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
`;

const Line = styled.hr`
  color: black;
`;

const ReactionTitle = styled.div`
  width: 406px;
  color: black;
  font-size: 14px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

const ReactionButton = styled.button`
  all: unset;
  width: 190px;
  height: 30px;
  background: #FFFFFF;
  color: #000000;
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 7px;
  margin-left: 5px;
  cursor: pointer;
  border: 1px solid #b2b2b2ff;
  box-shadow: 1px 1px 1px rgba(171, 171, 171, 0.2);
  border-radius: 5px;
  transition: transform 0.1s ease;
  &:hover {
    font-weight: 500;
    background-color: #f2f2f2ff;
  }
  &:active {
    transform: scale(0.95);
  }
`;

const LeftArrow = styled.button`
  all: unset;
  position: relative;
  top: -450px;
  left: 20px;
  &:hover {
    opacity: 0.5;
  }
  &:active {
    transform: scale(0.95);
  }
`;

const RightArrow = styled.button`
  all: unset;
  transform: rotate(180deg);
  position: relative;
  top: -454px;
  left: 1085px;
  &:hover {
    opacity: 0.5;
  }
  &:active {
    transform: rotate(180deg) scale(0.95);
  }
`;

const WeightContainer = styled.div`
  width: 500px;
  padding: 28px;
  margin-left: 250px;
  margin-top: 35px;
  padding: 50px 100px;
  border-radius: 20px;
  background: #ffffff;
  border: 1px solid #9E9E9E;
  border-radius: 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const WeightParagraph = styled.div`
  width: 1000px;
  color: black;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 10px;
  padding: 0px 100px 0px 100px;
`;

const SliderBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 500;
  padding-bottom: 5px;
  color: #000;
`;

const Value = styled.span<{ role?: string }>`
  font-weight: 600;
  color: ${({ role }) => (role === "company" ? colors.company : colors.talent )};
`;

const Description = styled.div`
  font-size: 12px;
  color: #000;
  margin-bottom: 10px;
`;

const StyledSlider = styled.input<{ role?: string }>`
  width: 100%;
  height: 6px;
  border-radius: 5px;
  margin-bottom: 25px;
  appearance: none;
  background: linear-gradient(90deg, ${({ role }) => (role === "company" ? colors.company_light : colors.talent_light )}, ${({ role }) => (role === "company" ? colors.company : colors.talent )});
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: white;
    border: 2px solid ${({ role }) => (role === "company" ? colors.company : colors.talent )};
    cursor: grab;
    transition: 0.2s;
  }

  &::-webkit-slider-thumb:hover {
    background: #e9e9e9ff;
  }
`;

const WeightButton = styled.button<{ role?: string }>`
    all: unset;
    width: 200px;
    height: 40px;
    margin-top: 30px;
    margin-left: 498px;
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
  width: 300px;
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

const LoadingParagraph = styled.div`
  width: 1000px;
  color: black;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  margin-top: 200px;
`;

const formatYearMonth = (dateStr: string) => {
  if (!dateStr) return "";
  return dateStr.slice(0, 7).replace("-", ".");
};

export default function Recommendation() {
    const { token, setToken, role, setRole, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const queryJobId = new URLSearchParams(location.search).get("job");
    const queryJobFit = new URLSearchParams(location.search).get("jobfit");
    const queryCultureFit = new URLSearchParams(location.search).get("culturefit");
    const queryGrowth = new URLSearchParams(location.search).get("growth");

    useEffect(() => {
        if (!token || !role) navigate("/auth/login");
    }, [loading, token]);

    const [weights, setWeights] = useState({
      jobFit: queryJobFit ? queryJobFit : 50,
      cultureFit: queryCultureFit ? queryCultureFit : 50,
      growth: queryGrowth ? queryGrowth : 50,
    });
    const [page, setPage] = useState(0);
    const [endPage, setEndPage] = useState(0);
    const [jobList, setJobList] = useState(null);
    const [matchingData, setMatchingData] = useState(null);
    const [data, setData] = useState(null);
    const [companyData, setCompanyData] = useState(null);
    const [cardData, setCardData] = useState(null);
    
    const handleChange = (key: string, value: number) => {
      setWeights({ ...weights, [key]: value });
    };

    const submitJobId = (id) => {
      const params = new URLSearchParams(location.search);
      params.set("job", id);
      navigate(`${location.pathname}?${params.toString()}`);
    }

    const submitWeights = () => {
      const params = new URLSearchParams(location.search);
      params.set("jobfit", weights.jobFit);
      params.set("culturefit", weights.cultureFit);
      params.set("growth", weights.growth);
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
        } else if (!matchingData && queryJobFit && queryCultureFit && queryGrowth) {
          if (role === 'talent') {
            axios.get(`${baseURL}/api/me/talent/full`, { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
              axios.get(`${baseURL}/api/matching-results/talents/${response.data.data?.basic.user_id}/job-postings`, { headers: { Authorization: `Bearer ${token}` } })
              .then((response) => {
                setPage(0);
                setEndPage(response.data.data.matches.length - 1);
                setMatchingData(response.data.data.matches);
              })
              .catch((error) => {
                console.error("데이터 불러오기 실패:", error);
              });
            })
            .catch((error) => {
              console.error("데이터 불러오기 실패:", error);
            });
            // axios.get(`${baseURL}/api/matching-results/talents/${1}/job-postings`, { headers: { Authorization: `Bearer ${token}` } })
            //   .then((response) => {
            //     setPage(0);
            //     setEndPage(response.data.data.matches.length - 1);
            //     setMatchingData(response.data.data.matches);
            //   })
          } else if (role === 'company') {
            const query = new URLSearchParams(location.search);
            const jobId = query.get("job");
            axios.get(`${baseURL}/api/matching-results/job-postings/${jobId}/talents`, { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
              setPage(0);
              setEndPage(response.data.data.matches.length - 1);
              setMatchingData(response.data.data.matches);
            })
            .catch((error) => {
              console.error("데이터 불러오기 실패:", error);
            });
          }
        }
    }, [loading, location.search]);

    const loadData = () => {
      if (matchingData) {
        if (role === 'talent') {
          const companyId = matchingData[page]?.company_user_id;
          const jobId = matchingData[page]?.job_posting_id;
          axios.get(`${baseURL}/api/companies/user/${companyId}`, { headers: { Authorization: `Bearer ${token}` } })
          .then((response) => {
            setCompanyData(response.data.data);
          })
          .catch((error) => {
            console.error("데이터 불러오기 실패:", error);
          });
          axios.get(`${baseURL}/api/job-postings/${jobId}`, { headers: { Authorization: `Bearer ${token}` } })
          .then((response) => {
            setData(response.data.data);
          })
          .catch((error) => {
            console.error("데이터 불러오기 실패:", error);
          });
          axios.get(`${baseURL}/api/job_posting_cards/${jobId}`, { headers: { Authorization: `Bearer ${token}` } })
          .then((response) => {
            setCardData(response.data.data[response.data.data?.length - 1]);
          })
          .catch((error) => {
            console.error("데이터 불러오기 실패:", error);
          });
        } else if (role === 'company') {
          const talentId = matchingData[page]?.talent_user_id;
          axios.get(`${baseURL}/api/talents/${talentId}/profile`, { headers: { Authorization: `Bearer ${token}` } })
          .then((response) => {
            setData(response.data.data);
            axios.get(`${baseURL}/api/talent_cards/${talentId}`, { headers: { Authorization: `Bearer ${token}` } })
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
        }
      }
    };

    useEffect(() => {
      loadData();
    }, [page, matchingData]);

    const getPreviousPage = () => {
      if (page > 0) {
        setCardData(null);
        setPage(page - 1);
      }
    };

    const getNextPage = () => {
      if (page < endPage) {
        setCardData(null);
        setPage(page + 1);
      }
    };

    const [flipped, setFlipped] = useState(false);
    if (role === 'company' && !queryJobId) {
      return (
        <Container>
          <Title style={{'marginBottom': '20px'}}>🔍 인재 탐색</Title>
            <Paragraph>공고를 선택해주세요.</Paragraph>
            <JobContainer>
              <JobRegion>
                {jobList?.map((job) => (
                  <JobPosting onClick={() => submitJobId(job.id)} key={job.id}>
                    <JobImage><img src={company} alt="Logo" width={24*0.8} height={27*0.8}></img></JobImage>
                    <JobTitle>{job.title}</JobTitle>
                    <JobButton role="company">
                      추천 인재 확인<img src={arrowCompany} alt="Logo" style={{'transform': 'rotate(180deg)', 'position': 'absolute', 'marginLeft': '5px', 'marginTop': '3px'}} width={24*0.8} height={24*0.8}></img>
                    </JobButton>
                    <JobContent>· {job?.employment_type}  |  {job?.career_level}<br/>· {job?.department} | {job?.deadline_date.replace("-", ".").replace("-", ".")} 마감</JobContent>
                  </JobPosting>
                ))}
              </JobRegion>
            </JobContainer>
        </Container>
      )
    } else if (!queryJobFit || !queryCultureFit || !queryGrowth) {
      return (
        <Container>
          <Title>🔮 {role === "talent" ? "공고" : "인재"} 탐색</Title>
          <WeightParagraph>가중치를 조정하여 딱 맞는 {role === "talent" ? "공고" : "인재"}를 찾아보세요!</WeightParagraph>
          <WeightContainer>
          <SliderBox>
            <Label>💼 직무 적합성<Value role={role}>{weights.jobFit}</Value></Label>
            <Description>{role === "talent" ? "나의 직무 수행 역량 · 경험 · 기술과 일치하는 공고 (역할 적합도, 역량 적합도)" : "공고에서 요구하는 역할을 수행 가능하고, 직무 관련 역량을 갖춘 인재 (역할 수행력, 역량 적합도)"}</Description>
            <StyledSlider role={role} type="range" min="0" max="100" value={weights.jobFit} onChange={(e) => handleChange("jobFit", Number(e.target.value))}/>
          </SliderBox>
          <SliderBox>
            <Label>👥 문화 적합성<Value role={role}>{weights.cultureFit}</Value></Label>
            <Description>{role === "talent" ? "나의 가치관과 일치하는 비전, 성향에 적합한 조직문화를 갖춘 공고 (비전 신뢰도, 조직/문화 적합도)" : "우리 조직의 문화에 적합하며, 협업과 기여에 긍정적 영향을 줄 인재 (협업 기여도, 조직/문화 적합도)"}</Description>
            <StyledSlider role={role} type="range" min="0" max="100" value={weights.cultureFit} onChange={(e) => handleChange("cultureFit", Number(e.target.value))}/>
          </SliderBox>
          <SliderBox>
            <Label>📈 성장 가능성<Value role={role}>{weights.growth}</Value></Label>
            <Description>{role === "talent" ? "나의 커리어 방향성과 일치하며, 성장의 기회를 제공하는 공고 (성장 기회 제공, 커리어 방향)" : "우리 조직의 성장 방향과 일치하며, 발전할 잠재력이 있는 인재 (성장 가능성, 커리어 방향)"}</Description>
            <StyledSlider role={role} type="range" min="0" max="100" value={weights.growth} onChange={(e) => handleChange("growth", Number(e.target.value))}/>
          </SliderBox>
          </WeightContainer>
          <WeightButton role={role} onClick={submitWeights}>가중치 입력하기</WeightButton>
        </Container>
      );
    } else if (!matchingData || matchingData?.length === 0) {
        return (
          <Container>
              <Title>🔮 {role === "talent" ? "공고" : "인재"} 탐색</Title>
              <Paragraph style={{'marginTop': '50px'}}>카드를 로딩 중이니 잠시만 기다려 주세요!<br/><br/>(프로필 설정/인터뷰를 진행하지 않은 경우 카드가 나타나지 않아요😣)</Paragraph>
          </Container>
        );
    } else if (role === "talent") {
        return (
          <Container>
              <Title>🔮 공고 추천</Title>
              {data && companyData && cardData && (
                <>
                <CardContainer>
                  <Card role="company" flipped={flipped} onClick={() => setFlipped(!flipped)}>
                    <CardFace role="company">
                      <ProfileContainer role="company">
                        <ProfileImage><img src={role === "talent" ? company : talent} alt="Logo" width={32} height={36}></img></ProfileImage>
                        <ProfileName>{companyData?.basic.name ? (companyData?.basic.name + "　") : "　"}</ProfileName>
                        <ProfileContent>🌠 {data?.title}</ProfileContent>
                        <ProfileContent>🗓️ {data?.deadline_date?.replace("-", ".").replace("-", ".")} 마감</ProfileContent>
                      </ProfileContainer>
                      <Introduction>{companyData?.basic.tagline ? companyData?.basic.tagline : `${data?.title} 공고 지원자를 기다립니다.`}</Introduction>
                      <ContentContainer>
                        <Content role="company" style={{ borderRadius: '20px 0 20px 0' }}>
                          <ContentTitle>📜 공고 정보</ContentTitle>
                          <ContentParagraph>
                            <span>· {data?.employment_type} ({data?.career_level})</span>
                            <span>· 근무 기간 : {data?.term_months}</span>
                            <span>· 근무 부서 : {data?.department}</span>
                            <span>· 연봉 : {data?.salary_range}</span>
                          </ContentParagraph>
                        </Content>
                        <Content role="company" style={{ borderRadius: '0 20px 0 20px' }}>
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
                        <Content role="company" style={{ borderRadius: '0 20px 0 20px' }}>
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
                        <Content role="company" style={{ borderRadius: '20px 0 20px 0' }}>
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
                    <CardBack role="company">
                      <CardBackContainer>
                        <CardBackRegion role="company">
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
                </CardContainer>
                <HexagonContainer>
                  <Hexagon role="company" score={[matchingData[page]?.scores.roles, matchingData[page]?.scores.growth, matchingData[page]?.scores.career,
                  matchingData[page]?.scores.culture, matchingData[page]?.scores.vision, matchingData[page]?.scores.skills]} />
                </HexagonContainer>
                </>
              )}
              {(!data || !companyData || !cardData) && (
                <>
                <CardContainer>
                  <Card role="company" flipped={flipped}>
                    <CardFace role="company">
                      <ProfileContainer role="company">
                        <ProfileImage><img src={role === "talent" ? company : talent} alt="Logo" width={32} height={36}></img></ProfileImage>
                        <ProfileName>　</ProfileName>
                        <ProfileContent>🌠 　</ProfileContent>
                        <ProfileContent>🗓️ 　</ProfileContent>
                      </ProfileContainer>
                      <Introduction>　</Introduction>
                      <ContentContainer>
                        <Content role="company" style={{ borderRadius: '20px 0 20px 0' }}>
                          <ContentTitle>📜 공고 정보</ContentTitle>
                          <ContentParagraph>
                          </ContentParagraph>
                        </Content>
                        <Content role="company" style={{ borderRadius: '0 20px 0 20px' }}>
                          <ContentTitle>📋 주요 역할/업무</ContentTitle>
                          <ContentParagraph>
                            </ContentParagraph>
                        </Content>
                      </ContentContainer>
                      <ContentContainer>
                        <Content role="company" style={{ borderRadius: '0 20px 0 20px' }}>
                          <ContentTitle>💡 자격 요건</ContentTitle>
                          <ContentParagraph>
                            </ContentParagraph>
                        </Content>
                        <Content role="company" style={{ borderRadius: '20px 0 20px 0' }}>
                          <ContentTitle>✏️ 요구 역량</ContentTitle>
                          <ContentParagraph>
                          </ContentParagraph>
                        </Content>
                      </ContentContainer>
                      <Analysis>
                      </Analysis>
                    </CardFace>
                  </Card>
                </CardContainer>
                <HexagonContainer>
                  <Hexagon role="company" score={[0,0,0,0,0,0]} />
                </HexagonContainer>
                </>
              )}
              <ButtonContainer>
                <Button role={role}><span>💙 보관하기</span></Button>
                <Line></Line>
                <ReactionContainer>
                  <ReactionTitle>아쉬운 점에 대한 반응을 누르면, 더 적합한 인재를 찾아드려요.</ReactionTitle>
                  <ReactionButton>⚡ 기대하는 역할의 포지션이 아님</ReactionButton>
                  <ReactionButton>🛠 보유한 직무 역량과의 불일치</ReactionButton>
                  <ReactionButton>🤝 조직 비전/전략과의 불일치</ReactionButton>
                  <ReactionButton>🏢 조직/문화 적합도의 차이</ReactionButton>
                  <ReactionButton>🌱 충분하지 않은 성장 기회</ReactionButton>
                  <ReactionButton>🧭 커리어 방향의 불일치</ReactionButton>
                </ReactionContainer>
              </ButtonContainer>
              <LeftArrow onClick={getPreviousPage} style={page === 0 ? { display: 'none' } : {}}><img src={role === "company" ? arrowCompany : arrowTalent} alt="Arrow" width={45} height={45}></img></LeftArrow>
              <RightArrow onClick={getNextPage} style={page === endPage ? { display: 'none' } : {}}><img src={role === "company" ? arrowCompany : arrowTalent} alt="Arrow" width={45} height={45}></img></RightArrow>
          </Container>
        );
    } else if (role === "company") {
        return (
          <Container>
            <Title>🔮 인재 추천</Title>
              {data && cardData && (
              <>
              <CardContainer>
                <Card role="talent" flipped={flipped} onClick={() => setFlipped(!flipped)}>
                  <CardFace role="talent">
                    <ProfileContainer role="talent">
                      <ProfileImage><img src={role === "talent" ? company : talent} alt="Logo" width={32} height={36}></img></ProfileImage>
                      <ProfileName>{data?.basic.name ? (data?.basic.name + "　") : "　"}</ProfileName>
                      <ProfileContent>🌠 {data?.experiences.at(-1)?.title} (경력 {data?.experience_total_years}년)</ProfileContent>
                      <ProfileContent>💼 {data?.experiences.at(-1)?.company_name} {data?.experiences.at(-1)?.status}</ProfileContent>
                    </ProfileContainer>
                    <Introduction>{data?.basic.tagline ? data?.basic.tagline : "안녕하세요, 잘 부탁드립니다!"}</Introduction>
                    <ContentContainer>
                      <Content role="talent" style={{ borderRadius: '20px 0 20px 0' }}>
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
                      <Content role="talent" style={{ borderRadius: '0 20px 0 20px' }}>
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
                      <Content role="talent" style={{ borderRadius: '0 20px 0 20px' }}>
                        <ContentTitle>🚀 핵심 일반 역량</ContentTitle>
                        <ContentParagraph>{cardData?.general_capabilities.map((skill, idx) => (
                          <span key={idx}>
                            · {skill.name} <Tag level={skill.level}>{skill.level == "high" ? "매우 우수" : (skill.level == "medium" ? "우수" : "보통")}</Tag>
                            <br />
                          </span>
                        ))}
                        </ContentParagraph>
                      </Content>
                      <Content role="talent" style={{ borderRadius: '20px 0 20px 0' }}>
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
                  <CardBack role="talent">
                    <CardBackContainer>
                      <CardBackRegion role="talent">
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
              </CardContainer>
              <HexagonContainer>
                <Hexagon score={[matchingData[page]?.scores.roles, matchingData[page]?.scores.growth, matchingData[page]?.scores.career,
                  matchingData[page]?.scores.culture, matchingData[page]?.scores.vision, matchingData[page]?.scores.skills]} role={role} />
              </HexagonContainer>
              </>
              )}
              {(!data || !cardData) && (
              <>
              <CardContainer>
                <Card role="talent" flipped={flipped} onClick={() => setFlipped(!flipped)}>
                  <CardFace role="talent">
                    <ProfileContainer role="talent">
                      <ProfileImage><img src={role === "talent" ? company : talent} alt="Logo" width={32} height={36}></img></ProfileImage>
                      <ProfileName>　</ProfileName>
                      <ProfileContent>🌠 　</ProfileContent>
                      <ProfileContent>💼 　</ProfileContent>
                    </ProfileContainer>
                    <Introduction>　</Introduction>
                    <ContentContainer>
                      <Content role="talent" style={{ borderRadius: '20px 0 20px 0' }}>
                        <ContentTitle>📂 주요 경험/경력</ContentTitle>
                        <ContentParagraph>
                        </ContentParagraph>
                      </Content>
                      <Content role="talent" style={{ borderRadius: '0 20px 0 20px' }}>
                        <ContentTitle>🎯 강점</ContentTitle>
                        <ContentParagraph>
                        </ContentParagraph>
                      </Content>
                    </ContentContainer>
                    <ContentContainer>
                      <Content role="talent" style={{ borderRadius: '0 20px 0 20px' }}>
                        <ContentTitle>🚀 핵심 일반 역량</ContentTitle>
                        <ContentParagraph>
                        </ContentParagraph>
                      </Content>
                      <Content role="talent" style={{ borderRadius: '20px 0 20px 0' }}>
                        <ContentTitle>✏️ 핵심 직무 역량/기술</ContentTitle>
                        <ContentParagraph>
                        </ContentParagraph>
                      </Content>
                    </ContentContainer>
                    <Analysis>
                    </Analysis>
                  </CardFace>
                </Card>
              </CardContainer>
              <HexagonContainer>
                <Hexagon score={[0,0,0,0,0,0]} role={role} />
              </HexagonContainer>
              </>
              )}
              <ButtonContainer>
                <Button role={role}><span>❤️ 보관하기</span></Button>
                <Line></Line>
                <ReactionContainer>
                  <ReactionTitle>아쉬운 점에 대한 반응을 누르면, 더 적합한 인재를 찾아드려요.</ReactionTitle>
                  <ReactionButton>⚡ 기대하는 경험/경력과의 불일치</ReactionButton>
                  <ReactionButton>🛠 요구하는 직무 역량과의 차이</ReactionButton>
                  <ReactionButton>🤝 협업 스타일의 차이</ReactionButton>
                  <ReactionButton>🏢 조직/문화 적합도의 차이</ReactionButton>
                  <ReactionButton>🌱 성장 가능성 검증의 어려움</ReactionButton>
                  <ReactionButton>🧭 커리어 방향의 불일치</ReactionButton>
                </ReactionContainer>
              </ButtonContainer>
              <LeftArrow onClick={getPreviousPage} style={page === 0 ? { display: 'none' } : {}}><img src={role === "company" ? arrowCompany : arrowTalent} alt="Arrow" width={45} height={45}></img></LeftArrow>
              <RightArrow onClick={getNextPage} style={page === endPage ? { display: 'none' } : {}}><img src={role === "company" ? arrowCompany : arrowTalent} alt="Arrow" width={45} height={45}></img></RightArrow>
          </Container>
        );
    }
}