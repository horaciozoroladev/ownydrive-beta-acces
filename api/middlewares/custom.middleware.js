import { CONFIG } from "../config/config.js";
import { _status } from "../utils/helpers.js";

export const checkCustomRoute = (req, res, next) => {
    const entity = req.params.entity;

    if (CONFIG.ROUTES.includes(entity)) {
        req.url = `${CONFIG.EXTERNAL_API}${entity}/`;
        next()
    } else {
        res.status(500).json(_status(false, true, 'Entity not recognized'))
    }
}