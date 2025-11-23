import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useAuth } from "../../components/AuthContext";
import Hexagon from "../../components/Hexagon";
import colors from "../../styles/colors";
import axios from "axios";
import talent from '../../assets/talent.png';
import company from '../../assets/company.png';
import arrowCompany from '../../assets/arrow-company.png';
import { baseURL, aiURL } from "../../env";

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

// const LikeContainer = styled.div`
//   position: relative;
//   top: -688px;
//   left: 660px;
//   width: 410px;
//   height: 1px;
// `;

// const LikeRegion = styled.div<{ role?: string }>`
//   height: 620px;
//   overflow-y: scroll;

//     &::-webkit-scrollbar {
//         width: 12px;
//     }

//     &::-webkit-scrollbar-thumb {
//         background-color: #bbb;
//         border-radius: 10px;
//     }

//     &::-webkit-scrollbar-track {
//         background-color: #ffffffff;
//         border-radius: 10px;
//         border: 2px solid #cccccc;
//     }

//     &::-webkit-scrollbar-thumb:hover {
//         background-color: #ddd;
//     }
// `;

// const Like = styled.div`
//   width: 360px;
//   height: 100px;
//   margin-top: 15px;
//   margin-bottom: 15px;
//   margin-left: 5px;
//   background: rgba(255, 255, 255, 1);
//   border: 2px solid #b2b2b2ff;
//   border-radius: 5px;
//   box-shadow: 1px 1px 1px rgba(171, 171, 171, 0.2);
//   transition: transform 0.1s ease;
//   &:hover {
//     background: rgba(247, 247, 247, 1);
//   }
//   &:hover button {
//     visibility: visible;
//   }
//   &:active {
//     transform: scale(0.98);
//   }
// `;

// const LikeImage = styled.div`
//   margin-left: 15px;
//   margin-top: 15px;
//   width: 30px;
// `;

// const LikeTitle = styled.div`
//   width: 300px;
//   font-size: 14px;
//   font-weight: 600;
//   color: #242424ff;
//   position: relative;
//   top: -25px;
//   left: 41px;
// `;

// const LikeContent = styled.div`
//   width: 320px;
//   font-size: 12px;
//   color: #242424ff;
//   position: relative;
//   top: -42px;
//   left: 20px;
//   line-height: 22px;
// `;

// const LikeButton = styled.button<{ role?: string }>`
//   all: unset;
//   visibility: hidden;
//   width: 50px;
//   height: 22px;
//   text-align: center;
//   position: relative;
//   cursor: pointer;
//   font-size: 14px;
//   top: -48px;
//   left: 290px;
//   background: ${({ role }) => (role === "company" ? colors.company : colors.talent )};
//   border: 2px solid #b2b2b2ff;
//   box-shadow: 1px 1px 1px rgba(171, 171, 171, 0.2);
//   transition: transform 0.1s ease;
//   &:hover {
//     font-weight: 600;
//   }
//   &:active {
//     transform: scale(0.95);
//   }
// `;

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

const FilterInput = styled.input<{ role?: string }>`
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
    border-color: ${({ role }) => (role === "company" ? colors.company : colors.talent )};
    box-shadow: 0 0 6px ${({ role }) => (role === "company" ? colors.company : colors.talent )};
  }
`;

const FilterSelect = styled.select<{ role?: string }>`
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
    border-color: ${({ role }) => (role === "company" ? colors.company : colors.talent )};
    box-shadow: 0 0 6px ${({ role }) => (role === "company" ? colors.company : colors.talent )};
  }
`;

const FilterOption = styled.option`
  font-size: 10px;
  padding: 4px;
  background: white;
  color: black;
`;

const StatusSelect = styled.select<{ role?: string }>`
  width: 210px;
  padding: 5px 0px;
  margin-left: 13px;
  border: 1px solid ${({ role }) => (role === "talent" ? colors.talent : colors.company )};
  border-radius: 10px;
  background: white;
  text-align: center;
  font-size: 13px;
  font-weight: bold;
  color: black;
  cursor: pointer;
  box-shadow: 1px 1px 3px rgba(160, 160, 160, 0.2);
  &:hover {
    box-shadow: 0 0 5px ${({ role }) => (role === "talent" ? colors.talent_light : colors.company_light )};
  }
  &:focus {
    outline: none;
    border-color: ${({ role }) => (role === "talent" ? colors.talent : colors.company )};
    box-shadow: 0 0 6px ${({ role }) => (role === "talent" ? colors.talent : colors.company )};
  }
`;

const StatusOption = styled.option`
  font-size: 12px;
  padding: 4px;
  background: white;
  color: black;
`;

const ButtonContainer = styled.div`
  width: 400px;
  top: -370px;
  height: 1px;
  position: relative;
  left: 680px;
`;

const TwoButtonsWrapper = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
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
  margin-bottom: 20px;
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

const Line = styled.hr`
  color: black;
`;

const PoolButtonsWrapper = styled.div`
  width: 210px;
  margin-left: 13px;
  margin-top: 3px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const PoolButton = styled.button<{ role?: string }>`
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

const CloseCardButton = styled.button<{ role?: string }>`
  all: unset;
  position: relative;
  top: -772px;
  left: 100px;
  width: 200px;
  height: 40px;
  background: #FFFFFF;
  color: black;
  // color: ${({ role }) => (role === "company" ? colors.company : colors.talent )};
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  border: 2px solid #b2b2b2ff;
  // border: 1px solid ${({ role }) => (role === "company" ? colors.company : colors.talent )};
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
  margin-top: 15px;
  margin-left: 95px;
  color: black;
`;

const HeaderRow = styled.div<{ role?: string }>`
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr 1.2fr;
  border-radius: 15px 15px 0 0;
  border-bottom: 2px solid #b2b2b2ff;
  background: ${({ role }) => (role === "talent" ? colors.talent_lighter : colors.company_lighter )};
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
  grid-template-columns: 1fr 1.2fr 1fr 1.2fr;
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
  font-size: 15px;
  line-height: 20px;
`;

const Email = styled.div`
  font-size: 10px;
  color: #777;
  line-height: 13px;
`;

const Phone = styled.div`
  font-size: 10px;
  color: #777;
  line-height: 13px;
`;

const Company = styled.div`
  font-weight: bold;
  font-size: 15px;
  line-height: 20px;
`;

const Job = styled.div`
  font-size: 10px;
  color: #777;
  line-height: 13px;
`;

const TotalWork = styled.div`
  font-size: 10px;
  color: #777;
  line-height: 13px;
`;

