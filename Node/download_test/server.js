const app = require('express')();
const path = require('path');

app.get('/test', (req, res) => {
    res.send('test');
});


app.get('/download', (req, res) => {
    console.log(__dirname);
    res.download(path.join(__dirname, '/files/test.ppt'), 'test.ppt');
});

app.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
});