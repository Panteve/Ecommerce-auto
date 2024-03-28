const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProveedorSchema = new Schema({
    nombre: {type:String, required:true},
    direccion: {type:String, required:true},
    telefono: {type:Number, required:true},
    correo: {type:String, required:true},
    productos: [{ type: Schema.Types.String, ref: 'Productos', required: false }],
});

module.exports = mongoose.model('proveedor', ProveedorSchema);