const TagWrapper = styled.div`
  color: black;
  width: 195px;
  font-size: 10px;
  background: transparent;
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  position: relative;
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

const Paragraph = styled.div`
  width: 1000px;
  color: black;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 10px;
  padding: 0px 100px 0px 100px;
`;


const SelectContainer = styled.div`
    margin-left: 285px;
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    margin-top: 45px;
`;

const Select = styled.div`
    width: 300px;
    height: 350px;
    background: #FFFFFF;
    border: 1px solid #9E9E9E;
    border-radius: 20px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    &:hover {
      background-color: #EFEFEF;
    }
    &:active {
      transform: scale(0.95);
    }
    & > div:first-child {
      margin-left: 110px;
      margin-top: 45px;
      font-size: 60px;
    }
`;

const SelectName = styled.div`
    color: #000;
    font-size: 20px;
    width: 300px;
    text-align: center;
    margin-top: 20px;
    & > p {
      font-size: 13px;
      line-height: 30px;
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

const BalloonButton = styled.div`
    position: absolute;
    top: -40px;
    margin-left: 230px;
    background-color: #ffffff;
    border: 2px solid #b2b2b2;
    border-radius: 20px;
    padding: 8px 16px;
    font-size: 18px;
    font-weight: 500;
    color: #333;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    transition: all 0.2s ease;
    
    &::before {
        content: "";
        position: absolute;
        top: 60px;
        left: 20px;
        transform: translateY(-50%);
        width: 10px;
        height: 10px;
        background-color: #ffffff;
        border: 2px solid #b2b2b2;
        border-radius: 50%;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }

    &::after {
        content: "";
        position: absolute;
        top: 80px;
        left: 5px;
        transform: translateY(-50%);
        width: 8px;
        height: 8px;
        background-color: #ffffff;
        border: 2px solid #b2b2b2;
        border-radius: 50%;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }

    &:hover {
      background-color: #f8f8f8;
      transform: translateY(-2px);
    }
`;


const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopupContainer = styled.div`
  width: 600px;
  height: 500px;
  background: #ffffff;
  border-radius: 16px;
  padding: 30px 40px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.3);
  animation: fadeIn 0.3s ease;
  position: relative;
`;

const PopupScrollArea = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-right: 20px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const PopupTitle = styled.h3`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 30px;
  color: black;
`;

const PopupParagraph = styled.div`
  width: 400px;
  color: black;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 10px;
  padding: 0px 100px 0px 100px;
`;

const PopupTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  color: black;
  th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
    vertical-align: top;
  }
  th {
    width: 25%;
    background: #f5f5f5;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    line-height: 16px;
    vertical-align: middle;
  }
`;

const MatchingTag = styled.div`
  color: black;
  width: 100px;
  margin-top: 10px;
  margin-left: 9px;
  text-align: center;
  font-size: 10px;
  background-color: ${colors.company_lighter};
  border: 1px solid ${colors.company};
  border-radius: 50px;
  padding: 5px;
  font-weight: 400;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 40px;
  border: none;
  background: none;
  font-size: 25px;
  cursor: pointer;
  color: #666;
  &:hover {
    color: #000;
  }
`;

const MatchedTag = styled.span<{ role?: string }>`
  font-size: 10px;
  font-weight: 400;
  color: #ffffff;
  margin-left: 6px;
  padding: 2px 12px;
  background-color: ${({ role }) => (role === "talent" ? colors.talent : colors.company )};
  border-radius: 50px;
  position: relative;
  top: -2px;
