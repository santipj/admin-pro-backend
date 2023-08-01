// 
//  Path: /api/login
// 
const { Router } = require('express');
const { login , googleSingIn } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

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


module.exports = router;