import styled from "styled-components";
import { Link } from "react-router-dom";
import image1 from '../../assets/main-1.jpg';
import image2 from '../../assets/main-2.jpg';
import logo from '../../assets/logo.png';
import logoTransparent from '../../assets/logo-transparent.png';
import talent from '../../assets/talent.png';
import company from '../../assets/company.png';
import colors from "../../styles/colors";

import { CardContainer, Card, CardFace, CardBack, ProfileContainer, ProfileImage, ProfileName, ProfileContent,
  Introduction, ContentContainer, Content, ContentTitle, ContentParagraph, Analysis, Tag} from "../../components/CardMain";

const Container = styled.div`
    width: 1200px;
    min-height: calc(100vh - 80px);
    margin-left: calc(50vw - 600px);
`;

const MainBlock1 = styled.div`
    width: 100%;
    height: 660px;
    background: #F2F6FA;
`;

const Image1 = styled.div`
    width: 60%;
    margin-left: 40%;
    height: 660px;
    overflow: hidden;
    & > img {
        -webkit-mask-image: linear-gradient(
            to right,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 1) 50%,
            rgba(0, 0, 0, 0.3) 100%
        );
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 100% 100%;
        mask-image: linear-gradient(
            to right,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 1) 50%,
            rgba(0, 0, 0, 0.3) 100%
        );
        mask-repeat: no-repeat;
        mask-size: 100% 100%;
    }
`;

const Text1 = styled.div`
    position: relative;
    top: -580px;
    left: 70px;
    color: black;
    font-size: 22px;
    font-weight: 300;
    line-height: 40px;
`;

const Title1 = styled.div`
    position: relative;
    top: -530px;
    left: 70px;
    color: black;
    font-size: 40px;
    font-weight: 600;
`;

const Text2 = styled.div`
    position: relative;
    top: -470px;
    left: 70px;
    color: black;
    font-size: 22px;
    font-weight: 400;
    line-height: 40px;
`;

const Logo = styled.div`
    position: relative;
    top: -673px;
    left: 300px;
    width: 250px;
    height: 80px;
`;

const Talent = styled.div`
    position: relative;
    top: -490px;
    left: 70px;
    width: 250px;
    height: 80px;
`;

const Company = styled.div`
    position: relative;
    top: -570px;
    left: 400px;
    width: 250px;
    height: 80px;
`;

const Line = styled.hr`
    color: black;
    border: 1px solid black;
    position: relative;
    top: -630px;
    left: -340px;
    width: 250px;
`;

const TalentTag = styled.div`
    color: black;
    position: relative;
    top: -600px;
    left: 76px;
    height: 30px;
    font-size: 20px;
    font-weight: 600;
`;

const CompanyTag = styled.div`
    color: black;
    position: relative;
    top: -630px;
    left: 406px;
    width: 250px;
    height: 30px;
    font-size: 20px;
    font-weight: 600;
`;

const MainBlock2 = styled.div`
    width: 100%;
    height: 660px;
    background: linear-gradient(to bottom, rgba(135, 178, 255, 0.6), rgba(255, 173, 150, 0.6));
`;

const Text3 = styled.div`
    position: relative;
    top: 130px;
    left: 70px;
    color: black;
    font-size: 22px;
    font-weight: 400;
    line-height: 40px;
`;

const Title2 = styled.div`
    position: relative;
    top: 180px;
    left: 70px;
    color: black;
    font-size: 40px;
    font-weight: 600;
`;

const Text4 = styled.div`
    position: relative;
    top: 250px;
    left: 70px;
    color: black;
    font-size: 22px;
    font-weight: 400;
    line-height: 40px;
`;

const MainBlock3 = styled.div`
  width: 100%;
  height: 660px;
  position: relative;
`;

const Image2 = styled.div`
    width: 100%;
    height: 660px;
    overflow: hidden;
    position: absolute;
    & > img {
        display: block;
        opacity: 0.35;
    }
`;

const Title3 = styled.div`
  text-align: center;
  padding-top: 100px;
  font-size: 30px;
  font-weight: 700;
  color: #000000ff;
  margin-bottom: 60px;
  position: relative;
`;

