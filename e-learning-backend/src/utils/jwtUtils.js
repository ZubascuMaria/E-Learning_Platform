import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'your_secret_key'; 

export const generateToken = (userId, role) => {
  const payload = {
    userId,
    role,
  };

  return jwt.sign(payload, SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};
