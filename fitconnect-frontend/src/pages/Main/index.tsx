import styled from "styled-components";
import image1 from '../../assets/main-1.jpg';
import logo from '../../assets/logo.png';
import talent from '../../assets/talent.png';
import company from '../../assets/company.png';


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
    top: 90px;
    left: 70px;
    color: black;
    font-size: 22px;
    font-weight: 400;
    line-height: 40px;
`;

const Title2 = styled.div`
    position: relative;
    top: 140px;
    left: 70px;
    color: black;
    font-size: 40px;
    font-weight: 600;
`;


export default function Main() {
    return (
      <Container>
        <MainBlock1>
          <Image1><img src={image1} width={1000} height={660} alt="이미지"></img></Image1>
          <Text1>나에게 ‘딱 맞는’ 채용 공고는 없을까?<br/>우리 회사에 ‘딱 맞는’ 인재는 없을까?</Text1>
          <Title1>딱 맞는 매칭,</Title1>
          <Text2>인재와 공고에 대한 <b>AI 분석 결과</b>를 바탕으로<br/>구직자와 기업 사이의 <b>완벽한 연결</b>을 만들어갑니다.</Text2>
          <Logo><img src={logo} width={200*1.2} height={55*1.2} alt="로고" ></img></Logo>
          <Talent><img src={talent} alt="인재" width={24*2} height={27*2}></img></Talent>
          <Company><img src={company} alt="기업" width={24*2} height={27*2}></img></Company>
          <Line></Line>
          <TalentTag>인재</TalentTag>
          <CompanyTag>기업</CompanyTag>
        </MainBlock1>
        <MainBlock2>
          <Text3>쏟아지는 채용 시장의 정보들···<br/>중요한 정보부터 받아보고 싶지 않나요?</Text3>
          <Title2>한 눈에 볼 수 있는, 역량 카드</Title2>
        </MainBlock2>
      </Container>
    );
}