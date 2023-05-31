const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
} = require('../controllers/hospitales');

const { valiarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/' ,valiarJWT, getHospitales);

router.post( '/', 
    [
        valiarJWT,
        check('nombre','El hospital debe tener un nombre').not().isEmpty(),
        validarCampos
    ],
    crearHospital 
);

router.put( '/:id', 
    [
     
    ],
    actualizarHospital 
);

router.delete( '/:id',
        eliminarHospital
    );

module.exports = router;
