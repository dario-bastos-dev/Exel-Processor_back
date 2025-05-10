import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../configs/jwt';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers['authorization'];

  if (!authorization) {
    res.status(401).json({ message: 'Not add token!' });
    return;
  }

  const token = authorization.split(' ')[1] as string;
  const valid = verifyToken(token);

  if (!valid) {
    res.status(401).json({ message: 'Invalid token!' });
    return;
  }

  next(); // Proceed to the next middleware or route handler
}
