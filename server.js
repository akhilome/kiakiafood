import express from 'express';
import path from 'path';

const app = express();
const { PORT = 8080 } = process.env;

app.use(express.static(__dirname));
app.all('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(PORT);
