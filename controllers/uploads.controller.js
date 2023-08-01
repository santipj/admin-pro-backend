const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const { response } = require('express');
const { actuzalizarImagen } = require('../helpers/actualizarImagen');


const fileUpload = (req,res = response)=>{

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales','medicos','usuarios'];

    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg:'No es un medico o usuario o Hospital (tipo)'
        })
    }

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:'No hay ningun archivo'
        })
      };

    // Procesar la imagen...
      const file = req.files.imagen;
      
      const nombreCortado = file.name.split('.');
      const extensionArchivo = nombreCortado[nombreCortado.length-1];


    //   Validar Extension
      const extensionesValidas = ['png','jpg','jpeg','gif'];
      if(!extensionesValidas.includes(extensionArchivo) ){
        return res.status(400).json({
            ok:false,
            msg:'No es una extension permitida'
        })
      };


    // Generar nombre del Archivo
      const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;


    //   Path para guardar la imagen
      const path = `./uploads/${tipo}/${nombreArchivo}`;

    //   Mover la imagen 
      file.mv(path, (err) => {
        if (err){
            console.log(err);
            return res.status(500).json({
              ok:false,
              msg:'Error al mover la imagen'
            });

        }

        // Actualiza a base de datos
        actuzalizarImagen(tipo, id , nombreArchivo);
    
          res.status(200).json({
            ok:true,
            msg:'Archivo Subido',
            nombreArchivo
        })
      });


}


const retornaImagen = (req,res)=>{

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${tipo}/${foto}`);

    // Imagen por defecto
    if(fs.existsSync(pathImg)){
      res.sendFile(pathImg);
    }else{
      const pathImg = path.join( __dirname, `../uploads/no-img.jpg`);
      res.sendFile(pathImg)
    }


}


module.exports={
    fileUpload,
    retornaImagen
}