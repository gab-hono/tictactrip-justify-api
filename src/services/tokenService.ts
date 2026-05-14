import crypto from "crypto";

const tokenStore = new Map<string, string>();

export function generateToken(email: string): string {

    const token = crypto.randomBytes(32).toString("hex");
    tokenStore.set(email, token);
    return token;
}

export function isValidToken(token: string): boolean {
    
    for(const storedToken of tokenStore.values()) {
        if (storedToken === token) return true;
    }
    return false
}