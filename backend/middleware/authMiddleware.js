// src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import logger from '../helpers/logger.js';

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token faltante" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    logger.warn(`Token inválido: ${err.message}`);
    res.status(403).json({ error: "Token inválido" });
  }
};