
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

    res.json({
        status:'ok',
        msg:''
    });

}

const eliminarHospital = async(req, res)=>{

    res.json({
        status:'ok',
        msg:''
    });

}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
}