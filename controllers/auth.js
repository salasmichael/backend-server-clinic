const Usuario = require("../models/usuario");
const bycrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const login = async( req, res ) =>{

    const { email,password } = req.body

    try {

        // validar el usuario
        const usuarioDB = await Usuario.findOne({ email });
        if( !usuarioDB ){
            return res.status(400).json({
                ok:false,
                msg:'No existe el usuario'
            })
        }

        //Validar la password
        const validPassword = bycrypt.compareSync( password, usuarioDB.password )
        if( !validPassword ){
            return res.status(400).json({
                ok:false,
                msg:'Password no valida'
            })
        }

        // Generar JWT
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok:true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Ha ocurrido un error inesperado ver logs'
        })
    }
}

module.exports = {
    login,
}