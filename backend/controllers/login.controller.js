const Cliente = require('../models/cliente');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require("dotenv").config();
const loginCtrl = {};

loginCtrl.iniciarSesion = async (req, res) => {     
    try {
        
        const cliente = await Cliente.findOne({documento: req.body.documento})
                
        if (cliente) {
            const hashedPassword = cliente.contrasena;
            const normalPassword = req.body.contrasena;

            bcrypt.compare(normalPassword, hashedPassword, function(err, result) {
                if (err) {
                    return res.json({ status: 'Error al comprobar credenciales', error: err.message });
                }

                if (result) {
                    const token = jwt.sign({ clienteId: cliente._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
                    res.json({ cliente, token });
                } else {
                    return res.json({ status: 'Credenciales incorrectas' });
                }
            });
        } else {
            res.json({ status: 'No existe cliente' });
        }
    } catch (error) {
        res.json({
            status: 'Error al encontrar al iniciar sesion',
            error: error.message,
        });
    }
}

module.exports = loginCtrl;