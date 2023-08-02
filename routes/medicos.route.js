// 
// path : /api/medicos
// 
const { Router } = require ('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const {getMedicos,crearMedico,actualizarMedico,borrarMedico} = require('../controllers/medicos.controller');
const { validarJWT } = require('../middlewares/validar-JWT');

const router = Router();


router.get( '/',[
    validarJWT

], getMedicos );

router.post( '/',[
    validarJWT,
    check('nombre','El nombre del medico es requerido').not().isEmpty(),
    check('hospital','El Hospital id debe ser valido').isMongoId(),
    validarCampos

] ,crearMedico );

router.put( '/:id',[
    validarJWT,
    check('nombre','El nombre del hospital es necesario').not().isEmpty(),
    check('hospital','El Hospital id debe ser valido').isMongoId(),
    validarCampos
] , actualizarMedico );

router.delete( '/:id',[
    validarJWT
] , borrarMedico );




module.exports = router;