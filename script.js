const correctUsername = 'goest';
const correctPassword = '966';

// Prompt로 아이디와 비밀번호 입력 받기
const username = prompt("아이디를 입력하세요:");
const password = prompt("비밀번호를 입력하세요:");

if (username === correctUsername && password === correctPassword) {
    document.getElementById('messageDiv').style.display = 'block';
} else {
    alert('아이디 또는 비밀번호가 잘못되었습니다.');
    location.reload();
}

const webhookUrl = 'https://discord.com/api/webhooks/1307189570953154640/Aof6SXBzshXEDaAokYi0Alfto8PUcPY0J2E52uLIPM3iTD3lh3G74oeW0QZkpxTtsWke';

document.getElementById('webhookForm').addEventListener('submit', function(event) {
    event.preventDefault();
    sendMessage();
});

document.getElementById('message').addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});

document.getElementById('cancelButton').addEventListener('click', function() {
    document.getElementById('file').value = ''; // 파일 입력 초기화
});

function sendMessage() {
    const message = document.getElementById('message').value;
    const fileInput = document.getElementById('file');
    const formData = new FormData();

    if (message) {
        formData.append('content', message);
    }
    if (fileInput.files.length > 0) {
        formData.append('file', fileInput.files[0]);
    }

    fetch(webhookUrl, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        const statusMessageWebhook = document.getElementById('statusMessageWebhook');
        if (response.ok) {
            statusMessageWebhook.textContent = '전송되었습니다!';
            statusMessageWebhook.style.color = '#00ff00';
        } else {
            statusMessageWebhook.textContent = '전송 실패: ' + response.statusText;
            statusMessageWebhook.style.color = '#ff0000';
        }
    })
    .catch(error => {
        const statusMessageWebhook = document.getElementById('statusMessageWebhook');
        statusMessageWebhook.textContent = '전송 중 오류 발생';
        statusMessageWebhook.style.color = '#ff0000';
        console.error('전송 중 오류 발생:', error);
    });
}
