// App.jsx
import { useEffect, useState } from "react";
import {
  initGapi,
  loginGoogle,
  createSheetFromTemplate,
  readSheet,
} from "../../GoogleSheetManager";

export default function GoogleSheetTest() {
  const [sheetId, setSheetId] = useState(null);
  const [sheetUrl, setSheetUrl] = useState(null);

  const TEMPLATE_ID = "";

  useEffect(() => {
    initGapi();
  }, []);

  const handleCreateSheet = async () => {
    try {
      // 1) 로그인
      console.log("Attempting login...");
      await loginGoogle();
      console.log("Login successful");

      // 2) 템플릿 복사 → 새 시트 생성
      const newId = await createSheetFromTemplate(TEMPLATE_ID);
      setSheetId(newId);

      const url = "https://docs.google.com/spreadsheets/d/" + newId;
      setSheetUrl(url);

      // 새 탭에서 열기
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error in handleCreateSheet:", error);
      alert("에러 발생: " + JSON.stringify(error));
    }
  };

  const handleReadSheet = async () => {
    if (!sheetId) return alert("시트가 아직 없어요");

    const data = await readSheet(sheetId);
    console.log("Sheet Data", data);
    alert(JSON.stringify(data));
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Google Sheet 자동 생성 / 읽기</h2>

      <button onClick={handleCreateSheet} style={{
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer'
      }}>
        📄 새 Google Sheet 만들기
      </button>

      <br /><br />

      {sheetUrl && (
        <div style={{
          marginTop: 20,
          padding: 15,
          backgroundColor: '#f0f0f0',
          borderRadius: 5
        }}>
          <p><strong>✅ 시트가 생성되었습니다!</strong></p>
          <a
            href={sheetUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#1a73e8',
              fontSize: '14px',
              wordBreak: 'break-all',
              textDecoration: 'underline'
            }}
          >
            {sheetUrl}
          </a>
          <br /><br />
          <button
            onClick={() => window.open(sheetUrl, "_blank")}
            style={{
              padding: '8px 16px',
              backgroundColor: '#1a73e8',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            🔗 새 탭에서 열기
          </button>
        </div>
      )}

      <br />

      <button onClick={handleReadSheet} disabled={!sheetId} style={{
        padding: '10px 20px',
        fontSize: '16px',
        cursor: sheetId ? 'pointer' : 'not-allowed',
        opacity: sheetId ? 1 : 0.5
      }}>
        📥 시트 내용 읽기
      </button>
    </div>
  );
}
