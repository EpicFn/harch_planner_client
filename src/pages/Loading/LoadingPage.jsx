import { useEffect } from "react";

export default function LoadingPage() {


    // 페이지 로드 시 서버의 응답을 확인하여 특정 페이지로 이동
    // redirect 페이지 처리
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
    
        if (code && state) {
            const previousState = sessionStorage.getItem('oauthState');
        
            if (previousState !== state) {
                sessionStorage.setItem('oauthState', state);
        
                fetch(`https://218.239.229.119:1500/account/login/oauth/naver`, {
                    method: 'POST',
                    credentials: 'include', // 쿠키를 포함하도록 설정
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ code, state }) // 요청 본문에 code와 state 포함
                    })
                    .then(response => {
                    switch (response.status) {
                        case 200:
                        window.location.href = '/main'; // 메인 페이지로 리디렉션
                        break;
                        case 404:
                        alert('회원가입이 필요합니다.'); // 경고 메시지 표시
                        window.location.href = '/signup'; // 회원가입 페이지로 리디렉션 //회원가입 시 code랑 state를 보내줘야함
                        break;
                        default:
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    })
                    .catch(error => {
                    console.error('Error handling server redirect:', error);
                });
            }
        }
    }, []);
    

    return (
        <div>loading...</div>
    )
}

