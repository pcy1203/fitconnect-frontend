import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

import { useAuth } from "../../components/AuthContext";
import Hexagon from "../../components/Hexagon";
import colors from "../../styles/colors";
import axios from "axios";
import talent from '../../assets/talent.png';
import company from '../../assets/company.png';
import arrowTalent from '../../assets/arrow-talent.png';
import arrowCompany from '../../assets/arrow-company.png';

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
  background: #fffffff;
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

export default function Recommendation() {
    const { token, setToken, role, setRole, loading } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!token || !role) navigate("/auth/login");
    }, [loading, token]);

    const [weights, setWeights] = useState({
      jobFit: 50,
      cultureFit: 50,
      growth: 50,
    });
    
    const handleChange = (key: string, value: number) => {
      setWeights({ ...weights, [key]: value });
    };

    const submitWeights = () => {
      navigate(`/search/recommendation?jobfit=${weights.jobFit}&culturefit=${weights.cultureFit}&growth=${weights.growth}`);
    }
    
    const [flipped, setFlipped] = useState(false);
    if (!(new URLSearchParams(location.search).get("jobfit"))
      || !(new URLSearchParams(location.search).get("culturefit"))
      || !(new URLSearchParams(location.search).get("growth"))) {
      return (
        <Container>
          <Title>🔍 {role === "talent" ? "공고" : "인재"} 탐색</Title>
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
    } else if (role === "talent") {
        return (
          <Container>
            <Title>🔍 공고 탐색</Title>
            <CardContainer>
              <Card role="company" flipped={flipped} onClick={() => setFlipped(!flipped)}>
                <CardFace>
                  <ProfileContainer role="company">
                    <ProfileImage><img src={role === "company" ? talent : company} alt="Logo" width={32} height={36}></img></ProfileImage>
                    <ProfileName>김커넥</ProfileName>
                    <ProfileContent>🌠 백엔드 개발자</ProfileContent>
                    <ProfileContent>🗓️ 2025.10.04 마감</ProfileContent>
                  </ProfileContainer>
                  <Introduction>"백엔드 개발자를 찾습니다."</Introduction>
                  <ContentContainer>
                    <Content role="company" style={{ borderRadius: '20px 0 20px 0' }}>
                      <ContentTitle>📜 공고 정보</ContentTitle>
                      <ContentParagraph>· 정규직 (경력 3~5년차)<br/>· 근무 기간 : 6개월<br/>· 근무 부서 : 개발팀<br/>· 연봉 협상</ContentParagraph>
                    </Content>
                    <Content role="company" style={{ borderRadius: '0 20px 0 20px' }}>
                      <ContentTitle>📋 주요 역할/업무</ContentTitle>
                      <ContentParagraph>· 이런 업무를 수행해요<br/>· 이런 업무를 수행해요<br/>· 이런 업무를 수행해요<br/>· 이런 업무를 수행해요</ContentParagraph>
                    </Content>
                  </ContentContainer>
                  <ContentContainer>
                    <Content role="company" style={{ borderRadius: '0 20px 0 20px' }}>
                      <ContentTitle>💡 자격 요건</ContentTitle>
                      <ContentParagraph>· 이런 것을 요구해요<br/>· 이런 것을 요구해요<br/>· 이런 것을 요구해요<br/>· 이런 것을 요구해요</ContentParagraph>
                    </Content>
                    <Content role="company" style={{ borderRadius: '20px 0 20px 0' }}>
                      <ContentTitle>✏️ 요구 역량</ContentTitle>
                      <ContentParagraph>· 이런 역량이 있나요?<br/>· 이런 역량이 있나요?<br/>· 이런 역량이 있나요?<br/>· 이런 역량이 있나요?</ContentParagraph>
                    </Content>
                  </ContentContainer>
                  <Analysis>
                    💼 <b>기업 정보</b> : 조직문화, 복리후생<br/>
                    🎤 <b>인재상</b> : 이런 인재를 원해요<br/>
                    💪 <b>도전 과제</b> : 이런 도전 과제가 있어요
                  </Analysis>
                </CardFace>
                <CardBack role="company">
                  <CardBackContainer>
                    <CardBackRegion role="company">
                      <BackRegion>
                        <BackTitle>💼 기업 정보</BackTitle>
                        <BackContent>회사명  |  업종  |  회사 규모  |  회사 위치</BackContent>
                        <BackContent>비전/미션 :</BackContent>
                        <BackContent>사업 영역 : </BackContent>
                        <BackContent>인재상 : </BackContent>
                        <BackContent>조직문화 :</BackContent>
                        <BackContent>복리후생 :</BackContent>
                      </BackRegion>
                      <BackRegion>
                        <BackTitle>📚 공고 정보</BackTitle>
                        <BackContent>공고명  |  고용 형태  |  신입/경력</BackContent>
                        <BackContent>근무 기간 (근무 시작일)  |  부서</BackContent>
                        <BackContent>연봉  |  회사 위치</BackContent>
                        <BackContent>업무 내용 : </BackContent>
                        <BackContent>문의 메일  |  문의 연락처</BackContent>
                      </BackRegion>
                      <BackRegion>
                        <BackTitle>☑️ 자격 요건</BackTitle>
                        <BackContent>학력</BackContent>
                        <BackContent>필수 요건 : </BackContent>
                        <BackContent>우대 사항 : </BackContent>
                        <BackContent>요구 역량 : </BackContent>
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
              <Hexagon role={role} score={[70, 20, 90, 50, 30, 60]} />
            </HexagonContainer>
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
            <LeftArrow><img src={role === "company" ? arrowCompany : arrowTalent} alt="Arrow" width={45} height={45}></img></LeftArrow>
            <RightArrow><img src={role === "company" ? arrowCompany : arrowTalent} alt="Arrow" width={45} height={45}></img></RightArrow>
          </Container>
        );
    } else if (role === "company") {
        return (
          <Container>
            <Title>🔍 인재 탐색</Title>
            <CardContainer>
              <Card role="talent" flipped={flipped} onClick={() => setFlipped(!flipped)}>
                <CardFace>
                  <ProfileContainer role="talent">
                    <ProfileImage><img src={role === "company" ? talent : company} alt="Logo" width={32} height={36}></img></ProfileImage>
                    <ProfileName>김커넥</ProfileName>
                    <ProfileContent>🌠 백엔드 개발자 (경력 5년)</ProfileContent>
                    <ProfileContent>💼 FitConnect 재직 중</ProfileContent>
                  </ProfileContainer>
                  <Introduction>"안녕하세요, 백엔드 개발자입니다."</Introduction>
                  <ContentContainer>
                    <Content role="talent" style={{ borderRadius: '20px 0 20px 0' }}>
                      <ContentTitle>📂 주요 경험/경력</ContentTitle>
                      <ContentParagraph>· 이런 경험이 있어요<br/>· 이런 경험이 있어요<br/>· 이런 경험이 있어요<br/>· 이런 경험이 있어요</ContentParagraph>
                    </Content>
                    <Content role="talent" style={{ borderRadius: '0 20px 0 20px' }}>
                      <ContentTitle>🎯 강점</ContentTitle>
                      <ContentParagraph>· 이런 강점이 있어요<br/>· 이런 강점이 있어요<br/>· 이런 강점이 있어요<br/>· 이런 강점이 있어요</ContentParagraph>
                    </Content>
                  </ContentContainer>
                  <ContentContainer>
                    <Content role="talent" style={{ borderRadius: '0 20px 0 20px' }}>
                      <ContentTitle>🚀 핵심 일반 역량</ContentTitle>
                      <ContentParagraph>· 역량1<Tag>높음</Tag><br/>· 역량2<Tag>높음</Tag><br/>· 역량3<Tag>높음</Tag><br/>· 역량4<Tag>높음</Tag></ContentParagraph>
                    </Content>
                    <Content role="talent" style={{ borderRadius: '20px 0 20px 0' }}>
                      <ContentTitle>✏️ 핵심 직무 역량/기술</ContentTitle>
                      <ContentParagraph>· 직무 역량1<Tag>높음</Tag><br/>· 직무 역량.....2<Tag>높음</Tag><br/>· 직무 역량3<Tag>높음</Tag><br/>· 직무 역량............4<Tag>높음</Tag></ContentParagraph>
                    </Content>
                  </ContentContainer>
                  <Analysis>
                    📈 <b>직무 수행</b> : 이런 성과가 있어요<br/>
                    👥 <b>협업 성향</b> : 협업할 때 이런 편이에요<br/>
                    💪 <b>성장 가능성</b> : 이런 성장 가능성이 보여요
                  </Analysis>
                </CardFace>
                <CardBack role="talent">
                  <CardBackContainer>
                    <CardBackRegion role="talent">
                      <BackRegion>
                        <BackTitle>👤 인적사항</BackTitle>
                        <BackContent>이름  |  생년.월.일  |  이메일  |  휴대전화</BackContent>
                      </BackRegion>
                      <BackRegion>
                        <BackTitle>🏫 학력사항</BackTitle>
                        <BackContent>학교  |  전공  (년.월 ~ 년.월, 졸업)</BackContent>
                        <BackContent>학교  |  전공  (년.월 ~ 년.월, 재학)</BackContent>
                      </BackRegion>
                      <BackRegion>
                        <BackTitle>💼 경력사항</BackTitle>
                        <BackContent>직장  |  직무  (년.월 ~ 년.월, 퇴사)<br/>업무 내용 (퇴사 사유)</BackContent>
                        <BackContent>직장  |  직무  (년.월 ~ 년.월, 퇴사)<br/>업무 내용 (퇴사 사유)</BackContent>
                      </BackRegion>
                      <BackRegion>
                        <BackTitle>📒 활동내역</BackTitle>
                        <BackContent>활동명  |  봉사활동<br/>활동 내용</BackContent>
                        <BackContent>활동명  |  봉사활동<br/>활동 내용</BackContent>
                      </BackRegion>
                      <BackRegion>
                        <BackTitle>📜 자격사항</BackTitle>
                        <BackContent>자격증  |  점수  |  년.월</BackContent>
                        <BackContent>자격증  |  점수  |  년.월</BackContent>
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
              <Hexagon score={[70, 20, 90, 50, 30, 60]} role={role} />
            </HexagonContainer>
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
            <LeftArrow><img src={role === "company" ? arrowCompany : arrowTalent} alt="Arrow" width={45} height={45}></img></LeftArrow>
            <RightArrow><img src={role === "company" ? arrowCompany : arrowTalent} alt="Arrow" width={45} height={45}></img></RightArrow>
          </Container>
        );
    }
}