const FlowContainer = styled.div`
  width: 1060px;
  margin: 0 auto;
  position: relative;
`;

const FlowRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 40px;
  position: relative;
`;

const RoleTag = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  color: white;
  font-weight: 600;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const StepsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StepItem = styled.div`
  background: ${(props) => props.color}20;
  border: 2px solid ${(props) => props.color};
  border-radius: 20px;
  padding: 10px 16px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  position: relative;
  display: flex;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); 
`;

const DotLine = styled.div`
  width: 35px;
  height: 2px;
  background: repeating-linear-gradient(
    to right,
    ${(props) => props.color},
    ${(props) => props.color} 6px,
    transparent 6px,
    transparent 9px
  );
  margin: 0 10px;
`;

const HalfCircle = styled.div`
  position: relative;
  left: 885px;
  top: -200px;
  width: 60px;
  height: 120px;
  border-top-right-radius: 53px;
  border-bottom-right-radius: 53px;
  border: 2px dashed #b388eb;
  border-left: none;
  background: transparent;
  margin: 0 10px;
`;

const MatchTag = styled.div`
  position: absolute;
  top: 60px;
  left: 980px;
  width: 80px;
  height: 80px;
  background: #b388eb;
  color: white;
  font-size: 18px;
  font-weight: 600;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubText = styled.div`
  width: 100%;
  color: #000;
  text-align: center;
  font-size: 22px;
  line-height: 40px;
  position: relative;
  top: -120px;
`;

const MainBlock4 = styled.div`
  width: 100%;
  height: 1040px;
  position: relative;
  background: #F7F8FA;
`;

const Title4 = styled.div`
  text-align: center;
  padding-top: 100px;
  font-size: 30px;
  font-weight: 700;
  color: #000000ff;
  margin-bottom: 60px;
  position: relative;
`;

