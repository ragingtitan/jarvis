//This is the server side of the application and is responsible for requesting to the gemini api.
//All the required initializations, variables and required dependencies.
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { userAppRouter} from './Routes/userAppRouter.js';
import { userAuthRouter} from './Routes/userAuthRouter.js';

const app = express();
app.use(cors(
    {
        origin:'http://localhost:5173',
        credentials:true,
        allowedHeaders:['Content-Type','Authorization'],
        exposedHeaders:['Content-Type','Authorization'],
        methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue:false,
        optionsSuccessStatus:204,
    }
));
dotenv.config({path:'./environment-variables/secret.env'});
app.use(express.json());
app.use(cookieParser());
app.use('/auth',userAuthRouter);
app.use('/app',userAppRouter);


const port = process.env.PORT;
console.log(port);

//This starts the server at http://localhost
app.listen(process.env.port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});