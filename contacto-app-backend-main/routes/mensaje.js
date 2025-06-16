const express = require('express');
const router = express.Router();

let mensajes = [
  { id: 1, contenido: 'Mensaje de prueba 1' },
  { id: 2, contenido: 'Mensaje de prueba 2' },
];

// Obtener todos los mensajes
router.get('/', (req, res) => {
  res.json(mensajes);
});

// Crear un nuevo mensaje
router.post('/', (req, res) => {
  const { contenido } = req.body;

  const nuevo = {
    id: mensajes.length + 1,
    contenido,
  };

  mensajes.push(nuevo);
  res.status(201).json(nuevo);
});

// Actualizar mensaje por ID
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { contenido } = req.body;

  const index = mensajes.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ error: "Mensaje no encontrado" });

  mensajes[index].contenido = contenido;
  res.json(mensajes[index]);
});

// Eliminar mensaje por ID
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = mensajes.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ error: "Mensaje no encontrado" });

  const mensajeEliminado = mensajes.splice(index, 1);
  res.json(mensajeEliminado[0]);
});

module.exports = router;
