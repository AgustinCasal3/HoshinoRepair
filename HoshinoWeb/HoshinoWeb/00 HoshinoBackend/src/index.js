require('dotenv').config();

const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/database');

const app = express();

conectarDB();

app.use(cors());
app.use(express.json());

app.use('/users', require('./routes/userRoutes'));

app.use('/devices', require('./routes/deviceRoutes'));

app.get('/', (req, res) => {
    res.send('API de HoshinoDB funcionando!! :D');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`HoshinoBackend corriendo en el puerto ${PORT}`);
});