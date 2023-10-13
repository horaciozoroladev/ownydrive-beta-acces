import { Router } from "express";
import { checkCustomRoute } from "../middlewares/custom.middleware.js";
import { authController } from "../controllers/auth.controller.js";
import { validateToken } from "../middlewares/auth.middleware.js";
import { customController } from "../controllers/custom.controller.js";

const router = Router()

router.get('/',
    checkCustomRoute,
    async (req, res) => {

    }
)
// custom
router.get('/:entity',
    checkCustomRoute,
    validateToken,
    customController.getAll
)

router.get('/:entity/:id',
    checkCustomRoute,
    validateToken,
    customController.getById
)

router.post('/:entity',
    checkCustomRoute,
    // validateToken,
    customController.create
)

router.patch('/:entity/:id',
    checkCustomRoute,
    validateToken,
    customController.update
)

router.delete('/:entity/:id',
    checkCustomRoute,
    validateToken,
    customController.delete
)


// auth
router.post('/:entity/auth/login',
    checkCustomRoute,
    authController.login
)

router.post('/:entity/auth/logout',
    checkCustomRoute,
    validateToken,
    authController.logout
)


export default router