import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { baseURL, aiURL } from "../../env";
import { useAuth } from "../../components/AuthContext";
import colors from "../../styles/colors";
import axios from "axios";
import company from '../../assets/company.png';
import arrowCompany from '../../assets/arrow-company.png';

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

const FullScreen = styled.div`
  width: 100vw;
  min-height: calc(100% + 80px);
  position: absolute;
  left: 0px;
  top: -80px;
  z-index: 20;
  background: #F7F8FA;
`;

const FormInterview = styled.div`
  width: 1000px;
  left: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0 30px;
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
  font-size: 14px;
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
  width: 350px;
  margin-left: 730px;
  top: -59px;
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
  width: 50px;
  top: 3px;
  left: 310px;
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
  &:disabled {
    background-color: #bdbdbd;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const ChatContainer = styled.div`
  width: 600px;
  height: 400px;
  position: relative;
  background-color: #F7F8FA;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ role }) => (role === "company" ? colors.company_lighter : colors.talent_lighter )};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: #ffffffff;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ role }) => (role === "company" ? colors.company_light : colors.talent_light )};
  }
`;

const ChatQuestion = styled.div<{ role?: string }>`
  width: 400px;
  margin-left: 20px;
  font-size: 10px;
  color: black;
  padding: 10px 20px 10px 20px;
  margin-bottom: 20px;
  border-radius: 20px;
  background-color: ${({ role }) => (role === "company" ? colors.company_lighter : colors.talent_lighter )};
`;

const ChatAnswer = styled.div`
  width: 400px;
  font-size: 10px;
  color: black;
  margin-left: 80px;
  padding: 10px 20px 10px 20px;
  margin-bottom: 20px;
  border-radius: 20px;
  background-color: #ffffff;
`;

const CanvasWrapper = styled.div`
  width: 0.5px;      
  height: 160px;
  background: #f0f0f0;
  border-radius: 15px;
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.1);
  display: flex;
  position: relative;
  left: 475px;
  top: -380px;
  justify-content: center;
  align-items: flex-end;
  margin: 20px auto;
  padding: 10px;
`;

const MicIcon = styled.div`
  width: 30px;
  height: 20px;
  font-size: 14px;
  border-radius: 20px;
  position: relative;
  top: 38px;
  left: -5px;
  text-align: center;
  background: #f0f0f0;
`;

const StyledCanvas = styled.canvas`
  width: 40px;
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

const Paragraph = styled.div`
  width: 1000px;
  color: black;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 10px;
  padding: 0px 100px 0px 100px;
`;

const JobContainer = styled.div`
  position: relative;
  top: 0px;
  left: 300px;
  width: 610px;
  height: 1px;
`;

const JobRegion = styled.div<{ role?: string }>`
  height: 620px;
  overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 12px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #bbb;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background-color: #ffffffff;
        border-radius: 10px;
        border: 2px solid #cccccc;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #ddd;
    }
`;

const JobPosting = styled.div`
  width: 560px;
  height: 100px;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 5px;
  background: rgba(255, 255, 255, 1);
  border: 2px solid #b2b2b2ff;
  border-radius: 5px;
  box-shadow: 1px 1px 1px rgba(171, 171, 171, 0.2);
  transition: transform 0.1s ease;
  &:hover {
    background: rgba(247, 247, 247, 1);
  }
  &:hover div {
    visibility: visible;
  }
  &:active {
    transform: scale(0.98);
  }
`;

const JobImage = styled.div`
  margin-left: 15px;
  margin-top: 15px;
  width: 30px;
`;

const JobTitle = styled.div`
  width: 300px;
  font-size: 14px;
  font-weight: 600;
  color: #242424ff;
  position: relative;
  top: -25px;
  left: 41px;
`;

const JobContent = styled.div`
  width: 320px;
  font-size: 12px;
  color: #242424ff;
  position: relative;
  top: -38px;
  left: 20px;
  line-height: 22px;
`;

const JobButton = styled.div<{ role?: string }>`
  all: unset;
  visibility: hidden;
  width: 50px;
  height: 22px;
  text-align: center;
  position: relative;
  cursor: pointer;
  font-size: 16px;
  top: -21px;
  left: 400px;
  font-weight: 600;
  color: ${({ role }) => (role === "company" ? colors.company : colors.talent )};
  transition: transform 0.1s ease;
  &:active {
    transform: scale(0.95);
  }
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

const CameraAndChatContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 1010px;
  gap: 20px;
  margin-top: 40px;
  margin-left: 80px;
`;

