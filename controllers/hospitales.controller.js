const Hospital = require('../models/hospital.model')

const getHospitales = async (req,res) =>{

    const hospitales = await Hospital.find()
    .populate('usuario','nombre img'); 

    res.json({
        ok:true,
        hospitales
    })

};

const crearHospital = async (req,res) =>{

    const uid = req.uid;

    const hospital = new Hospital({
        usuario:uid,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok:true,
            hospital:hospitalDB
        });
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
};

const actualizarHospital = async (req,res) =>{

    const uid = req.params.uid;
    const hospitalId = req.params.id;

    try {

        const hospitalDB = await Hospital.findById(hospitalId);

        if(!hospitalDB){
            return res.status(404).json({
                ok:true,
                msg:'Hospital No existe'
            })
        }

        const cambiosHospital ={
            ...req.body,
            usuario: uid
        };

        const hospitalActualizado = await Hospital.findByIdAndUpdate(hospitalId, cambiosHospital, {new:true});
            res.json({
                ok:true,
                hospital: hospitalActualizado
            })
        
    } catch (error) {

        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
        
    }

};


const borrarHospital =  async(req,res) =>{


    const hospitalId = req.params.id;

    try {

        const hospitalDB = await Hospital.findById(hospitalId);

        if(!hospitalDB){
            return res.status(404).json({
                ok:true,
                msg:'Hospital No existe'
            })
        };

        await Hospital.findByIdAndDelete(hospitalId);

        res.json({
            ok:true,
            msg:'Hospital ELiminado'
        })
        
    } catch (error) {
        
            res.json({
                ok:false,
                msg:'Hable con el administrador'
            })
        
    }



};


module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}