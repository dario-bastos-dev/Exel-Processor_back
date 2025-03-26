import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

export function generateToken(data: { id: string; email: string }) {
	return jwt.sign(data, secret, { expiresIn: '1d' });
}

export function verifyToken(token: string) {
	return jwt.verify(token, secret);
}
