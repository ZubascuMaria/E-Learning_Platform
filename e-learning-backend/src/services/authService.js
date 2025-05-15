import bcrypt from 'bcrypt';
import userRepository from '../repositories/userRepository.js';
import { generateToken } from '../utils/jwtUtils.js';
import Roles from '../utils/roles.js';

const registerUser = async (username, password, isProfessor) => {

  const existingUser = await userRepository.findUserByEmail(username);

  if (existingUser) {
    throw new Error("User already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userRepository.createUser({
    email: username,
    password: hashedPassword,
    role: isProfessor ? Roles.PROFESSOR : Roles.STUDENT,
  });

  return newUser;
};

const loginUser = async (username, password) => {
  const user = await userRepository.findUserByEmail(username);
  if (!user) {
    throw new Error("User not found");
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("Invalid password");
  }

  const token = generateToken(user.id, user.role);
  return token;

};

export default {
  registerUser,
  loginUser,
};
