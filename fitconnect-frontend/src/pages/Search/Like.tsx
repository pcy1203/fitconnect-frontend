import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

import { useAuth } from "../../components/AuthContext";
import Hexagon from "../../components/Hexagon";
import colors from "../../styles/colors";
import axios from "axios";
import talent from '../../assets/talent.png';
import company from '../../assets/company.png';

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

const LikeContainer = styled.div`
  position: relative;
  top: -688px;
  left: 660px;
  width: 410px;
  height: 1px;
`;

const LikeRegion = styled.div<{ role?: string }>`
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

const Like = styled.div`
  width: 360px;
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
  &:hover button {
    visibility: visible;
  }
  &:active {
    transform: scale(0.98);
  }
`;

const LikeImage = styled.div`
  margin-left: 15px;
  margin-top: 15px;
  width: 30px;
`;

const LikeTitle = styled.div`
  width: 300px;
  font-size: 14px;
  font-weight: 600;
  color: #242424ff;
  position: relative;
  top: -25px;
  left: 41px;
`;

const LikeContent = styled.div`
  width: 320px;
  font-size: 12px;
  color: #242424ff;
  position: relative;
  top: -42px;
  left: 20px;
  line-height: 22px;
`;

const LikeButton = styled.button<{ role?: string }>`
  all: unset;
  visibility: hidden;
  width: 50px;
  height: 22px;
  text-align: center;
  position: relative;
  cursor: pointer;
  font-size: 14px;
  top: -48px;
  left: 290px;
  background: ${({ role }) => (role === "company" ? colors.company : colors.talent )};
  border: 2px solid #b2b2b2ff;
  box-shadow: 1px 1px 1px rgba(171, 171, 171, 0.2);
  transition: transform 0.1s ease;
  &:hover {
    font-weight: 600;
  }
  &:active {
    transform: scale(0.95);
  }
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
    margin-left: 60px;
    overflow: hidden;
