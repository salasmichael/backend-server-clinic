
const Medico = require('../models/medico');


const getMedicos = async(req, res)=>{

    const medicos = await Medico.find()
                            .populate('usuario','nombre img')
                            .populate('hospital','nombre img')

    res.json({
        status:'ok',
        medicos
    });

}

const crearMedico = async(req, res)=>{
    
    const uid = req.uid;
    const medico = new Medico( { 
            usuario:uid,
            hospital:'',
            ...req.body
        } );

    try {

        const medicoDB = await medico.save();

        res.json({
            ok:true,
            medico: medicoDB
        })
        
    } catch (error) {
        console.log(error);
       return res.status(500).json({
            ok:false,
            msg:'Error inesperado ver logs'
        })
        
    }

}

const actualizarMedico = async(req, res)=>{

    res.json({
        status:'ok',
        msg:''
    });

}

const eliminarMedico = async(req, res)=>{

    res.json({
        status:'ok',
        msg:''
    });

}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}