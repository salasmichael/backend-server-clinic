
const path = require('path');
const response = require('express');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload =  (req, res) =>{

    const { tipo, id } = req.params;

    const validarTipos = ['hospitales','medicos','usuarios'];

    // Validar el tipo
    if( !validarTipos.includes( tipo ) ){
       return res.status(400).json({
            ok:false,
            msg:' El tipo no es valido '
        })
    }

    // Validar si existe algun archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:'No ha adjuntado algún archivo'
        });
      }

    // procesar el archivo
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extencionArchivo = nombreCortado[ nombreCortado.length - 1 ];

    // validar extenciones
    const extencionesValidas = ['jpg','png','jpeg','gif'];
    if( !extencionesValidas.includes( extencionArchivo ) ){
        res.status(400).json({
            ok:false,
            msg:'Extencion no valida'
        })
    }

    // Generar nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extencionArchivo }`;


    // Path para guardar el archivo
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    file.mv(path, (err)=> {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok:false,
                msg:'No se pudo mover la imagen'
            });
        }

         actualizarImagen( tipo, id, nombreArchivo);
    
        res.send({
            ok:true,
            msg:'Archivo subido',
            nombreArchivo
        });
      });

};

const retornarImagen =(req, res=response)=>{

    const { tipo, foto } = req.params;

    const pathImg = path.join(__dirname,`../uploads/${ tipo }/${ foto }`);

    if( fs.existsSync( pathImg ) ){
        res.sendFile( pathImg );
    }else{
        const pathImg = path.join(__dirname,`../uploads/no-image.png`);
        res.sendFile( pathImg );   
    }
    
}

module.exports = {
    fileUpload,
    retornarImagen
}