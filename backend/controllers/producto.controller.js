const Producto = require('../models/producto');
const Proveedor = require('../models/proveedor');
const productoCtrl ={}

//Obtener todos los productos
productoCtrl.getProductos = async (req, res) =>{
    try{
        const productos = await Producto.find()
        if (productos && productos.length > 0){
            res.json(productos)
        }else{
            res.json({
                status: "No hay productos existentes"
            })
        } 
    }catch(error){
        res.json({
            status: "Error al encontrar los productos",
            error: error.message 
        })

    }
}

//Crear productos 
productoCtrl.createProducto = async (req, res) => { 
    try {
        const proveedor = await Proveedor.findOne({ nombre: req.body.proveedor})
        
        if (!proveedor) {
            return res.json({
                status: 'Proveedor no existente'
            });
        }

        const productoExiste = await Producto.findOne({
            $or:[
                { refproducto: req.body.refproducto },
                { nombre: req.body.nombre },
            ]
        });
        
        if (productoExiste) {
            return res.json({
                status: 'Producto ya existente',
            });
        } 
       
    
        const nuevoProducto = new Producto({
            refproducto: req.body.refproducto,
            nombre: req.body.nombre,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            imagen: req.body.imagen,
            calificacion: req.body.calificacion,
            stock: req.body.stock,
        });

        const data = await nuevoProducto.save();

        await Proveedor.findOneAndUpdate(proveedor.nombre, { $push: { productos: data.refpedido } });

        res.json({
            status: `Producto ${Pedido.refpedido} agregado del proveedor ${proveedor.nombre}`,
            data: data
       });
    } catch (error) {
        res.json({
          'status': 'Error al agregar el producto',
            'error': error.message
        });
    }
}

//Conseguir un unico producto
productoCtrl.getUnicoProductos = async (req,res) =>{
    try{
        const productoUnico = await Producto.findOne({
            $or: [
                { refproducto: req.params.refproducto },
                { nombre: req.params.nombre },
                { proveedor: req.params.proveedor }
              ]
            })
        if(productoUnico){
            res.json(productoUnico)
        }else {
            res.json({
                status:'Producto no existe'
            })
        }

    }catch(error){
        res.json({
            status:  'Error al encontrar producto',
            error: error.message
        })

    }
}

//Actualizar admin
productoCtrl.editarProductos = async (req,res)=>{
    try{  const producoEdit = { 
        nombre: req.body.nombre,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen,
        calificacion: req.body.calificacion,
        stock: req.body.stock,
    };
    const productoActualizado = await Producto.findOneAndUpdate({ refproducto: req.params.refproducto }, {$set: producoEdit}, {new:  true}); 
    res.json({
        status: 'Producto actualizado',
        data: productoActualizado
    });
}catch(error){
    res.json({
        status: 'Error al actualizar el producto',
        error: error.message,
    });
    }
}

//Eliminar Producto
productoCtrl.eliminarProducto = async (req, res) =>{
    try{
        const productoEliminado = await Producto.findOneAndDelete({refproducto: req.params.refproducto})
        if (productoEliminado) {
            res.json({
                status: `Producto ${productoEliminado.refproducto} ha sido eliminado. (${productoEliminado.nombre})`,
            });
        } else {
            res.json({
                status: 'Producto no encontrado para eliminar',
            });
        }

    }catch(error){
        res.json({
            status: 'Error al eliminar el producto',
            error: error.message
        })

    }
}

module.exports = productoCtrl