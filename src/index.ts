import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import http from "http"
import { connectDB } from "./config/db";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app)

app.use(express.json());
app.use(cors());

app.get("/",(_req,res) => {
     res.send("ReaDash API is running ✅");
})

const PORT = process.env.PORT || 5000;

server.listen(PORT,() => {
     console.log(`🚀 Server running on port ${PORT}`);
})
