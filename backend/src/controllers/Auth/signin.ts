import { Request,Response } from "express"
import prisma from "../../server/prisma"
import JWT from "jsonwebtoken"

const Signin = async (req:Request,res:Response) => {
     const {email, password} = req.body
      
       const user = await prisma?.user.findUnique({where:{email:email}})
       if(!user){
        return res.status(404).json({ message: "Usuário não cadastrado no sistema." });
       }
       
      
      
       if (user.password !== password) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }
       try{
        const token = JWT.sign({
            id:user?.id ,
            name:user?.name ,
            avatar:user?.avatar
        },process.env.SECRET as string ,{ expiresIn:"1d"})
        
        res.status(200).json({  token, message:"Usuario logado com sucesso" })
       }
       catch(error){
        console.log(error)
        res.status(500).json({msg:"Erro no servidor tente novamente mais tarde."})
       }
       

   
}
export default Signin;
