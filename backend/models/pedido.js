const mongoose = require('mongoose');
const {Schema} = mongoose;

const PedidoSchema = new Schema({
    refpedido: {type:String, required:true},
    fechacreacion: {type:Date, required:true},
    total: {type:Number, required:true},
    estado:{type:Boolean, required: false},
    dueño: {type: Schema.Types.ObjectId, ref: 'Cliente', required: true},
    documentoDueño: {type: Schema.Types.ObjectId, ref: 'Cliente', required: true},
    productos: [{
        producto: { type: Schema.Types.ObjectId, ref: 'Producto', required: false },
        cantidad: { type: Number, required: false }
    }],
});

module.exports = mongoose.model('pedido', PedidoSchema);