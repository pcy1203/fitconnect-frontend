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

const FilterContainer = styled.div`
  margin-left: 85px;
  margin-bottom: 20px;
`;

const FilterInput = styled.input`
  margin-top: 8px;
  padding: 6px 8px; 
  border: 1px solid #ccc;
  background: white;
  border-radius: 5px;
  font-size: 10px;
  box-shadow: 1px 1px 3px rgba(160, 160, 160, 0.2);
  color: black;
  &:focus {
    outline: none;
    border-color: ${colors.company};
    box-shadow: 0 0 6px ${colors.company};
  }
`;

const FilterSelect = styled.select`
  padding: 5px 4px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: white;
  font-size: 10px;
  color: black;
  cursor: pointer;
  box-shadow: 1px 1px 3px rgba(160, 160, 160, 0.2);
  &:focus {
    outline: none;
    border-color: ${colors.company};
    box-shadow: 0 0 6px ${colors.company};
  }
`;

const FilterOption = styled.option`
  font-size: 10px;
  padding: 4px;
  background: white;
  color: black;
`;

const StatusSelect = styled.select`
  width: 210px;
  padding: 5px 0px;
  margin-left: 13px;
  border: 1px solid ${colors.company};
  border-radius: 10px;
  background: white;
  text-align: center;
  // background: linear-gradient(180deg, #ffffff 0%, #f4f4f4 100%);
  font-size: 13px;
  font-weight: bold;
  color: black;
  cursor: pointer;
  box-shadow: 1px 1px 3px rgba(160, 160, 160, 0.2);
  &:hover {
    box-shadow: 0 0 5px ${colors.company_light};
  }
  &:focus {
    outline: none;
    border-color: ${colors.company};
    box-shadow: 0 0 6px ${colors.company};
  }
`;

const StatusOption = styled.option`
  font-size: 12px;
  padding: 4px;
  background: white;
  color: black;
`;

const TwoButtonsWrapper = styled.div`
  width: 210px;
  margin-left: 13px;
  margin-top: 3px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Button = styled.button<{ role?: string }>`
  all: unset;
  width: 100px;
  height: 20px;
  background: #FFFFFF;
  color: #000000;
  text-align: center;
  font-size: 10px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid ${({ role }) => (role === "company" ? colors.company : colors.talent )};
  border-radius: 20px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
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

const Table = styled.div`
  width: 1000px;
  margin-top: 22px;
  margin-left: 95px;
  overflow: hidden;
  color: black;
`;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1.2fr 1.2fr;
  border-radius: 15px 15px 0 0;
  border-bottom: 2px solid #b2b2b2ff;
  background: ${colors.company_lighter};
`;

const HeaderCell = styled.div`
  padding: 14px;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  margin-top: 5px;
  border-right: 1px solid #b2b2b2ff;

  &:last-child {
    border-right: none;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1.2fr 1.2fr;
  border: 2px solid #b2b2b2ff;
  background: #ffffff;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: rgba(247, 247, 247, 1);
  }
`;

const Cell = styled.div`
  padding: 14px;
  border-right: 1px solid #b2b2b2ff;
  display: flex;
  flex-direction: column;
  gap: 6px;

  &:last-child {
    border-right: none;
  }
`;

const Name = styled.div`
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
`;

const Email = styled.div`
  font-size: 10px;
  color: #777;
  line-height: 12px;
`;

const Phone = styled.div`
  font-size: 10px;
  color: #777;
  line-height: 12px;
`;

const Company = styled.div`
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
`;

const Job = styled.div`
  font-size: 10px;
  color: #777;
  line-height: 12px;
`;

const TotalWork = styled.div`
  font-size: 10px;
  color: #777;
  line-height: 12px;
`;

const Action = styled.div`
  font-size: 10px;
  color: #4a7aff;
`;

const Tags = styled.span`
  display: inline-block;
  background: #f3f4f6;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 10px;
  margin-right: 4px;
`;

const TagWrapper = styled.div`
  color: black;
  width: 240px;
  font-size: 10px;
  background: transparent;
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  position: relative;

  // &:focus-within {
  //   border-color: #8a8a8a;
  //   box-shadow: 0 0 4px rgba(150, 150, 150, 0.2);
  // }
`;

const TagItem = styled.div`
  background: #f1f1f1;
  border: 1px solid #d0d0d0;
  padding: 4px 8px;
  height: 12px;
  border-radius: 6px;
  font-size: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const RemoveBtn = styled.span`
  cursor: pointer;
  font-weight: bold;
  color: #666;
  &:hover {
    color: #333;
  }
`;

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 10px;
  height: 20px;
  flex: 1;
  min-width: 80px;
  background-color: transparent;
  color: #333;

  &::placeholder {
    color: #999;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 48px;
  left: 0;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  background: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(150, 150, 150, 0.15);
  z-index: 5;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #bbb;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #fff;
    border: 2px solid #ccc;
    border-radius: 10px;
  }
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #f7f7f7;
  }
