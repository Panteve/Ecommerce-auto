const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema({
    nombre: { type: String, required: true },
    documento: { type: Number, required: true },
    correo: { type: String, required: true },
    telefono: { type: Number, required: true },
    contrasena: { type: String, required: true },
});

module.exports = mongoose.model('admin', AdminSchema);