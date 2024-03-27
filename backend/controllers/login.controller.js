const Cliente = require('../models/cliente');
const loginCtrl = {};

loginCtrl.login = async (req, res) => {     
    try {
        const credencialesCliente = await Cliente.findOne({
            $and:[
                {documento: req.body.documento},
                {contrasena: req.body.contrasena}
            ]
        })
    
        if (credencialesCliente) {
            res.json({ cliente, log: true })
        } else if(!credencialesCliente) {
            res.json({
                status: 'Credenciales incorrectas',
            });
        }
    } catch (error) {
        res.json({
            status: 'Error al encontrar el cliente',
            error: error.message,
        });
    }
}
