import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/itag.js';
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = 5000;

app.use(bodyParser.json());

app.use('/v1', usersRoutes);


app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));

