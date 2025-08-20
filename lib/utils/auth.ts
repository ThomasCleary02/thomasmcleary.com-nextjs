import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';

export interface AdminUser {
    username: string;
    passwordHash: string;
}

export interface JWTPayload {
    username: string;
    ist: number;
    exp: number;
}

export class AuthService {
    private static readonly JWT_SECRET = process.env.JWT_SECRET!;
    private static readonly JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
    private static readonly MAX_LOGIN_ATTEMPTS = parseInt(process.env.MAX_LOGIN_ATTEMPTS || '5');
    private static readonly LOGIN_WINDOW_MS = parseInt(process.env.LOGIN_WINDOW_MS || '900000');

    private static loginAttempts = new Map<string, { count: number, resetTime: number }>();

    static async verifyPassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    static generateToken(username: string): string {
        return jwt.sign({ username }, this.JWT_SECRET, { expiresIn: this.JWT_EXPIRES_IN } as SignOptions);
    }

    static verifyToken(token: string): JWTPayload | null {
        try {
            return jwt.verify(token, this.JWT_SECRET) as JWTPayload;
        } catch (error) {
            return null;
        }
    }

    static checkRateLimit(ip: string): boolean {
        const now = Date.now();
        const attempts = this.loginAttempts.get(ip);

        if (!attempts || now > attempts.resetTime) {
            this.loginAttempts.set(ip, { count: 1, resetTime: now + this.LOGIN_WINDOW_MS });
            return true;
        }

        if (attempts.count >= this.MAX_LOGIN_ATTEMPTS) {
            return false;
        }

        attempts.count++;
        return true;
    }

    static clearRateLimit(ip: string): void {
        this.loginAttempts.delete(ip);
    }
}