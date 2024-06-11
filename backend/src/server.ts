import express from 'express';
import bodyParser from 'body-parser';


const app = express();
const PORT = 8888;

app.use(bodyParser.json());


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});