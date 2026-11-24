const Claim = require('../models/Claim');

// Obtener todos los reclamos (más recientes primero)
const getClaims = async (req, res) => {
    try {
        const claims = await Claim.find().sort({ createdAt: -1 });
        res.json(claims);
    } catch (error) {
        console.error('Error al obtener reclamos:', error);
        res.status(500).json({ mensaje: 'Error al obtener los reclamos.' });
    }
};

// Obtener los reclamos de un usuario específico (GET /api/claims/user/:userId)
const getClaimsByUserId = async (req, res) => {
    try {
        const claims = await Claim.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(claims);
    } catch (error) {
        console.error('Error al obtener reclamos del usuario:', error);
        res.status(500).json({ mensaje: 'Error al obtener los reclamos del usuario.' });
    }
};

// Crear un nuevo reclamo (POST /api/claims)
const createClaim = async (req, res) => {
    try {
        const {
            userId,
            orderReference,
            orderType,
            orderId,
            deviceType,
            reason,
            description,
            attachments,
            contactPhone,
            contactEmail,
            altPhone,
            altEmail
        } = req.body;

        if (!userId) {
            return res.status(401).json({ mensaje: 'No se puede enviar un reclamo sin tener una sesión iniciada.' });
        }

        if (!orderReference || !deviceType || !reason || !description || !description.trim()) {
            return res.status(400).json({ mensaje: 'Completá todos los campos obligatorios del reclamo.' });
        }

        if (description.length > 2500) {
            return res.status(400).json({ mensaje: 'La descripción no puede superar los 2500 caracteres.' });
        }

        // Validar que los contactos alternativos no sean iguales a los principales
        const telPrincipal = String(contactPhone || '').trim();
        const telAlt = String(altPhone || '').trim();
        if (telPrincipal && telAlt && telPrincipal === telAlt) {
            return res.status(400).json({ mensaje: 'El teléfono alternativo no puede ser igual al teléfono principal.' });
        }

        const mailPrincipal = String(contactEmail || '').trim().toLowerCase();
        const mailAlt = String(altEmail || '').trim().toLowerCase();
        if (mailPrincipal && mailAlt && mailPrincipal === mailAlt) {
            return res.status(400).json({ mensaje: 'El correo alternativo no puede ser igual al correo principal.' });
        }

        // Calcular siguiente claimId autoincremental
        const lastClaim = await Claim.findOne().sort({ claimId: -1 });
        const nextClaimId = lastClaim ? lastClaim.claimId + 1 : 1;

        const nuevoReclamo = new Claim({
            claimId: nextClaimId,
            userId: Number(userId),
            orderReference,
            orderType: orderType || 'otra',
            orderId: orderId ? Number(orderId) : undefined,
            deviceType,
            reason,
            description: description.trim(),
            attachments: Array.isArray(attachments) ? attachments.slice(0, 10) : [],
            contactPhone: telPrincipal,
            contactEmail: mailPrincipal,
            altPhone: telAlt,
            altEmail: mailAlt,
            status: 'En revisión',
            resolution: '',
            createdAt: new Date(),
            resolvedAt: null
        });

        await nuevoReclamo.save();

        res.status(201).json({
            mensaje: 'Reclamo enviado con éxito.',
            claim: nuevoReclamo
        });
    } catch (error) {
        console.error('Error al crear el reclamo:', error);
        res.status(500).json({ mensaje: 'Error interno al guardar el reclamo.' });
    }
};

// Actualizar estado / resolución del reclamo (PUT /api/claims/:id/resolve)
const resolveClaim = async (req, res) => {
    try {
        const { status, resolution } = req.body;
        const claim = await Claim.findOne({ claimId: req.params.id });

        if (!claim) {
            return res.status(404).json({ mensaje: 'Reclamo no encontrado.' });
        }

        if (status) claim.status = status;
        if (typeof resolution === 'string') claim.resolution = resolution;

        if (status === 'Resuelto' && !claim.resolvedAt) {
            claim.resolvedAt = new Date();
        }

        await claim.save();
        res.json({ mensaje: 'Reclamo actualizado.', claim });
    } catch (error) {
        console.error('Error al actualizar reclamo:', error);
        res.status(500).json({ mensaje: 'Error al actualizar el reclamo.' });
    }
};

module.exports = {
    getClaims,
    getClaimsByUserId,
    createClaim,
    resolveClaim
};