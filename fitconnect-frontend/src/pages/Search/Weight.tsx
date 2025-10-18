import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 420px;
  padding: 28px;
  border-radius: 20px;
  background: #fff9f5;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  text-align: center;
  color: #ff7f50;
  margin-bottom: 10px;
`;

const SliderBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 500;
  color: #444;
`;

const Value = styled.span`
  font-weight: 600;
  color: #ff7f50;
`;

const StyledSlider = styled.input`
  width: 100%;
  height: 6px;
  border-radius: 5px;
  appearance: none;
  background: linear-gradient(90deg, #ffb380, #ff7f50);
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: white;
    border: 2px solid #ff7f50;
    cursor: grab;
    transition: 0.2s;
  }

  &::-webkit-slider-thumb:hover {
    background: #fff4ee;
  }
`;

const Weight = () => {
  const [weights, setWeights] = useState({
    jobFit: 50,
    cultureFit: 50,
    growth: 50,
  });

  const handleChange = (key: string, value: number) => {
    setWeights({ ...weights, [key]: value });
  };

  return (
    <Container>
      <Title>🎯 가중치 조정</Title>
      <SliderBox>
        <Label>
          직무 적합성
          <Value>{weights.jobFit}%</Value>
        </Label>
        <StyledSlider
          type="range"
          min="0"
          max="100"
          value={weights.jobFit}
          onChange={(e) => handleChange("jobFit", Number(e.target.value))}
        />
      </SliderBox>

      <SliderBox>
        <Label>
          Culture Fit
          <Value>{weights.cultureFit}%</Value>
        </Label>
        <StyledSlider
          type="range"
          min="0"
          max="100"
          value={weights.cultureFit}
          onChange={(e) => handleChange("cultureFit", Number(e.target.value))}
        />
      </SliderBox>

      <SliderBox>
        <Label>
          성장 가능성
          <Value>{weights.growth}%</Value>
        </Label>
        <StyledSlider
          type="range"
          min="0"
          max="100"
          value={weights.growth}
          onChange={(e) => handleChange("growth", Number(e.target.value))}
        />
      </SliderBox>
    </Container>
  );
};

export default Weight;