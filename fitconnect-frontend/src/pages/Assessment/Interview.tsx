import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { baseURL, aiURL } from "../../env";
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
  width: 800px;
  color: black;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
  padding: 0px 100px 0px 100px;
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

const StepContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  margin-bottom: 32px;
  margin-top: 10px;
`;

const Step = styled.div<{ role?: string, active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ role, active }) => (active ? (role === "company" ? colors.company : colors.talent ) : "#e5e7eb")};
  color: ${({ active }) => (active ? "white" : "#6b7280")};
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-weight: 600;
  transition: all 0.3s ease;
`;

const StepLabel = styled.span<{ role?: string, active?: boolean }>`
  font-size: 16px;
  line-height: 16px;
  color:${({ role, active }) => (active ? (role === "company" ? colors.company : colors.talent ) : "#6b6b6bff")};
  font-weight: ${({ active }) => (active ? 600 : 400)};
  transition: color 0.3s ease;
`;

const StepGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Divider = styled.div`
  width: 40px;
  height: 2px;
  margin-left: 10px;
  background-color: #cdcdcdff;
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
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

const AnswerButton = styled.button`
  all: unset;
  width: 200px;
  height: 40px;
  background: #999999ff;
  color: #FFFFFF;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid #9E9E9E;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.1s ease;
  &:hover {
    background-color: #c8c8c8ff;
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


const InputContainer = styled.div<{ width?: string }>`
    width: ${(props) => props.width || "500px"};
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`

const Label = styled.div`
    width: 80px;
    height: 70px;
    position: relative;
    padding-left: 40px;
    color: black;
    font-size: 16px;
    line-height: 70px;
`;

const Input = styled.textarea.withConfig({
    shouldForwardProp: (prop) => prop !== "hasError"
})<{ width?: string, height?: string, hasError?: boolean, role?: string }>`
    width: ${(props) => props.width || "300px"};
    height: ${(props) => props.height || "30px"};
    background: #FFFFFF;
    color: #000000;
    border: 1px solid #9E9E9E;
    padding: 10px 10px;
    &:focus {
        outline: none;
        border: 2px solid ${ colors.company };
        box-shadow: 0 0 6px rgba(99, 153, 251, 0.5);
    }
    &::placeholder {
        color: #dbdbdb;
    }
    font-family: inherit;
    resize: none;
`;

export default function Interview() {
    const { token, setToken, role, setRole, loading } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!loading && (!token || !role)) navigate("/auth/login");
    }, [loading, token]);

    const GENERAL = 1;
    const TECHNICAL = 2;
    const SITUATIONAL = 3;
    const stages = [
      { num: 1, label: "구조화 면접" },
      { num: 2, label: "직무 적합성 면접" },
      { num: 3, label: "상황 면접" },
    ];

    const [page, setPage] = useState(1);
    const [stage, setStage] = useState(0);  // General (1) -> Technical (2) -> Situational (3)
    const [tutorial, setTutorial] = useState(true);
    const [jobPosting, setJobPosting] = useState(false);  // Company : Final Page (before End of Page)
    const [finished, setFinished] = useState(false);  // End of Page
    const [sessionId, setSessionId] = useState(null);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [totalQuestions, setTotalQuestions] = useState(1);
    const [additionalInfo, setAdditionalInfo] = useState({ role: "", requirement: "", preference: "", capacity: ""});

    const [recording, setRecording] = useState(false);
    const [audioUrls, setAudioUrls] = useState<(string | null)[]>([]);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunks = useRef<Blob[]>([]);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationRef = useRef<number | null>(null);

    // const talentQuestionList = [
    //   "1️⃣ 간단한 자기소개와 함께, 최근 6개월 동안 가장 몰입했던 경험을 이야기해 주세요.",
    //   "2️⃣ 가장 의미 있었던 프로젝트나 업무 경험을 말씀해 주세요. 맡으신 역할과 결과도 함께 알려주세요.",
    //   "3️⃣ 팀원들과 협업할 때 본인만의 강점은 무엇이라고 생각하시나요?",
    //   "4️⃣ 일을 할 때 가장 중요하게 생각하는 가치는 무엇인가요?",
    //   "5️⃣ 앞으로 어떤 커리어를 그리고 계신가요?"]

    // const companyQuestionList = [
    //   "1️⃣ 이번 포지션에서 가장 중요한 역할과 기대하는 역량은 무엇인가요?",
    //   "2️⃣ 이 포지션에서 뛰어난 성과를 낸 직원은 어떤 특징을 가지고 있었나요?\n(새롭게 만들어진 포지션이라면, 해당 포지션이 만들어진 이유를 알려주세요.)",
    //   "3️⃣ 팀에서 잘 맞는 성향이나 협업 스타일은 어떤 것인가요?",
    //   "4️⃣ 이 포지션에서 예상되는 어려움이나 도전 과제는 무엇인가요?",
    //   "5️⃣ 이 포지션에서 가장 중요하게 생각하는 인재상이나 가치관은 무엇인가요?"]

    const getTutorial = () => {
        setStage(stage + 1);
        setTutorial(true);
        setAudioUrls([]);
    };
    
    const startInterview = async () => {
        try {
            if (role == "talent" && stage == GENERAL) {
                const res = await axios.post(`${aiURL}/api/interview/general/start`);
                setSessionId(res.data?.session_id);
                setQuestion(res.data?.question);
                setTotalQuestions(res.data?.total_questions);
            } else if (role == "talent" && stage == TECHNICAL) {
                const profile = await axios.get(`${baseURL}/api/me/talent/full`);
                const res = await axios.post(`${aiURL}/api/interview/technical/start`, {
                    session_id: sessionId,
                    data: profile.data.data,
                });
                setQuestion(res.data?.question);
                setTotalQuestions(res.data?.total_questions);
            } else if (role == "talent" && stage == SITUATIONAL) {
                const res = await axios.post(`${aiURL}/api/interview/situational/start`, {}, {
                    params: {
                        session_id: sessionId,
                    }
                });
                setQuestion(res.data?.question);
                setTotalQuestions(res.data?.total_questions);
            } else if (role == "company" && stage == GENERAL) {
                const res = await axios.post(`${aiURL}/api/company-interview/general/start`);
                setSessionId(res.data?.session_id);
                setQuestion(res.data?.question);
                setTotalQuestions(res.data?.total_questions);
            } else if (role == "company" && stage == TECHNICAL) {
                const companyProfile = await axios.get(`${baseURL}/api/me/company/full`);
                const jobProfile = await axios.get(`${baseURL}/api/me/job-postings`);
                // TO-DO : 백엔드 구현 이후 전달할 데이터 수정 ===============================================================
                const res = await axios.post(`${aiURL}/api/company-interview/technical/start`, {
                    session_id: sessionId,
                    company_data: companyProfile.data?.data,
                    job_data: jobProfile.data?.data,
                });
                setQuestion(res.data?.question);
                setTotalQuestions(res.data?.total_questions);
            } else if (role == "company" && stage == SITUATIONAL) {
                const res = await axios.post(`${aiURL}/api/company-interview/situational/start`, {}, {
                    params: {
                        session_id: sessionId,
                    }
                });
                setQuestion(res.data?.question);
                setTotalQuestions(res.data?.total_questions);
            }
            setPage(1);
            setTutorial(false); 
        } catch (err) {
            console.error("오류 발생 :", err);
        }
    }

    const getNextPage = async () => {
        try {
            if (role == "talent" && stage == GENERAL) {
                const res = await axios.post(`${aiURL}/api/interview/general/answer/text`, {
                    session_id: sessionId,
                    answer: answer,
                });
                console.log(res.data);
                setQuestion(res.data?.next_question);
                if (page == totalQuestions) {
                    await axios.get(`${aiURL}/api/interview/general/analysis`, {
                        params: {
                            session_id: sessionId,
                        }
                    });
                    getTutorial();
                }
            } else if (role == "talent" && stage == TECHNICAL) {
                const res = await axios.post(`${aiURL}/api/interview/technical/answer/text`, {
                    session_id: sessionId,
                    answer: answer,
                });
                setQuestion(res.data?.next_question);
                if (page == totalQuestions) {
                    await axios.get(`${aiURL}/api/interview/technical/results`, {
                        params: {
                            session_id: sessionId,
                        }
                    });
                    getTutorial();
                }
            } else if (role == "talent" && stage == SITUATIONAL) {
                const res = await axios.post(`${aiURL}/api/interview/situational/answer/text`, {
                    session_id: sessionId,
                    answer: answer,
                });
                setQuestion(res.data?.next_question);
                if (page == totalQuestions) {
                    await axios.get(`${aiURL}/api/interview/situational/report`, {
                        params: {
                            session_id: sessionId,
                        }
                    });
                    setFinished(true);
                    await axios.get(`${aiURL}/api/interview/profile-card`, {
                        params: {
                            session_id: sessionId,
                        }
                    });
                }
            } else if (role == "company" && stage == GENERAL) {
                const res = await axios.post(`${aiURL}/api/company-interview/general/answer`, {
                    session_id: sessionId,
                    answer: answer,
                });
                setQuestion(res.data?.next_question);
                if (page == totalQuestions) {
                    await axios.get(`${aiURL}/api/company-interview/general/analysis`, {
                        params: {
                            session_id: sessionId,
                        }
                    });
                    getTutorial();
                }
            } else if (role == "company" && stage == TECHNICAL) {
                const res = await axios.post(`${aiURL}/api/company-interview/technical/answer`, {
                    session_id: sessionId,
                    answer: answer,
                });
                setQuestion(res.data?.next_question);
                if (page == totalQuestions) {
                  await axios.get(`${aiURL}/api/company-interview/technical/analysis`, {
                      params: {
                          session_id: sessionId,
                      }
                  });
                  getTutorial();
                }
            } else if (role == "company" && stage == SITUATIONAL) {
                const res = await axios.post(`${aiURL}/api/company-interview/situational/answer`, {
                    session_id: sessionId,
                    answer: answer,
                });
                setQuestion(res.data?.next_question);
                if (page == totalQuestions) {
                    await axios.get(`${aiURL}/api/interview/situational/analysis`, {
                        params: {
                            session_id: sessionId,
                        }
                    });
                    setJobPosting(true);
                    // TO-DO : AI 구현 이후 공고 정보 로드 (프론트로 보여줘야 함) ===============================================================
                    // const res = await axios.get(`${baseURL}/api/me/job-postings`);
                }
            }
            setPage(page + 1);
        } catch (err) {
            console.error("오류 발생 :", err);
        }
    };

    const postJobPosting = () => {
        // TO-DO : 백엔드 구현 이후 수정된 공고 내용 저장 ===============================================================
        // await axios.patch(`${baseURL}/api/me/job-postings`, {
        //     params: {}
        // });

        // TO-DO : AI 구현 이후 공고 내용 확정 ===============================================================
        // await axios.get(`${aiURL}/api/interview/job-posting`, {
        //     params: {
        //         session_id: sessionId,
        //     }
        // });
        setFinished(true);
    }

    const finishInterview = () => {
        navigate("/assessment/result");
    }

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
                    setAnswer(res.data?.text);
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
              <StepContainer>
                {stages.map((stageElement, idx) => (
                  <StepGroup key={stageElement.num}>
                    <Step role={role} active={stage === stageElement.num}>{stageElement.num}</Step>
                    <StepLabel role={role} active={stage === stageElement.num}>{stageElement.label}</StepLabel>
                    {idx < stages.length - 1 && <Divider />}
                  </StepGroup>
                ))}
              </StepContainer>

            {!stage && (
              <>
              <Form>
                <FormTitle>시작 전 안내사항</FormTitle>
                <FormContent>
                  <FormParagraph>
                  <b>'딱 맞는 매칭'</b>을 위해, $이름$ 님을 조금 더 알아가고 싶어요.<br/>
                  <br/>
                  📌 AI 분석 인터뷰는 <b>3단계</b>로 이루어져 있으며, 총 소요 시간은 <b>약 30분</b> 정도로 예상돼요.<br/>
                  📌 답변에는 정답이 없으며, <b>자신의 경험을 돌아보는 시간</b>이라는 생각으로 편안하게 진행해 주세요.<br/>
                  📌 시작 전, <b>마이크 상태와 주변 소음</b>을 한 번 확인해 주세요.<br/>
                  <br/>
                  모든 준비가 되었다면, 우측 하단의 <b>'시작하기'</b> 버튼을 눌러주세요!
                  </FormParagraph>  
                </FormContent>
              </Form>
              <Button onClick={getTutorial} role={role}>인터뷰 시작하기</Button>
              </>
            )}

            {stage == GENERAL && tutorial && (
              <>
              <Form>
                <FormTitle>1️⃣ 구조화 면접</FormTitle>
                <FormContent>
                  <FormParagraph>
                  <b>구조화 면접</b>은 정해진 질문을 통해 $이름$ 님의 전반적인 경험을 파악하는 단계예요.<br/>
                  <br/>
                  ✔️ 구조화 면접은 <b>총 5개의 질문</b>으로 이루어져 있으며, 소요 시간은 <b>약 7분</b> 정도로 예상돼요.<br/>
                  ✔️ 경력, 강점, 가치관 등 포괄적인 주제를 중심으로 $이름$ 님의 <b>경험과 역량</b>을 이해하는 데 활용돼요.<br/>
                  ✔️ 각 질문의 답변은 <b>약 50 ~ 100초</b> 정도로, 너무 짧거나 길지 않게 조절해주세요.<br/>
                  <br/>
                  너무 부담 갖지 말고, 편안한 마음으로 우측 하단의 <b>'시작하기'</b> 버튼을 눌러 면접을 시작해주세요!
                  </FormParagraph>  
                </FormContent>
              </Form>
              <Button onClick={startInterview} role={role}>시작하기</Button>
              </>
            )}

            {stage == TECHNICAL && tutorial && (
              <>
              <Form>
                <FormTitle>2️⃣ 직무 적합성 면접</FormTitle>
                <FormContent>
                  <FormParagraph>
                  <b>직무 적합성 면접</b>은 맞춤형 질문을 통해 $이름$ 님의 직무 관련 경험과 기술을 구체적으로 알아보는 단계예요.<br/>
                  <br/>
                  ✔️ 직무 적합성 면접은 <b>8 ~ 10개의 질문</b>으로 이루어져 있으며, 소요 시간은 <b>약 15분</b> 정도로 예상돼요.<br/>
                  ✔️ 문제 해결 경험을 바탕으로 $이름$ 님의 <b>강점과 직무 역량·기술</b>을 이해하는 데 활용돼요.<br/>
                  ✔️ 각 질문의 답변은 <b>약 50 ~ 100초</b> 정도로, 너무 짧거나 길지 않게 조절해주세요.<br/>
                  <br/>
                  충분히 생각이 정리되었다면, 우측 하단의 <b>'시작하기'</b> 버튼을 눌러 면접을 시작해주세요!
                  </FormParagraph>  
                </FormContent>
              </Form>
              <Button onClick={startInterview} role={role}>시작하기</Button>
              </>
            )}

            {stage == SITUATIONAL && tutorial && (
              <>
              <Form>
                <FormTitle>3️⃣ 상황 면접</FormTitle>
                <FormContent>
                  <FormParagraph>
                  <b>상황 면접</b>은 맞춤형 질문을 통해 $이름$ 님의 업무 성향을 알아보는 단계예요.<br/>
                  <br/>
                  ✔️ 상황 면접은 <b>5 ~ 7개의 질문</b>으로 이루어져 있으며, 소요 시간은 <b>약 8분</b> 정도로 예상돼요.<br/>
                  ✔️ 가상의 상황에서의 판단 내용을 바탕으로 $이름$ 님의 <b>협업 성향과 성장 가능성</b>을 이해하는 데 활용돼요.<br/>
                  ✔️ 각 질문의 답변은 <b>약 50 ~ 100초</b> 정도로, 너무 짧거나 길지 않게 조절해주세요.<br/>
                  <br/>
                  마지막까지 최선을 다해, 우측 하단의 <b>'시작하기'</b> 버튼을 눌러 면접을 시작해주세요!
                  </FormParagraph>  
                </FormContent>
              </Form>
              <Button onClick={startInterview} role={role}>시작하기</Button>
              </>
            )}
            
            {!tutorial && (
              <>
              <ProgressBarContainer>
                <Progress progress={100 * (page / totalQuestions)} role={role}></Progress>
                <ProgressText>{page} / {totalQuestions}</ProgressText>
              </ProgressBarContainer>
              <Form>
                <FormTitle style={{ whiteSpace: 'pre-line' }}>{question}</FormTitle>
                  <CanvasWrapper>
                    {recording && (
                      <StyledCanvas ref={canvasRef} width={200} height={140} />
                    )}
                  </CanvasWrapper>
                  <ButtonContainer>
                  {!recording ? 
                    <RecordButton onClick={startRecording} role={role}>{audioUrls[page] ? "🎙️ 다시 녹음하기" : "🎙️ 녹음 시작"}</RecordButton>
                    : <RecordButton onClick={stopRecording} role={role}>⏹️ 녹음 종료</RecordButton>
                  }
                  {/* {audioUrls[page] && (
                    <AnswerButton onClick={() => alert(answer)} role={role}>✍️ 답변 내용 확인하기</AnswerButton>
                  )} */}
                  </ButtonContainer>
                  {audioUrls[page] && (
                  <div style={{ marginTop: "20px" }}>
                      <audio controls src={audioUrls[page]}></audio>
                  </div>
                  )}
              </Form>
              {audioUrls[page] && (
                <>
                <Button onClick={getNextPage} role={role}>{page < totalQuestions ? "답변 제출 · 다음으로" : "답변 제출 · 마무리"}</Button>
                </>
              )}
              </>
            )}

            {finished && (
              <>
              <Form>
                <FormTitle>인터뷰 종료</FormTitle>
                <FormContent>
                  <FormParagraph>
                  3단계의 인터뷰가 모두 <b>완료</b>되어, AI가 인터뷰 내용을 분석 중이에요.<br/>
                  <br/>
                  🤚 긴 시간 <b>인터뷰에 성실하게 답해주셔서 진심으로 감사드려요</b>.<br/>
                  🤚 답변 내용을 바탕으로 $이름$ 님의 <b>경험, 강점, 역량, 성향</b>을 파악하고 있어요.<br/>
                  🤚 분석한 내용은 한 눈에 확인 가능하도록 <b>역량 카드</b>로 만들어드려요.<br/>
                  🤚 역량 카드 내용을 바탕으로, <b>'공고 탐색' 탭에서 맞춤형 공고를 추천</b>드려요.<br/>
                  <br/>
                  만들어진 역량 카드가 궁금하다면, 우측 하단의 <b>'분석 결과 확인하기'</b> 버튼을 눌러주세요!
                  </FormParagraph>  
                </FormContent>
              </Form>
              <Button onClick={finishInterview} role={role}>분석 결과 확인하기</Button>
              </>
            )}
          </Container>
        )
    } else if (role === "company") {
        return (
          <Container>
            <Title>🎤 AI 분석 인터뷰</Title>
              <StepContainer>
                {stages.map((stageElement, idx) => (
                  <StepGroup key={stageElement.num}>
                    <Step role={role} active={stage === stageElement.num}>{stageElement.num}</Step>
                    <StepLabel role={role} active={stage === stageElement.num}>{stageElement.label}</StepLabel>
                    {idx < stages.length - 1 && <Divider />}
                  </StepGroup>
                ))}
              </StepContainer>

            {!stage && (
              <>
              <Form>
                <FormTitle>시작 전 안내사항</FormTitle>
                <FormContent>
                  <FormParagraph>
                  <b>'딱 맞는 매칭'</b>을 위해, 어떤 인재가 $공고$ 포지션에 적합한지 구체적으로 파악해 볼게요.<br/>
                  <br/>
                  📌 AI 분석 인터뷰는 <b>3단계</b>로 이루어져 있으며, 총 소요 시간은 <b>약 30분</b> 정도로 예상돼요.<br/>
                  📌 <b>실무진 팀원들, HR(인사팀) 담당자</b>가 함께 참여해 질문을 보고 의견을 나누는 걸 권장드려요.<br/>
                  📌 인터뷰 내용은 공개되지 않으며, 포지션에서 <b>요구하는 역량과 기대하는 역할</b>을 이해하는 데 활용돼요.<br/>
                  📌 인터뷰가 완료되면, AI가 공고 내용을 제안드릴 예정이에요. 내용을 자유롭게 수정 후 완성해주세요.<br/>
                  📌 시작 전, <b>마이크 상태와 주변 소음</b>을 한 번 확인해 주세요.<br/>
                  <br/>
                  모든 준비가 되었다면, 우측 하단의 <b>'시작하기'</b> 버튼을 눌러주세요!
                  </FormParagraph>  
                </FormContent>
              </Form>
              <Button onClick={getTutorial} role={role}>인터뷰 시작하기</Button>
              </>
            )}

            {stage == GENERAL && tutorial && (
              <>
              <Form>
                <FormTitle>1️⃣ 구조화 면접</FormTitle>
                <FormContent>
                  <FormParagraph>
                  <b>구조화 면접</b>은 정해진 질문을 통해 $공고$ 포지션의 전반적인 조건을 파악하는 단계예요.<br/>
                  <br/>
                  ✔️ 구조화 면접은 <b>총 5개의 질문</b>으로 이루어져 있으며, 소요 시간은 <b>약 7분</b> 정도로 예상돼요.<br/>
                  ✔️ 업무, 인재상 등 포괄적인 주제를 중심으로 $공고$ 포지션의 <b>주요 역할</b>을 이해하는 데 활용돼요.<br/>
                  ✔️ 각 질문의 답변은 <b>약 50 ~ 100초</b> 정도로, 너무 짧거나 길지 않게 조절해주세요.<br/>
                  <br/>
                  우측 하단의 <b>'시작하기'</b> 버튼을 눌러 면접을 시작해주세요!
                  </FormParagraph>  
                </FormContent>
              </Form>
              <Button onClick={startInterview} role={role}>시작하기</Button>
              </>
            )}

            {stage == TECHNICAL && tutorial && (
              <>
              <Form>
                <FormTitle>2️⃣ 직무 적합성 면접</FormTitle>
                <FormContent>
                  <FormParagraph>
                  <b>직무 적합성 면접</b>은 맞춤형 질문을 통해 $공고$ 포지션의 요구 역량과 기술을 구체적으로 알아보는 단계예요.<br/>
                  <br/>
                  ✔️ 직무 적합성 면접은 <b>8 ~ 10개의 질문</b>으로 이루어져 있으며, 소요 시간은 <b>약 15분</b> 정도로 예상돼요.<br/>
                  ✔️ 팀의 KPI와 포지션의 JD를 바탕으로 $공고$ 포지션의 <b>요구 역량</b>을 이해하는 데 활용돼요.<br/>
                  ✔️ 각 질문의 답변은 <b>약 50 ~ 100초</b> 정도로, 너무 짧거나 길지 않게 조절해주세요.<br/>
                  <br/>
                  우측 하단의 <b>'시작하기'</b> 버튼을 눌러 면접을 시작해주세요!
                  </FormParagraph>  
                </FormContent>
              </Form>
              <Button onClick={startInterview} role={role}>시작하기</Button>
              </>
            )}

            {stage == SITUATIONAL && tutorial && (
              <>
              <Form>
                <FormTitle>3️⃣ 상황 면접</FormTitle>
                <FormContent>
                  <FormParagraph>
                  <b>상황 면접</b>은 맞춤형 질문을 통해 조직/팀의 성격과 일하는 방식을 알아보는 단계예요.<br/>
                  <br/>
                  ✔️ 상황 면접은 <b>5 ~ 7개의 질문</b>으로 이루어져 있으며, 소요 시간은 <b>약 8분</b> 정도로 예상돼요.<br/>
                  ✔️ 가상의 상황에서의 판단 내용을 바탕으로 팀의 <b>인재상과 도전 과제</b>를 이해하는 데 활용돼요.<br/>
                  ✔️ 각 질문의 답변은 <b>약 50 ~ 100초</b> 정도로, 너무 짧거나 길지 않게 조절해주세요.<br/>
                  <br/>
                  마지막까지 최선을 다해, 우측 하단의 <b>'시작하기'</b> 버튼을 눌러 면접을 시작해주세요!
                  </FormParagraph>  
                </FormContent>
              </Form>
              <Button onClick={startInterview} role={role}>시작하기</Button>
              </>
            )}
            
            {!tutorial && (
              <>
              <ProgressBarContainer>
                <Progress progress={100 * (page / totalQuestions)} role={role}></Progress>
                <ProgressText>{page} / {totalQuestions}</ProgressText>
              </ProgressBarContainer>
              <Form>
                <FormTitle style={{ whiteSpace: 'pre-line' }}>{question}</FormTitle>
                  <CanvasWrapper>
                    {recording && (
                      <StyledCanvas ref={canvasRef} width={200} height={140} />
                    )}
                  </CanvasWrapper>
                  <ButtonContainer>
                  {!recording ? 
                    <RecordButton onClick={startRecording} role={role}>{audioUrls[page] ? "🎙️ 다시 녹음하기" : "🎙️ 녹음 시작"}</RecordButton>
                    : <RecordButton onClick={stopRecording} role={role}>⏹️ 녹음 종료</RecordButton>
                  }
                  {/* {audioUrls[page] && (
                    <AnswerButton onClick={() => alert(answer)} role={role}>✍️ 답변 내용 확인하기</AnswerButton>
                  )} */}
                  </ButtonContainer>
                  {audioUrls[page] && (
                  <div style={{ marginTop: "20px" }}>
                      <audio controls src={audioUrls[page]}></audio>
                  </div>
                  )}
              </Form>
              {audioUrls[page] && (
                <>
                <Button onClick={getNextPage} role={role}>{page < totalQuestions ? "답변 제출 · 다음으로" : "답변 제출 · 마무리"}</Button>
                </>
              )}
              </>
            )}

            {jobPosting && !finished && (
              <>
              <Form>
                <FormTitle>AI 공고 내용 추천</FormTitle>
                <FormContent style={{ 'marginBottom': '30px' }}>
                  <FormParagraph>
                  3단계의 인터뷰가 모두 <b>완료</b>되어, AI가 공고에 들어갈 내용을 추천드려요.<br/>
                  <br/>
                  ✍️ 긴 시간 <b>인터뷰에 성실하게 답해주셔서 진심으로 감사드려요</b>.<br/>
                  ✍️ AI가 작성한 내용을 바탕으로, <b>공고 내용을 수정하여 최종 완성</b>해주세요!<br/>
                  </FormParagraph>  
                </FormContent>
                <InputContainer width="1000px">
                  <Label style={{ 'marginBottom': '30px' }}>업무 내용</Label>
                  <Input style={{ 'height': '200px', 'marginBottom': '30px' }} placeholder="담당하게 될 업무 내용을 소개해주세요." value={additionalInfo.role} onChange={(e) => setAdditionalInfo((prev) => ({ ...prev, role: e.target.value }))} width="800px"></Input>
                </InputContainer>
                <InputContainer width="1000px">
                  <Label style={{ 'marginBottom': '30px' }}>필수 요건</Label>
                  <Input style={{ 'height': '200px', 'marginBottom': '30px' }} placeholder="지원 자격/요건을 작성해주세요." value={additionalInfo.requirement} onChange={(e) => setAdditionalInfo((prev) => ({ ...prev, requirement: e.target.value }))} width="800px"></Input>
                </InputContainer>
                <InputContainer width="1000px">
                  <Label style={{ 'marginBottom': '30px' }}>우대 사항</Label>
                  <Input style={{ 'height': '200px', 'marginBottom': '30px' }} placeholder="우대 사항을 작성해주세요." value={additionalInfo.preference} onChange={(e) => setAdditionalInfo((prev) => ({ ...prev, preference: e.target.value }))} width="800px"></Input>
                </InputContainer>
                <InputContainer width="1000px">
                  <Label style={{ 'marginBottom': '30px' }}>요구 역량</Label>
                  <Input style={{ 'height': '200px', 'marginBottom': '30px' }} placeholder="요구하는 역량을 선택해주세요." value={additionalInfo.capacity} onChange={(e) => setAdditionalInfo((prev) => ({ ...prev, capacity: e.target.value }))} width="800px"></Input>
                </InputContainer>
              </Form>
              <Button onClick={postJobPosting} role={role}>분석 결과 확인하기</Button>
              </>
            )}

            {finished && (
              <>
              <Form>
                <FormTitle>인터뷰 종료</FormTitle>
                <FormContent>
                  <FormParagraph>
                  3단계의 인터뷰 및 공고 작성이 모두 <b>완료</b>되어, AI가 인터뷰와 공고 내용을 분석 중이에요.<br/>
                  <br/>
                  🤚 답변 내용을 바탕으로 $공고$ 포지션의 <b>주요 역할/업무, 요구 역량</b>을 파악하고 있어요.<br/>
                  🤚 분석한 내용은 한 눈에 확인 가능하도록 <b>공고 카드</b>로 만들어드려요.<br/>
                  🤚 공고 카드 내용을 바탕으로, <b>'인재 탐색' 탭에서 맞춤형 인재를 추천</b>드려요.<br/>
                  <br/>
                  만들어진 공고 카드가 궁금하다면, 우측 하단의 <b>'분석 결과 확인하기'</b> 버튼을 눌러주세요!
                  </FormParagraph>  
                </FormContent>
              </Form>
              <Button onClick={finishInterview} role={role}>분석 결과 확인하기</Button>
              </>
            )}
          </Container>
        )
    }
}
