const Cliente = require('../models/cliente');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require("dotenv").config();
const loginCtrl = {};

loginCtrl.iniciarSesion = async (req, res) => {     
    try {
        const cliente = await Cliente.findOne({ documento: req.body.documento });
                
        if (!cliente) {
            return res.json({ status: 'Error', message: 'No existe cliente con el documento proporcionado' });
        }

        const hashedPassword = cliente.contrasena;
        const normalPassword = req.body.contrasena;

        const passwordMatch = await bcrypt.compare(normalPassword, hashedPassword);
        
        if (!passwordMatch) {
            return res.json({ status: 'Credenciales incorrectas',
        rara: cliente.contrasena,
    normal: req.body.contrasena  });
        }

        const token = jwt.sign({ clienteId: cliente._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.json({cliente, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Error', message: 'Error al iniciar sesión' });
    }
}

module.exports = loginCtrl;
