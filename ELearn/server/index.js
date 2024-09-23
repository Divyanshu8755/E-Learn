import express from "express"
import dotenv from "dotenv";
import cors from 'cors';
import { connectDb } from "./database/db.js";
//importing routes
import userRoutes from './routes/user.js'
import courseRoutes from "./routes/course.js"
import adminRoutes from './routes/admin.js'

dotenv.config(); // to access .env file
const app = express();

//using middlewares
app.use(express.json());
app.use(cors());

const port=process.env.PORT;

app.get("/",(req,res) => {
    res.send("server is working fine")
})

app.use("/uploads",express.static("uploads"));
//using routes
app.use('/api',userRoutes);
app.use('/api',courseRoutes);
app.use('/api',adminRoutes);

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
    connectDb();
})