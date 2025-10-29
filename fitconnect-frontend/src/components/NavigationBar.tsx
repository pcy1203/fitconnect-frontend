import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../env";

import styled from "styled-components";
import colors from "../styles/colors";
import logo from '../assets/logo.png';
import talent from '../assets/talent.png';
import company from '../assets/company.png';

const MainBar = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    list-style: none;
`;

const Logo = styled.div`
    width: 250px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Menu = styled.li<{ role?: string }>`
    width: 200px;
    height: 80px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    text-align: center;
    z-index: 15;
    & > a {
        display: block;
        width: 100%;
        height: 100%;
        line-height: 80px;
        &:hover + ul {
            display: block;
        }
    }
    &:hover > a, &:hover > span {
        font-weight: 500;
        color: ${({ role }) => (role === "company" ? colors.company : colors.talent )};
    }
    &:hover > ul {
        display: block;
    }
    // &::before {
    //     content: "";
    //     position: absolute;
    //     top: 0%;
    //     width: 190px;
    //     height: 33px;
    //     top: 50px;
    //     background-color: #ffffff00;
    //     z-index: 15;
    //     &:hover + ul {
    //         display: block;
    //     } 
    // }
`;

const SubBar = styled.ul<{ role?: string }>`
    margin: 0;
    padding: 0;
    display: none;
    list-style: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: ${({ role }) => (role === "company" ? colors.company : colors.talent )};
`;

const SubMenu = styled.li<{ role?: string }>`
    width: 200px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    text-align: center;
    a {
        color: #FFFFFF;
    }
    &:hover {
        background-color: ${({ role }) => (role === "company" ? colors.company_light : colors.talent_light )};
    } 
`;

const ProfileMenu = styled.li<{ role?: string }>`
    width: 200px;
    height: 80px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    text-align: center;
    & > p {
        margin-left: 10px;
    }
    & > a {
        display: block;
        width: 100%;
        height: 100%;
        line-height: 80px;
    }
    &:hover > a {
        font-weight: 500;
        color: ${({ role }) => (role === "company" ? colors.company : colors.talent )};
    }
    &:hover > ul {
        display: block;
    }
`;

export default function NavigationBar() {
    const { token, setToken, role, setRole, loading, profileName, setProfileName } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // await axios.post(`${baseURL}/auth/logout`, {}, {});  // TO-DO
        } catch (err) {
            console.error("로그아웃 오류 :", err);
        }
        sessionStorage.clear();
        setToken(null);
        setRole(null);
        setProfileName(null);
        navigate("/");
    };

    useEffect(() => {
        setProfileName(sessionStorage.getItem("name"));
    }, []);

  return (
    <nav className="navigation">
      <MainBar className="navbar">
        {/* 로고 이미지 */}
        <Link to="/"><Logo className="logo"><img src={logo} alt="Logo" width={200} height={55}></img></Logo></Link>
        
        {/* 상단 메뉴 */}
        <Menu role={role}><Link to="/profile/setprofile">프로필 설정</Link>
          {role === "company" ? 
            <SubBar role={role}>
              <SubMenu role={role}><Link to="/profile/setprofile">기업 정보 입력</Link></SubMenu>
              <SubMenu role={role}><Link to="/profile/jobprofile">채용 공고 입력</Link></SubMenu>
            </SubBar>
            :
            <SubBar role={role}>
              <SubMenu role={role}><Link to="/profile/setprofile">인재 프로필 입력</Link></SubMenu>
            </SubBar>
          }
        </Menu>
        <Menu role={role}><Link to="/assessment/interview">AI 분석 인터뷰</Link>
          <SubBar role={role}>
            <SubMenu role={role}><Link to="/assessment/interview">분석 인터뷰 진행</Link></SubMenu>
            <SubMenu role={role}><Link to="/assessment/result">분석 결과 확인</Link></SubMenu>
          </SubBar>
        </Menu>
        <Menu role={role}><Link to="/search/recommendation">{role === "company" ? "인재 탐색" : "공고 탐색"}</Link>
          <SubBar role={role}>
            <SubMenu role={role}><Link to="/search/recommendation">{role === "company" ? "추천 인재 확인" : "추천 공고 확인"}</Link></SubMenu>
            <SubMenu role={role}><Link to="/search/like">{role === "company" ? "인재 보관함" : "공고 보관함"}</Link></SubMenu>
          </SubBar>
        </Menu>
        {/* <Menu role={role}><Link to="/jobinterview">면접 도우미</Link>*/}
        <Menu role={role}><Link>면접 도우미</Link>
          {role === "company" ? 
            <SubBar role={role}>
              <SubMenu role={role} style={{'backgroundColor': '#858585ff'}}>면접 준비/진행</SubMenu>
              <SubMenu role={role} style={{'backgroundColor': '#858585ff'}}>디브리핑 진행</SubMenu>
              {/* <SubMenu role={role}><Link to="/jobinterview/interview">면접 준비/진행</Link></SubMenu>
              <SubMenu role={role}><Link to="/jobinterview/debriefing">디브리핑 진행</Link></SubMenu> */}
            </SubBar>
            :
            <SubBar role={role}>
              <SubMenu role={role} style={{'backgroundColor': '#858585ff'}}>받은 피드백</SubMenu>
              {/* <SubMenu role={role}><Link to="/jobinterview/feedback">받은 피드백</Link></SubMenu> */}
            </SubBar>
          }
        </Menu>
        {token ? 
          <Menu role={role}>
            <span><img src={role === "company" ? company : talent} alt="Logo" width={24} height={27}></img></span>
            <span style={{ paddingLeft: "8px", fontSize: "15px", lineHeight: "18px", color: "#000" }}>{profileName ? profileName + " 님" : "프로필 설정 필요"}</span>
            <SubBar role={role}>
              {/* {role === "company" ?
                <SubMenu role={role}><Link to="/jobs">등록된 공고 목록</Link></SubMenu>
                :
                <SubMenu role={role}><Link to="/myprofile">내 프로필</Link></SubMenu>
              } */}
              <SubMenu role={role}><Link onClick={handleLogout}>로그아웃</Link></SubMenu>
            </SubBar>
          </Menu>
          :
          <Menu role={role}><Link to="/auth/login">로그인</Link></Menu>}
      </MainBar>
    </nav>
  );
}