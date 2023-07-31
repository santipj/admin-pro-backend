// 
//  Path: /api/login
// 
const { Router } = require('express');
const { login } = require('../controllers/auth.controller');
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
        )


module.exports = router;