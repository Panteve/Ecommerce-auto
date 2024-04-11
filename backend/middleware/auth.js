const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ mensaje: 'Token no proporcionado' });
  }

  const tokenSinBearer = token.split(' ')[1];

  jwt.verify(tokenSinBearer, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensaje: 'Token inválido' });
    } else {
      next();
    }
  });
}

module.exports = verificarToken;
