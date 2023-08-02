const Medico = require('../models/medico.model')

const getMedicos = async (req,res) =>{

    const medicos = await Medico.find()
    .populate('usuario', 'nombre img')
    .populate('hospital', 'nombre img')

    res.json({
        ok:true,
        medicos
    })
};

const crearMedico = async (req,res) =>{

    const uid = req.uid;

    const medico = new Medico({
        usuario:uid,
        ...req.body
    });

    try {

        const medicoDB = await medico.save();

        res.json({
            ok:true,
            medico:medicoDB
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
        
    }



};

const actualizarMedico = async (req,res) =>{

    const uid = req.params.uid;
    const medicoId = req.params.id;

    try {

        const medicoDB = await Medico.findById(medicoId);

        if(!medicoDB){
            return res.status(404).json({
                ok:true,
                msg:'Medico No existe'
            });
        }

        const cambiosMedico ={
            ...req.body,
            usuario: uid
        };

        const medicoActualizado = await Medico.findByIdAndUpdate(medicoId, cambiosMedico, { new :true} )
        res.json({
            ok:true,
            medico: medicoActualizado
        });
    

        
    } catch (error) {
        
            res.status(500).json({
                ok:false,
                msg:'Hable con el Administrador'
            })
        
    }

};


const borrarMedico = async (req,res) =>{

    const medicoId = req.params.id;

    try {

        const medicoDB = await Medico.findById(medicoId);
        if(!medicoDB){
            return res.status(404).json({
                ok:true,
                msg:'Medico No existe'
            });
        };

        await Medico.findByIdAndDelete(medicoId);
        res.json({
            ok:true,
            msg:'Medico ELiminado'
        });
        
    } catch (error) {
        res.json({
            ok:false,
            msg:'Hable con el Administrador'
        })
        
    }



};


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}