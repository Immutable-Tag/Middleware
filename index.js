import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/itag.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/itag', usersRoutes);

//creating a simple route
app.get('/', (req, res) => res.send('ECS 265: DDS Project - Immutable Tag Application Middleware'));
/*
app.get('/', (req, res) => {
    console.log('[TEST]!')
    res.send('Hello from Middleware Application!')
});
*/


app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));

