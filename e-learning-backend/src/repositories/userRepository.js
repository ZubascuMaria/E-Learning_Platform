import prisma from '../config/db.js';

const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

const createUser = async (data) => {
  return await prisma.user.create({
    data,
  });
};

export default {
  findUserByEmail,
  createUser,
};
