import { Request, Response, NextFunction } from "express";
import prisma from "../server/prisma";
import Jwt from "jsonwebtoken";
declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
        name: string;
        email: string;
        avatar: string;
      };
    }
  }
}

export const chekingToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  const secret = process.env.SECRET;
  if (!authorization) {
    return res.status(401).json({ msg: "Não autorizado" });
  }

  const [authtype, token] = authorization.split(" ");
  if (authtype === "Bearer") {
    const decode = Jwt.verify(
      token,
      secret as string,
      async (err: any, payload: any) => {
        if (err) {
          res.status(401).json({ msg: "Não autorizado" });
        }

        const { id } = payload;
        console.log(id);
        const getUser = await prisma?.user.findUnique({
          where: { id: Number(id) },
        });
        if (getUser) {
          req.user = getUser as any;
         
          next();
        }
      }
    );
  }
};
