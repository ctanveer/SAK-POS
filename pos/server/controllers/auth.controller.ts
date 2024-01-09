import { Request, Response } from "express";
import { getTokenFromCode } from "../services/skeleton.service";

export async function getToken (req: Request, res: Response) {
  try {
    const { code } = req.params;
    const response = await getTokenFromCode(code);
    const token = response.headers['authorization'];

    if (token) {
      res.setHeader("Authorization", token);
      res.send({ auth: true });
    } else res.status(401).send({ message: "No auth token found."});
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message});
  }
}