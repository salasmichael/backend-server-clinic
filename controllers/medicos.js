
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

    const id    = req.params.id;
    const uid   = req.uid;

    try {

        const medico = await Medico.findById( id );
        if( !medico ){
            return  res.status(400).json({
                        status:false,
                        msg:'medico no encontrado'
                    });
        }

        const cabiosMedico = {
            ...req.body,
            usuario:uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate( id, cabiosMedico,{ new:true } );

        res.json({
            status:true,
            medico:medicoActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            status:false,
            msg:'Error inesperado ver logs'
        });
    }


}

const eliminarMedico = async(req, res)=>{

    const id  = req.params.id;

    try {

        const medico = await Medico.findById( id );
        if( !medico ){
            return  res.status(400).json({
                        status:false,
                        msg:'Medico no encontrado'
                    });
        }

        await Medico.findByIdAndDelete( id );

        res.json({
            status:true,
            msg:'Medico eliminado'
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
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}