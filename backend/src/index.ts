import express ,{Request,Response, application} from  "express"
import cors from "cors"
import bodyParser from "body-parser"
import router from "./routes"
const app = express()
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.get("/teste",(req:Request, res:Response)=>{
    return res.send("Ok rota funcionand")
})
app.use(router)
 app.listen(5000,()=>{
    console.log("Servidor rodando na porta http://localhost:5000")
 })