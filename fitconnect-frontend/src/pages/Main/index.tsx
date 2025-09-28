import styled from "styled-components";

const Container = styled.div`
    width: 1200px;
    min-height: calc(100vh - 80px);
    margin-left: calc(50vw - 600px);
    background: black;
`;

export default function Main() {
    return <Container>Main Page</Container>;
}