`;

export default function Recommendation() {
    const { token, setToken, role, setRole } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!token || !role) navigate("/auth/login");
    }, []);
    
    const [flipped, setFlipped] = useState(false);
    if (role === "talent") {
        return (
          <Container>
            <Title>💙 보관한 공고</Title>
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
                      <HexagonContainer>
                        <Hexagon score={[70, 20, 90, 50, 30, 60]} role={role} />
                      </HexagonContainer>
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
            <LikeContainer>
              <LikeRegion>
                <Like>
                  <LikeImage><img src={role === "company" ? talent : company} alt="Logo" width={24*0.8} height={27*0.8}></img></LikeImage>
                  <LikeTitle>김커넥 : 백엔드 개발자</LikeTitle>
                  <LikeButton role="company">삭제</LikeButton>
                  <LikeContent>· 정규직  |  경력 3~5년차  |  2025.10.04 마감<br/>· 백엔드 개발자를 찾습니다.</LikeContent>
                </Like>
                <Like>
                  <LikeImage><img src={role === "company" ? talent : company} alt="Logo" width={24*0.8} height={27*0.8}></img></LikeImage>
                  <LikeTitle>김커넥 : 백엔드 개발자</LikeTitle>
                  <LikeButton role="company">삭제</LikeButton>
                  <LikeContent>· 정규직  |  경력 3~5년차  |  2025.10.04 마감<br/>· 백엔드 개발자를 찾습니다.</LikeContent>
                </Like>
                <Like>
                  <LikeImage><img src={role === "company" ? talent : company} alt="Logo" width={24*0.8} height={27*0.8}></img></LikeImage>
                  <LikeTitle>김커넥 : 백엔드 개발자</LikeTitle>
                  <LikeButton role="company">삭제</LikeButton>
                  <LikeContent>· 정규직  |  경력 3~5년차  |  2025.10.04 마감<br/>· 백엔드 개발자를 찾습니다.</LikeContent>
                </Like>
                <Like>
                  <LikeImage><img src={role === "company" ? talent : company} alt="Logo" width={24*0.8} height={27*0.8}></img></LikeImage>
                  <LikeTitle>김커넥 : 백엔드 개발자</LikeTitle>
                  <LikeButton role="company">삭제</LikeButton>
                  <LikeContent>· 정규직  |  경력 3~5년차  |  2025.10.04 마감<br/>· 백엔드 개발자를 찾습니다.</LikeContent>
                </Like>
                <Like>
                  <LikeImage><img src={role === "company" ? talent : company} alt="Logo" width={24*0.8} height={27*0.8}></img></LikeImage>
                  <LikeTitle>김커넥 : 백엔드 개발자</LikeTitle>
                  <LikeButton role="company">삭제</LikeButton>
                  <LikeContent>· 정규직  |  경력 3~5년차  |  2025.10.04 마감<br/>· 백엔드 개발자를 찾습니다.</LikeContent>
                </Like>
                <Like>
                  <LikeImage><img src={role === "company" ? talent : company} alt="Logo" width={24*0.8} height={27*0.8}></img></LikeImage>
                  <LikeTitle>김커넥 : 백엔드 개발자</LikeTitle>
                  <LikeButton role="company">삭제</LikeButton>
                  <LikeContent>· 정규직  |  경력 3~5년차  |  2025.10.04 마감<br/>· 백엔드 개발자를 찾습니다.</LikeContent>
                </Like>
                <Like>
                  <LikeImage><img src={role === "company" ? talent : company} alt="Logo" width={24*0.8} height={27*0.8}></img></LikeImage>
                  <LikeTitle>김커넥 : 백엔드 개발자</LikeTitle>
                  <LikeButton role="company">삭제</LikeButton>
                  <LikeContent>· 정규직  |  경력 3~5년차  |  2025.10.04 마감<br/>· 백엔드 개발자를 찾습니다.</LikeContent>
                </Like>
              </LikeRegion>
            </LikeContainer>
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
                      <HexagonContainer>
                        <Hexagon score={[70, 20, 90, 50, 30, 60]} role={role} />
                      </HexagonContainer>
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
            <LikeContainer>
              <LikeRegion>
                <Like>
                  <LikeImage><img src={role === "company" ? talent : company} alt="Logo" width={24*0.8} height={27*0.8}></img></LikeImage>
                  <LikeTitle>김커넥 : FitConnect 재직 중</LikeTitle>
                  <LikeButton role="talent">삭제</LikeButton>
                  <LikeContent>· 경력 3~5년차  |  직무 수행<br/>· 안녕하세요, 백엔드 개발자입니다.</LikeContent>
                </Like>
                <Like>
                  <LikeImage><img src={role === "company" ? talent : company} alt="Logo" width={24*0.8} height={27*0.8}></img></LikeImage>
                  <LikeTitle>김커넥 : FitConnect 재직 중</LikeTitle>
                  <LikeButton role="talent">삭제</LikeButton>
                  <LikeContent>· 경력 3~5년차  |  직무 수행<br/>· 안녕하세요, 백엔드 개발자입니다.</LikeContent>
                </Like>
                <Like>
                  <LikeImage><img src={role === "company" ? talent : company} alt="Logo" width={24*0.8} height={27*0.8}></img></LikeImage>
                  <LikeTitle>김커넥 : FitConnect 재직 중</LikeTitle>
                  <LikeButton role="talent">삭제</LikeButton>
                  <LikeContent>· 경력 3~5년차  |  직무 수행<br/>· 안녕하세요, 백엔드 개발자입니다.</LikeContent>
                </Like>
                <Like>
                  <LikeImage><img src={role === "company" ? talent : company} alt="Logo" width={24*0.8} height={27*0.8}></img></LikeImage>
                  <LikeTitle>김커넥 : FitConnect 재직 중</LikeTitle>
                  <LikeButton role="talent">삭제</LikeButton>
                  <LikeContent>· 경력 3~5년차  |  직무 수행<br/>· 안녕하세요, 백엔드 개발자입니다.</LikeContent>
                </Like>
                <Like>
                  <LikeImage><img src={role === "company" ? talent : company} alt="Logo" width={24*0.8} height={27*0.8}></img></LikeImage>
                  <LikeTitle>김커넥 : FitConnect 재직 중</LikeTitle>
                  <LikeButton role="talent">삭제</LikeButton>
                  <LikeContent>· 경력 3~5년차  |  직무 수행<br/>· 안녕하세요, 백엔드 개발자입니다.</LikeContent>
                </Like>
                <Like>
                  <LikeImage><img src={role === "company" ? talent : company} alt="Logo" width={24*0.8} height={27*0.8}></img></LikeImage>
                  <LikeTitle>김커넥 : FitConnect 재직 중</LikeTitle>
                  <LikeButton role="talent">삭제</LikeButton>
                  <LikeContent>· 경력 3~5년차  |  직무 수행<br/>· 안녕하세요, 백엔드 개발자입니다.</LikeContent>
                </Like>
                <Like>
                  <LikeImage><img src={role === "company" ? talent : company} alt="Logo" width={24*0.8} height={27*0.8}></img></LikeImage>
                  <LikeTitle>김커넥 : FitConnect 재직 중</LikeTitle>
                  <LikeButton role="talent">삭제</LikeButton>
                  <LikeContent>· 경력 3~5년차  |  직무 수행<br/>· 안녕하세요, 백엔드 개발자입니다.</LikeContent>
                </Like>
              </LikeRegion>
            </LikeContainer>
          </Container>
        );
    }
}
