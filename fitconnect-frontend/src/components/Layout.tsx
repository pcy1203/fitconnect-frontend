import { Outlet } from "react-router-dom";
import styled from "styled-components";
import NavigationBar from "./NavigationBar";

const HTMLContainer = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    background: #ffffff;
`;

const NavContainer = styled.div`
    width: 1200px;
    height: 80px;
    position: fixed;
    top: 0;
    left: calc(50% - 600px);
    z-index: 10;
    background: #ffffff;
`;

const Line = styled.hr`
    width: 100vw;
    position: fixed;
    top: 71px;
    z-index: 11;
    border: none;
    height: 1px;
    background-color: rgba(0,0,0,0.1);
`;

const BodyContainer = styled.div`
    width: 100%;
    min-height: calc(100vh - 80px);
    position: relative;
    top: 80px;
    background: #ffffff;
`;

export default function Layout() {
  return (
    <HTMLContainer>
      <NavContainer>
        <NavigationBar />
      </NavContainer>
      <Line></Line>
      <BodyContainer>
        <Outlet />
      </BodyContainer>
    </HTMLContainer>
  );
}