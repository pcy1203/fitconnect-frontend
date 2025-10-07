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

export default function Result() {
    const { token, setToken, role, setRole } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!token || !role) navigate("/auth/login");
    }, []);

    const [flipped, setFlipped] = useState(false);
    if (role === "talent") {
        return (
          <Container>
            <Title>📊 분석 결과: 역량 카드</Title>
            <CardContainer>
              <Card role={role} flipped={flipped} onClick={() => setFlipped(!flipped)}>
                <CardFace role={role}>
                  <ProfileContainer role={role}>
                    <ProfileImage><img src={role === "company" ? company : talent} alt="Logo" width={32} height={36}></img></ProfileImage>
                    <ProfileName>김커넥</ProfileName>
                    <ProfileContent>🌠 백엔드 개발자 (경력 5년)</ProfileContent>
                    <ProfileContent>💼 FitConnect 재직 중</ProfileContent>
                  </ProfileContainer>
                  <Introduction>"안녕하세요, 백엔드 개발자입니다."</Introduction>
                  <ContentContainer>
                    <Content role={role} style={{ borderRadius: '20px 0 20px 0' }}>
                      <ContentTitle>📂 주요 경험/경력</ContentTitle>
                      <ContentParagraph>· 이런 경험이 있어요<br/>· 이런 경험이 있어요<br/>· 이런 경험이 있어요<br/>· 이런 경험이 있어요</ContentParagraph>
                    </Content>
                    <Content role={role} style={{ borderRadius: '0 20px 0 20px' }}>
                      <ContentTitle>🎯 강점</ContentTitle>
                      <ContentParagraph>· 이런 강점이 있어요<br/>· 이런 강점이 있어요<br/>· 이런 강점이 있어요<br/>· 이런 강점이 있어요</ContentParagraph>
                    </Content>
                  </ContentContainer>
                  <ContentContainer>
                    <Content role={role} style={{ borderRadius: '0 20px 0 20px' }}>
                      <ContentTitle>🚀 핵심 일반 역량</ContentTitle>
                      <ContentParagraph>· 역량1<Tag>높음</Tag><br/>· 역량2<Tag>높음</Tag><br/>· 역량3<Tag>높음</Tag><br/>· 역량4<Tag>높음</Tag></ContentParagraph>
                    </Content>
                    <Content role={role} style={{ borderRadius: '20px 0 20px 0' }}>
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
                <CardBack role={role}>
                  <CardBackContainer>
                    <CardBackRegion role={role}>
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
                    <ProfileName>김커넥</ProfileName>
                    <ProfileContent>🌠 백엔드 개발자</ProfileContent>
                    <ProfileContent>🗓️ 2025.10.04 마감</ProfileContent>
                  </ProfileContainer>
                  <Introduction>"백엔드 개발자를 찾습니다."</Introduction>
                  <ContentContainer>
                    <Content role={role} style={{ borderRadius: '20px 0 20px 0' }}>
                      <ContentTitle>📜 공고 정보</ContentTitle>
                      <ContentParagraph>· 정규직 (경력 3~5년차)<br/>· 근무 기간 : 6개월<br/>· 근무 부서 : 개발팀<br/>· 연봉 협상</ContentParagraph>
                    </Content>
                    <Content role={role} style={{ borderRadius: '0 20px 0 20px' }}>
                      <ContentTitle>📋 주요 역할/업무</ContentTitle>
                      <ContentParagraph>· 이런 업무를 수행해요<br/>· 이런 업무를 수행해요<br/>· 이런 업무를 수행해요<br/>· 이런 업무를 수행해요</ContentParagraph>
                    </Content>
                  </ContentContainer>
                  <ContentContainer>
                    <Content role={role} style={{ borderRadius: '0 20px 0 20px' }}>
                      <ContentTitle>💡 자격 요건</ContentTitle>
                      <ContentParagraph>· 이런 것을 요구해요<br/>· 이런 것을 요구해요<br/>· 이런 것을 요구해요<br/>· 이런 것을 요구해요</ContentParagraph>
                    </Content>
                    <Content role={role} style={{ borderRadius: '20px 0 20px 0' }}>
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
                <CardBack role={role}>
                  <CardBackContainer>
                    <CardBackRegion role={role}>
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
              <ButtonContainer>
                <Link to="/search/recommendation"><SearchButton role={role}>인재 탐색하기</SearchButton></Link>
                <Link to="/assessment/interview"><InterviewButton>인터뷰 다시 하기</InterviewButton></Link>
              </ButtonContainer>
            </CardContainer>
          </Container>
        );
    }
}