const CameraView = styled.video`
  width: 450px;
  height: 280px;
  margin-left: 30px;
  border-radius: 5px;
  background-color: #000;
  object-fit: cover;
`;

const AudioPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 0px;
  height: 0px;
  gap: 5px;
`;

const Timer = styled.div`
  position: absolute;
  background: #ffffff;
  top: -15px;
  right: 20px;
  border: 1px solid #9E9E9E;
  padding: 10px 15px 10px 15px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 600;
  color: black;
`;

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: any) => void;
  onend: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: {
      new (): SpeechRecognition;
    };
    webkitSpeechRecognition: {
      new (): SpeechRecognition;
    };
  }
}

export default function Interview() {
    const { token, setToken, role, setRole, loading } = useAuth();
    const [jobList, setJobList] = useState(null);
    const navigate = useNavigate();
    const queryJobId = new URLSearchParams(location.search).get("job");
    const [name, setName] = useState("$이름$");
    const [jobTitle, setJobTitle] = useState("$공고$");

    setRole("talent");
    // useEffect(() => {
    //     if (!loading && (!token || !role)) navigate("/auth/login");
    // }, [loading, token]);

    useEffect(() => {
        if (!loading && !queryJobId && role === 'company') {
            axios.get(`${baseURL}/api/me/company/job-postings`, { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
              setJobList(response.data.data);
            })
            .catch((error) => {
              console.error("데이터 불러오기 실패:", error);
            });
        } else if (jobTitle === "$공고$" && role === 'company') {
            axios.get(`${baseURL}/api/me/company/job-postings`, { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
              setJobTitle(response.data.data.find(job => job.id === Number(queryJobId))?.title);
            })
            .catch((error) => {
              console.error("데이터 불러오기 실패:", error);
            });
        }
    }, [location.search]);

    const GENERAL = 1;
    const TECHNICAL = 2;
    const SITUATIONAL = 3;
    const stages = [
      { num: 1, label: "구조화 면접" },
      { num: 2, label: "직무 적합성 면접" },
      { num: 3, label: "문화 적합성 면접" },
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
    const [sending, setSending] = useState(false);

    const [recording, setRecording] = useState(false);
    const [audioUrls, setAudioUrls] = useState<(string | null)[]>([]);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const chunks = useRef<Blob[]>([]);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationRef = useRef<number | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const [finalTranscript, setFinalTranscript] = useState('');
    const [interimTranscript, setInterimTranscript] = useState('');
    const [isBrowserSTTSupported, setIsBrowserSTTSupported] = useState(false);

    useEffect(() => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      setIsBrowserSTTSupported(!!SpeechRecognition);
    }, []);

    const getTutorial = () => {
      setStage(stage + 1);
      setTutorial(true);
      setAudioUrls([]);
      setName(sessionStorage.getItem("name"));
    };
    
    const initCamera = async () => {
      if (role === 'company') return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => console.error("Video play 실패:", err));
        }
      } catch (err) {
        console.error("카메라 접근 실패:", err);
      }
    };

    const startInterview = async () => {
        try {
            setSending(true);
            if (role == "talent" && stage == GENERAL) {
                const res = await axios.post(`${aiURL}/api/interview/general/start`);
                console.log(res.data);
                setSessionId(res.data?.session_id);
                setQuestion(res.data?.question);
                setTotalQuestions(res.data?.total_questions);
            } else if (role == "talent" && stage == TECHNICAL) {
                const profile = await axios.get(`${baseURL}/api/me/talent/full`, { headers: { Authorization: `Bearer ${token}` } });
                const res = await axios.post(`${aiURL}/api/interview/technical/start`, {
                    session_id: sessionId,
                    access_token: token,
                    data: profile.data.data,
                });
                console.log(res.data);
                setQuestion(res.data?.question);
                setTotalQuestions(Number(res.data?.progress.split("/")[1]));
            } else if (role == "talent" && stage == SITUATIONAL) {
                const res = await axios.post(`${aiURL}/api/interview/situational/start`, {}, {
                    params: {
                        session_id: sessionId,
                    }
                });
                console.log(res.data);
                setQuestion(res.data?.question);
                setTotalQuestions(6);
                // ====================================================================================
            } else if (role == "company" && stage == GENERAL) {
                const res = await axios.post(`${aiURL}/api/company-interview/general/start`, {
                    access_token: token,
                });
                console.log(res.data);
                setSessionId(res.data?.session_id);
                setQuestion(res.data?.question);
                setTotalQuestions(res.data?.total_questions);
            } else if (role == "company" && stage == TECHNICAL) {
                // const companyProfile = await axios.get(`${baseURL}/api/me/company/full`, { headers: { Authorization: `Bearer ${token}` } });
                const query = new URLSearchParams(location.search);
                const jobId = query.get("job");
                // const jobProfile = await axios.get(`${baseURL}/api/me/company/job-postings`, { headers: { Authorization: `Bearer ${token}` } });
                const res = await axios.post(`${aiURL}/api/company-interview/technical/start`, {
                    session_id: sessionId,
                    access_token: token,
                    job_posting_id: jobId,
                    // company_data: companyProfile.data?.data,
                    // job_data: jobProfile.data?.data.find(job => job.id === Number(jobId)),
                });
                console.log(res.data);
                setQuestion(res.data?.next_question?.question);
                setTotalQuestions(res.data?.total_questions);
            } else if (role == "company" && stage == SITUATIONAL) {
                const res = await axios.post(`${aiURL}/api/company-interview/situational/start`, {
                    session_id: sessionId,
                });
                console.log(res.data);
                setQuestion(res.data?.next_question?.question);
                setTotalQuestions(res.data?.total_questions);
            }
            setPage(1);
            setTutorial(false);
            setSending(false);
            initCamera();
        } catch (err) {
            console.error("오류 발생 :", err);
        }
    }

    const getNextPage = async () => {
        try {
            setSending(true);
            if (role == "talent" && stage == GENERAL) {
                const res = await axios.post(`${aiURL}/api/interview/general/answer/text`, {
                    session_id: sessionId,
                    answer: answer,
                });
                console.log(res.data);
                if (page == totalQuestions) {
                    await axios.get(`${aiURL}/api/interview/general/analysis/${sessionId}`);
                    getTutorial();
                }
                setQuestion(res.data?.next_question);
            } else if (role == "talent" && stage == TECHNICAL) {
                const res = await axios.post(`${aiURL}/api/interview/technical/answer`, {
                    session_id: sessionId,
                    answer: answer,
                });
                console.log(res.data);
                if (page == totalQuestions) {
                    await axios.get(`${aiURL}/api/interview/technical/results/${sessionId}`);
                    getTutorial();
                }
                setQuestion(res.data?.next_question?.question);
            } else if (role == "talent" && stage == SITUATIONAL) {
                const res = await axios.post(`${aiURL}/api/interview/situational/answer`, {
                    session_id: sessionId,
                    answer: answer,
                });
                console.log(res.data);
                if (page == totalQuestions) {
                    await axios.get(`${aiURL}/api/interview/situational/report/${sessionId}`);
                    setFinished(true);
                    const cardData = await axios.post(`${aiURL}/api/interview/profile-card/generate-and-post`, {
                        session_id: sessionId,
                        access_token: token,
                    });
                    console.log(cardData);
                    const vector = await axios.post(`${aiURL}/api/interview/matching-vectors/generate`, {
                        session_id: sessionId,
                        access_token: token,
                    });
                    console.log(vector);
                }
                setQuestion(res.data?.next_question?.question);
                // ====================================================================================
            } else if (role == "company" && stage == GENERAL) {
                const res = await axios.post(`${aiURL}/api/company-interview/general/answer`, {
                    session_id: sessionId,
                    answer: answer,
                });
                console.log(res.data);
                if (page == totalQuestions) {
                    await axios.get(`${aiURL}/api/company-interview/general/analysis/${sessionId}`);
                    getTutorial();
                }
                setQuestion(res.data?.next_question);
            } else if (role == "company" && stage == TECHNICAL) {
                const res = await axios.post(`${aiURL}/api/company-interview/technical/answer`, {
                    session_id: sessionId,
                    answer: answer,
                });
                console.log(res.data);
                if (res.data?.is_finished) {
                  await axios.get(`${aiURL}/api/company-interview/technical/analysis/${sessionId}`);
                  getTutorial();
                }
                setTotalQuestions(res.data?.total_questions);
                setQuestion(res.data?.next_question?.question);
            } else if (role == "company" && stage == SITUATIONAL) {
                const res = await axios.post(`${aiURL}/api/company-interview/situational/answer`, {
                    session_id: sessionId,
                    answer: answer,
                });
                console.log(res.data);
                if (res.data?.is_finished) {
                    const jobId = new URLSearchParams(location.search).get("job");
                    const response = await axios.post(`${aiURL}/api/company-interview/situational/analysis`, {
                      session_id: sessionId,
                      access_token: token,
                      job_posting_id: Number(jobId),
                    });
                    setJobPosting(true);
                    const jobProfile = await axios.get(`${baseURL}/api/me/company/job-postings`, { headers: { Authorization: `Bearer ${token}` } });
                    const originalJobPosting = jobProfile.data?.data.find(job => job.id === Number(jobId));
                    setAdditionalInfo({
                      role: `[ 기존에 작성한 내용 ]
