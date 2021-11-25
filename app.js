import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

import dwitterRouter from './router/dwitter.js';
const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());

app.use('/tweets', dwitterRouter)


const port = 3030;
app.listen(port, ()=>{
   console.log(`Server is running on port ${port}`);
})