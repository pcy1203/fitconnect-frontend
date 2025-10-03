import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

import { useAuth } from "../../components/AuthContext";
import colors from "../../styles/colors";
import axios from "axios";
import talent from '../../assets/talent.png';
import company from '../../assets/company.png';

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
  background: linear-gradient(180deg, #ffffffff 0%, #dce3f1ff 100%);
  transform-style: preserve-3d;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  transform: ${({ flipped }) => (flipped ? "rotateY(180deg)" : "rotateY(0deg)")};
  border: 3px solid ${({ role }) => (role === "talent" ? colors.company_light : colors.talent_light )};
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1),
              0 0 10px ${({ role }) => (role === "talent" ? colors.company_light : colors.talent_light )};
  &:hover {
    transform: ${({ flipped }) => (flipped ? "rotateY(180deg) translateY(-10px)" : "rotateY(0deg) translateY(-10px)")};
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2),
                0 0 20px ${({ role }) => (role === "talent" ? colors.company : colors.talent )};
  }
`;

const CardFace = styled.div`
  backface-visibility: hidden;
`;

const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
  width: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProfileContainer = styled.div`
  width: 100%;
  height: 90px;
  margin-top: -1px;
  background: #87B2FF;
  border-radius: 15px 15px 0 0;
`;

const ProfileImage = styled.div`
  width: 200px;
  height: 50px;
  background: #FFFFFF;
  border-radius: 50px;
  text-align: center;
  position: relative;
  left: 40px;
  top: 20px;
  & > img {
    position: relative;
    left: -50px;
    margin-top: 5px;
  }
`;

const ProfileName = styled.div`
  color: black;
  position: relative;
  left: 120px;
  top: -25px;
  font-size: 25px;
  font-weight: 600;
`;

const ProfileContent = styled.div`
  color: black;
  font-size: 16px;
  font-weight: 500;
  position: relative;
  left: 256px;
  top: -65px;
`;

const Introduction = styled.div`
  width: 450px;
  margin-top: 25px;
  margin-bottom: 10px;
  margin-left: 25px;
  border-radius: 10px;
  color: black;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  width: 200px;
  margin-top: 10px;
  color: black;
  background: #dde6f3ff;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
`;

const ContentTitle = styled.div`
  padding-left: 10px;
  padding-top: 15px;
  font-size: 16px;
  font-weight: 600;
  color: black;
`;

const ContentParagraph = styled.div`
  color: black;
  padding-left: 15px;
  padding-bottom: 15px;
  width: 170px;
  padding-top: 10px;
  font-size: 12px;
  white-space: pre-line;
  line-height: 25px;
`;

const Analysis = styled.div`
  color: black;
  margin-left: 50px;
  margin-top: 15px;
  width: 400px;
  padding-top: 10px;
  font-size: 12px;
  white-space: pre-line;
  line-height: 25px;
`;

const Tag = styled.span`
    background: #fac3c3ff;
    border: 1px solid #e64040ff;
    color: #c01010ff;
    border-radius: 15px;
    margin-left: 5px;
    padding: 1px 5px;
    position: relative;
    top: -1px;
`;

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

const ButtonContainer = styled.div`
    display: flex;
    gap: 45px;
    padding-bottom: 50px;
    position: absolute;
    top: 500px;
    left: 890px;
`;

const YesButton = styled.button`
    all: unset;
    width: 150px;
    height: 150px;
    background: #ffffffff;
    color: #FFFFFF;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    border: 3px solid #51c257ff;
    border-radius: 100px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.1s ease;
    &:hover {
      background-color: #ecececff;
    }
    &:active {
      transform: scale(0.95);
    }
    font-size: 40px;
`;

const NoButton = styled.button`
    all: unset;
    width: 150px;
    height: 150px;
    background: #ffffffff;
    color: #FFFFFF;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    border: 3px solid #ff6a6aff;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 100px;
    transition: transform 0.1s ease;
    &:hover {
      background-color: #ecececff;
    }
    &:active {
      transform: scale(0.95);
    }
    font-size: 40px;
`;

export default function Recommendation() {
    const { token, setToken, role, setRole } = useAuth();
    const [flipped, setFlipped] = useState(false);
    const navigate = useNavigate();

    if (role === "talent") {
        
    } else if (role === "company") {
        return (
          <Container>
            <Title>🔍 인재 탐색</Title>
            <CardContainer>
              <Card role={role} flipped={flipped} onClick={() => setFlipped(!flipped)}>
                <CardFace role={role}>
                  <ProfileContainer>
                    <ProfileImage><img src={role === "company" ? talent : company} alt="Logo" width={32} height={36}></img></ProfileImage>
                    <ProfileName>김커넥</ProfileName>
                    <ProfileContent>🌠 백엔드 개발자 (경력 5년)</ProfileContent>
                    <ProfileContent>💼 FitConnect 재직 중</ProfileContent>
                  </ProfileContainer>
                  <Introduction>"안녕하세요, 백엔드 개발자입니다."</Introduction>
                  <ContentContainer>
                    <Content style={{ borderRadius: '20px 0 20px 0' }}>
                      <ContentTitle>📂 주요 경험/경력</ContentTitle>
                      <ContentParagraph>· 이런 경험이 있어요<br/>· 이런 경험이 있어요<br/>· 이런 경험이 있어요<br/>· 이런 경험이 있어요</ContentParagraph>
                    </Content>
                    <Content style={{ borderRadius: '0 20px 0 20px' }}>
                      <ContentTitle>🎯 강점</ContentTitle>
                      <ContentParagraph>· 이런 강점이 있어요<br/>· 이런 강점이 있어요<br/>· 이런 강점이 있어요<br/>· 이런 강점이 있어요</ContentParagraph>
                    </Content>
                  </ContentContainer>
                  <ContentContainer>
                    <Content style={{ borderRadius: '0 20px 0 20px' }}>
                      <ContentTitle>🚀 핵심 일반 역량</ContentTitle>
                      <ContentParagraph>· 역량1<Tag>높음</Tag><br/>· 역량2<Tag>높음</Tag><br/>· 역량3<Tag>높음</Tag><br/>· 역량4<Tag>높음</Tag></ContentParagraph>
                    </Content>
                    <Content style={{ borderRadius: '20px 0 20px 0' }}>
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
                </CardBack>
              </Card>
            </CardContainer>
            <ButtonContainer>
              <YesButton>💚</YesButton>
              <NoButton>❌</NoButton>
            </ButtonContainer>
          </Container>
        );
    }
}
