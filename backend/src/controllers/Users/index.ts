import { Response, Request } from "express";
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
            const getUser = await prisma?.user.findMany({})

            if ((getUser?.length as any) <= 0) {

                return res.status(404).json({ message: "Nenhum usuário cadastrado!" })

            } else {
                console.log("Aqui tem user")
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
        try {
            const createUser = await prisma?.user.create({
                data: {
                    name: "Tiago",
                    email: "admin@gmail.com",
                    creci: "123456",
                    creciUF: "RS",
                    role: "ADMIN",
                    password: "123456"

                }
            })
            return res.status(201).json({ message: "Usuário criado com sucesso!" })
        } catch (error) {
            return this?.handleError(error, res)
        }
        finally {
            return this?.handleDisconnect()
        }
    }
    //Atualiza um usuario especifico 
    async updateUser(req: Request, res: Response,) {
        const { id, name, email, password, role, creci, creciUF } = req.body
        if (!id) {
            return res.status(403).json({ message: "Não foi possível encontrar o usuário!" })
        }
        try {
            const update = await prisma?.user.update({
                where: {
                    id: Number(id)
                },
                data: {
                    name, email, password, role, creci, creciUF, updateAt: new Date()
                }
            })
            return res.status(200).json({ message: "Usuário atualizado com sucesso!" })

        } catch (error) {
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
            return this?.handleError(error, res)
        }
        finally {
            return this?.handleDisconnect()
        }

    }

}

const UsersController = new User();
export default UsersController;