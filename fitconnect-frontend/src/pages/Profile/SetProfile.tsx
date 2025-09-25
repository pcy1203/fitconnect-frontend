import styled from "styled-components";

const Form = styled.div`

`;

const Title = styled.div`

`

const Label = styled.div`

`;

const Input = styled.input`
    width: 300px;
    height: 50px;
`;

export default function SetProfile() {
    return (
      <Form>
        <Title>프로필 설정</Title>
        
        <Label>이름</Label>
        <Input></Input>
      </Form>
    );
}