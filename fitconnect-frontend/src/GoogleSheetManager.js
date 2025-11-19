import { googleApiKey } from "./env";

// Google API 로드 상태
let gapiInited = false;
let tokenClient;
let accessToken = null;

// ---------------------------------------------
// 1) Google API 초기화
// ---------------------------------------------
export const initGapi = () => {
  return new Promise((resolve) => {
    // Google API 스크립트 로드
    const script1 = document.createElement('script');
    script1.src = 'https://apis.google.com/js/api.js';
    script1.async = true;
    script1.defer = true;
    script1.onload = () => {
      window.gapi.load('client', async () => {
        await window.gapi.client.init({
          apiKey: googleApiKey,
          discoveryDocs: [
            'https://sheets.googleapis.com/$discovery/rest?version=v4',
            'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'
          ],
        });
        gapiInited = true;
        console.log('GAPI initialized');
        resolve();
      });
    };
    document.body.appendChild(script1);

    // Google Identity Services 스크립트 로드
    const script2 = document.createElement('script');
    script2.src = 'https://accounts.google.com/gsi/client';
    script2.async = true;
    script2.defer = true;
    script2.onload = () => {
      console.log('GIS loaded');
    };
    document.body.appendChild(script2);
  });
};

// ---------------------------------------------
// 2) 로그인 (Google Identity Services 사용)
// ---------------------------------------------
export const loginGoogle = async () => {
  return new Promise((resolve, reject) => {
    try {
      // Token Client 초기화
      tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '197209784534-srthfmmp0qnaocpak06m2ggj6inpnjng.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets',
        callback: (response) => {
          if (response.error) {
            console.error('Token error:', response);
            reject(response);
            return;
          }
          accessToken = response.access_token;
          console.log('Access token received');
          resolve(accessToken);
        },
      });

      // 토큰 요청
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } catch (error) {
      console.error('Login error:', error);
      reject(error);
    }
  });
};

// ---------------------------------------------
// 3) 새 시트 생성 (또는 템플릿 복사)
// ---------------------------------------------
export const createSheetFromTemplate = async (templateId) => {
  if (!accessToken) {
    throw new Error('Not authenticated. Please login first.');
  }

  const newName = "User Sheet - " + Date.now();

  // 템플릿 ID가 있으면 복사, 없으면 새로 생성
  if (templateId) {
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files/${templateId}/copy`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newName,
        }),
      }
    );

    const result = await response.json();
    return result.id;
  } else {
    // 새 스프레드시트 생성
    const response = await fetch(
      'https://sheets.googleapis.com/v4/spreadsheets',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: {
            title: newName,
          },
        }),
      }
    );

    const result = await response.json();
    return result.spreadsheetId;
  }
};

// ---------------------------------------------
// 4) 시트 읽기
// ---------------------------------------------
export const readSheet = async (sheetId, range = "A1:Z1000") => {
  if (!accessToken) {
    throw new Error('Not authenticated. Please login first.');
  }

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    }
  );

  const result = await response.json();
  return result.values;
};
