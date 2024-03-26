const Admin = require('../models/admin');
const adminCtrl = {};



//Obtener todos los Admin
adminCtrl.getAdmins = async (req, res) => {
    try {
        const admin = await Admin.find();
        if (admin && admin.length > 0) {
            res.json(admin);
        } else {
            res.json({
                status: 'No hay admins',
            });
        }
    } catch (error) {
        res.json({
            status: 'Error al encontrar los admins',
            error: error.message,
        });
    } 
}                    

// Crear Admin
adminCtrl.createAdmins = async (req, res) => { 
    try {
        const adminExistente = await Admin.findOne({ documento: req.body.documento });
        
        if (adminExistente) {
            return res.json({
                'status': 'Admin ya existente',
            });
        } 

        const nuevoAdmin = new Admin(req.body);
        const data = await nuevoAdmin.save();

        res.json({
            'status': 'Admin agregado',
            'data': data
        });
    } catch (error) {
        res.json({
            'status': 'Error al registrar admin',
            'error': error.message
        });
    }
}


//Conseguir un unico cliente
adminCtrl.getUnicoAdmins = async (req, res) => {     
    try {
        const adminUnico = await Admin.findOne({ documento: req.params.documento });

        if (adminUnico) {
            res.json(adminUnico);
        } else {
            res.json({
                'status': 'Admin no encontrado',
            });
        }
    } catch (error) {
        res.json({
            'status': 'Error al encontrar el admin',
            'error': error.message,
        });
    }
}

//Actualizar cliente
adminCtrl.editarAdmins = async (req, res) =>  {
  try{  const adminEdit = {  
        nombre: req.body.nombre,
        correo: req.body.correo,
        telefono: req.body.telefono,
        contrasena: req.body.contrasena,
    };
    const adminActualizado = await Admin.findOneAndUpdate({ documento: req.params.documento }, {$set: adminEdit}, {new:  true}); 
    res.json({
        'status': 'Admin actualizado',
        'data': adminActualizado
    });
}catch(error){
    res.json({
        'status': 'Error al actualizar el admin',
        'error': error.message,
    });
    }
}

// Eliminar cliente
adminCtrl.eliminarAdmins = async (req, res) => {
    try {
        const adminEliminado = await Admin.findOneAndDelete({documento: req.params.documento});
        if (adminEliminado) {
            const nombre = adminEliminado.nombre;
            res.json({
                'status': `Admin ${nombre} ha sido eliminado`,
            });
        } else {
            res.json({
                'status': 'Admin no encontrado para eliminar',
            });
        }
    } catch (error) {
        res.json({
            'status': 'Error al eliminar el admin',
            'error': error.message,
        });
    }
}

//exporto el m�dulo
module.exports = adminCtrl;