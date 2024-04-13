export class Cliente {
    constructor(
        nombre= "", 
        documento:null = null,
        correo:string = "",
        ciudad:string = "",
        direccion:string = "",
        telefono:null = null,
        contrasena:string = ""
    ){
        this.nombre = nombre;
        this.documento = documento;
        this.correo = correo;
        this.ciudad = ciudad;
        this.direccion = direccion;
        this.telefono = telefono;
        this.contrasena = contrasena;
    }
        nombre:string;
        documento:null;
        correo:string; 
        ciudad:string; 
        direccion:string;
        telefono:null;
        contrasena:string;
}
