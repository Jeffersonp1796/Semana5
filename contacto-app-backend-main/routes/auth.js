const express = require('express');
const router = express.Router();

// Usuario simulado
const usuarioDemo = {
  email: 'admin@iti.edu.ec',
  password: '123456',
  nombre: 'Usuario Administrador'
};

router.post('/', (req, res) => {
  const { email, password } = req.body;

  if (email === usuarioDemo.email && password === usuarioDemo.password) {
    return res.status(200).json({
      ok: true,
      usuario: {
        nombre: usuarioDemo.nombre,
        email: usuarioDemo.email
      }
    });
  }

  return res.status(401).json({
    ok: false,
    mensaje: 'Credenciales incorrectas'
  });
});

module.exports = router;
