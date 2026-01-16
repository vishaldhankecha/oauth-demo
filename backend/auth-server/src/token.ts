import jwt from "jsonwebtoken";

const JWT_SECRET = "auth-secret";
const SESSION_EXPIRY = 30;

export function generateAccessToken(userId: string) {
    const accessToken = jwt.sign(
        {
            sub: userId,
            iss: "auth-server"
        },
        JWT_SECRET,
        { expiresIn: SESSION_EXPIRY }
    );

    return { accessToken, expiresIn: SESSION_EXPIRY}
}