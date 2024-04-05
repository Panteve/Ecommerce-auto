const Cliente = require('../models/cliente');
const loginCtrl = {};

loginCtrl.iniciarSesion = async (req, res) => {     
    try {
        const cliente = await Cliente.findOne({
            $and:[
                {documento: req.body.documento},
                {contrasena: req.body.contrasena}
            ]
        })
    
        if (cliente) {
            res.json({ cliente, isLoggedIn: true })
        } else if(!cliente) {
            res.json({
                status: 'Credenciales incorrectas',
            });
        }
    } catch (error) {
        res.json({
            status: 'Error al encontrar al iniciar sesion',
            error: error.message,
        });
    }
}

module.exports = loginCtrl;