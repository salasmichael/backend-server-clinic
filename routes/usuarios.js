const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuario, actualizarUsuario,borrarUsuario } = require('../controllers/usuario');
const { valiarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', valiarJWT ,getUsuarios );

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
     valiarJWT,
     check('nombre','El nombre es obligatorio').not().isEmpty(),
     check('email','El email es obligatorio').not().isEmpty(),
     check('rol','El rol es obligatorio').not().isEmpty(),
     validarCampos
    ],
    actualizarUsuario 
);

router.delete( '/:id',
     valiarJWT,
     borrarUsuario
     );

module.exports = router;
