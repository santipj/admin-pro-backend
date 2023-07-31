const { Schema, model } = require('mongoose');


const UsuarioScheme = Schema({

    nombre:{
        type : String,
        require : true,
    },
    email:{
        type : String,
        require : true,
        unique : true,
    },
    password:{
        type : String,
        require : true,
    },
    img:{
        type : String,
    },
    role:{
        type : String,
        require : true,
        default: 'USER_ROLE'        
    },
    google:{
        type:Boolean,
        default:false
    }
});

UsuarioScheme.method('toJSON', function(){
    const {__v, _id,password, ...Object} = this.toObject();
    Object.uid = _id;
    return Object;
});


module.exports = model('Usuario',UsuarioScheme);