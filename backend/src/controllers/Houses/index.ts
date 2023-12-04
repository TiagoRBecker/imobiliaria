import { Response, Request } from "express";
import prisma from "../../server/prisma";
class Imobiliaria {

    //Funçao para tratar dos erros no servidor
    private handleError(error: any, res: Response) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
    ///Função para desconetar o orm prisma
    private async handleDisconnect() {
        return await prisma?.$disconnect()
    }
    //
    //Retorna todas as houses
    async getAllHouses(req: Request, res: Response) {

        try {
            const getHouses = await prisma?.houses.findMany({})
            if (!getHouses || getHouses.length <= 0) {
                return res.status(404).json({ message: "Nenhum imóvel cadastrado!" })
            } else {
                return res.status(200).json(getHouses)
            }
        } catch (error) {
            return this?.handleError(error, res)
        }
        finally {
            return this?.handleDisconnect()
        }

    }
    // Retorna uma house especifica
    async getOneHouse(req: Request, res: Response) {
        const { slug } = req.params
        try {
            const getOneHouse = await prisma?.houses.findUnique({
                where: { id: Number(slug) }
            })
            if (!getOneHouse) {
                return res.status(404).json({ message: "Nenhum imóvel encontrado!" })
            }
            return res.status(200).json(getOneHouse)

        } catch (error) {
            return this.handleError(error, res)
        }
        finally {
            return this.handleDisconnect()
        }

    }


    //Cria uma house
    async createHouse(req: Request, res: Response) {
        const { code, descript, price, bedrooms, UF, city, district, catId, meters, garage, suite, images, userId } = req.body
        try {
            const create = await prisma?.houses.create({
                data: {
                    code, descript, price, bedrooms, UF, city, district, catId, meters, garage, suite, images, userId
                }
            })
            return res.status(200).json({ create, message: "Imóvel criado com sucesso!" })
        } catch (error) {
            return this?.handleError(error, res)
        }
        finally {
            return this?.handleDisconnect()
        }


    }
    // Atualiza uma house especifica
    async updateHouse(req: Request, res: Response) {

        const { id, code, descript, price, bedrooms, UF, city, district, catId, meters, garage, suite, images, userId } = req.body
        if (!id) {
            return res.status(404).json({ message: "Não foi possivel atualizar o imóvel!" })
        }
        try {
            const updateHouse = await prisma?.houses.update({
                where: {
                    id: Number(id)
                },
                data: {
                    code, descript, price, bedrooms, UF, city, district, catId, meters, garage, suite, images, userId, updateAt: new Date()
                }
            })
            return res.status(200).json({ message: "Imóvel atualizado com sucesso!" })
        } catch (error) {
            return this.handleError(error, res)
        }
        finally {
            return this?.handleDisconnect()
        }


    }
    //Deleta a uma house especifica
    async deleteHouse(req: Request, res: Response) {
        const { id } = req.body
        if (!id) {
            return res.status(403).json({ message: "Não foi possível encontrar a categoria!" })
        }
        try {
            const update = await prisma?.categories.delete({
                where: {
                    id: Number(id)
                },

            })
            return res.status(200).json({ message: "Categoria deletado com sucesso!" })

        } catch (error) {
            return this?.handleError(error, res)
        }
        finally {
            return this?.handleDisconnect()
        }
    }
}



const HousesController = new Imobiliaria();
export default HousesController;