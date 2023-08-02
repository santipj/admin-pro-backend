const { response, json } = require("express");
const Usuario = require("../models/usuario.model");
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {


        // Verificar Email
        // const usuarioDB = await Usuario.findOne({email});
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no Valida'
            });
        }

        //Verificar Contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.status(400), json({
                ok: false,
                msg: 'La contraseña no es valida'
            });
        }


        // Generar un Token...
        const token = await generarJWT(usuarioDB.id)


        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Comuniquese con el Administrador"
        })
    }
};


const googleSingIn = async (req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify(googleToken);

        // Verificar Usuario
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        // No existe el Usuario
        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });

        } else {
            // Existe Usuario
            usuario = usuarioDB;
            usuario.google = true;
            usuario.password = '@@@';
        }


        // Guardar en base de datos
        await usuario.save();


        // Genear JWT 
        const token = await generarJWT(usuario.id)

        res.json({
            ok: true,
            token: token
        });



    } catch (error) {

        res.status(401).json({
            ok: false,
            msg: "Token no valido"
        });

    }

};

const renewToken = async (req,res = response)=>{

    const uid = req.uid;

    // Genear JWT 
    const token = await generarJWT(uid)



    res.json({
        ok:true,
        token
    })
}


module.exports = {
    login,
    googleSingIn,
    renewToken
}