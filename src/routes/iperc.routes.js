import { Router } from 'express'
const router = Router()

import * as ipercCtrl from '../controllers/iperc.controller.js'
import { authJwt } from '../middlewares'

router.post(
    '/',
    // [authJwt.verifyToken, authJwt.isAdmin],
    ipercCtrl.createIperc
)

router.get(
    '/',
    // [authJwt.verifyToken, authJwt.isAdmin],
    ipercCtrl.getIpercs
)

router.get(
    '/:id',
    // [authJwt.verifyToken, authJwt.isAdmin],
    ipercCtrl.getIpercById
)

router.put(
    '/:id',
    // [authJwt.verifyToken, authJwt.isAdmin],
    ipercCtrl.updateIpercById
)

router.delete(
    '/:id',
    // [authJwt.verifyToken, authJwt.isAdmin],
    ipercCtrl.deleteIpercById
)

export default router