`;

export default function Recommendation() {
    const { token, setToken, role, setRole, loading } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!token || !role) navigate("/auth/login");
    }, [loading, token]);

    const suggestions = [];
    const [inputValue, setInputValue] = useState({});
    const [tags, setTags] = useState({});

    const getRowTags = (rowIndex) => tags[rowIndex] || [];
    const getRowInput = (rowIndex) => inputValue[rowIndex] || "";

    const filteredSuggestions = (rowIndex) => {
      const rowTags = tags[rowIndex] || [];
      const value = inputValue[rowIndex] || "";

      return suggestions.filter(
        (s) =>
          s.toLowerCase().includes(value.toLowerCase()) &&
          !rowTags.includes(s)
      );
    };

    const addTag = (rowIndex, tag) => {
      if (!tag) return;

      const rowTags = tags[rowIndex] || [];
      if (rowTags.includes(tag)) return;

      setTags({
        ...tags,
        [rowIndex]: [...rowTags, tag]
      });

      setInputValue({
        ...inputValue,
        [rowIndex]: ""
      });
    };

    const removeTag = (rowIndex, tag) => {
      const rowTags = tags[rowIndex] || [];

      setTags({
        ...tags,
        [rowIndex]: rowTags.filter((t) => t !== tag),
      });
    };

    const handleKeyDown = (e, rowIndex) => {
      const value = inputValue[rowIndex] || "";

      if (e.key === "Enter") {
        e.preventDefault();
        addTag(rowIndex, value);
      }

      if (e.key === "Backspace" && value === "" && (tags[rowIndex] || []).length > 0) {
        removeTag(rowIndex, tags[rowIndex][tags[rowIndex].length - 1]);
      }
    };

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
                      <ContentParagraph>
                        <span>· 정규직 (경력 3~5년차)<br/></span>
                        <span>· 근무 기간 : 6개월<br/></span>
                        <span>· 근무 부서 : 개발팀<br/></span>
                        <span>· 연봉 협상<br/></span>
                        </ContentParagraph>
                    </Content>
                    <Content role="company" style={{ borderRadius: '0 20px 0 20px' }}>
                      <ContentTitle>📋 주요 역할/업무</ContentTitle>
                      <ContentParagraph>
                        <span>· 이런 업무를 수행해요<br/></span>
                        <span>· 이런 업무를 수행해요<br/></span>
                        <span>· 이런 업무를 수행해요<br/></span>
                        <span>· 이런 업무를 수행해요<br/></span>
                      </ContentParagraph>
                    </Content>
                  </ContentContainer>
                  <ContentContainer>
                    <Content role="company" style={{ borderRadius: '0 20px 0 20px' }}>
                      <ContentTitle>💡 자격 요건</ContentTitle>
                      <ContentParagraph>
                        <span>· 이런 업무를 수행해요<br/></span>
                        <span>· 이런 업무를 수행해요<br/></span>
                        <span>· 이런 업무를 수행해요<br/></span>
                        <span>· 이런 업무를 수행해요<br/></span>
                      </ContentParagraph>
                    </Content>
                    <Content role="company" style={{ borderRadius: '20px 0 20px 0' }}>
                      <ContentTitle>✏️ 요구 역량</ContentTitle>
                      <ContentParagraph>
                        <span>· 이런 업무를 수행해요<br/></span>
                        <span>· 이런 업무를 수행해요<br/></span>
                        <span>· 이런 업무를 수행해요<br/></span>
                        <span>· 이런 업무를 수행해요<br/></span>
                      </ContentParagraph>
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
      const rowIndex = null;
        return (
          <Container>
            <Title>♥️ 보관한 인재</Title>
{/*             
            <TopBar>
              <SearchInput placeholder="이름 또는 이메일, 연락처로 검색" />
              <FilterButton>필터</FilterButton>
              <FilterButton>정렬: 최근 등록순</FilterButton>
              <FilterButton>컬럼 순서 변경</FilterButton>
              <FilterButton style={{ marginLeft: "auto", background: "#4a7aff", color: "white" }}>
                + 후보자 추가
              </FilterButton>
            </TopBar> */}

            {/* 탭 */}
            {/* <Tabs>
              <Tab active>전체 58</Tab>
              <Tab>신규 31</Tab>
              <Tab>스크리닝 17</Tab>
              <Tab>제안 9</Tab>
              <Tab>커피챗 진행 5</Tab>
              <Tab>너처링 3</Tab>
              <Tab>지원 완료 2</Tab>
            </Tabs> */}
            <Table>
              <HeaderRow>
                <HeaderCell>
                  후보자명<br/>
                  <FilterInput
                    style={{ marginTop: "8px", width: "85%" }}
                    placeholder="이름 검색"
                  />
                </HeaderCell>
                <HeaderCell>
                  최근 경력 (총 경력)<br/>
                  <FilterSelect
                    style={{ marginTop: "8px", width: "85%" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FilterOption value="">경력 전체</FilterOption>
                    <FilterOption value="1">1년 이상</FilterOption>
                    <FilterOption value="3">3년 이상</FilterOption>
                    <FilterOption value="5">5년 이상</FilterOption>
                    <FilterOption value="10">10년 이상</FilterOption>
                  </FilterSelect>
                </HeaderCell>
                <HeaderCell>
                  태그<br/>
                  <FilterInput
                    placeholder="태그 검색"
                    style={{ marginTop: "8px", width: "85%" }}
                  />
                </HeaderCell>
                <HeaderCell>
                  인재 관리 단계<br/>
                  <FilterSelect
                    style={{ marginTop: "8px", width: "85%" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FilterOption value="">상태 전체</FilterOption>
                    <FilterOption value="1">포지션 제안 전</FilterOption>
                    <FilterOption value="2">포지션 제안 중</FilterOption>
                    <FilterOption value="3">포지션 수락</FilterOption>
                    <FilterOption value="4">포지션 거절</FilterOption>
                    <FilterOption value="5">전형 진행 중</FilterOption>
                    <FilterOption value="6">전형 진행 완료</FilterOption>
                  </FilterSelect>
              </HeaderCell>
              </HeaderRow>
              <Row key={0}>
                <Cell>
                  <Name>박진섭</Name>
                  <Email>✉️ js.park@gmail.com</Email>
                  <Phone>📞 010-1234-5678</Phone>
                </Cell>
                <Cell>
                  <Company>삼성전자</Company>
                  <Job>🧑‍💼 Machine Learning Engineer</Job>
                  <TotalWork>💼 총 경력 1년</TotalWork>
                </Cell>
                <Cell>           
                  <Company>데이터 엔지니어</Company>
                  <div style={{borderBottom: '1px solid #ccc'}}/>  
                  <TagWrapper>
                    {getRowTags(rowIndex || 0).map((tag, i) => (
                      <TagItem key={i}>
                        {tag}
                        <RemoveBtn onClick={() => removeTag(rowIndex || 0, tag)}>×</RemoveBtn>
                      </TagItem>
                    ))}

                    <Input
                      placeholder="태그 입력..."
                      value={getRowInput(rowIndex || 0)}
                      onChange={(e) =>
                        setInputValue({
                          ...inputValue,
                          [rowIndex || 0]: e.target.value
                        })
                      }
                      onKeyDown={(e) => handleKeyDown(e, rowIndex || 0)}
                    />

                    {getRowInput(rowIndex || 0).length > 0 &&
                      filteredSuggestions(rowIndex || 0).length > 0 && (
                        <Dropdown>
                          {filteredSuggestions(rowIndex || 0).map((s, i) => (
                            <DropdownItem key={i} onClick={() => addTag(rowIndex || 0, s)}>
                              {s}
                            </DropdownItem>
                          ))}
                        </Dropdown>
                      )}
                  </TagWrapper>
                </Cell>
                <Cell>
                  <StatusSelect onClick={(e) => {e.stopPropagation();}}>
                    <StatusOption value="1">포지션 제안 전</StatusOption>
                    <StatusOption value="2">포지션 제안 중</StatusOption>
                    <StatusOption value="3">포지션 수락</StatusOption>
                    <StatusOption value="4">포지션 거절</StatusOption>
                    <StatusOption value="5">전형 진행 중</StatusOption>
                    <StatusOption value="6">전형 진행 완료</StatusOption>
                  </StatusSelect>
                  <TwoButtonsWrapper>
                    <Button role="company" onClick={(e) => {e.stopPropagation();}}><span>✉️ 메일 보내기</span></Button>
                    <Button role="company" onClick={(e) => {e.stopPropagation();}}><span>✖️ 삭제하기</span></Button>
                  </TwoButtonsWrapper>
                </Cell>
              </Row>

              <Row key={1}>
                <Cell>
                  <Name>하나래</Name>
                  <Email>✉️ nr.ha@gmail.com</Email>
                  <Phone>📞 010-1234-5678</Phone>
                </Cell>
                <Cell>
                  <Company>카카오뱅크</Company>
                  <Job>🧑‍💼 Machine Learning Engineer</Job>
                  <TotalWork>💼 총 경력 1년</TotalWork>
                </Cell>
                <Cell>      
                  <Company>데이터 엔지니어</Company>
                  <div style={{borderBottom: '1px solid #ccc'}}/>                   <TagWrapper>
                  {getRowTags(rowIndex || 1).map((tag, i) => (
                    <TagItem key={i}>
                      {tag}
                      <RemoveBtn onClick={() => removeTag(rowIndex || 1, tag)}>×</RemoveBtn>
                    </TagItem>
                  ))}

                  <Input
                    placeholder="태그 입력..."
                    value={getRowInput(rowIndex || 1)}
                    onChange={(e) =>
                      setInputValue({
                        ...inputValue,
                        [rowIndex || 1]: e.target.value
                      })
                    }
                    onKeyDown={(e) => handleKeyDown(e, rowIndex || 1)}
                  />

                  {getRowInput(rowIndex || 1).length > 0 &&
                    filteredSuggestions(rowIndex || 1).length > 0 && (
                      <Dropdown>
                        {filteredSuggestions(rowIndex || 1).map((s, i) => (
                          <DropdownItem key={i} onClick={() => addTag(rowIndex || 1, s)}>
                            {s}
                          </DropdownItem>
                        ))}
                      </Dropdown>
                    )}
                </TagWrapper>
                </Cell>
                <Cell>
                  <StatusSelect onClick={(e) => {e.stopPropagation();}}>
                    <StatusOption value="1">포지션 제안 전</StatusOption>
                    <StatusOption value="2">포지션 제안 중</StatusOption>
                    <StatusOption value="3">포지션 수락</StatusOption>
                    <StatusOption value="4">포지션 거절</StatusOption>
                    <StatusOption value="5">전형 진행 중</StatusOption>
                    <StatusOption value="6">전형 진행 완료</StatusOption>
                  </StatusSelect>
                  <TwoButtonsWrapper>
                    <Button role="company" onClick={(e) => {e.stopPropagation();}}><span>✉️ 메일 보내기</span></Button>
                    <Button role="company" onClick={(e) => {e.stopPropagation();}}><span>✖️ 삭제하기</span></Button>
                  </TwoButtonsWrapper>
                </Cell>
              </Row>
            </Table>
            {/* <CardContainer>
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
                      <ContentParagraph>
                        <span>· 이런 경험이 있어요<br/></span>
                        <span>· 이런 경험이 있어요<br/></span>
                        <span>· 이런 경험이 있어요<br/></span>
                        <span>· 이런 경험이 있어요<br/></span>
                      </ContentParagraph>
                    </Content>
                    <Content role="talent" style={{ borderRadius: '0 20px 0 20px' }}>
                      <ContentTitle>🎯 강점</ContentTitle>
                      <ContentParagraph>
                        <span>· 이런 경험이 있어요<br/></span>
                        <span>· 이런 경험이 있어요<br/></span>
                        <span>· 이런 경험이 있어요<br/></span>
                        <span>· 이런 경험이 있어요<br/></span>
                      </ContentParagraph>
                    </Content>
                  </ContentContainer>
                  <ContentContainer>
                    <Content role="talent" style={{ borderRadius: '0 20px 0 20px' }}>
                      <ContentTitle>🚀 핵심 일반 역량</ContentTitle>
                      <ContentParagraph>
                        <span>· 이런 경험이 있어요 <Tag>매우 우수</Tag><br/></span>
                        <span>· 이런 경험이 있어요 <Tag>우수</Tag><br/></span>
                        <span>· 이런 경험이 있어요 <Tag>우수</Tag><br/></span>
                        <span>· 이런 경험이 있어요 <Tag>보통</Tag><br/></span>
                      </ContentParagraph>
                    </Content>
                    <Content role="talent" style={{ borderRadius: '20px 0 20px 0' }}>
                      <ContentTitle>✏️ 핵심 직무 역량/기술</ContentTitle>
                      <ContentParagraph>
                        <span>· 이런 경험이 있어요 <Tag>매우 우수</Tag><br/></span>
                        <span>· 이런 경험이 있어요 <Tag>우수</Tag><br/></span>
                        <span>· 이런 경험이 있어요 <Tag>우수</Tag><br/></span>
                        <span>· 이런 경험이 있어요 <Tag>보통</Tag><br/></span>
                      </ContentParagraph>
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
                  <LikeContent>· 경력 3~5년차  |  직무 수행
                    <StatusSelect onClick={(e) => {e.stopPropagation();}}>
                      <StatusOption value="1">포지션 제안 전</StatusOption>
                      <StatusOption value="2">포지션 제안 중</StatusOption>
                      <StatusOption value="3">포지션 수락</StatusOption>
                      <StatusOption value="4">포지션 거절</StatusOption>
                      <StatusOption value="5">전형 진행 중</StatusOption>
                      <StatusOption value="6">전형 진행 완료</StatusOption>
                    </StatusSelect>
                  </LikeContent>
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
            </LikeContainer> */}
          </Container>
        );
    }
}
