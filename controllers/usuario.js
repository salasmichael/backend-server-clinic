
const Usuario = require('../models/usuario');
const bycrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async(req, res)=>{

    const usuarios = await Usuario.find({}, 'nombre email role google')
    
    res.json({
        status:'ok',
        usuarios
    });

}

const crearUsuario = async(req, res)=>{

    const { nombre, email, password } = req.body;
    
    try {

        const ExisteUsuario = await Usuario.findOne({email});

        if( ExisteUsuario ){
            return res.status(400).json({
                ok:false,
                msg: `El email ${email} ya se encuentra registrado` 
            })
        }

        const usuario = new Usuario( req.body );

        const salt =  bycrypt.genSaltSync();
        usuario.password = bycrypt.hashSync( password, salt );
        
        // Guardar usuario
        await usuario.save();

        // Generar JWT
         const token = await generarJWT( usuario.uid );
         usuario.token = token;


        res.json({
            status:'ok',
            usuario,
            token
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Ha ocurrido un error inesperado ver logs'
        })
    }

}

const actualizarUsuario = async(req, res)=> {
    
    const uid =  req.params.id;
    
    try {

        const usuarioDB = await Usuario.findById(uid);

        if( !usuarioDB ){
            return res.status(400).json({
                ok:false,
                msg:"No existe un usuario por ese id"
            })
        }

        const { password, google, email, ...campos} = req.body;

        if( usuarioDB.email != email ){
            const existeEmail = await Usuario.findOne({ email });
            if( existeEmail ){
                res.status(400).json({
                    ok:false,
                    msg:'Ya existe un usuario con ese email'
                })
            }
        }

        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new:true } );

        res.json({
            ok:true,
            usuario:usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Ha ocurrido un error inesperado ver logs'
        })
    }
}

const borrarUsuario = async(req, res)=>{
    const uid = req.params.id;
    try {

        const usuarioDB = await Usuario.findById(uid);

        if( !usuarioDB ){
            return res.status(400).json({
                ok:false,
                msg:"No existe un usuario por ese id"
            })
        }

        await Usuario.findByIdAndDelete( uid );

        res.json({
            ok:true,
            msg:'Usuario eliminado'
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
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}
