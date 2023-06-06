const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuario, actualizarUsuario,borrarUsuario } = require('../controllers/usuario');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT ,getUsuarios );

router.post( '/', 
    [
     check('nombre','El nombre es obligatorio').not().isEmpty(),
     check('email','El email es obligatorio').not().isEmpty(),
     check('password','La password es obligatoria').not().isEmpty(),
     validarCampos   
    ],
    crearUsuario 
);

router.put( '/:id', 
    [
     validarJWT,
     check('nombre','El nombre es obligatorio').not().isEmpty(),
     check('email','El email es obligatorio').not().isEmpty(),
     check('role','El rol es obligatorio').not().isEmpty(),
     validarCampos
    ],
    actualizarUsuario 
);

router.delete( '/:id',
     validarJWT,
     borrarUsuario
     );

module.exports = router;
