import express from "express";
import dotenv from "dotenv";
dotenv.config();

const NAME=process.env.SERVER_NAME;
const VERSION=process.env.SERVER_VERSION;
const DESCR=process.env.SERVER_DESCRIPTION;
const PORT=process.env.SERVER_PORT;


const app = express();



app.get("/",(req,res)=>{

    res.send(`<h1>Nombre del Servidor: ${NAME}</h1>`)

});

app.listen(4000,()=>{

    console.log("Nombre del servidor: ",NAME);
});