import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { aiURL } from "../../env";
import { useAuth } from "../../components/AuthContext";
import colors from "../../styles/colors";
import axios from "axios";

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
`;

const Form = styled.div`
  width: 1000px;
  left: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0 70px;
  position: relative;
  background: #FFFFFF;
  border: 1px solid #9E9E9E;
  border-radius: 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const FormTitle = styled.div`
  width: 1000px;
  color: black;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
`;

const FormContent = styled.div`
  width: 800px;
  color: black;
  margin-top: 20px;
  background: #e6e6e6ff;
  border-radius: 10px;
`;

const FormParagraph = styled.p`
  margin-left: 40px;
  margin-top: 30px;
  margin-bottom: 30px;
  color: black;
  line-height: 30px;
`;

const ProgressBarContainer = styled.div`
  width: 600px;
  margin-left: 300px;
  margin-bottom: 40px;
  height: 20px;
  background: #e0e0e0;
  border-radius: 10px;
  position: relative;
`;

const Progress = styled.div<{ progress?: number, role?: string }>`
  width: ${(props) => props.progress}%;
  height: 100%;
  background: linear-gradient(90deg, ${({ role }) => (role === "company" ? colors.company_light : colors.talent_light )}, ${({ role }) => (role === "company" ? colors.company : colors.talent )});
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

const RecordButton = styled.button<{ role?: string }>`
  all: unset;
  width: 200px;
  height: 40px;
  background: ${({ role }) => (role === "company" ? colors.company : colors.talent )};
  color: #FFFFFF;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid #9E9E9E;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.1s ease;
  &:hover {
    background-color: ${({ role }) => (role === "company" ? colors.company_light : colors.talent_light )};
  }
  &:active {
    transform: scale(0.95);
  }
`;

const Button = styled.button<{ role?: string }>`
  all: unset;
  width: 200px;
  height: 40px;
  background: ${({ role }) => (role === "company" ? colors.company : colors.talent )};
  margin-top: 30px;
  margin-left: 900px;
  margin-bottom: 150px;
  color: #FFFFFF;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid #9E9E9E;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.1s ease;
  &:hover {
    background-color: ${({ role }) => (role === "company" ? colors.company_light : colors.talent_light )};
  }
  &:active {
    transform: scale(0.95);
  }
`;

const CanvasWrapper = styled.div`
  width: 200px;      
  height: 160px;
  background: #f0f0f0;
  border-radius: 15px;
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: flex-end; /* 막대가 아래에서 위로 올라오도록 */
  margin: 20px auto;    /* 위아래 여백, 가운데 정렬 */
  padding: 10px;         /* 캔버스와 여백 */
`;

const StyledCanvas = styled.canvas`
  width: 200px;
  height: 140px;
  border-radius: 10px;
  display: block;
