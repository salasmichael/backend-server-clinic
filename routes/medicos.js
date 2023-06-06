const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {
    getMedicos,
    getMedicoById,
    crearMedico,
    actualizarMedico,
    eliminarMedico
} = require('../controllers/medicos');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/',validarJWT, getMedicos);

router.get( '/:id',
    validarJWT,
    getMedicoById
);


router.post( '/', 
    [
        validarJWT,
        check('nombre','El medico debe tener un nombre').not().isEmpty(),
        check('hospital','El hospital id debe ser valido').isMongoId(),
        validarCampos
    ],
    crearMedico 
);

router.put( '/:id', 
    [
        validarJWT,
        check('nombre','El medico debe tener un nombre').not().isEmpty(),
        check('hospital','El hospital id debe ser valido').isMongoId(),
        validarCampos
    ],
    actualizarMedico 
);

router.delete( '/:id',
        validarJWT,
        eliminarMedico
    );


module.exports = router;
