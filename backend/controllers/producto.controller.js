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
            proveedor: proveedor.nombre,
        });

        const data = await nuevoProducto.save();

        await Proveedor.findOneAndUpdate({nombre:proveedor.nombre}, { $push: { productos: data.refproducto } });

        res.json({
            status: `Producto ${data.refproducto} agregado del proveedor ${proveedor.nombre}`,
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
        const parametro = req.params.parametro

        const productoUnico = await Producto.find({
            $or:[
                {refproducto: parametro},
                {_id: parametro},   
                {proveedor: parametro},
                {nombre: parametro},
                
            ]
        })
        if(productoUnico && productoUnico.length > 0){
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
        const producto = await Producto.findOneAndDelete({ refproducto: req.params.refproducto })
        if (!producto) {
            return res.json({
                status: 'Producto no encontrado para eliminar',
            });
        }
        const productoId = producto.refproducto;

        if (productoId) {
            await Proveedor.findOneAndUpdate({nombre: producto.proveedor}, { $pull: { productos: producto.refproducto }}) 
            res.json({
                status: `Producto ${producto.refproducto} ha sido eliminado`,
            });
        }else {
            res.json({
                status: 'Producto no encontrado para eliminar',
            });
        }
    } catch (error) {
        res.json({
            status: 'Error al eliminar el producto',
            error: error.message,
        });
    }
}
module.exports = productoCtrl