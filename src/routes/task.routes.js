import { Router } from 'express'
const router = Router()

import * as taskCtrl from '../controllers/task.controller.js'
import { authJwt } from '../middlewares'

router.post(
    '/',
    // [authJwt.verifyToken, authJwt.isAdmin],
    taskCtrl.createTask
)

router.get(
    '/',
    // [authJwt.verifyToken, authJwt.isAdmin],
    taskCtrl.getTasks
)

router.get(
    '/:id',
    // [authJwt.verifyToken, authJwt.isAdmin],
    taskCtrl.getTaskById
)

router.put(
    '/:id',
    // [authJwt.verifyToken, authJwt.isAdmin],
    taskCtrl.updateTaskById
)

router.delete(
    '/:id',
    // [authJwt.verifyToken, authJwt.isAdmin],
    taskCtrl.deleteTaskById
)

export default router