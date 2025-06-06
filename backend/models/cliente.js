const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClienteSchema = new Schema({
    nombre: { type: String, required: true },
    documento: { type: Number, required: true },
    correo: { type: String, required: true },
    ciudad: { type: String, required: true },
    direccion: { type: String, required: true },
    telefono: { type: Number, required: true },
    contrasena: { type: String, required: true },
    pedidos: [{
        refpedido:{ type: Schema.Types.String, ref: 'Pedido', required: false },
        fecha: { type: Date, required: false },
        total: { type: Number, required: false },
        _id: { type: mongoose.Schema.Types.ObjectId,auto: false,required: false }
    }],
});

module.exports = mongoose.model('cliente', ClienteSchema);