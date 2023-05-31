const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
} = require('../controllers/medicos');

const { valiarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/',valiarJWT, getMedicos);

router.post( '/', 
    [
        valiarJWT,
        check('nombre','El medico debe tener un nombre').not().isEmpty(),
        check('hospital','El hospital id debe ser valido').isMongoId(),
        validarCampos
    ],
    crearMedico 
);

router.put( '/:id', 
    [
        valiarJWT,
        check('nombre','El medico debe tener un nombre').not().isEmpty(),
        check('hospital','El hospital id debe ser valido').isMongoId(),
        validarCampos
    ],
    actualizarMedico 
);

router.delete( '/:id',
        valiarJWT,
        eliminarMedico
    );


module.exports = router;
