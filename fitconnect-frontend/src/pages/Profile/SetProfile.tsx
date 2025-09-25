import { useState } from "react";
import React from "react";
import styled from "styled-components";

const color = '#F7F8FA'; // 부모 컴포넌트 전달

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
`

const ProgressBarContainer = styled.div`
  width: 600px;
  margin-left: 300px;
  margin-bottom: 40px;
  height: 20px;
  background: #e0e0e0;
  border-radius: 10px;
  position: relative;
`;

const Progress = styled.div<{ progress: number }>`
  width: ${(props) => props.progress}%;
  height: 100%;
  background: linear-gradient(90deg, #cce4ff, #6399fb);
  border-radius: 10px;
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  position: absolute;
  top: 3px;
  left: 550px;
  font-size: 14px;
  color: #000000;
`;

const Form = styled.div`
    width: 1000px;
    left: 100px;
    display: flex;
    flex-wrap: wrap;
    padding-top: 50px;
    padding-bottom: 70px;
    position: relative;
    background: #FFFFFF;
    border: 1px solid #9E9E9E;
    border-radius: 20px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const FormTitle = styled.div`
    width: 1000px;
    height: 50px;
    position: relative;
    padding-left: 40px;
    color: black;
    font-size: 20px;
    font-weight: 600;
    line-height: 50px;
`

const InputContainer = styled.div<{ width?: string }>`
    width: ${(props) => props.width || "500px"};
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`

// const LongInputContainer = styled.div`
//     width: 1000px;
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     gap: 10px;
// `

const Label = styled.div`
    width: 80px;
    height: 70px;
    position: relative;
    padding-left: 40px;
    color: black;
    font-size: 16px;
    line-height: 70px;
`;

const Input = styled.input<{ width?: string }>`
    width: ${(props) => props.width || "300px"};
    height: 30px;
    background: #FFFFFF;
    color: #000000;
    border: 1px solid #9E9E9E;
    padding: 2px 10px;
    &:focus {
        outline: none;
        border: 2px solid #6399fb;
        box-shadow: 0 0 6px rgba(99, 153, 251, 0.5);
    }
    &::placeholder {
        color: #dbdbdb;
    }
`;

// const LongInput = styled.input`
//     width: 800px;
//     height: 30px;
//     background: #FFFFFF;
//     color: #000000;
//     border: 1px solid #9E9E9E;
//     padding: 2px 10px;
//     &:focus {
//         outline: none;
//         border: 2px solid #6399fb;
//         box-shadow: 0 0 6px rgba(99, 153, 251, 0.5);
//     }
//     &::placeholder {
//         color: #dbdbdb;
//     }
// `;

const Button = styled.button`
    all: unset;
    width: 200px;
    height: 40px;
    position: relative;
    top: 30px;
    left: 900px;
    background: #6399FB;
    color: #FFFFFF;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    border: 1px solid #9E9E9E;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.1s ease;
    &:hover {
      background-color: #87B2FF;
    }
    &:active {
      transform: scale(0.95);
    }
`;

const Line = styled.hr`
    width: 950px;
    border: none;
    height: 1px;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: #bcbcbcff;
`;

export default function SetProfile() {
    const [page, setPage] = useState(1);
    const [educationList, setEducationList] = useState([{ school: "", major: "", entrance: "", graduation: "", status: "" }]);
    const [careerList, setCareerList] = useState([{ company: "", role: "", join: "", leave: "", reason: "", description: ""}]);
    
    const getNextPage = () => {
        if (page < 5) setPage(page + 1);
    };

    return (
      <Container>
        <Title>프로필 설정</Title>
        <ProgressBarContainer>
          <Progress progress={page * 20}></Progress>
          <ProgressText>{page} / 5</ProgressText>
        </ProgressBarContainer>

        {page == 1 && (
          <Form>
            <FormTitle>기본정보 입력</FormTitle>
            <InputContainer>
              <Label>이름</Label>
              <Input placeholder="이름"></Input>
            </InputContainer>
            <InputContainer>
              <Label>생년월일</Label>
              <Input placeholder="2025-01-01"></Input>
            </InputContainer>
            <InputContainer>
              <Label>이메일</Label>
              <Input placeholder="fitconnect@gmail.com"></Input>
            </InputContainer>
            <InputContainer>
              <Label>휴대전화</Label>
              <Input placeholder="010-0000-0000"></Input>
            </InputContainer>
            <InputContainer width="1000px">
              <Label>한 줄 소개</Label>
              <Input placeholder="나를 한 줄로 표현해주세요!" width="800px"></Input>
            </InputContainer>
          </Form>
        )}
        
        {page == 2 && (
          <Form>
            <FormTitle>학력사항 입력</FormTitle>
            {educationList.map((education, idx) => (
              <React.Fragment key={idx}>
                {idx >= 1 && <Line></Line>}
                <InputContainer width="325px">
                  <Label>학교</Label>
                  <Input placeholder="학교명" width="150px"></Input>
                </InputContainer>
                <InputContainer width="650px">
                  <Label>전공</Label>
                  <Input placeholder="전공명" width="475px"></Input>
                </InputContainer>
                <InputContainer width="325px">
                  <Label>입학연도</Label>
                  <Input type="month" width="150px"></Input>
                </InputContainer>
                <InputContainer width="325px">
                  <Label>졸업연도</Label>
                  <Input type="month" width="150px"></Input>
                </InputContainer>
                <InputContainer width="300px">
                  <Label>재학/졸업</Label>
                  <Input width="150px"></Input>
                </InputContainer>
              </React.Fragment>
            ))}
            <Button onClick={() => setEducationList([...educationList, { school: "", major: "", entrance: "", graduation: "", status: ""}])}>+ 학력 추가</Button>

            <FormTitle>경력사항 입력</FormTitle>
            {careerList.map((career, idx) => (
              <React.Fragment key={idx}>
                {idx >= 1 && <Line></Line>}
                <InputContainer width="325px">
                  <Label>직장</Label>
                  <Input placeholder="회사명" width="150px"></Input>
                </InputContainer>
                <InputContainer width="650px">
                  <Label>직무</Label>
                  <Input placeholder="직무명" width="475px"></Input>
                </InputContainer>
                <InputContainer width="325px">
                  <Label>입사일</Label>
                  <Input type="month" width="150px"></Input>
                </InputContainer>
                <InputContainer width="325px">
                  <Label>퇴사일</Label>
                  <Input type="month" width="150px"></Input>
                </InputContainer>
                <InputContainer width="300px">
                  <Label>퇴사사유</Label>
                  <Input placeholder="이직 등" width="150px"></Input>
                </InputContainer>
                <InputContainer width="1000px">
                  <Label>업무 내용</Label>
                  <Input placeholder="담당했던 핵심 업무 내용" width="800px"></Input>
                </InputContainer>
              </React.Fragment>
            ))}
            <Button onClick={() => setCareerList([...careerList, { company: "", role: "", join: "", leave: "", reason: "", description: "" }])}>+ 경력 추가</Button>
          </Form>
        )}
        
        
        
        
        
        <Button onClick={getNextPage}>다음으로</Button>

{/* 

        <Form>
          <FormTitle>학력사항 입력</FormTitle>
          <InputContainer>
            <Label>학교</Label>
            <Input placeholder="이름"></Input>
          </InputContainer>
          <InputContainer>
            <Label>전공</Label>
            <Input placeholder="2025-01-01"></Input>
          </InputContainer>
          <InputContainer>
            <Label>사명</Label>
            <Input placeholder="fitconnect@gmail.com"></Input>
          </InputContainer>
          <InputContainer>
            <Label>직무</Label>
            <Input placeholder="010-0000-0000"></Input>
          </InputContainer>
          <LongInputContainer>
            <Label>활동 내용</Label>
            <LongInput placeholder="나를 한 줄로 표현해주세요!"></LongInput>
          </LongInputContainer>
        </Form>
        <Button>다음으로</Button>

        <Form>
          <FormTitle>기본정보 입력</FormTitle>
          <InputContainer>
            <Label>이름</Label>
            <Input placeholder="이름"></Input>
          </InputContainer>
          <InputContainer>
            <Label>생년월일</Label>
            <Input placeholder="2025-01-01"></Input>
          </InputContainer>
          <InputContainer>
            <Label>이메일</Label>
            <Input placeholder="fitconnect@gmail.com"></Input>
          </InputContainer>
          <InputContainer>
            <Label>휴대전화</Label>
            <Input placeholder="010-0000-0000"></Input>
          </InputContainer>
          <LongInputContainer>
            <Label>한 줄 소개</Label>
            <LongInput placeholder="나를 한 줄로 표현해주세요!"></LongInput>
          </LongInputContainer>
        </Form>
        <Button>다음으로</Button>


        <Form>
          <FormTitle>기본정보 입력</FormTitle>
          <InputContainer>
            <Label>이름</Label>
            <Input placeholder="이름"></Input>
          </InputContainer>
          <InputContainer>
            <Label>생년월일</Label>
            <Input placeholder="2025-01-01"></Input>
          </InputContainer>
          <InputContainer>
            <Label>이메일</Label>
            <Input placeholder="fitconnect@gmail.com"></Input>
          </InputContainer>
          <InputContainer>
            <Label>휴대전화</Label>
            <Input placeholder="010-0000-0000"></Input>
          </InputContainer>
          <LongInputContainer>
            <Label>한 줄 소개</Label>
            <LongInput placeholder="나를 한 줄로 표현해주세요!"></LongInput>
          </LongInputContainer>
        </Form>
        <Button>다음으로</Button> */}


      </Container>
    );
}