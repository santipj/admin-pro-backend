const fs = require('fs');
const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');


const borrarImagen = (path)=>{
    if(fs.existsSync(path)){
        // Borrar la imagen anterior
        fs.unlinkSync(path);
    }
}

const actuzalizarImagen = async (tipo, id , nombreArchivo)=>{
let pathViejo = '';

    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);    
            if(!medico){
                console.log('Medico no existe');
                return false;
            }

            pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;

        break;
    
        case 'hospitales':
        const hospital = await Hospital.findById(id);    
            if(!hospital){
                console.log('Hospital no existe');
                return false;
            }

            pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejo);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            
        break;
    
        case 'usuarios':
            const usuario = await Usuario.findById(id);    
            if(!usuario){
                console.log('Usuario no existe');
                return false;
            }

            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            
        break;
    
        default:
            break;
    }

}

module.exports = {
    actuzalizarImagen
}