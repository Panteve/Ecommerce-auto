const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProductoSchema = new Schema({
    refproducto: {type:String, required:true},
    nombre: {type:String, required:true},
    precio: {type:Number, required:true},
    descripcion: {type:String, required:true},
    imagen: {type:String, required:true},
    calificacion: {type:String, required:true},
    stock: {type:Number, required:true},
    proveedor:{ type: Schema.Types.ObjectId, ref: 'Proveedor', required: true },
});


module.exports = mongoose.model('producto', ProductoSchema);