`;

export default function Interview() {
    const { token, setToken, role, setRole } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!token || !role) navigate("/auth/login");
    }, []);

    const [page, setPage] = useState(1);

    const [recording, setRecording] = useState(false);
    const [audioUrls, setAudioUrls] = useState<(string | null)[]>([]);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunks = useRef<Blob[]>([]);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationRef = useRef<number | null>(null);


    const talentQuestionList = [
      "1️⃣ 간단한 자기소개와 함께, 최근 6개월 동안 가장 몰입했던 경험을 이야기해 주세요.",
      "2️⃣ 가장 의미 있었던 프로젝트나 업무 경험을 말씀해 주세요. 맡으신 역할과 결과도 함께 알려주세요.",
      "3️⃣ 팀원들과 협업할 때 본인만의 강점은 무엇이라고 생각하시나요?",
      "4️⃣ 일을 할 때 가장 중요하게 생각하는 가치는 무엇인가요?",
      "5️⃣ 앞으로 어떤 커리어를 그리고 계신가요?"]

    const companyQuestionList = [
      "1️⃣ 이번 포지션에서 가장 중요한 역할과 기대하는 역량은 무엇인가요?",
      "2️⃣ 이 포지션에서 뛰어난 성과를 낸 직원은 어떤 특징을 가지고 있었나요?\n(새롭게 만들어진 포지션이라면, 해당 포지션이 만들어진 이유를 알려주세요.)",
      "3️⃣ 팀에서 잘 맞는 성향이나 협업 스타일은 어떤 것인가요?",
      "4️⃣ 이 포지션에서 예상되는 어려움이나 도전 과제는 무엇인가요?",
      "5️⃣ 이 포지션에서 가장 중요하게 생각하는 인재상이나 가치관은 무엇인가요?"]

    const getNextPage = () => {
        if (page >= 6) {
            navigate("/assessment/result");
        } else {
            setPage(page + 1);
        }
    };

    const drawVolumeBar = () => {
        if (!analyserRef.current || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const analyser = analyserRef.current;
        const dataArray = new Uint8Array(analyser.fftSize);

        let displayedRms = 0;
        const smoothing = 0.1;

        const draw = () => {
            animationRef.current = requestAnimationFrame(draw);

            analyser.getByteTimeDomainData(dataArray);

            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
                const val = (dataArray[i] - 128) / 128;
                sum += val * val;
            }
            const rms = Math.sqrt(sum / dataArray.length);

            displayedRms += (rms - displayedRms) * smoothing;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const barHeight = displayedRms * canvas.height * 5;

            ctx.fillStyle = role == "company" ? colors.company : colors.talent;
            ctx.fillRect(canvas.width / 2 - 25, canvas.height - barHeight, 50, barHeight);
        };

        draw();
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            chunks.current = [];
            
            const audioContext = new AudioContext();
            const source = audioContext.createMediaStreamSource(stream);
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 64;
            source.connect(analyser);

            audioContextRef.current = audioContext;
            analyserRef.current = analyser;

            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) chunks.current.push(e.data);
            };

            mediaRecorderRef.current.onstop = async () => {
                if (animationRef.current) cancelAnimationFrame(animationRef.current);

                const blob = new Blob(chunks.current, { type: "audio/webm" });
                const url = URL.createObjectURL(blob);

                setAudioUrls((prev) => {
                    const urlArray = [...prev];
                    urlArray[page] = url;
                    return urlArray;
                });

                const file = new File([blob], `recording_${page}.webm`, { type: "audio/webm" });

                const formData = new FormData();
                formData.append("file", file);
                formData.append("language", "ko");

                try {
                    const res = await axios.post(`${aiURL}/api/stt/transcribe`, formData, {
                        headers: { "Content-Type": "multipart/form-data" },
                    });
                    console.log("녹음 결과 :", res.data);
                } catch (err) {
                    console.error("업로드 실패 :", err);
                }
            };
            mediaRecorderRef.current.start();
            setRecording(true);
        } catch (err) {
            console.error("마이크 접근 실패:", err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && recording) {
            mediaRecorderRef.current.stop();
            setRecording(false);
        }
    };

    useEffect(() => {
        if (recording && canvasRef.current && analyserRef.current) {
            drawVolumeBar();
        } else {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        }
    }, [recording]);


    if (role === "talent") {
        return (
          <Container>
            <Title>🎤 AI 분석 인터뷰</Title>
            <ProgressBarContainer>
              <Progress progress={page * 16.67} role={role}></Progress>
              <ProgressText>{page} / 6</ProgressText>
            </ProgressBarContainer>

            {page == 1 && (
              <Form>
                <FormTitle>시작 전 안내사항</FormTitle>
                <FormContent>
                  <FormParagraph>
                  <b>'딱 맞는 매칭'</b>을 위해, $이름$ 님을 조금 더 알아가고 싶어요.<br/>
                  <br/>
                  ✔️ AI 분석 인터뷰는 <b>총 5개의 질문</b>으로 이루어져 있으며, 소요 시간은 <b>약 15분</b> 정도로 예상돼요.<br/>
                  ✔️ 답변 내용에는 정답이 없으며, $이름$ 님의 <b>성향과 역량</b>을 파악하는 데 활용돼요.<br/>
                  ✔️ <b>자신의 경험을 돌아보는 시간</b>이라는 생각으로 편안하게 진행해 주세요.<br/>
                  ✔️ 시작 전, <b>마이크 상태와 주변 소음</b>을 한 번 확인해 주세요.<br/>
                  <br/>
                  모든 준비가 되었다면, 우측 하단의 <b>'시작하기'</b> 버튼을 눌러주세요!
                  </FormParagraph>  
                </FormContent>
              </Form>
            )}
            
            {page >= 2 && page <= 6 && (
              <Form>
                <FormTitle>{talentQuestionList[page - 2]}</FormTitle>
                  <CanvasWrapper>
                    {recording && (
                      <StyledCanvas ref={canvasRef} width={200} height={140} />
                    )}
                  </CanvasWrapper>
                  {!recording ? 
                    <RecordButton onClick={startRecording} role={role}>{audioUrls[page] ? "🎙️ 다시 녹음하기" : "🎙️ 녹음 시작"}</RecordButton>
                    : <RecordButton onClick={stopRecording} role={role}>⏹️ 녹음 종료</RecordButton>
                  }
                  {audioUrls[page] && (
                  <div style={{ marginTop: "20px" }}>
                      <audio controls src={audioUrls[page]}></audio>
                  </div>
                  )}
              </Form>
            )}

            {(page == 1 || audioUrls[page]) && 
              <Button onClick={getNextPage} role={role}>{page == 1 ? "시작하기" : (page <= 5 ? "다음으로" : "인터뷰 종료")}</Button>
            }
          </Container>
        )
    } else if (role === "company") {
        return (
          <Container>
            <Title>🎤 AI 분석 인터뷰</Title>
            <ProgressBarContainer>
              <Progress progress={page * 16.67} role={role}></Progress>
              <ProgressText>{page} / 6</ProgressText>
            </ProgressBarContainer>

            {page == 1 && (
              <Form>
                <FormTitle>시작 전 안내사항</FormTitle>
                <FormContent>
                  <FormParagraph>
                  <b>'딱 맞는 매칭'</b>을 위해, 어떤 인재가 $공고$ 포지션에 적합한지 구체적으로 파악해 볼게요.<br/>
                  <br/>
                  ✔️ AI 분석 인터뷰는 <b>총 5개의 질문</b>으로 이루어져 있으며, 소요 시간은 <b>약 15분</b> 정도로 예상돼요.<br/>
                  ✔️ 인터뷰 내용은 공개되지 않으며, 포지션에서 <b>요구하는 역량과 기대하는 역할</b>을 이해하는 데 활용돼요.<br/>
                  ✔️ <b>실무진 팀원들, 영입 담당자</b>가 함께 참여해 의견을 나누는 걸 권장드려요.<br/>
                  ✔️ 시작 전, <b>마이크 상태와 주변 소음</b>을 한 번 확인해 주세요.<br/>
                  <br/>
                  모든 준비가 되었다면, 우측 하단의 <b>'시작하기'</b> 버튼을 눌러주세요!
                  </FormParagraph>  
                </FormContent>
              </Form>
            )}
            
            {page >= 2 && page <= 6 && (
              <Form>
                <FormTitle style={{ whiteSpace: 'pre-line' }}>{companyQuestionList[page - 2]}</FormTitle>
                  <CanvasWrapper>
                    {recording && (
                      <StyledCanvas ref={canvasRef} width={200} height={140} />
                    )}
                  </CanvasWrapper>
                  {!recording ? 
                    <RecordButton onClick={startRecording} role={role}>{audioUrls[page] ? "🎙️ 다시 녹음하기" : "🎙️ 녹음 시작"}</RecordButton>
                    : <RecordButton onClick={stopRecording} role={role}>⏹️ 녹음 종료</RecordButton>
                  }
                  {audioUrls[page] && (
                  <div style={{ marginTop: "20px" }}>
                      <audio controls src={audioUrls[page]}></audio>
                  </div>
                  )}
              </Form>
            )}

            {(page == 1 || audioUrls[page]) && 
              <Button onClick={getNextPage} role={role}>{page == 1 ? "시작하기" : (page <= 5 ? "다음으로" : "인터뷰 종료")}</Button>
            }
          </Container>
        )
    }
}
