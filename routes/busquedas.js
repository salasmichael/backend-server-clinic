const { Router } = require('express');

const {
    getTodo,
    getDocumentosColeccion
} = require('../controllers/busquedas');

const { valiarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/:busqueda',valiarJWT,getTodo);
router.get( '/coleccion/:tabla/:busqueda',valiarJWT,getDocumentosColeccion);

module.exports = router;