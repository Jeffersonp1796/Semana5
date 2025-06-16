const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const contactoRoutes = require('./routes/contacto');
const mensajeRoutes = require('./routes/mensaje');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/login', authRoutes);
app.use('/api/contacto', contactoRoutes);
app.use('/api/mensaje', mensajeRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
