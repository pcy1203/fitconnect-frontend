import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from '../assets/logo.png';

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

const Menu = styled.li`
    width: 200px;
    height: 80px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    text-align: center;
    &:hover > a {
        font-weight: 500;
        color: #6399FB;
    }
    &:hover > ul {
        display: block;
    }
`;

const SubBar = styled.ul`
    margin: 0;
    padding: 0;
    display: none;
    list-style: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #6399FB;
`;

const SubMenu = styled.li`
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
        background-color: #87B2FF;
    } 
`;

export default function NavigationBar() {
  return (
    <nav className="navigation">
      <MainBar className="navbar">
        {/* 로고 이미지 */}
        <Link to="/"><Logo className="logo"><img src={logo} alt="Logo" width={200} height={55}></img></Logo></Link>
        
        {/* 상단 메뉴 */}
        <Menu><Link to="/profile">프로필 설정</Link>
          <SubBar>
            <SubMenu>
              <Link to="/profile/setprofile">프로필 입력</Link>
            </SubMenu>
          </SubBar>
        </Menu>
        <Menu><Link to="/assessment">AI 분석 인터뷰</Link>
          <SubBar>
            <SubMenu><Link to="/assessment/interview">분석 인터뷰 진행</Link></SubMenu>
            <SubMenu><Link to="/assessment/result">분석 결과 확인</Link></SubMenu>
          </SubBar>
        </Menu>
        <Menu><Link to="/search">공고 탐색</Link>
          <SubBar>
            <SubMenu><Link to="/search/recommendation">추천 공고 확인</Link></SubMenu>
            <SubMenu><Link to="/search/like">공고 보관함</Link></SubMenu>
          </SubBar>
        </Menu>
        <Menu><Link to="/jobinterview">면접 도우미</Link>
          <SubBar>
            <SubMenu><Link to="/jobinterview/feedback">받은 피드백</Link></SubMenu>
          </SubBar>
        </Menu>
      </MainBar>
    </nav>
  );
}