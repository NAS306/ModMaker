// server.js
// 핫스팟은 서버 안켜짐
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

