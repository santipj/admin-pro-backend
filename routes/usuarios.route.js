// 
//  Path: /api/usuarios
// 

const { Router } = require ('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { getUsuarios, crearUsuarios, actualizarUsuario,borrarUsuario } = require ('../controllers/usuarios.controller');
const { validarJWT } = require('../middlewares/validar-JWT');


const router = Router();


router.get( '/',validarJWT, getUsuarios );

router.post( '/', [
    validarJWT,
    check('nombre','El nombre es Obligatorio').not().isEmpty(),
    check('password','La Contraseña es Obligatoria').not().isEmpty(),
    check('email','El Email es Obligatorio').isEmail(),
    validarCampos

] ,crearUsuarios );

router.put( '/:id',  [
    validarJWT,
    check('nombre','El nombre es Obligatorio').not().isEmpty(),
    check('email','El Email es Obligatorio').isEmail(),
    check('role','El role es Obligatorio').not().isEmpty(),
    validarCampos,


] , actualizarUsuario );

router.delete( '/:id',  [
    validarJWT
] , borrarUsuario );




module.exports = router;