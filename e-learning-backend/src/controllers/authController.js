import authService from '../services/authService.js';

export const signUp = async (req, res) => {
  const { username, password, isProfessor } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  try {
    await authService.registerUser(username, password, isProfessor);
    res.status(201).json({ message: "User created successfully."});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const signIn = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  try {
    const token = await authService.loginUser(username, password);
    res.status(200).json({ message: "Login successful.", token });
  }
  catch (error) {
    res.status(401).json({ error: error.message });
  } 
};
