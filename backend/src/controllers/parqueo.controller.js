export function calcularCobro(req,res){
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

}