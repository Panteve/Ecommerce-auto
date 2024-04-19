const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProductoSchema = new Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, auto:true, required: false},
    refproducto: {type:String, required:true},
    nombre: {type:String, required:true},
    precio: {type:Number, required:true},
    descripcion: {type:String, required:true},
    imagen: {type:Array, required:true},
    calificacion: {type:String, required:false},
    stock: {type:Number, required:true},
    proveedor:{ type: Schema.Types.String, ref: 'Proveedor', required: true },
});


module.exports = mongoose.model('producto', ProductoSchema);