const Usuario = require("../models/usuario");
const bycrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require("../helpers/google-verify");
const { getMenuFrontEnd } = require('../helpers/menu-frontend');


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
            token,
            menu: getMenuFrontEnd( usuarioDB.role )
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Ha ocurrido un error inesperado ver logs'
        })
    }
}

const googleSingIn = async( req, res ) =>{
 
    try {
        const { name, email, picture } = await googleVerify( req.body.token );
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;


        if( !usuarioDB ){
            usuario = new Usuario({
                nombre:name,
                email,
                password:'@@@',
                img:picture,
                google:true
            });
        }else{
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar usuario
        await usuario.save();

        // Generar token
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            token,
            email:usuario.email,
            menu: getMenuFrontEnd( usuario.role )
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg:'El token de google no es valido'
        })
    }
}

const renewToken = async(req, res )=>{
    const uid = req.uid;

    // Generar JWT
    const token = await generarJWT( uid );

    const usuario = await Usuario.findById( uid );

    res.json({
        ok:true,
        token,
        usuario,
        menu: getMenuFrontEnd( usuario.role )
    })

}

module.exports = {
    login,
    googleSingIn,
    renewToken
}