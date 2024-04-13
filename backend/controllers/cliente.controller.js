const Cliente = require('../models/cliente');
const bcrypt = require('bcrypt');
const clienteCtrl = {};


//Obtener todos los clientes
clienteCtrl.getCliente = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        if (clientes && clientes.length > 0) {
            res.json({
                cantidad:clientes.length,
                data:clientes
            });
        } else{
            res.json({
                status: 'No hay clientes',
            });
        }
    } catch (error) {
        res.json({
            status: 'Error al encontrar los clientes',
            error: error.message,
        });
    } 
}                    

// Crear cliente
clienteCtrl.createCliente = async (req, res) => { 
    try {
        const clienteExistente = await Cliente.findOne({ documento: req.body.documento });
        
        if (clienteExistente) {
            return res.json({
                error: 'Existe',message: 'Ya existe una cuenta con ese documento' 
            });
        }  
        const hashedPassword = await bcrypt.hash(req.body.contrasena, 10);

        const nuevoCliente = new Cliente({
            nombre: req.body.nombre ,
            documento: req.body.documento ,
            correo: req.body.correo ,
            ciudad: req.body.ciudad ,
            direccion: req.body.direccion,
            telefono: req.body.telefono ,
            contrasena: hashedPassword ,
        });
        const data = await nuevoCliente.save();

        res.json({
            status: 'Registro de cliente exitoso'
        });
    } catch (error) {
        res.json({
            error: 'Error al registrar cliente',
            message: error.message
        });
    }
}


//Conseguir un unico cliente
clienteCtrl.getUnicocliente = async (req, res) => {     
    try {
        const clienteUnico = await Cliente.findOne({ documento: req.params.documento });

        if (clienteUnico) {
            res.json(clienteUnico);
        } else if(!clienteUnico) {
            res.json({
                status: 'Cliente no existe',
            });
        }
    } catch (error) {
        res.json({
            status: 'Error al encontrar el cliente',
            error: error.message,
        });
    }
}

//Actualizar cliente
clienteCtrl.editarCliente = async (req, res) =>  {
  try{  
    const unicoCliente = await Cliente.findOne({documento: req.params.documento})
    if(!unicoCliente){
        return res.json({
            status: 'Cliente no existe'
        })
    }
    
    const clienteEdit = {  
        nombre: req.body.nombre,
        correo: req.body.correo,
        ciudad: req.body.ciudad,
        direccion : req.body.telefono,
        telefono: req.body.telefono,
        contrasena: req.body.contrasena,
    };
    const clienteActualizado = await Cliente.findOneAndUpdate({ documento: req.params.documento }, {$set: clienteEdit}, {new:  true}); 
    res.json({
        status: 'Cliente actualizado',
         data: clienteActualizado
    });
}catch(error){
    res.json({
        status: 'Error al actualizar el cliente',
        error: error.message,
    });
    }
}

// Eliminar cliente
clienteCtrl.eliminarCliente = async (req, res) => {
    try {
        const clienteEliminado = await Cliente.findOneAndDelete({documento: req.params.documento});
        if (clienteEliminado) {
            res.json({
                status: `Cliente ${clienteEliminado.nombre} ha sido eliminado`,
            });
        } else if(!clienteEliminado){
            res.json({
                status: 'Cliente no encontrado para eliminar',
            });
        }
    } catch (error) {
        res.json({
            status: 'Error al eliminar el cliente',
            error: error.message,
        });
    }
}

//exporto el m�dulo
module.exports = clienteCtrl;