
const Hospital  = require('../models/hospital');

const getHospitales = async(req, res)=>{

    const hospitales = await Hospital.find()
                                            .populate('usuario','nombre img')

    res.json({
        status:'ok',
        hospitales
    });

}

const crearHospital = async(req, res)=>{

    const uid = req.uid;
    const hospital = new Hospital( { 
        usuario:uid,
        ...req.body 
    } );


    try {

        const hospitalDB = await hospital.save();

        res.json({
            status:'ok',
            hospitalDB
        });
        
    } catch (error) {
        console.log(error);
       return res.status(500).json({
            ok:false,
            msg:'Error inesperado ver log'
        });
        
    }

}

const actualizarHospital = async(req, res)=>{

    const id    = req.params.id;
    const uid   = req.uid;

    try {

        const hospital = await Hospital.findById( id );
        if( !hospital ){
            return  res.status(400).json({
                        status:false,
                        msg:'Hospital no encontrado'
                    });
        }

        const cabiosHospital = {
            ...req.body,
            usuario:uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cabiosHospital,{ new:true } );

        res.json({
            status:true,
            hospital:hospitalActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            status:false,
            msg:'Error inesperado ver logs'
        });
    }

}

const eliminarHospital = async(req, res)=>{

    const id    = req.params.id;

    try {

        const hospital = await Hospital.findById( id );
        if( !hospital ){
            return  res.status(400).json({
                        status:false,
                        msg:'Hospital no encontrado'
                    });
        }

        await Hospital.findByIdAndDelete( id );

        res.json({
            status:true,
            msg:'Hospital eliminado'
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            status:false,
            msg:'Error inesperado ver logs'
        });
    }

}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
}