const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { login, googleSingIn, renewToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post( '/', 
    [
     check('email','El email es obligatorio').not().isEmpty(),
     check('password','La password es obligatoria').not().isEmpty(),
     validarCampos   
    ],
    login 
);

router.post( '/google', 
    [
     check('token','el token es obligatorio').not().isEmpty(),
     validarCampos   
    ],
    googleSingIn 
);

router.get( '/renew', 
    validarJWT,
    renewToken 
);



module.exports = router;
