const mongoose = require('mongoose');
const {Schema} = mongoose;

const PedidoSchema = new Schema({
    refpedido: {type:String, required:true},
    fechacreacion: {type:Date, required:true},
    total: {type:Number, required:true},
    estado:{type:Boolean, required: true},
    dueño: {type: Schema.Types.String, ref: 'Cliente', required: true},
    documentoDueño: {type: Schema.Types.Number, ref: 'Cliente', required: true},
    productos: [{
        producto: { type: Schema.Types.String, ref: 'Producto', required: true },
        cantidad: { type: Number, required: true }
    }],
});

module.exports = mongoose.model('pedido', PedidoSchema);