${originalJobPosting.responsibilities}

=================================
[ AI 추천 공고 내용 ]
${response.data?.job_posting_data.responsibilities}` || "",
                      requirement: `[ 기존에 작성한 내용 ]
${originalJobPosting.requirements_must}

=================================
[ AI 추천 공고 내용 ]
${response.data?.job_posting_data.requirements_must}` || "",
                      preference: `[ 기존에 작성한 내용 ]
${originalJobPosting.requirements_nice}

=================================
[ AI 추천 공고 내용 ]
${response.data?.job_posting_data.requirements_nice}` || "",
                      capacity: `[ 기존에 작성한 내용 ]
${originalJobPosting.competencies}

=================================
[ AI 추천 공고 내용 ]
${response.data?.job_posting_data.competencies}` || "",
                    });
                }
                setTotalQuestions(res.data?.total_questions);
                setQuestion(res.data?.next_question?.question);
            }
            setPage(page + 1);
            setSending(false);
            initCamera();
        } catch (err) {
            console.error("오류 발생 :", err);
        }
    };

    const postJobPosting = async () => {
      try {
        const jobId = new URLSearchParams(location.search).get("job");        
        setSending(true);  
        const cardData = await axios.post(`${aiURL}/api/company-interview/generate`, {
          session_id: sessionId,
          access_token: token,       
          job_posting_id: Number(jobId),
          responsibilities: additionalInfo.role,
          requirements_must: additionalInfo.requirement,
          requirements_nice: additionalInfo.preference,
          competencies: additionalInfo.capacity,
        });
        setSending(false);
        setFinished(true);
      } catch (err) {
        console.error("오류 발생 :", err);
      }
    }

    const finishInterview = () => {
        if (role == "company") {
            navigate(`/assessment/result?job=${queryJobId}`);
        } else {
            navigate("/assessment/result");
        }
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

            ctx.fillStyle = role == "company" ? colors.company_light : colors.talent_light;
            ctx.fillRect(canvas.width / 2 - 25, canvas.height - barHeight, 50, barHeight);
        };

        draw();
    };

    const startBrowserSTT = () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        console.warn('브라우저가 Web Speech API를 지원하지 않습니다.');
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'ko-KR';
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interim = '';
        let final = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            final += transcript + ' ';
          } else {
            interim += transcript;
          }
        }
        if (final) {
          setFinalTranscript(prev => prev + final);
        }
        setInterimTranscript(interim);
      };
      recognition.onerror = (event) => {
        console.error('음성 인식 오류:', event.error);
        if (event.error === 'no-speech') {
          console.log('무음 감지 - 자동 재시작');
        }
      };
      recognition.onend = () => {
        if (recording) {
          recognition.start();
        }
      };
      recognition.start();
      recognitionRef.current = recognition;
    }
    
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
                if (finalTranscript) {
                  formData.append('browser_transcript', finalTranscript);
                }

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
            if (isBrowserSTTSupported) {
              startBrowserSTT();
            }
            setRecording(true);
            setFinalTranscript('');
            setInterimTranscript('');
        } catch (err) {
            console.error("마이크 접근 실패:", err);
        }
    };

    const stopRecording = () => {
      if (mediaRecorderRef.current && recording) {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        setRecording(false);
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
      setInterimTranscript('');
    };

    useEffect(() => {
      if (recording && canvasRef.current && analyserRef.current) {
        drawVolumeBar();
      } else {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      }
    }, [recording]);

    const [seconds, setSeconds] = useState(0);
    // useEffect(() => {
    //   const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    //   return () => clearInterval(timer);
    // }, []);

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
                  <b>'딱 맞는 매칭'</b>을 위해, {name} 님을 조금 더 알아가고 싶어요.<br/>
                  <br/>
                  📌 AI 분석 인터뷰는 <b>3단계</b>로 이루어져 있으며, 총 소요 시간은 <b>약 30분</b> 정도로 예상돼요.<br/>
                  📌 답변에는 정답이 없으며, <b>자신의 경험을 돌아보는 시간</b>이라는 생각으로 편안하게 진행해 주세요.<br/>
                  📌 시작 전, <b>카메라와 마이크 상태 및 주변 소음</b>을 한 번 확인해 주세요.<br/>
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
                  <b>구조화 면접</b>은 정해진 질문을 통해 {name} 님의 전반적인 경험을 파악하는 단계예요.<br/>
                  <br/>
                  ✔️ 구조화 면접은 <b>총 5개의 질문</b>으로 이루어져 있으며, 소요 시간은 <b>약 7분</b> 정도로 예상돼요.<br/>
                  ✔️ 경력, 강점, 가치관 등 포괄적인 주제를 중심으로 {name} 님의 <b>경험과 역량</b>을 이해하는 데 활용돼요.<br/>
                  ✔️ 각 질문의 답변은 <b>약 50 ~ 100초</b> 정도로, 너무 짧거나 길지 않게 조절해주세요.<br/>
                  <br/>
                  너무 부담 갖지 말고, 편안한 마음으로 우측 하단의 <b>'시작하기'</b> 버튼을 눌러 면접을 시작해주세요!
                  </FormParagraph>  
                </FormContent>
              </Form>
              <Button onClick={startInterview} disabled={sending} role={role}>{sending ? "질문 생각 중···" : "시작하기"}</Button>
              </>
            )}

            {stage == TECHNICAL && tutorial && (
              <>
              <Form>
                <FormTitle>2️⃣ 직무 적합성 면접</FormTitle>
                <FormContent>
                  <FormParagraph>
                  <b>직무 적합성 면접</b>은 맞춤형 질문을 통해 {name} 님의 직무 관련 경험과 기술을 구체적으로 알아보는 단계예요.<br/>
                  <br/>
                  ✔️ 직무 적합성 면접은 <b>8 ~ 10개의 질문</b>으로 이루어져 있으며, 소요 시간은 <b>약 15분</b> 정도로 예상돼요.<br/>
                  ✔️ 문제 해결 경험을 바탕으로 {name} 님의 <b>강점과 직무 역량·기술</b>을 이해하는 데 활용돼요.<br/>
                  ✔️ 각 질문의 답변은 <b>약 50 ~ 100초</b> 정도로, 너무 짧거나 길지 않게 조절해주세요.<br/>
                  <br/>
                  충분히 생각이 정리되었다면, 우측 하단의 <b>'시작하기'</b> 버튼을 눌러 면접을 시작해주세요!
                  </FormParagraph>  
                </FormContent>
              </Form>
              <Button onClick={startInterview} disabled={sending} role={role}>{sending ? "질문 생각 중···" : "시작하기"}</Button>
              </>
            )}

            {stage == SITUATIONAL && tutorial && (
              <>
              <Form>
                <FormTitle>3️⃣ 문화 적합성 면접</FormTitle>
                <FormContent>
                  <FormParagraph>
                  <b>문화 적합성 면접</b>은 맞춤형 질문을 통해 {name} 님의 업무 성향을 알아보는 단계예요.<br/>
                  <br/>
                  ✔️ 문화 적합성 면접은 <b>5 ~ 7개의 질문</b>으로 이루어져 있으며, 소요 시간은 <b>약 8분</b> 정도로 예상돼요.<br/>
                  ✔️ 특정 상황에서의 행동 내용을 바탕으로 {name} 님의 <b>협업 성향과 성장 가능성</b>을 이해하는 데 활용돼요.<br/>
                  ✔️ 각 질문의 답변은 <b>약 50 ~ 100초</b> 정도로, 너무 짧거나 길지 않게 조절해주세요.<br/>
                  <br/>
                  마지막까지 최선을 다해, 우측 하단의 <b>'시작하기'</b> 버튼을 눌러 면접을 시작해주세요!
                  </FormParagraph>  
                </FormContent>
              </Form>
              <Button onClick={startInterview} disabled={sending} role={role}>{sending ? "질문 생각 중···" : "시작하기"}</Button>
              </>
            )}
            
            {!tutorial && !finished && (
              <FullScreen>
                <Container>
                  <StepContainer style={{marginTop: '50px', position: 'relative', left: '-200px'}}>
                    {stages.map((stageElement, idx) => (
                      <StepGroup key={stageElement.num}>
                        <Step role={role} active={stage === stageElement.num}>{stageElement.num}</Step>
                        <StepLabel role={role} active={stage === stageElement.num}>{stageElement.label}</StepLabel>
                        {idx < stages.length - 1 && <Divider />}
                      </StepGroup>
                    ))}
                  </StepContainer>
                  <ProgressBarContainer>
                    <Progress progress={100 * (page / totalQuestions)} role={role}></Progress>
                    <ProgressText>{page} / {totalQuestions}</ProgressText>
                  </ProgressBarContainer>
                <FormInterview style={{top: '-13px'}}>
                  <FormTitle style={{ whiteSpace: 'pre-line' }}>{question}</FormTitle>
                  <Timer>
                    ⏰ {(Math.floor(seconds / 60)).toString().padStart(2, '0')}:{(seconds % 60).toString().padStart(2, '0')}
                  </Timer>
                </FormInterview>
                <CameraAndChatContainer>
                  <CameraView ref={videoRef} autoPlay muted />
                  <ChatContainer>
                    <ChatQuestion>
                      최근 6개월 동안 가장 몰입했던 일은 무엇인가요? 왜 그 경험에 몰입했고, 어떤 결과를 얻었는지 말씀해 주세요.
                    </ChatQuestion>
                    <ChatAnswer>
                      {!isBrowserSTTSupported ? "⚠️ 브라우저가 실시간 음성 인식을 지원하지 않아요." : (finalTranscript ? finalTranscript : <span style={{color: "gray"}}>녹음을 시작하면 실시간으로 텍스트가 표시돼요.</span>)}
                    </ChatAnswer>
                    <ChatQuestion>
                      최근 6개월 동안 가장 몰입했던 일은 무엇인가요? 왜 그 경험에 몰입했고, 어떤 결과를 얻었는지 말씀해 주세요.
                    </ChatQuestion>
                    <ChatAnswer>
                      {(finalTranscript) ? finalTranscript : <span style={{color: "gray"}}>녹음을 시작하면 실시간으로 텍스트가 표시돼요.</span>}
                    </ChatAnswer>
                    <ChatQuestion>
                      최근 6개월 동안 가장 몰입했던 일은 무엇인가요? 왜 그 경험에 몰입했고, 어떤 결과를 얻었는지 말씀해 주세요.
                    </ChatQuestion>
                    <ChatAnswer>
                      {(finalTranscript) ? finalTranscript : <span style={{color: "gray"}}>녹음을 시작하면 실시간으로 텍스트가 표시돼요.</span>}
                    </ChatAnswer>
                  </ChatContainer>
                </CameraAndChatContainer>
                <AudioPanel>
                  <CanvasWrapper>
                    {recording && (
                      <StyledCanvas ref={canvasRef} width={10} height={140} style={{position: 'relative', left: '10px'}}/>
                    )}
                    {!recording && (
                      <StyledCanvas style={{color: 'transparent'}} ref={canvasRef} width={10} height={140} />
                    )}
                    <MicIcon>🎙️</MicIcon>
                  </CanvasWrapper>
                  <ButtonContainer style={{position: 'relative', top: '-300px', left: '315px', height: '0px'}}>
                  {!recording ? 
                    <RecordButton onClick={startRecording} role={role} disabled={sending}>{audioUrls[page] ? "🎙️ 다시 녹음하기" : "🎙️ 녹음 시작"}</RecordButton>
                    : <RecordButton onClick={stopRecording} role={role} disabled={sending}>⏹️ 녹음 종료</RecordButton>
                  }
                  {/* {audioUrls[page] && (
                    <AnswerButton onClick={() => alert(answer)} role={role}>✍️ 답변 내용 확인하기</AnswerButton>
                  )} */}
                  </ButtonContainer>
                  {audioUrls[page] && !recording && (
                  <div style={{position: 'relative', top: '-400px', left: '310px'}}>
                      <audio controls src={audioUrls[page]}></audio>
                  </div>
                  )}
                </AudioPanel>
                {audioUrls[page] && (
                  <div style={{height: '0px'}}>
                    <Button style={{position: 'relative', margin: '0px 0px 50px 0px', left: '214px', top: '-40px'}} onClick={getNextPage} disabled={sending} role={role}>{page < totalQuestions ? (sending ? "질문 생각 중···" : "답변 제출 · 다음으로") : (sending ? "내용 분석 중···" : "답변 제출 · 마무리")}</Button>
                  </div>
                )}
                </Container>
              </FullScreen>
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
                  🤚 답변 내용을 바탕으로 {name} 님의 <b>경험, 강점, 역량, 성향</b>을 파악하고 있어요.<br/>
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
    } else if (role === "company" && !queryJobId) {
        return (
          <Container>
            <Title style={{'marginBottom': '20px'}}>🎤 AI 분석 인터뷰</Title>
              <Paragraph>공고를 선택해주세요.</Paragraph>
              <JobContainer>
                <JobRegion>
                  {jobList?.map((job) => (
                    <JobPosting onClick={() => navigate(`/assessment/interview?job=${job.id}`)} key={job.id}>
                      <JobImage><img src={company} alt="Logo" width={24*0.8} height={27*0.8}></img></JobImage>
                      <JobTitle>{job.title}</JobTitle>
                      <JobButton role="company">
                        인터뷰 진행하기<img src={arrowCompany} alt="Logo" style={{'transform': 'rotate(180deg)', 'position': 'absolute', 'marginLeft': '5px', 'marginTop': '3px'}} width={24*0.8} height={24*0.8}></img>
                      </JobButton>
                      <JobContent>· {job?.employment_type}  |  {job?.career_level}<br/>· {job?.department} | {job?.deadline_date.replace("-", ".").replace("-", ".")} 마감</JobContent>
                    </JobPosting>
                  ))}
                </JobRegion>
              </JobContainer>
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
                  <b>'딱 맞는 매칭'</b>을 위해, 어떤 인재가 {jobTitle} 포지션에 적합한지 구체적으로 파악해 볼게요.<br/>
                  <br/>
                  📌 AI 분석 인터뷰는 <b>3단계</b>로 이루어져 있으며, 총 소요 시간은 <b>약 30분</b> 정도로 예상돼요.<br/>
                  📌 <b>실무진 팀원들, HR(인사팀) 담당자</b>가 함께 참여해 질문을 보고 의견을 나누는 걸 권장드려요.<br/>
                  📌 인터뷰 내용은 공개되지 않으며, 포지션에서 <b>요구하는 역량과 기대하는 역할</b>을 이해하는 데 활용돼요.<br/>
                  📌 인터뷰가 완료되면, AI가 공고 내용을 제안드릴 예정이에요. 내용을 자유롭게 수정 후 완성해주세요.<br/>
                  📌 시작 전, <b>카메라와 마이크 상태 및 주변 소음</b>을 한 번 확인해 주세요.<br/>
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
                  <b>구조화 면접</b>은 정해진 질문을 통해 {jobTitle} 포지션의 전반적인 조건을 파악하는 단계예요.<br/>
                  <br/>
                  ✔️ 구조화 면접은 <b>총 5개의 질문</b>으로 이루어져 있으며, 소요 시간은 <b>약 7분</b> 정도로 예상돼요.<br/>
                  ✔️ 업무, 인재상 등 포괄적인 주제를 중심으로 {jobTitle} 포지션의 <b>주요 역할</b>을 이해하는 데 활용돼요.<br/>
                  ✔️ 각 질문의 답변은 <b>약 50 ~ 100초</b> 정도로, 너무 짧거나 길지 않게 조절해주세요.<br/>
                  <br/>
                  우측 하단의 <b>'시작하기'</b> 버튼을 눌러 면접을 시작해주세요!
                  </FormParagraph>  
                </FormContent>
              </Form>
              <Button onClick={startInterview} disabled={sending} role={role}>{sending ? "질문 생각 중···" : "시작하기"}</Button>
              </>
            )}

            {stage == TECHNICAL && tutorial && (
              <>
              <Form>
                <FormTitle>2️⃣ 직무 적합성 면접</FormTitle>
                <FormContent>
                  <FormParagraph>
                  <b>직무 적합성 면접</b>은 맞춤형 질문을 통해 {jobTitle} 포지션의 요구 역량과 기술을 구체적으로 알아보는 단계예요.<br/>
                  <br/>
                  ✔️ 직무 적합성 면접은 <b>8 ~ 10개의 질문</b>으로 이루어져 있으며, 소요 시간은 <b>약 15분</b> 정도로 예상돼요.<br/>
                  ✔️ 팀의 KPI와 포지션의 JD를 바탕으로 {jobTitle} 포지션의 <b>요구 역량</b>을 이해하는 데 활용돼요.<br/>
                  ✔️ 각 질문의 답변은 <b>약 50 ~ 100초</b> 정도로, 너무 짧거나 길지 않게 조절해주세요.<br/>
                  <br/>
                  우측 하단의 <b>'시작하기'</b> 버튼을 눌러 면접을 시작해주세요!
                  </FormParagraph>  
                </FormContent>
              </Form>
              <Button onClick={startInterview} disabled={sending} role={role}>{sending ? "질문 생각 중···" : "시작하기"}</Button>
              </>
            )}

            {stage == SITUATIONAL && tutorial && (
              <>
              <Form>
                <FormTitle>3️⃣ 문화 적합성 면접</FormTitle>
                <FormContent>
                  <FormParagraph>
                  <b>문화 적합성 면접</b>은 맞춤형 질문을 통해 조직/팀의 성격과 일하는 방식을 알아보는 단계예요.<br/>
                  <br/>
                  ✔️ 문화 적합성 면접은 <b>5 ~ 7개의 질문</b>으로 이루어져 있으며, 소요 시간은 <b>약 8분</b> 정도로 예상돼요.<br/>
                  ✔️ 특정 상황에서의 판단 내용을 바탕으로 팀의 <b>인재상과 도전 과제</b>를 이해하는 데 활용돼요.<br/>
                  ✔️ 각 질문의 답변은 <b>약 50 ~ 100초</b> 정도로, 너무 짧거나 길지 않게 조절해주세요.<br/>
                  <br/>
                  마지막까지 최선을 다해, 우측 하단의 <b>'시작하기'</b> 버튼을 눌러 면접을 시작해주세요!
                  </FormParagraph>  
                </FormContent>
              </Form>
              <Button onClick={startInterview} disabled={sending} role={role}>{sending ? "질문 생각 중···" : "시작하기"}</Button>
              </>
            )}
            
            {!tutorial && !jobPosting && !finished && (
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
                    <RecordButton onClick={startRecording} role={role} disabled={sending}>{audioUrls[page] ? "🎙️ 다시 녹음하기" : "🎙️ 녹음 시작"}</RecordButton>
                    : <RecordButton onClick={stopRecording} role={role} disabled={sending}>⏹️ 녹음 종료</RecordButton>
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
                <Button onClick={getNextPage} role={role} disabled={sending}>{page < totalQuestions ? (sending ? "질문 생각 중···" : "답변 제출 · 다음으로") : (sending ? "내용 분석 중···" : "답변 제출 · 마무리")}</Button>
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
              <Button onClick={postJobPosting} disabled={sending} role={role}>{sending ? "저장 및 분석 중···" : "저장하기"}</Button>
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
                  🤚 답변 내용을 바탕으로 {jobTitle} 포지션의 <b>주요 역할/업무, 요구 역량</b>을 파악하고 있어요.<br/>
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