`;

const Memo = styled.textarea<{ role?: string }>`
  font-size: 12px;
  font-family: 'Noto Sans KR', sans-serif;
  padding: 10px;
  width: 375px;
  height: 135px;
  margin-top: 10px;
  background-color: #ffffff;
  color: black;
  border: 2px solid ${colors.company};
  border-radius: 8px;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div<{ role?: string }>`
  width: 60px;
  height: 60px;
  margin-left: 265px;
  margin-top: 30px;
  margin-bottom: 50px;
  border: 10px solid #d1d5db;
  border-top: 10px solid ${({ role }) => (role === "company" ? colors.company : colors.talent )};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const formatYearMonth = (dateStr: string) => {
  if (!dateStr) return "";
  return dateStr.slice(0, 7).replace("-", ".");
};

// const mockData = [
//   {
//     id: 1,
//     name: "박진섭",
//     email: "js.park@gmail.com",
//     phone: "010-1234-5678",
//     company: "삼성전자",
//     job: "Machine Learning Engineer",
//     totalWork: 1,
//     position: "데이터 엔지니어",
//     tags: ["Python", "ML"],
//     date: "2025.12.31",
//     work: "정규직",
//     status: 1,
//     isMatched: true,
//   },
//   {
//     id: 2,
//     name: "하나래",
//     email: "nr.ha@gmail.com",
//     phone: "010-1234-5678",
//     company: "카카오뱅크",
//     job: "Machine Learning Engineer",
//     totalWork: 1,
//     position: "데이터 엔지니어",
//     tags: ["Data", "SQL"],
//     date: "2025.12.31",
//     work: "정규직",
//     status: 2,
//     isMatched: false,
//   },
//   {
//     id: 3,
//     name: "김지후",
//     email: "jh.kim@gmail.com",
//     phone: "010-2345-6789",
//     company: "네이버",
//     job: "Backend Engineer",
//     totalWork: 3,
//     position: "서버 개발자",
//     tags: ["Java", "Spring"],
//     date: "2025.12.31",
//     work: "정규직",
//     status: 4,
//     isMatched: false,
//   },
//   {
//     id: 4,
//     name: "이서현",
//     email: "sh.lee@gmail.com",
//     phone: "010-3456-7890",
//     company: "라인플러스",
//     job: "Android Developer",
//     totalWork: 5,
//     position: "모바일 개발자",
//     tags: ["Kotlin", "Android"],
//     date: "2025.12.31",
//     work: "정규직",
//     status: 3,
//     isMatched: false,
//   },
//   {
//     id: 5,
//     name: "최유진",
//     email: "yj.choi@gmail.com",
//     phone: "010-4567-8901",
//     company: "쿠팡",
//     job: "Data Scientist",
//     totalWork: 7,
//     position: "데이터 사이언티스트",
//     tags: ["Python", "Pandas", "ML"],
//     date: "2025.12.31",
//     work: "정규직",
//     status: 5,
//     isMatched: false,
//   },
//   {
//     id: 6,
//     name: "정민우",
//     email: "mw.jung@gmail.com",
//     phone: "010-5678-9012",
//     company: "배민",
//     job: "Frontend Engineer",
//     totalWork: 2,
//     position: "프론트엔드 개발자",
//     tags: ["React", "TypeScript"],
//     date: "2025.12.31",
//     work: "정규직",
//     status: 6,
//     isMatched: false,
//   },
//   {
//     id: 7,
//     name: "오세아",
//     email: "sa.oh@gmail.com",
//     phone: "010-6789-0123",
//     company: "토스",
//     job: "Product Manager",
//     totalWork: 10,
//     position: "PM",
//     tags: ["Product", "UX", "Business"],
//     date: "2025.12.31",
//     work: "정규직",
//     status: 2,
//     isMatched: false,
//   },
// ];

export default function Recommendation() {
    const { token, setToken, role, setRole, loading, profileName } = useAuth();
    const navigate = useNavigate();
    const location = window.location;
    const [idx, setIdx] = useState(null);
    const queryJobId = new URLSearchParams(location.search).get("job");
    const likeType = new URLSearchParams(location.search).get("type");

    const [jobList, setJobList] = useState(null);
    const [likeList, setLikeList] = useState([]);
    const [likeListChanged, setLikeListChanged] = useState(false);
    const [rows, setRows] = useState(null);
        
    const [data, setData] = useState(null);
    const [cardData, setCardData] = useState(null);
    const [matchingData, setMatchingData] = useState(null);
    const [jobTitle, setJobTitle] = useState("");
    const [companyData, setCompanyData] = useState(null);
    const [scores, setScores] = useState({roles: 0, growth: 0, career: 0, culture: 0, vision: 0, skills: 0});

    const [isCardVisible, setIsCardVisible] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [xaiData, setXaiData] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);

    useEffect(() => {
        if (!token || !role) navigate("/auth/login");
    }, [loading, token]);
    
    // Query
    const handleSelect = (type: string) => {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("type", type);
      navigate(`${location.pathname}?${searchParams.toString()}`);
    };

    const submitJobId = (id) => {
      const params = new URLSearchParams(location.search);
      params.set("job", id);
      navigate(`${location.pathname}?${params.toString()}`);
    }


    
    // Like Data
    useEffect(() => {
      if (role === 'company' && !queryJobId) {
        // ================= [Company] Select Job Id =================
        axios.get(`${baseURL}/api/me/company/job-postings`, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setJobList(response.data.data);
        })
        .catch((error) => {
          console.error("데이터 불러오기 실패:", error);
        });
      } else if (!matchingData || likeListChanged) {
        setLikeListChanged(false);
        if (role === 'talent') {
          // ================= [Talent] Matching Results =================
          axios.get(`${baseURL}/api/me/talent/full`, { headers: { Authorization: `Bearer ${token}` } })
          .then((response) => {
            // Matching Data
            axios.get(`${baseURL}/api/matching-results/talents/${response.data.data?.basic.user_id}/job-postings`, { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
              setMatchingData(response.data.data.matches);
            })
            .catch((error) => {
              console.error("데이터 불러오기 실패:", error);
            });
          })
          .catch((error) => {
            console.error("데이터 불러오기 실패:", error);
          });
          // Like List
          axios.get(`${baseURL}/api/me/talent/job-posting-bookmarks`, { headers: { Authorization: `Bearer ${token}` } })
          .then((response) => {
            const liked = response.data.data?.items.map((item) => item.job_posting_id);
            setLikeList(liked);
            setRows(response.data.data.items.map((item) => ({
              ...item,
              tags: item.tags ?? [],
              status: item.status ?? 1,
            })));
          })
          .catch((error) => {
            console.error("데이터 불러오기 실패:", error);
          });
        } else if (role === 'company') {
          // ================= [Company] Matching Results =================
          const query = new URLSearchParams(location.search);
          const jobId = query.get("job");
          axios.get(`${baseURL}/api/matching-results/job-postings/${jobId}/talents`, { headers: { Authorization: `Bearer ${token}` } })
          .then((response) => {
            setMatchingData(response.data.data.matches);
            axios.get(`${baseURL}/api/job-postings/${queryJobId}`, { headers: { Authorization: `Bearer ${token}` } })
              .then(res => setJobTitle(res.data.data?.title));
          })
          .catch((error) => {
            console.error("데이터 불러오기 실패:", error);
          });
          // Like List
          axios.get(`${baseURL}/api/me/company/job-postings/${jobId}/talent-bookmarks`, { headers: { Authorization: `Bearer ${token}` } })
          .then((response) => {
            const liked = response.data.data?.items.map((item) => item.talent_user_id);
            setLikeList(liked);
            setRows(response.data.data.items.map((item) => ({
              ...item,
              tags: item.tags ?? [],
              status: item.status ?? 1,
            })));
          })
          .catch((error) => {
            console.error("데이터 불러오기 실패:", error);
          });
        }
      }
    }, [loading, likeListChanged]);



    // Card Data
    const [flipped, setFlipped] = useState(false);
    const showCard = (targetId) => {
      setIdx(targetId);
      setIsCardVisible(true);
    };

    const loadData = (targetId) => {
      if (matchingData && targetId) {
        if (role === 'talent') {
          const match = matchingData.find(item => item.job_posting_id === targetId);
          const companyId = match?.company_user_id;
          const jobId = targetId;
          setScores(match.scores);
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
          const talentId = matchingData[targetId]?.talent_user_id;
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
      loadData(idx);
    }, [idx]);
    


    // XAI Data
    const loadXaiData = (idx) => {
      setAnalyzing(true);
      setXaiData(null);
      if (matchingData) {
        // const talentId = matchingData[idx]?.talent_user_id;
        axios.post(`${aiURL}/api/match/explain`, {
          talent_user_id: idx,
          job_posting_id: queryJobId,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setXaiData(response.data);
          setAnalyzing(false);
        })
        .catch((error) => {
          console.error("데이터 불러오기 실패:", error);
          setAnalyzing(false);
        });
      }
    };
    

    
    // Unlike
    const cancelLike = (targetId) => {
      const query = new URLSearchParams(location.search);
      const jobId = query.get("job");
      if (role === 'talent') {
        axios.post(`${baseURL}/api/me/talent/job-posting-bookmarks`, {
          jd_id: targetId,
          action: "remove",
        }, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setLikeList(prev => prev.filter(id => id !== targetId));
          setLikeListChanged(true);
        })
        .catch((error) => {
          console.error("데이터 불러오기 실패:", error);
        });
      } else if (role === 'company') {
        axios.post(`${baseURL}/api/me/company/job-postings/${jobId}/talent-bookmarks`, {
          talent_id: targetId,
          action: "remove",
        }, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setLikeList(prev => prev.filter(id => id !== targetId));
          setLikeListChanged(true);
        })
        .catch((error) => {
          console.error("데이터 불러오기 실패:", error);
        });
      } 
    };
    


    // State    
    const suggestions = [];
    const [inputValue, setInputValue] = useState({});
    const [tags, setTags] = useState({});
    const [filters, setFilters] = useState({
      name: "",
      job: "",
      minExp: "",
      tag: "",
      status: "",
    });

    const getRowId = (row) => row?.job_posting_id ?? row?.talent_id ?? row?.talent_user_id ?? row?.id ?? null;
    const getRowTags = (rowId) => tags[rowId] || [];
    const getRowInput = (rowId) => inputValue[rowId] || "";
    const filteredSuggestions = (rowId) => {
      const rowTags = getRowTags(rowId);
      const value = getRowInput(rowId);
      return suggestions.filter(
        (s) => s.toLowerCase().includes(value.toLowerCase()) && !rowTags.includes(s)
      );
    };

    const filteredRows = rows?.filter((row) => {
      if (!row) return false;
      const id = getRowId(row);
      if (role === "talent") {
        const matchName =
          filters.name === "" ||
          row.company.name.toLowerCase().includes(filters.name.toLowerCase());
        const matchJob =
          filters.job === "" ||
          row.title.toLowerCase().includes(filters.job.toLowerCase());
        const matchTag =
          filters.tag === "" ||
          (row?.tags || []).some((tag) =>
            tag.toLowerCase().includes(filters.tag.toLowerCase())
          );
        const matchStatus =
          filters.status === "" || String(row?.status) === filters.status;
        return matchName && matchJob && matchTag && matchStatus;
      } else if (role === "company") {
        const talentName =
          row?.name ?? row?.full_name ?? row?.talent_name ?? row?.company?.name ?? "";
        const matchName =
          filters.name === "" ||
          talentName.toLowerCase().includes(filters.name.toLowerCase());
        const matchJob =
          filters.job === "" ||
          (row.title ?? "").toLowerCase().includes(filters.job.toLowerCase());
        const matchExp =
          filters.minExp === "" || (row.totalWork ?? 0) >= Number(filters.minExp);
        const matchTag =
          filters.tag === "" ||
          (row?.tags || []).some((t) =>
            t.toLowerCase().includes(filters.tag.toLowerCase())
          );
        const matchStatus =
          filters.status === "" || String(row?.status) === filters.status;
        return matchName && matchJob && matchExp && matchTag && matchStatus;
      }
      return false;
    });

    const handleFilterChange = (key, value) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const addTag = (rowId, tag) => {
      if (!tag) return;
      const currentTags = getRowTags(rowId);
      if (currentTags.includes(tag)) return;
      setTags((prev) => ({ ...prev, [rowId]: [...currentTags, tag] }));
      setRows((prev) =>
        prev.map((r) =>
          getRowId(r) === rowId ? { ...r, tags: [...(r.tags || []), tag] } : r
        )
      );
      setInputValue((prev) => ({ ...prev, [rowId]: "" }));
    };

    const removeTag = (rowId, tag) => {
      const currentTags = getRowTags(rowId);
      const newTags = currentTags.filter((t) => t !== tag);
      setTags((prev) => ({ ...prev, [rowId]: newTags }));
      setRows((prev) =>
        prev.map((r) =>
          getRowId(r) === rowId ? { ...r, tags: newTags } : r
        )
      );
    };

    const handleKeyDown = (e, rowId) => {
      const value = getRowInput(rowId) || "";
      if (e.key === "Enter") {
        e.preventDefault();
        addTag(rowId, value);
      }
      if (e.key === "Backspace" && value === "" && (getRowTags(rowId) || []).length > 0) {
        const last = getRowTags(rowId)[getRowTags(rowId).length - 1];
        removeTag(rowId, last);
      }
    };

    useEffect(() => {
      const initialTags = {};
      rows?.forEach((item) => {
        const id = getRowId(item);
        if (id != null) initialTags[id] = item.tags ?? [];
      });
      setTags(initialTags);
    }, [rows]);

    const handleStatusChange = (rowId, newStatus) => {
      setRows((prev) =>
        prev.map((r) =>
          getRowId(r) === rowId ? { ...r, status: newStatus } : r
        )
      );
    };

    if (role === 'company' && !likeType) {
      return (
        <Container>
          <Title style={{'marginBottom': '20px'}}>♥️ 보관한 인재</Title>
          <Paragraph>진행 방식을 선택해주세요.</Paragraph>
          <SelectContainer>
            <Select onClick={() => handleSelect("all")}>
                <div>👥</div>
                <SelectName>
                  <b>전체 인재풀</b> 확인<br/>
                  <hr style={{"width": "200px", "marginTop": "15px"}}></hr>
                  <p>· 기업에서 보관한 모든 인재 확인<br/>· 공고 무관 전체 인재 탐색</p>
                </SelectName>
            </Select>
            <Select onClick={() => {handleSelect("job");}}>
                <div>📄</div>
                <SelectName>
                  <b>공고별 인재풀</b> 확인<br/>
                  <hr style={{"width": "200px", "marginTop": "15px"}}></hr>
                  <p>· 공고마다 보관한 인재 확인<br/>· 공고별 전형 진행 상태 관리</p>
                </SelectName>
            </Select>
          </SelectContainer>
        </Container>
      );
    } else if (role === 'company' && likeType === 'job' && !queryJobId) {
      return (
        <Container>
          <Title style={{'marginBottom': '20px'}}>♥️ 보관한 인재</Title>
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
      );
    } else if (role === "talent") {
        return (
          <Container>
            <Title>💙 보관한 공고</Title>
            {(isCardVisible) ? (
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
                    <Introduction>{companyData?.basic.tagline ? companyData?.basic.tagline : `${data?.title ? data?.title : ""} 공고 지원자를 기다립니다.`}</Introduction>
                    <ContentContainer>
                      <Content role="company" style={{ borderRadius: '20px 0 20px 0' }}>
                        <ContentTitle>📜 공고 정보</ContentTitle>
                        <ContentParagraph>
                          <span>· {data?.employment_type} ({data?.career_level})</span>
                          <span>· 근무 부서 : {data?.department}</span>
                          <span>· 근무 기간 : {data?.term_months}</span>
                          <span>· 연봉 : {data?.salary_range ? data?.salary_range : "협의 후 결정"}</span>
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
                          <BackContent>{data?.term_months} (근무 시작 : {data?.deadline_date?.replace("-", ".").replace("-", ".")})  |  {data?.department}</BackContent>
                          <BackContent>{data?.salary_range ? data?.salary_range : "연봉 협의 후 결정"}  |  {data?.location_city}</BackContent>
                          <BackContent>업무 내용 : <br/>
                            {data?.responsibilities}</BackContent>
                          <BackContent>문의 메일 {data?.contact_email}  |  문의 연락처 {data?.contact_phone}</BackContent>
                        </BackRegion>
                        <BackRegion>
                          <BackTitle>☑️ 자격 요건</BackTitle>
                          <BackContent>학력 : {data?.education_level}</BackContent>
                          <BackContent>필수 요건 : <br/>
                            {data?.requirements_must}</BackContent>
                          <BackContent>우대 사항 : <br/>
                            {data?.requirements_nice}</BackContent>
                          <BackContent>요구 역량 : <br/>
                            {data?.competencies}</BackContent>
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
              <CloseCardButton role={role} onClick={() => {setIsCardVisible(false); setCardData(null); setData(null); setCompanyData(null); setIdx(null);}}>👈 목록으로 돌아가기</CloseCardButton>
              <HexagonContainer>
                <Hexagon role={role} score={[scores?.roles, scores?.growth, scores?.career,
                scores?.culture, scores?.vision, scores?.skills]} />
              </HexagonContainer>
              <ButtonContainer>
                <TwoButtonsWrapper>
                  <Button role={role} style={{width: "48%", fontSize: "20px"}} onClick={() => {cancelLike(idx); setIsCardVisible(false); setCardData(null); setData(null); setCompanyData(null); setIdx(null);}}><span>✖️ 삭제하기</span></Button>
                  <Button role={role} style={{width: "48%", fontSize: "20px"}}><span>🔗 공고 확인하기</span></Button>
                </TwoButtonsWrapper>
                <div style={{"color": "black", "fontSize": "17px", "fontWeight": "500"}}>📝 코멘트</div>
                <Memo></Memo>
              </ButtonContainer>
              </>
            ) : (
            <>
            <Table>
              <HeaderRow role={role}>
                <HeaderCell>
                  기업명<br />
                  <FilterInput role={role}
                    style={{ marginTop: "8px", width: "85%" }}
                    placeholder="이름 검색"
                    value={filters.name}
                    onChange={(e) => handleFilterChange("name", e.target.value)}
                  />
                </HeaderCell>
                <HeaderCell>
                  공고명<br />
                  <FilterInput role={role}
                    style={{ marginTop: "8px", width: "85%" }}
                    placeholder="공고 검색"
                    value={filters.job}
                    onChange={(e) => handleFilterChange("job", e.target.value)}
                  />
                </HeaderCell>
                <HeaderCell>
                  태그<br />
                  <FilterInput role={role}
                    value={filters.tag}
                    placeholder="태그 검색"
                    style={{ marginTop: "8px", width: "85%" }}
                    onChange={(e) => handleFilterChange("tag", e.target.value)}
                  />
                </HeaderCell>
                <HeaderCell>
                  공고 지원 단계<br />
                  <FilterSelect role={role}
                    value={filters.status}
                    style={{ marginTop: "8px", width: "85%" }}
                    onChange={(e) => handleFilterChange("status", e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FilterOption value="">상태 전체</FilterOption>
                    <FilterOption value="1">🔴 지원서 작성 전</FilterOption>
                    <FilterOption value="2">🟡 지원서 작성 중</FilterOption>
                    <FilterOption value="3">🟢 지원서 작성 완료</FilterOption>
                    <FilterOption value="4">🔵 전형 진행 중</FilterOption>
                    <FilterOption value="5">⚫ 전형 진행 완료</FilterOption>
                    <FilterOption value="6">⚫ 마감</FilterOption>
                  </FilterSelect>
                </HeaderCell>
              </HeaderRow>
              {filteredRows?.map((row) => (
                <Row key={row.job_posting_id} onClick={() => {showCard(row.job_posting_id);}}>
                  <Cell>
                    <Name>{row.company.name}{row.isMatched && <MatchedTag role={role}>Matched</MatchedTag>}</Name>
                    <Email>✉️ {row.contact_email}</Email>
                    <Phone>📞 {row.contact_phone}</Phone>
                  </Cell>
                  <Cell>
                    <Company>{row.title}</Company>
                    <TotalWork>📆 마감일 <b>{row.deadline_date}</b></TotalWork>
                    <Job>💼 {row.employment_type}</Job>
                  </Cell>
                  <Cell>
                    <TagWrapper>
                      {getRowTags(row.job_posting_id).map((tag, i) => (
                        <TagItem key={i} onClick={(e) => e.stopPropagation()}>
                          {tag}
                          <RemoveBtn onClick={(e) => {e.stopPropagation(); removeTag(row.job_posting_id, tag);}}>×</RemoveBtn>
                        </TagItem>
                      ))}
                      <Input
                        placeholder="태그 입력..."
                        value={getRowInput(row.job_posting_id)}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) =>
                          setInputValue((prev) => ({ ...prev, [row.job_posting_id]: e.target.value }))
                        }
                        onKeyDown={(e) => handleKeyDown(e, row.job_posting_id)}
                      />
                      {getRowInput(row.job_posting_id).length > 0 &&
                        filteredSuggestions(row.job_posting_id).length > 0 && (
                          <Dropdown>
                            {filteredSuggestions(row.job_posting_id).map((s, i) => (
                              <DropdownItem key={i} onClick={() => addTag(row.job_posting_id, s)}>
                                {s}
                              </DropdownItem>
                            ))}
                          </Dropdown>
                        )}
                    </TagWrapper>
                  </Cell>
                  <Cell>
                    <StatusSelect role={role}
                      value={row.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => handleStatusChange(row.job_posting_id, e.target.value)}
                    >
                      <StatusOption value="1">🔴 지원서 작성 전</StatusOption>
                      <StatusOption value="2">🟡 지원서 작성 중</StatusOption>
                      <StatusOption value="3">🟢 지원서 작성 완료</StatusOption>
                      <StatusOption value="4">🔵 전형 진행 중</StatusOption>
                      <StatusOption value="5">⚫ 전형 진행 완료</StatusOption>
                      <StatusOption value="6">⚫ 마감</StatusOption>
                    </StatusSelect>
                    <PoolButtonsWrapper>
                      <PoolButton role={role} onClick={(e) => {e.stopPropagation(); cancelLike(row.job_posting_id);}}><span>✖️ 삭제하기</span></PoolButton>
                      <PoolButton role={role} onClick={(e) => {e.stopPropagation();}}><span>🔗 공고 확인하기</span></PoolButton>
                    </PoolButtonsWrapper>
                  </Cell>
                </Row>
              ))}
            </Table>
            <div style={{"height": "60px"}}></div>
            </>
            )}
            {showPopup && (
                <PopupOverlay onClick={() => setShowPopup(false)}>
                  <PopupContainer onClick={(e) => e.stopPropagation()}>
                    <CloseButton onClick={() => setShowPopup(false)}>✕</CloseButton>
                    <PopupScrollArea>
                      <PopupTitle>💡 매칭 분석 인사이트</PopupTitle>
                      {analyzing && (<><div style={{"height": "80px"}}></div><Spinner role={role} /><PopupParagraph>분석에 시간이 다소 걸립니다. 잠시만 기다려 주세요···</PopupParagraph></>)}
                      {!analyzing && !xaiData && (<PopupParagraph>분석에 실패했습니다. 다시 시도해 주세요.</PopupParagraph>)}
                      {!analyzing && xaiData && (
                      <PopupTable>
                        <tbody>
                          <tr>
                            <th>💼 직무 적합성<br/>
                              <MatchingTag>역할 수행력 <b>{matchingData[idx]?.scores.roles}%</b></MatchingTag>
                              <MatchingTag>역량 적합도 <b>{matchingData[idx]?.scores.skills}%</b></MatchingTag>
                            </th>
                            <td>
                              <b>매칭 근거</b><br/>{xaiData?.job_fit.matching_evidence}<br/><br/>
                              <b>검증 포인트</b><br/>{xaiData?.job_fit.check_points?.split(/(?=\d+\.\s?)/).map((cp, i) => (<span key={i}>{cp.trim()} <br/></span>))}<br/><br/>
                              <b>추천 질문</b><br/>{xaiData?.job_fit.suggested_questions.map((q, i) => (<span key={i}>Q. {q}<br/></span>))}
                            </td>
                          </tr>
                          <tr>
                            <th>👥 문화 적합성<br/>
                              <MatchingTag style={{'width': '110px', 'marginLeft': '3px'}}>조직/문화 적합도 <b>{matchingData[idx]?.scores.culture}%</b></MatchingTag>
                              <MatchingTag>협업 기여도 <b>{matchingData[idx]?.scores.vision}%</b></MatchingTag>
                            </th>
                            <td>
                              <b>매칭 근거</b><br/>{xaiData?.culture_fit.matching_evidence}<br/><br/>
                              <b>검증 포인트</b><br/>{xaiData?.culture_fit.check_points?.split(/(?=\d+\.\s?)/).map((cp, i) => (<span key={i}>{cp.trim()} <br/></span>))}<br/><br/>
                              <b>추천 질문</b><br/>{xaiData?.culture_fit.suggested_questions.map((q, i) => (<span key={i}>Q. {q}<br/></span>))}
                            </td>
                          </tr>
                          <tr>
                            <th>📈 성장 가능성<br/>
                              <MatchingTag>성장 가능성 <b>{matchingData[idx]?.scores.growth}%</b></MatchingTag>
                              <MatchingTag>커리어 방향 <b>{matchingData[idx]?.scores.vision}%</b></MatchingTag>
                            </th>
                            <td>
                              <b>매칭 근거</b><br/>{xaiData?.growth_potential.matching_evidence}<br/><br/>
                              <b>검증 포인트</b><br/>{xaiData?.growth_potential.check_points?.split(/(?=\d+\.\s?)/).map((cp, i) => (<span key={i}>{cp.trim()} <br/></span>))}<br/><br/>
                              <b>추천 질문</b><br/>{xaiData?.growth_potential.suggested_questions.map((q, i) => (<span key={i}>Q. {q}<br/></span>))}
                            </td>
                          </tr>
                        </tbody>
                      </PopupTable>
                      )}
                    </PopupScrollArea>
                  </PopupContainer>
                </PopupOverlay>
              )}
            {/* <LikeContainer>
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
            </LikeContainer> */}
          </Container>
        );
    } else if (role === "company") {
        return (
          <Container>
            <Title>♥️ 보관한 인재</Title>
            
            {(isCardVisible) ? (
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
                            <BackContent><b>{data?.basic.name}</b>  |  🎂 {data?.basic.birth_date?.replace("-", ".").replace("-", ".")}  |  ✉️ {data?.basic.email}  |  📞 {data?.basic.phone}</BackContent>
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
                              <BackContent><b>{experience.company_name}</b>  |  {experience.title}  ({formatYearMonth(experience.start_ym)} ~ {formatYearMonth(experience.end_ym)})<br/>{experience.summary} {experience.leave_reason ? `(퇴사 사유 : ${experience.leave_reason})` : ""}</BackContent>
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
                <CloseCardButton role={role} onClick={() => {setIsCardVisible(false); setCardData(null); setData(null); setIdx(null);}}>👈 목록으로 돌아가기</CloseCardButton>
                {queryJobId && (
                <HexagonContainer>
                  <Hexagon score={[[idx]?.scores.roles, matchingData[idx]?.scores.growth, matchingData[idx]?.scores.career,
                    matchingData[idx]?.scores.culture, matchingData[idx]?.scores.vision, matchingData[idx]?.scores.skills]} role={role} />
                  <BalloonButton onClick={() => {setShowPopup(true); loadXaiData(matchingData[idx].talent_user_id);}}>
                    🤔 매칭 분석
                  </BalloonButton>
                </HexagonContainer>
                )}
              <ButtonContainer>
                <TwoButtonsWrapper>
                  <Button role={role} style={{width: "48%", fontSize: "20px"}}><span>✖️ 삭제하기</span></Button>
                  <Button role={role} style={{width: "48%", fontSize: "20px"}} 
                    onClick={() => {
                      window.open(
                        `https://mail.google.com/mail/?view=cm&fs=1&to=${data?.basic.email}&su=[${profileName}] ${jobTitle} 포지션 제안 안내&body=${encodeURIComponent(data?.basic.name + " 님 안녕하세요, " + profileName + " 채용 담당자입니다.\n\n" + data?.basic.name + " 님의 FitConnect 프로필을 검토한 결과,\n역량이 적합하다고 판단되어 " + jobTitle + " 포지션을 제안드리게 되었습니다.\n\n" + "채용 담당자 드림")}`,
                        "_blank"
                      );}}><span>✉️ 이메일 보내기</span></Button>
                </TwoButtonsWrapper>
                <div style={{"color": "black", "fontSize": "17px", "fontWeight": "500"}}>📝 코멘트</div>
                <Memo></Memo>
              </ButtonContainer>
              </>
            ) : (
            <>
            <Table>
              <HeaderRow>
                <HeaderCell>
                  후보자명<br />
                  <FilterInput
                    style={{ marginTop: "8px", width: "85%" }}
                    placeholder="이름 검색"
                    value={filters.name}
                    onChange={(e) => handleFilterChange("name", e.target.value)}
                  />
                </HeaderCell>
                <HeaderCell>
                  최근 경력 (총 경력)<br />
                  <FilterSelect
                    value={filters.minExp}
                    style={{ marginTop: "8px", width: "85%" }}
                    onChange={(e) => handleFilterChange("minExp", e.target.value)}
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
                  등록 공고 · 태그<br />
                  <FilterInput
                    value={filters.tag}
                    placeholder="태그 검색"
                    style={{ marginTop: "8px", width: "85%" }}
                    onChange={(e) => handleFilterChange("tag", e.target.value)}
                  />
                </HeaderCell>
                <HeaderCell>
                  인재 관리 단계<br />
                  <FilterSelect
                    value={filters.status}
                    style={{ marginTop: "8px", width: "85%" }}
                    onChange={(e) => handleFilterChange("status", e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FilterOption value="">상태 전체</FilterOption>
                    <FilterOption value="1">🔴 포지션 제안 전</FilterOption>
                    <FilterOption value="2">🟡 포지션 제안 중</FilterOption>
                    <FilterOption value="3">🟢 포지션 수락</FilterOption>
                    <FilterOption value="4">⚫ 포지션 거절</FilterOption>
                    <FilterOption value="5">🔵 전형 진행 중</FilterOption>
                    <FilterOption value="6">⚫ 전형 진행 완료</FilterOption>
                  </FilterSelect>
                </HeaderCell>
              </HeaderRow>
              {filterCandidates?.map((row, rowIndex) => (
                <Row key={row.id} onClick={() => {showCard(row.id);}}>
                  <Cell>
                    <Name>{row.name}{row.isMatched && <MatchedTag>Matched</MatchedTag>}</Name>
                    <Email>✉️ {row.email}</Email>
                    <Phone>📞 {row.phone}</Phone>
                  </Cell>
                  <Cell>
                    <Company>{row.company}</Company>
                    <Job>🧑‍💼 {row.job}</Job>
                    <TotalWork>💼 총 경력 {row.totalWork}년</TotalWork>
                  </Cell>
                  <Cell>
                    <Company>{row.position}</Company>
                    <div style={{ borderBottom: "1px solid #ccc" }} />
                    <TagWrapper>
                      {getRowTags(rowIndex).map((tag, i) => (
                        <TagItem key={i} onClick={(e) => e.stopPropagation()}>
                          {tag}
                          <RemoveBtn onClick={(e) => {e.stopPropagation(); removeTag(rowIndex, tag);}}>×</RemoveBtn>
                        </TagItem>
                      ))}
                      <Input
                        placeholder="태그 입력..."
                        value={getRowInput(rowIndex)}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) =>
                          setInputValue({
                            ...inputValue,
                            [rowIndex]: e.target.value,
                          })
                        }
                        onKeyDown={(e) => handleKeyDown(e, rowIndex)}
                      />
                      {getRowInput(rowIndex).length > 0 &&
                        filteredSuggestions(rowIndex).length > 0 && (
                          <Dropdown>
                            {filteredSuggestions(rowIndex).map((s, i) => (
                              <DropdownItem key={i} onClick={() => addTag(rowIndex, s)}>
                                {s}
                              </DropdownItem>
                            ))}
                          </Dropdown>
                        )}
                    </TagWrapper>
                  </Cell>
                  <Cell>
                    <StatusSelect
                      value={row.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => handleStatusChange(row.id, e.target.value)}
                    >
                      <StatusOption value="1">🔴 포지션 제안 전</StatusOption>
                      <StatusOption value="2">🟡 포지션 제안 중</StatusOption>
                      <StatusOption value="3">🟢 포지션 수락</StatusOption>
                      <StatusOption value="4">⚫ 포지션 거절</StatusOption>
                      <StatusOption value="5">🔵 전형 진행 중</StatusOption>
                      <StatusOption value="6">⚫ 전형 진행 완료</StatusOption>
                    </StatusSelect>
                    <PoolButtonsWrapper>
                      <PoolButton role={role} onClick={(e) => e.stopPropagation()}><span>✖️ 삭제하기</span></PoolButton>
                      <PoolButton role={role} onClick={(e) => {e.stopPropagation(); window.open(
                        `https://mail.google.com/mail/?view=cm&fs=1&to=${row.name}&su=[${profileName}] ${jobTitle} 포지션 제안 안내&body=${encodeURIComponent(row.name + " 님 안녕하세요, " + profileName + " 채용 담당자입니다.\n\n" + row.name + " 님의 FitConnect 프로필을 검토한 결과,\n역량이 적합하다고 판단되어 " + jobTitle + " 포지션을 제안드리게 되었습니다.\n\n" + "채용 담당자 드림")}`,
                        "_blank"
                      );}}><span>✉️ 메일 보내기</span></PoolButton>
                    </PoolButtonsWrapper>
                  </Cell>
                </Row>
              ))}
            </Table>
            <div style={{"height": "60px"}}></div>
            </>
            )}
            {showPopup && (
                <PopupOverlay onClick={() => setShowPopup(false)}>
                  <PopupContainer onClick={(e) => e.stopPropagation()}>
                    <CloseButton onClick={() => setShowPopup(false)}>✕</CloseButton>
                    <PopupScrollArea>
                      <PopupTitle>💡 매칭 분석 인사이트</PopupTitle>
                      {analyzing && (<><div style={{"height": "80px"}}></div><Spinner role={role} /><PopupParagraph>분석에 시간이 다소 걸립니다. 잠시만 기다려 주세요···</PopupParagraph></>)}
                      {!analyzing && !xaiData && (<PopupParagraph>분석에 실패했습니다. 다시 시도해 주세요.</PopupParagraph>)}
                      {!analyzing && xaiData && (
                      <PopupTable>
                        <tbody>
                          <tr>
                            <th>💼 직무 적합성<br/>
                              <MatchingTag>역할 수행력 <b>{matchingData[idx]?.scores.roles}%</b></MatchingTag>
                              <MatchingTag>역량 적합도 <b>{matchingData[idx]?.scores.skills}%</b></MatchingTag>
                            </th>
                            <td>
                              <b>매칭 근거</b><br/>{xaiData?.job_fit.matching_evidence}<br/><br/>
                              <b>검증 포인트</b><br/>{xaiData?.job_fit.check_points?.split(/(?=\d+\.\s?)/).map((cp, i) => (<span key={i}>{cp.trim()} <br/></span>))}<br/><br/>
                              <b>추천 질문</b><br/>{xaiData?.job_fit.suggested_questions.map((q, i) => (<span key={i}>Q. {q}<br/></span>))}
                            </td>
                          </tr>
                          <tr>
                            <th>👥 문화 적합성<br/>
                              <MatchingTag style={{'width': '110px', 'marginLeft': '3px'}}>조직/문화 적합도 <b>{matchingData[idx]?.scores.culture}%</b></MatchingTag>
                              <MatchingTag>협업 기여도 <b>{matchingData[idx]?.scores.vision}%</b></MatchingTag>
                            </th>
                            <td>
                              <b>매칭 근거</b><br/>{xaiData?.culture_fit.matching_evidence}<br/><br/>
                              <b>검증 포인트</b><br/>{xaiData?.culture_fit.check_points?.split(/(?=\d+\.\s?)/).map((cp, i) => (<span key={i}>{cp.trim()} <br/></span>))}<br/><br/>
                              <b>추천 질문</b><br/>{xaiData?.culture_fit.suggested_questions.map((q, i) => (<span key={i}>Q. {q}<br/></span>))}
                            </td>
                          </tr>
                          <tr>
                            <th>📈 성장 가능성<br/>
                              <MatchingTag>성장 가능성 <b>{matchingData[idx]?.scores.growth}%</b></MatchingTag>
                              <MatchingTag>커리어 방향 <b>{matchingData[idx]?.scores.vision}%</b></MatchingTag>
                            </th>
                            <td>
                              <b>매칭 근거</b><br/>{xaiData?.growth_potential.matching_evidence}<br/><br/>
                              <b>검증 포인트</b><br/>{xaiData?.growth_potential.check_points?.split(/(?=\d+\.\s?)/).map((cp, i) => (<span key={i}>{cp.trim()} <br/></span>))}<br/><br/>
                              <b>추천 질문</b><br/>{xaiData?.growth_potential.suggested_questions.map((q, i) => (<span key={i}>Q. {q}<br/></span>))}
                            </td>
                          </tr>
                        </tbody>
                      </PopupTable>
                      )}
                    </PopupScrollArea>
                  </PopupContainer>
                </PopupOverlay>
              )}
            {/* // <LikeContainer>
            //   <LikeRegion>
            //     <Like>
            //       <LikeImage><img src={role === "company" ? talent : company} alt="Logo" width={24*0.8} height={27*0.8}></img></LikeImage>
            //       <LikeTitle>김커넥 : FitConnect 재직 중</LikeTitle>
            //       <LikeButton role="talent">삭제</LikeButton>
            //       <LikeContent>· 경력 3~5년차  |  직무 수행
            //         <StatusSelect onClick={(e) => {e.stopPropagation();}}>
            //           <StatusOption value="1">포지션 제안 전</StatusOption>
            //           <StatusOption value="2">포지션 제안 중</StatusOption>
            //           <StatusOption value="3">포지션 수락</StatusOption>
            //           <StatusOption value="4">포지션 거절</StatusOption>
            //           <StatusOption value="5">전형 진행 중</StatusOption>
            //           <StatusOption value="6">전형 진행 완료</StatusOption>
            //         </StatusSelect>
            //       </LikeContent>
            //     </Like>
            //     <Like>
            //       <LikeImage><img src={role === "company" ? talent : company} alt="Logo" width={24*0.8} height={27*0.8}></img></LikeImage>
            //       <LikeTitle>김커넥 : FitConnect 재직 중</LikeTitle>
            //       <LikeButton role="talent">삭제</LikeButton>
            //       <LikeContent>· 경력 3~5년차  |  직무 수행<br/>· 안녕하세요, 백엔드 개발자입니다.</LikeContent>
            //     </Like>
            //     <Like>
            //       <LikeImage><img src={role === "company" ? talent : company} alt="Logo" width={24*0.8} height={27*0.8}></img></LikeImage>
            //       <LikeTitle>김커넥 : FitConnect 재직 중</LikeTitle>
            //       <LikeButton role="talent">삭제</LikeButton>
            //       <LikeContent>· 경력 3~5년차  |  직무 수행<br/>· 안녕하세요, 백엔드 개발자입니다.</LikeContent>
            //     </Like>
            //     <Like>
            //       <LikeImage><img src={role === "company" ? talent : company} alt="Logo" width={24*0.8} height={27*0.8}></img></LikeImage>
            //       <LikeTitle>김커넥 : FitConnect 재직 중</LikeTitle>
            //       <LikeButton role="talent">삭제</LikeButton>
            //       <LikeContent>· 경력 3~5년차  |  직무 수행<br/>· 안녕하세요, 백엔드 개발자입니다.</LikeContent>
            //     </Like>
            //     <Like>
            //       <LikeImage><img src={role === "company" ? talent : company} alt="Logo" width={24*0.8} height={27*0.8}></img></LikeImage>
            //       <LikeTitle>김커넥 : FitConnect 재직 중</LikeTitle>
            //       <LikeButton role="talent">삭제</LikeButton>
            //       <LikeContent>· 경력 3~5년차  |  직무 수행<br/>· 안녕하세요, 백엔드 개발자입니다.</LikeContent>
            //     </Like>
            //     <Like>
            //       <LikeImage><img src={role === "company" ? talent : company} alt="Logo" width={24*0.8} height={27*0.8}></img></LikeImage>
            //       <LikeTitle>김커넥 : FitConnect 재직 중</LikeTitle>
            //       <LikeButton role="talent">삭제</LikeButton>
            //       <LikeContent>· 경력 3~5년차  |  직무 수행<br/>· 안녕하세요, 백엔드 개발자입니다.</LikeContent>
            //     </Like>
            //     <Like>
            //       <LikeImage><img src={role === "company" ? talent : company} alt="Logo" width={24*0.8} height={27*0.8}></img></LikeImage>
            //       <LikeTitle>김커넥 : FitConnect 재직 중</LikeTitle>
            //       <LikeButton role="talent">삭제</LikeButton>
            //       <LikeContent>· 경력 3~5년차  |  직무 수행<br/>· 안녕하세요, 백엔드 개발자입니다.</LikeContent>
            //     </Like>
            //   </LikeRegion>
            // </LikeContainer> */}
          </Container>
        );
    }
}
