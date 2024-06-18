// server.js
// 핫스팟은 서버 안켜짐
// github 연동하는 법
// git init
// git remote add origin https://github.com/유저닉네임/리포지토리 이름.git (이미 리포지토리가 있을 경우)
// git add . (모두 add) 또는 git add 파일이름.확장자 또는 디렉토리/파일이름.확장자 (예: git add mod-maker_v1.1/server.js)
// git status (잘 올라갔는지 확인)
// git commit -m "커밋 메시지" (여기까지는 로컬)
// git push -u origin 브랜치이름(예: main)

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/modEdit', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'modEdit.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});

