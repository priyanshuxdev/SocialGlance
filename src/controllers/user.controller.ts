import { prisma } from "db/client.js";
import { Request, Response } from "express";
import { HttpStatusCode, User } from "utils/types.js";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body as User;

  const findUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (findUser) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      message: "Email already taken",
    });
  }

  const createUser = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  return res
    .status(HttpStatusCode.CREATED)
    .json({ data: createUser, message: "User created successfully" });
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params; //string type
  const { name, email, password } = req.body as User;

  const findUser = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!findUser) {
    return res.status(HttpStatusCode.NOT_FOUND).json({
      message: "User not found",
    });
  }

  const updateUser = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      email,
      password,
    },
  });

  return res
    .status(HttpStatusCode.OK)
    .json({ data: updateUser, message: "User updated successfully" });
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();

  return res.status(HttpStatusCode.OK).json({ data: users });
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params; //string type

  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!user) {
    return res.status(HttpStatusCode.NOT_FOUND).json({
      message: "User not found",
    });
  }

  return res.status(HttpStatusCode.OK).json({ data: user });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params; //string type

  const findUser = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!findUser) {
    return res.status(HttpStatusCode.NOT_FOUND).json({
      message: "User not found",
    });
  }

  const deleteUser = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });

  return res
    .status(HttpStatusCode.OK)
    .json({ data: deleteUser, message: "User deleted successfully" });
};
