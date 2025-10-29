
import styled from "styled-components";
import colors from "../styles/colors";

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
  left: 350px;
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

const CardFace = styled.div`
  backface-visibility: hidden;
`;

const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
  width: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProfileContainer = styled.div<{ role?: string }>`
  width: calc(100% + 2px);
  height: 90px;
  margin-top: -1px;
  background: ${({ role }) => (role === "company" ? colors.company_light : colors.talent_light )};
  border-radius: 15px 15px 0 0;
`;

const ProfileImage = styled.div`
  width: 200px;
  height: 50px;
  background: #FFFFFF;
  border-radius: 50px;
  text-align: center;
  position: relative;
  left: 40px;
  top: 20px;
  & > img {
    position: relative;
    left: -62px;
    margin-top: 7px;
  }
`;

const ProfileName = styled.div`
  color: black;
  position: relative;
  left: 92px;
  top: -20px;
  width: 130px;
  text-align: center;
  font-size: 18.5px;
  font-weight: 600;
`;

const ProfileContent = styled.div`
  color: black;
  font-size: 12px;
  font-weight: 500;
  position: relative;
  left: 256px;
  top: -52px;
`;

const Introduction = styled.div`
  width: 450px;
  margin-top: 14px;
  margin-bottom: 2px;
  margin-left: 25px;
  border-radius: 10px;
  color: black;
  font-size: 12px;
  line-height: 30px;
  text-align: center;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div<{ role?: string }>`
  width: 200px;
  height: 178px;
  margin-top: 10px;
  color: black;
  background: ${({ role }) => (role === "company" ? "#f7e7e7ff" : "#dde6f3ff" )};
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
`;

const ContentTitle = styled.div`
  padding-left: 15px;
  padding-top: 12px;
  font-size: 13px;
  font-weight: 600;
  color: black;
`;

const ContentParagraph = styled.div`
  color: black;
  padding-left: 15px;
  padding-bottom: 15px;
  width: 170px;
  padding-top: 15px;
  font-size: 10px;
  line-height: 14px;
  & > span {
    display: block;
    min-height: 30px;
    width: 170px; 
    line-height: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Analysis = styled.div`
  color: black;
  margin-left: 50px;
  margin-top: 10px;
  width: 400px;
  height: 95px;
  padding-top: 7px;
  font-size: 10px;
  white-space: pre-line;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Tag = styled.span<{ level?: string }>`
    background: ${({ level }) => (level === "high" ? "#c3d4faff" : (level === "medium" ? "#b7f9caff" : "#fac3c3ff"))};
    border: 1px solid ${({ level }) => (level === "high" ? "#153772ff" : (level === "medium" ? "#0f6834ff" : "#b82323ff"))};
    color: ${({ level }) => (level === "high" ? "#153772ff" : (level === "medium" ? "#0f6834ff" : "#b82323ff"))};
    border-radius: 15px;
    margin-left: 3px;
    padding: 1.5px 5px;
    top: 1px;
    height: 10px;
    display: inline-block;
    position: relative;
`;

const CardBackContainer = styled.div`
    position: relative;
    top: -610px;
    width: 470px;
    height: 1px;
`;

const CardBackRegion = styled.div<{ role?: string }>`
    height: 580px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 12px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ role }) => (role === "company" ? colors.company : colors.talent )};
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      background-color: #ffffffff;
      border-radius: 10px;
      border: 2px solid #cccccc;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: ${({ role }) => (role === "company" ? colors.company_light : colors.talent_light )};
    }
`;

const BackRegion = styled.div`
    background: rgba(255, 255, 255, 0.48);
    width: 430px;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
`;

const BackTitle = styled.div`
    color: black;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 10px;
`;

const BackContent = styled.div`
    color: black;
    font-size: 12px;
    line-height: 22px;
    font-weight: 400;
    margin-bottom: 5px;
    width: 425px;
    position: relative;
    left: 5px;
    padding-left: 5px;
    display: list-item;
    list-style-type: "·";
    white-space: pre-line;
`;

const BackButton = styled.button`
    all: unset;
    background: rgba(255, 255, 255, 0.48);
    width: 430px;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    color: black;
    font-size: 16px;
    font-weight: 600;
    z-index: 2;
    cursor: pointer;
    &:hover {
      background-color: rgba(255, 255, 255, 1);
    }
    &:active {
      transform: scale(0.95);
    }
`;

const BackLine = styled.hr`

`;

export {
    CardContainer,
    Card,
    CardFace,
    CardBack,
    ProfileContainer,
    ProfileImage,
    ProfileName,
    ProfileContent,
    Introduction,
    ContentContainer,
    Content,
    ContentTitle,
    ContentParagraph,
    Analysis,
    Tag,
    CardBackContainer,
    CardBackRegion,
    BackRegion,
    BackTitle,
    BackContent,
    BackButton,
    BackLine
};