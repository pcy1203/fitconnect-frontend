import { Outlet } from "react-router-dom";
import styled from "styled-components";
import NavigationBar from "./NavigationBar";

const NavContainer = styled.div`
    width: 1200px;
    height: 80px;
    position: fixed;
    top: 0;
    left: calc(50% - 600px);
    z-index: 10;
    background: #ffffff;
`;

const BodyContainer = styled.div`
    min-height: calc(100% - 80px);
    position: relative;
    top: 80px;
`;

export default function Layout() {
  return (
    <>
      <NavContainer>
        <NavigationBar />
      </NavContainer>
      <BodyContainer>
        <Outlet />
      </BodyContainer>
    </>
  );
}