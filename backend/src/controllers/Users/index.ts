import { Response, Request } from "express";
import bcrypt from "bcrypt"
import prisma from "../../server/prisma";
class User {
    //Funçao para tratar dos erros no servidor
    private handleError(error: any, res: Response) {
        console.error(error);
        return res?.status(500).json({ error: "Internal Server Error" });
    }
    //Função para desconetar o orm prisma
    private async handleDisconnect() {
        return await prisma?.$disconnect()
    }
    //Retorna todos os usuarios
    async getAllUsers(req: Request, res: Response) {

        try {
            const getUser = await prisma?.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    avatar:true,
                    role: true,
                    phone:true,
                    creci: true,
                    creciUF: true,
                    houses: true

                }

            })

            if ((getUser?.length as any) <= 0) {

                return res.status(404).json({ message: "Nenhum usuário cadastrado!" })

            } else {
               
                return res.status(200).json(getUser)
            }
        } catch (error) {
            return this?.handleError(error, res)
        }
        finally {
            return this?.handleDisconnect()
        }

    }
    // Retorna um usuario especifico
    async getOneUser(req: Request, res: Response) {
        const { slug } = req.params
        
        try {
            const getOneUser = await prisma?.user.findUnique({
                where: {
                    id: Number(slug)
                },
                select:{
                    id:true,
                    name:true,
                    email:true,
                    avatar:true,
                    phone:true,
                    creci:true,
                    creciUF:true,
                    role:true,
                }

            })
            if (!getOneUser) {
                return res.status(200).json({ message: "Usuário não encontrado" })
            }
            return res.status(200).json(getOneUser)

        } catch (error) {
            return this?.handleError(error, res)
        }
        finally {
            return this?.handleDisconnect()
        }
    }
    //Cria um usuario
    async createUser(req: Request, res: Response) {
       
        const {name,email,password,phone,creci,creciUF,role,avatar} = req.body
       
        const hashPassword =  await bcrypt.hash(password, Number(process.env.SALT) ) 
      
     
        try {
            const createUser = await prisma?.user.create({
                data:{
                name,
                email,
                password:hashPassword,
                phone,
                creci,
                creciUF,
                role,
                avatar
                     
                }
            })
            return res.status(200).json({ message: "Usuário criado com sucesso!" })
        } catch (error) {
            console.log(error)
            return this?.handleError(error, res)
        }
        finally {
            return this?.handleDisconnect()
        }
        
    }
    //Atualiza um usuario especifico 
    async updateUser(req: Request, res: Response,) {
        const {slug,name,email,password,phone,creci,creciUF,role,avatar} = req.body
      
        const hashPassword =  await bcrypt.hash(password, Number(process.env.SALT) ) 
        if (!slug) {
            return res.status(403).json({ message: "Não foi possível encontrar o usuário!" })
        }
        try {
            const update = await prisma?.user.update({
                where: {
                    id: Number(slug)
                },
                data: {
                    name,email,password:hashPassword,phone,creci,creciUF,role,avatar,
                    updateAt: new Date()
                }
            })
            return res.status(200).json({ message: "Usuário atualizado com sucesso!" })

        } catch (error) {
            console.log(error)
            return this?.handleError(error, res)
        }
        finally {
            return this?.handleDisconnect()
        }
        
        
    }
    //Deleta um usuario especifico
    async deleteUser(req: Request, res: Response) {
        const { id } = req.body
     
        if (!id) {
            return res.status(403).json({ message: "Não foi possível encontrar o usuário!" })
        }
        try {
            const update = await prisma?.user.delete({
                where: {
                    id: Number(id)
                },

            })
            return res.status(200).json({ message: "Usuário deletado com sucesso!" })

        } catch (error) {
            console.log(error)
            return this?.handleError(error, res)
        }
        finally {
            return this?.handleDisconnect()
        }

    }

}

const UsersController = new User();
export default UsersController;