const Proveedor  = require ('../models/proveedor')
const Producto = require ('../models/producto')
const proveedorCrtl = {}

//Obtener proveedores 
proveedorCrtl.getProveedor = async (req, res) =>{
    try{
    const proveedor = await Proveedor.find()

    if(proveedor && proveedor.length  > 0){
        res.json(proveedor)
    }else{
        res.json({
            status: 'No hay proveedores'
        })
    }
    }catch(error){
        res.json({
            status: 'Error al encontrar los proveedores',
            error: error.message
        })

    }
}

//Agregar proveedor 
proveedorCrtl.createProveedor = async (req, res) =>{
    try{
        const proveedor = await Proveedor.findOne({
            $or:[
                {nombre: req.body.nombre},
                {correo: req.body.correo}
            ]
        })
        if(!proveedor){
            return res.json({
                status: 'Proveedor no exite'
            })
        }

        const nuevoProveedor = new Proveedor(req.body);
        const data = await nuevoProveedor.save();

        res.json({
            status: 'Proveedor registrado',
            data: data
        });
    }catch(error){
        res.json({
            status: 'Error al registrar proveedor',
            error: error.message
        })
    }
}

//Conseguir un unico proovedar
proveedorCrtl.getUnicoProveedor  = async (req, res) => {     
    try {
        const proveedorUnico = await Proveedor.findOne({ nombre: req.params.nombre });

        if (proveedorUnico) {
            res.json(proveedorUnico);
        } else if(!proveedorUnico) {
            res.json({
                status: 'Proveedor no existe',
            });
        }
    } catch (error) {
        res.json({
            status: 'Error al encontrar el proveedor',
            error: error.message,
        });
    }
}

//Actualizar proveedor 
proveedorCrtl.editarProveedor = async (req, res) =>  {
    try{  const proveedorEdit = {  
          nombre: req.body.nombre,
          direccion: req.body.direccion,
          telefono: req.body.telefono,
          correo : req.body.correo,
      };
      const proveedorActualizado = await Proveedor.findOneAndUpdate({ nombre: req.params.nombre }, {$set: proveedorEdit}, {new:  true}); 
      res.json({
          status: 'Proveedor actualizado',
           data: proveedorActualizado
      });
  }catch(error){
      res.json({
          status: 'Error al actualizar el proveedor',
          error: error.message,
      });
    }
}

//Eliminar proveedor
proveedorCrtl.eliminarProveedor = async (req, res) =>{
    try {
        const proveedorEliminado = await Proveedor.findOneAndDelete({nombre: req.params.nombre});
        if (proveedorEliminado) {
            const productosAsociados = await Producto.find({ proveedor: proveedorEliminado.name });
            for (const producto of productosAsociados) {
                await Producto.findOneAndDelete(producto.refproducto);
            }
            res.json({
                status: `Proveedor ${proveedorEliminado.nombre} y los productos asociados han sido eliminados`,
            });
        } else{
            res.json({
                status: 'Proveedor no encontrado para eliminar',
            });
        }
    } catch (error) {
        res.json({
            status: 'Error al eliminar el proveedor',
            error: error.message,
        });
    }
}

module.exports = proveedorCrtl
