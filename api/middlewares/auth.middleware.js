import jwt from 'jsonwebtoken';
import { CONFIG } from "../config/config.js"
import { _status } from '../utils/helpers.js';

/**
 * The function generates a token using the payload and a secret key.
 * @param payload - The payload is an object that contains the data you want to include in the token.
 * It can be any valid JSON object that you want to encode and include in the token.
 * @returns The function `generateToken` returns a token generated using the `jwt.sign` method.
 */
export const generateToken = (payload) => {
    const token = jwt.sign(payload, CONFIG.JWT_KEY, { algorithm: "HS256" });
    return token;
}

/**
 * The `validateToken` function is used to validate a token by checking its expiration date and
 * returning an error response if it is expired.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as headers, query parameters, and request body. It is an object that is passed to
 * the middleware function by the Express framework.
 * @param res - The `res` parameter is the response object that is used to send a response back to the
 * client. It contains methods and properties that allow you to control the response, such as setting
 * the status code, headers, and sending the response body.
 * @param next - The `next` parameter is a function that is used to pass control to the next middleware
 * function in the request-response cycle. It is typically used to move to the next middleware function
 * or to the final route handler.
 */
export const validateToken = (req, res, next) => {

    if (req.headers.authorization == undefined) {
        res.status(500).json(_status(false, true, 'Acces token is neccesary'))
    } else {

        const token = req.headers.authorization?.replace("Bearer ", "") ?? '';
        const decoded = jwt.verify(token, CONFIG.JWT_KEY);

        const { id, username, exp } = decoded;

        if (Date.now() > Number(exp)) {
            res.status(500).json(_status(false, true, 'You should sign in again'))
        } else {
            next();
        }
    }
}

