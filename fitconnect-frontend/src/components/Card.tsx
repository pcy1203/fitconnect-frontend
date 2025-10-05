
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
    left: -50px;
    margin-top: 5px;
  }
`;

const ProfileName = styled.div`
  color: black;
  position: relative;
  left: 120px;
  top: -25px;
  font-size: 25px;
  font-weight: 600;
`;

const ProfileContent = styled.div`
  color: black;
  font-size: 16px;
  font-weight: 500;
  position: relative;
  left: 256px;
  top: -65px;
`;

const Introduction = styled.div`
  width: 450px;
  margin-top: 25px;
  margin-bottom: 10px;
  margin-left: 25px;
  border-radius: 10px;
  color: black;
  font-size: 16px;
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
  margin-top: 10px;
  color: black;
  background: ${({ role }) => (role === "company" ? "#f7e7e7ff" : "#dde6f3ff" )};
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
`;

const ContentTitle = styled.div`
  padding-left: 10px;
  padding-top: 15px;
  font-size: 16px;
  font-weight: 600;
  color: black;
`;

const ContentParagraph = styled.div`
  color: black;
  padding-left: 15px;
  padding-bottom: 15px;
  width: 170px;
  padding-top: 10px;
  font-size: 12px;
  white-space: pre-line;
  line-height: 25px;
`;

const Analysis = styled.div`
  color: black;
  margin-left: 50px;
  margin-top: 15px;
  width: 400px;
  padding-top: 10px;
  font-size: 12px;
  white-space: pre-line;
  line-height: 25px;
`;

const Tag = styled.span`
    background: #fac3c3ff;
    border: 1px solid #e64040ff;
    color: #c01010ff;
    border-radius: 15px;
    margin-left: 5px;
    padding: 1px 5px;
    position: relative;
    top: -1px;
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
    Tag
};