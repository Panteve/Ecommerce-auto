const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();


// Settings
const app = express();
app.set("port", process.env.PORT || 3000);

// Middleware
app.use(morgan("dev"));
app.use(express.json());
//app.use(cors({ origin: "http://localhost:4321" }));

//Conexión BD Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a la BD"))
  .catch((error) => console.error("Error de conexión a la BD:", error));

// Rutas
app.use("/api", require("./routes/cliente.route"));
app.use("/api", require("./routes/admin.route"));
app.use("/api", require("./routes/pedido.route"));
app.use("/api", require("./routes/producto.route"));
app.use("/api", require("./routes/proveedor.route"))

// Middleware de manejo de errores
app.use((err, res) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

// Iniciar el servidor
app.listen(app.get("port"), () => {
  console.log("Servidor activo en el puerto", app.get("port"));
});