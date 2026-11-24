const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log('Conectado a HoshinoDB');
    } catch (error) {
        console.error('Error al conectar a HoshinoDB (en database.js):', error);

        process.exit(1); //Detiene la app si falla
    }
}

module.exports = conectarDB;