import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { userRoutes } from "./modules/user/user.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { projectRoutes } from "./modules/project/project.routes.js";

dotenv.config();

//create server
const app = express();

//middlewares
const allowedOrigin = process.env.CORS_ORIGIN?.replace(/\/$/, "")
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  }),
);
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//rutas
app.use("/users", userRoutes)
app.use("/projects", projectRoutes)
app.use(errorHandler)


//start server 
const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () =>{
  console.log(`Server on: http://localhost:${PORT}`)
})
