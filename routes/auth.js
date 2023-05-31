const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { login, googleSingIn } = require('../controllers/auth');

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



module.exports = router;
