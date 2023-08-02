// 
//  Path: /api/login
// 
const { Router } = require('express');
const { login , googleSingIn, renewToken } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');

const router = Router();

    router.post('/', 
    [
        check('email','El email es Obligatorio').isEmail(),
        check('password','El password es Obligatorio').not().isEmpty(),
        validarCampos
    ],
        login
        );

    router.post('/google', 
    [
        check('token','El token de google es Obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSingIn
        );

        router.get('/renew', 
        [
            validarJWT,
            renewToken
        ],
            );


module.exports = router;