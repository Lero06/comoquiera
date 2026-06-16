import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const NAME=process.env.SERVER_NAME;
const VERSION=process.env.SERVER_VERSION;
const DESCR=process.env.SERVER_DESCRIPTION;
const PORT=process.env.SERVER_PORT;



const app = express();
app.use(cors());
app.use(express.json())


app.get("/",(req,res)=>{

    res.json({
        name: NAME,
        version: VERSION,
        description: DESCR,
        puerto: PORT
    })
});

app.post("/api/parqueo/calcular",(req,res)=>{
    const {PLACA,TIPO,HORAS,MINUTOS}=req.body;

    if(!PLACA ||PLACA.trim()==""){
        res.status(400).json({error:"La placa es requerida"})
    }
    if(!TIPO ||(TIPO !== "carro" && TIPO !== "moto")){
        res.status(400).json({error:"El tipo es requerido"})
    }
    if(Number.isNaN(HORAS) || HORAS <0){
        res.status(400).json({error:"La horas son requeridas"})
    }
    if(Number.isNaN(MINUTOS) || MINUTOS <0|| MINUTOS >=60){
        res.status(400).json({error:"Los minutos son requeridas"})
    }

    const TARIFA=TIPO==="carro"? 1200 : 500;

    let h=Number(HORAS);
    let m=Number(MINUTOS);

    if(m>5) h++;

    const TOTAL=h*TARIFA;

    res.json({
        placa: PLACA,
        tipo: TIPO,
        tarifa: TARIFA,
        tiempoUso: HORAS+":"+MINUTOS,
        horasCobradas: h,
        total: TOTAL
    });

})

app.listen(4000,()=>{

    console.log("Nombre del servidor: ",NAME,"Version: ",VERSION,"ejecutandose en http://localhost:",PORT);
});