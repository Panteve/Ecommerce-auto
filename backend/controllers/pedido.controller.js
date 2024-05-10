const Pedido = require('../models/pedido')
const Cliente = require('../models/cliente')
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
        const cliente = await Cliente.findOne({documento: req.body.documentoDueño})
        
        if(!cliente){
            return res.json({
                status: 'Cliente no encontrado'
            })
        }
        const ultimoPedido = await Pedido.find().sort({ refpedido: -1 }).limit(1)
        const nuevaReferencia = (ultimoPedido.length > 0 ? String(parseInt(ultimoPedido[0].refpedido) + 1).padStart(4, '0') : "0001");
        const productosPedido = req.body.productos;
        let total = 0;

        for (const productoPedido of productosPedido) {
            const producto = await Producto.findOne({
                $or:[
                    {refproducto: productoPedido.producto},
                    {_id: productoPedido.producto},  
                ]
            });
            
            if (!producto) {
                return res.json({
                    status: `Producto con referencia ${productoPedido.producto} no encontrado`
                });
            }
            producto.stock -= productoPedido.cantidad
            await producto.save();

            total += producto.precio * productoPedido.cantidad;
        }

        const nuevoPedido = new Pedido({
            refpedido: nuevaReferencia,
            fechacreacion: new Date(),
            total: total,
            productos: productosPedido,
            documentoDueño: req.body.documentoDueño, 
            dueño: cliente.nombre,
            estados: true 
        })

        const data = await nuevoPedido.save()
        await Cliente.findOneAndUpdate({documento : cliente.documento},
            { $push: { 
                pedidos: {
                    _id: data._id,
                    refpedido: data.refpedido,
                    fecha: data.fechacreacion,
                    total: data.total
                }
        }});
        res.json({
            status: 'Pedido creado exitosamente',
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
        const parametro = req.params.parametro

        const pedidoUnico = await Pedido.findOne({ 
            $or:[ 
                {refpedido: parametro},
                {_id: parametro}
            ] 
        });
        if (pedidoUnico) {
            res.json(pedidoUnico);
        } else {
            res.json({
                status: 'Pedido no existe',
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
        if(pedido.estado){
        if (clienteId) {
            await Cliente.findOneAndUpdate({documento: clienteId }, { $pull: { refpedido: pedido.refpedido } })
            pedido.estado = false 
            pedido.save()
            res.json({
                status: `Pedido ${pedido.refpedido} ha sido eliminado`,
            });
        }else {
            res.json({
                status: 'Pedido no encontrado para eliminar',
            });
        }}else{
            res.json({
                status: 'Pedido ya eliminado'
            })
        }
    } catch (error) {
        res.json({
            status: 'Error al eliminar el pedido',
            error: error.message,
        });
    }
}

module.exports = pedidoCtrl;