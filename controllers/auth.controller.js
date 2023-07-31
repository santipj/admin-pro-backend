const { response, json } = require("express");
const Usuario  = require("../models/usuario.model");
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");


const login = async (req,res = response)=>{

    const {email,password} = req.body;

    try {


        // Verificar Email
        // const usuarioDB = await Usuario.findOne({email});
        const usuarioDB = await Usuario.findOne({ email });
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'Email no Valida'
            });
        }

        //Verificar Contraseña
        const validPassword = bcrypt.compareSync(password,usuarioDB.password);

        if(!validPassword){
            return res.status(400),json({
                ok:false,
                msg:'La contraseña no es valida'
            });
        }


        // Generar un Token...
        const token = await generarJWT(usuarioDB.id)




        res.json({
            ok:true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Comuniquese con el Administrador"
        })
    }
};


module.exports ={
    login
}