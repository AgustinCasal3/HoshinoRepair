const fs = require('fs');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const chatWithHoshi = async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({ mensaje: 'El mensaje no puede estar vacío.' });
        }

        // Leer el archivo de información actualizado en cada consulta
        const infoPath = path.join(__dirname, '../data/hoshiInfo.txt');
        let infoEmpresa = '';
        if (fs.existsSync(infoPath)) {
            infoEmpresa = fs.readFileSync(infoPath, 'utf-8');
        }

        const systemInstruction = `Sos Hoshi, el asistente virtual de Hoshino Repair.
Tu personalidad es amable, cercana y simpática (podés usar ":3" de vez en cuando, sin exagerar).
Respondé siempre en español a menos que te hablen en otro idioma, de forma clara, concisa y fácil de leer (recordá que estás en una ventana de chat chica).
Utilizá la siguiente información oficial de la empresa para responder dudas sobre la página, reservas, reparaciones y productos.
Si te preguntan algo que no figura en esta información o datos privados de una cuenta, indicá amablemente que pueden revisarlo en la sección correspondiente de la web o consultarlo en el local.

--- INFORMACIÓN OFICIAL DE HOSHINO REPAIR ---
${infoEmpresa}
---------------------------------------------`;

        // Armar historial previo válido para Gemini (siempre debe empezar con role 'user')
        const contenidos = [];
        if (Array.isArray(history)) {
            for (const item of history) {
                if (contenidos.length === 0 && item.emisor !== 'usuario') continue;
                contenidos.push({
                    role: item.emisor === 'usuario' ? 'user' : 'model',
                    parts: [{ text: item.texto }]
                });
            }
        }

        // Agregar el mensaje actual del usuario
        contenidos.push({
            role: 'user',
            parts: [{ text: message }]
        });

        const response = await ai.models.generateContent({
            model: 'gemini-3.1-flash-lite',
            contents: contenidos,
            config: {
                systemInstruction,
                temperature: 0.7
            }
        });

        res.json({
            reply: response.text || '¡Nyan..! Me quedé pensando y no pude responder. ¿Me repetís la pregunta? :3'
        });
    } catch (error) {
        console.error('Error en Chatbot Hoshi:', error);
        res.status(500).json({
            mensaje: 'Hubo un problema al conectar con Hoshi.'
        });
    }
};

module.exports = { chatWithHoshi };