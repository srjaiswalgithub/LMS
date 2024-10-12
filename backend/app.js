import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoute from './route/userRoute.js';
import courseRoute from './route/courseRoute.js';
import paymentRoutes from './route/payment.routes.js';
import miscRoutes from './route/miscellaneous.routes.js';
import {config} from 'dotenv';
import path from 'path';
config();
import errorMiddleware from './middleware/error.middleware.js';
var app = express();

const _dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))

app.use('/api/v1/user',userRoute);
app.use('/api/v1/courses',courseRoute);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1',miscRoutes);

app.use(express.static(path.join(_dirname,"/frontend/dist")));

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
})
// app.all('*',(req,res)=>{
//     res.send("OPPS!! 404 page not found")
// });

app.use(errorMiddleware);
export default app;