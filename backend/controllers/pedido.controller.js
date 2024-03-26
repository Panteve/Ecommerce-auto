const Pedido = require('../models/pedido')
const Cliente = require('../models/pedido')
const Producto= require('../models/producto')
const pedidoCtrl = {}


//Obtener todos los pedidos

pedidoCtrl.getPedido = async(req, res ) => {
    try{
        const pedidos = await Pedido.find()
        if (pedidos && pedidos.length > 0){
            res.json(pedidos)
        }else{
            res.json({
               status: 'No existen pedidos'
            })
        }
    }catch(error){
        res.json({
            status:"Error al encontrar los pedidos",
            error: error.message
        })
    }
}


//Agregar pedido
pedidoCtrl.createPedido = async (req, res) =>{
    try{
        const cliente = await Cliente.findOne({documento: req.body.documentoDueño, nombre: req.body.dueño})
        
        if(!cliente){
            return res.json({
                status: 'Cliente no encontrado'
            })
        }
        const ultimoPedido = await Pedido.find().sort({ refpedido: -1 }).limit(1)
        const nuevaReferencia = (ultimoPedido.length > 0 ? String(parseInt(ultimoPedido[0].refpedido) + 1).padStart(4, '0') : "0001");
        const productos = await Producto.find({idproducto: req.body.idproducto})
        
        let total = 0;
        productos.forEach(producto => {
            total += producto.precio * producto.cantidad;
        });
        

        const nuevoPedido = new Pedido({
            refpedido: nuevaReferencia,
            fechacreacion: new Date(),
            total: total,
            productos: req.body.productos,
            documentoDueño: cliente.documento, 
            dueño: cliente.nombre,
            estados: True 
        })

        const data = await nuevoPedido.save()
        await Cliente.findByIdAndUpdate(cliente.documento, { $push: { refpedido: data.refpedido } });

        res.json({
            status: 'Pedido creado exitosamente',
            data: data
        })
    }catch(error){
        res.json({
            status: 'Error al crear el pedido',
            error: error.message 
        })
    }
}


//Conseguir un unico pedido
pedidoCtrl.getUnicopedido = async (req, res) => {     
    try {
        const pedidoUnico = await Pedido.findById({ documento: req.params.documento });
        if (pedidoUnico && pedidoUnico.length > 0) {
            res.json(pedidoUnico);
        } else {
            res.json({
                status: 'Pedido no encontrado',
            });
        }
    } catch (error) {
        res.json({
            status: 'Error al encontrar el pedido',
            error: error.message,
        });
    }
}

// Eliminar pedido
pedidoCtrl.eliminarPedido = async (req, res) => {
    try {
        const pedido = await Pedido.findOne({ refpedido: req.params.refpedido });

        if (!pedido) {
            return res.json({
                status: 'Pedido no encontrado para eliminar',
            });
        }

        const clienteId = pedido.documentoDueño;

        if (clienteId) {
            await Cliente.findByIdAndUpdate(clienteId, { $pull: { refpedido: pedido.refpedido } })
            pedido.estado = False 
            pedido.save()
            res.json({
                status: `Pedido ${pedidoEliminado.refpedido} ha sido eliminado`,
            });
        }else {
            res.json({
                status: 'Pedido no encontrado para eliminar',
            });
        }
    } catch (error) {
        res.json({
            status: 'Error al eliminar el pedido',
            error: error.message,
        });
    }
}

module.exports = pedidoCtrl;