const SearchButton = styled.button`
    all: unset;
    margin-top: 700px;
    margin-left: 400px;
    width: 400px;
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

export default function Main() {
    return (
      <Container>
        <MainBlock1>
          <Image1><img src={image1} width={1000} height={660} alt="이미지"></img></Image1>
          <Text1>나에게 ‘딱 맞는’ 채용 공고는 없을까?<br/>우리 회사에 ‘딱 맞는’ 인재는 없을까?</Text1>
          <Title1>딱 맞는 매칭,</Title1>
          <Text2>인재와 공고에 대한 <b>AI 분석 결과</b>를 바탕으로<br/>구직자와 기업 사이의 <b>완벽한 연결</b>을 만들어갑니다.</Text2>
          <Logo><img src={logoTransparent} width={200*1.2} height={55*1.2} alt="로고" ></img></Logo>
          <Talent><img src={talent} alt="인재" width={24*2} height={27*2}></img></Talent>
          <Company><img src={company} alt="기업" width={24*2} height={27*2}></img></Company>
          <Line></Line>
          <TalentTag>인재</TalentTag>
          <CompanyTag>기업</CompanyTag>
        </MainBlock1>
        <MainBlock2>
          <Text3>쏟아지는 채용 시장의 정보들···<br/>중요한 정보부터 받아보고 싶지 않나요?</Text3>
          <Title2>한 눈에 볼 수 있는, 역량 카드</Title2>
          <Text4>지원자가 가진 역량 · 기업이 원하는 인재의 모습,<br/>AI가 <b>간단한 인터뷰</b>를 통해 분석하여 정리해드려요!<br/>만들어진 역량 카드를 기반으로 <b>최적의 매칭</b>도 지원해요.</Text4>
          
              <Card style={{ position: 'relative', top: '-300px', left: '500px', transform: 'scale(0.6) rotate(-3deg)', transformOrigin: "center center" }}>
                <CardFace>
                  <ProfileContainer>
                    <ProfileImage><img src={talent} alt="Logo" width={32} height={36}></img></ProfileImage>
                    <ProfileName>김커넥</ProfileName>
                    <ProfileContent>🌠 백엔드 개발자 (경력 5년)</ProfileContent>
                    <ProfileContent>💼 FitConnect 재직 중</ProfileContent>
                  </ProfileContainer>
                  <Introduction>"안녕하세요, 백엔드 개발자입니다."</Introduction>
                  <ContentContainer>
                    <Content role={"talent"} style={{ borderRadius: '20px 0 20px 0' }}>
                      <ContentTitle>📂 주요 경험/경력</ContentTitle>
                      <ContentParagraph>· 이런 경험이 있어요<br/>· 이런 경험이 있어요<br/>· 이런 경험이 있어요<br/>· 이런 경험이 있어요</ContentParagraph>
                    </Content>
                    <Content role={"talent"} style={{ borderRadius: '0 20px 0 20px' }}>
                      <ContentTitle>🎯 강점</ContentTitle>
                      <ContentParagraph>· 이런 강점이 있어요<br/>· 이런 강점이 있어요<br/>· 이런 강점이 있어요<br/>· 이런 강점이 있어요</ContentParagraph>
                    </Content>
                  </ContentContainer>
                  <ContentContainer>
                    <Content role={"talent"} style={{ borderRadius: '0 20px 0 20px' }}>
                      <ContentTitle>🚀 핵심 일반 역량</ContentTitle>
                      <ContentParagraph>· 역량1<Tag>높음</Tag><br/>· 역량2<Tag>높음</Tag><br/>· 역량3<Tag>높음</Tag><br/>· 역량4<Tag>높음</Tag></ContentParagraph>
                    </Content>
                    <Content role={"talent"} style={{ borderRadius: '20px 0 20px 0' }}>
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
              </Card>
              <Card role={"company"} style={{ position: 'relative', top: '-840px', left: '700px', transform: 'scale(0.6) rotate(4deg)', transformOrigin: "center center" }}>
                <CardFace role={"company"}>
                  <ProfileContainer role={"company"}>
                    <ProfileImage><img src={company} alt="Logo" width={32} height={36}></img></ProfileImage>
                    <ProfileName>김커넥</ProfileName>
                    <ProfileContent>🌠 백엔드 개발자</ProfileContent>
                    <ProfileContent>🗓️ 2025.10.04 마감</ProfileContent>
                  </ProfileContainer>
                  <Introduction>"백엔드 개발자를 찾습니다."</Introduction>
                  <ContentContainer>
                    <Content role={"company"} style={{ borderRadius: '20px 0 20px 0' }}>
                      <ContentTitle>📜 공고 정보</ContentTitle>
                      <ContentParagraph>· 정규직 (경력 3~5년차)<br/>· 근무 기간 : 6개월<br/>· 근무 부서 : 개발팀<br/>· 연봉 협상</ContentParagraph>
                    </Content>
                    <Content role={"company"} style={{ borderRadius: '0 20px 0 20px' }}>
                      <ContentTitle>📋 주요 역할/업무</ContentTitle>
                      <ContentParagraph>· 이런 업무를 수행해요<br/>· 이런 업무를 수행해요<br/>· 이런 업무를 수행해요<br/>· 이런 업무를 수행해요</ContentParagraph>
                    </Content>
                  </ContentContainer>
                  <ContentContainer>
                    <Content role={"company"} style={{ borderRadius: '0 20px 0 20px' }}>
                      <ContentTitle>💡 자격 요건</ContentTitle>
                      <ContentParagraph>· 이런 것을 요구해요<br/>· 이런 것을 요구해요<br/>· 이런 것을 요구해요<br/>· 이런 것을 요구해요</ContentParagraph>
                    </Content>
                    <Content role={"company"} style={{ borderRadius: '20px 0 20px 0' }}>
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
              </Card>
        </MainBlock2>
        <MainBlock3>
          <Image2><img src={image2} width={1200} height={660} alt="이미지"></img></Image2>
          <Title3>역량 카드 등록하고, 탐색하고, 연결되기!</Title3>
            <FlowContainer>
                <FlowRow>
                    <RoleTag color={colors.talent}>인재</RoleTag>
                    <StepsContainer>
                        <StepItem color={colors.talent}>📄 프로필 입력<br/>(인재)</StepItem><DotLine color={colors.talent}></DotLine>
                        <StepItem color={colors.talent}>🎤 AI 역량 분석<br/>인터뷰</StepItem><DotLine color={colors.talent}></DotLine>
                        <StepItem color={colors.talent}>💼 공고 탐색/추천</StepItem><DotLine color={colors.talent}></DotLine>
                        <StepItem color={colors.talent}>💙 보관/피드백</StepItem>
                    </StepsContainer>
                </FlowRow>
                <FlowRow>
                    <RoleTag color={colors.company}>기업</RoleTag>
                    <StepsContainer>
                        <StepItem color={colors.company}>📄 프로필 입력<br/>(기업 & 공고)</StepItem><DotLine color={colors.company}></DotLine>
                        <StepItem color={colors.company}>🎤 AI 공고 분석<br/>인터뷰</StepItem><DotLine color={colors.company}></DotLine>
                        <StepItem color={colors.company}>👤 인재 탐색/추천</StepItem><DotLine color={colors.company}></DotLine>
                        <StepItem color={colors.company}>❤️ 보관/피드백</StepItem>
                    </StepsContainer>
                </FlowRow>
                <HalfCircle></HalfCircle>
                <MatchTag>매칭</MatchTag>
                <SubText>✔️ <b>3단계 AI 인터뷰</b>를 바탕으로 역량/공고를 자세하게 분석<br/>✔️ 입력한 프로필과 인터뷰 결과를 바탕으로 <b>최적화된 공고/인재 추천</b><br/>✔️ 피드백을 바탕으로 지속적인 <b>매칭 시스템 개선</b></SubText>
            </FlowContainer>
        </MainBlock3>
        <MainBlock4>
          <Title4>추천 공고/인재 확인하기</Title4>
          <CardContainer>
              <Card role={"company"} style={{ position: 'absolute', left: '60px' }}>
                <CardFace role={"company"}>
                  <ProfileContainer role={"company"}>
                    <ProfileImage><img src={company} alt="Logo" width={32} height={36}></img></ProfileImage>
                    <ProfileName>김커넥</ProfileName>
                    <ProfileContent>🌠 백엔드 개발자</ProfileContent>
                    <ProfileContent>🗓️ 2025.10.04 마감</ProfileContent>
                  </ProfileContainer>
                  <Introduction>"백엔드 개발자를 찾습니다."</Introduction>
                  <ContentContainer>
                    <Content role={"company"} style={{ borderRadius: '20px 0 20px 0' }}>
                      <ContentTitle>📜 공고 정보</ContentTitle>
                      <ContentParagraph>· 정규직 (경력 3~5년차)<br/>· 근무 기간 : 6개월<br/>· 근무 부서 : 개발팀<br/>· 연봉 협상</ContentParagraph>
                    </Content>
                    <Content role={"company"} style={{ borderRadius: '0 20px 0 20px' }}>
                      <ContentTitle>📋 주요 역할/업무</ContentTitle>
                      <ContentParagraph>· 이런 업무를 수행해요<br/>· 이런 업무를 수행해요<br/>· 이런 업무를 수행해요<br/>· 이런 업무를 수행해요</ContentParagraph>
                    </Content>
                  </ContentContainer>
                  <ContentContainer>
                    <Content role={"company"} style={{ borderRadius: '0 20px 0 20px' }}>
                      <ContentTitle>💡 자격 요건</ContentTitle>
                      <ContentParagraph>· 이런 것을 요구해요<br/>· 이런 것을 요구해요<br/>· 이런 것을 요구해요<br/>· 이런 것을 요구해요</ContentParagraph>
                    </Content>
                    <Content role={"company"} style={{ borderRadius: '20px 0 20px 0' }}>
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
              </Card>
              
              <Card role={"talent"} style={{ position: 'absolute', left: '620px' }}>
                <CardFace>
                  <ProfileContainer>
                    <ProfileImage><img src={talent} alt="Logo" width={32} height={36}></img></ProfileImage>
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
                <CardBack>
                </CardBack>
              </Card>
            </CardContainer>
            <Link to="/search/recommendation"><SearchButton>맞춤형 추천 받으러 가기</SearchButton></Link>
        </MainBlock4>
      </Container>
    );
}