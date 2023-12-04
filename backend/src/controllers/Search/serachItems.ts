import { Request, Response } from "express";
import prisma from "../../server/prisma";
const Search = async (req: Request, res: Response) => {
  const {city , categorie} = req.body
  if(!city && !categorie){
    return res.status(404).json({message:"Nenhum imovel encontrado"})
  }
  console.log(city);
  console.log(categorie);
  const houses = await prisma?.houses.findMany({
    where: {
     
      categories: {
        name: {
          contains:categorie as string,
        },
      },
    },
    include: {
      categories: true,
    },
  });
  console.log(houses)
 return res.status(200).json({houses})
 
};

export default Search;
