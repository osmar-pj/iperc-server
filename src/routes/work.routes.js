import { Router } from 'express'
const router = Router()

import * as workCtrl from '../controllers/work.controller.js'
import { authJwt } from '../middlewares'

router.post(
    '/',
    [
        // authJwt.verifyToken,
        // authJwt.isAdmin
    ],
    workCtrl.createWork
)

router.get(
    '/',
    [
        // authJwt.verifyToken,
        // authJwt.isAdmin
    ],
    workCtrl.getWorks
)

router.get(
    '/:id',
    [
        // authJwt.verifyToken,
        // authJwt.isAdmin
    ],
    workCtrl.getWorkById
)

router.put(
    '/:id',
    [
        // authJwt.verifyToken,
        // authJwt.isAdmin
    ],
    workCtrl.updateWorkById
)

router.delete(
    '/:id',
    [
        // authJwt.verifyToken,
        // authJwt.isAdmin
    ],
    workCtrl.deleteWorkById
)

export default router