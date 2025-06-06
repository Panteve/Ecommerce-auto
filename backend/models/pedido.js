const mongoose = require('mongoose');
const {Schema} = mongoose;

const PedidoSchema = new Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, auto:true, required: false},
    refpedido: {type:String, required:false},
    fechacreacion: {type:Date, required:false},
    total: {type:Number, required:false},
    estado:{type:Boolean, required: false},
    dueño: {type: Schema.Types.String, ref: 'Cliente', required: false},
    documentoDueño: {type: Schema.Types.Number, ref: 'Cliente', required: true},
    productos: [{
        producto: { type: Schema.Types.String, ref: 'Producto', required: true },
        cantidad: { type: Number, required: true }
    }],
});

module.exports = mongoose.model('pedido', PedidoSchema);