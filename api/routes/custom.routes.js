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
/**
 * @swagger
 * /api/{entity}:
 *   get:
 *     summary: Gets all elements of an entity
 *     description: Gets all elements of an entity.
 *     parameters:
 *       - in: path
 *         name: entity
 *         required: true
 *         description: Entity name
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: All records
 *       500:
 *         description: Error
 */
router.get('/:entity',
    checkCustomRoute,
    validateToken,
    customController.getAll
)

/**
 * @swagger
 * /api/{entity}/{id}:
 *   get:
 *     summary: Gets an element by id
 *     description: Gets an entity's element by id.
 *     parameters:
 *       - in: path
 *         name: entity
 *         required: true
 *         description: Entity name
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: Element id
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Record
 *       500:
 *         description: Error
 */
router.get('/:entity/:id',
    checkCustomRoute,
    validateToken,
    customController.getById
)

/**
 * @swagger
 * /api/{entity}/{id}/{entity2}:
 *   get:
 *     summary: Gets an entity2 element by id
 *     description: Gets an entity2 element within entity by its id.
 *     parameters:
 *       - in: path
 *         name: entity
 *         required: true
 *         description: entity name
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: Entity id.
 *         schema:
 *           type: string
 *       - in: path
 *         name: entity2
 *         required: true
 *         description: entity2 name.
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Record entity2
 *       500:
 *         description: Error 
 */
router.get('/:entity/:id/:entity2',
    checkCustomRoute,
    validateToken,
    customController.getByIdByEntity
)

/**
 * @swagger
 * /api/{entity}:
 *   post:
 *     summary: Create a new element in the entity
 *     description: Create a new element in the entity.
 *     parameters:
 *       - in: path
 *         name: entity
 *         required: true
 *         description: Entity name
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Record
 *       500:
 *         description: Error
 * 
 */
router.post('/:entity',
    checkCustomRoute,
    validateToken,
    customController.create
)

/**
 * @swagger
 * /api/{entity}/{id}:
 *   patch:
 *     summary: Updates an element of an entity by its id
 *     description: Updates an element of an entity by its id
 *     parameters:
 *       - in: path
 *         name: entity
 *         required: true
 *         description: Entity name.
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: Element id.
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Record
 *       500:
 *         description: Error
 */
router.patch('/:entity/:id',
    checkCustomRoute,
    validateToken,
    customController.update
)

/**
 * @swagger
 * /api/{entity}/{id}:
 *   delete:
 *     summary: Deletes a record by its id
 *     description: Deletes an element's record by its id
 *     parameters:
 *       - in: path
 *         name: entity
 *         required: true
 *         description: Entity name
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: Element id
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Record deleted successfully
 *       500:
 *         description: Error
 */
router.delete('/:entity/:id',
    checkCustomRoute,
    validateToken,
    customController.delete
)


// auth
/**
 * @swagger
 * /api/{entity}/auth/login:
 *   post:
 *     summary: Sign in
 *     description: Sign in.
 *     parameters:
 *       - in: path
 *         name: entity
 *         required: true
 *         description: Entity name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User's session info
 *       500:
 *         description: Credentials for this User not found
 */
router.post('/:entity/auth/login',
    checkCustomRoute,
    authController.login
)

/**
 * @swagger
 * /api/{entity}/auth/logout:
 *   post:
 *     summary: Log out
 *     description: Log out.
 *     parameters:
 *       - in: path
 *         name: entity
 *         required: true
 *         description: Entity name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       500:
 *         description: Credentials for this User not found
 */
router.post('/:entity/auth/logout',
    checkCustomRoute,
    validateToken,
    authController.logout
)


export default router