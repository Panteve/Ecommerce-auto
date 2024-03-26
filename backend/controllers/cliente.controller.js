const Cliente = require('../models/cliente');
const clienteCtrl = {};


//Obtener todos los clientes
clienteCtrl.getCliente = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        if (clientes) {
            res.json(clientes);
        } else if(!clientes) {
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
                status: 'Cliente ya existente',
            });
        } 

        const nuevoCliente = new Cliente(req.body);
        const data = await nuevoCliente.save();

        res.json({
            'status': 'Cliente registrado',
            'data': data
        });
    } catch (error) {
        res.json({
            'status': 'Error al registrar cliente',
            'error': error.message
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
                status: 'Cliente no encontrado',
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
  try{  const clienteEdit = {  
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
            const nombre = clienteEliminado.nombre;
            res.json({
                status: `Cliente `+nombre+` ha sido eliminado`,
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