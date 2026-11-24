const Payment = require('../models/Payment');
const Reservation = require('../models/Reservation');
const Product = require('../models/Product');

const createReservationAndPayment = async (req, res) => {
    try {
        const { userId, productId, dniOrCuil, receiptNumber, receiptImages } = req.body;

        const product = await Product.findOne({ productId: Number(productId) });
        if (!product) {
            return res.status(404).json({ mensaje: 'Producto no encontrado.' });
        }

        // Calcular IDs autoincrementales
        const lastReservation = await Reservation.findOne().sort({ reservationId: -1 });
        const nextReservationId = lastReservation ? lastReservation.reservationId + 1 : 1;

        const lastPayment = await Payment.findOne().sort({ paymentId: -1 });
        const nextPaymentId = lastPayment ? lastPayment.paymentId + 1 : 1;

        const deposit = product.price * 0.05;
        const remaining = product.price - deposit;

        // 1. Crear la Reserva
        const newReservation = new Reservation({
            reservationId: nextReservationId,
            userId: Number(userId),
            productId: product.productId,
            productData: {
                name: product.name,
                picture: product.pictures && product.pictures.length > 0 ? product.pictures[0] : ''
            },
            status: 'PENDIENTE',
            timeline: [
                { date: new Date(), text: 'Creación de la Reserva' },
                { date: new Date(), text: 'Subido comprobante de pago' }
            ],
            pricing: {
                totalPrice: product.price,
                deposit: deposit,
                remaining: remaining
            },
            billingData: {
                cuil: dniOrCuil
            },
            receipts: receiptImages
        });
        await newReservation.save();

        // 2. Crear el Pago
        const newPayment = new Payment({
            paymentId: nextPaymentId,
            userId: Number(userId),
            reservationId: nextReservationId,
            productId: product.productId,
            amount: deposit,
            billingData: {
                dniOrCuil,
                receiptNumber
            },
            receiptImages
        });
        await newPayment.save();

        // 3. Actualizar stock del producto
        if (product.stock > 0) {
            product.stock -= 1;
            if (product.stock === 0) product.state = 'Reservado';
            await product.save();
        }

        res.status(201).json({
            mensaje: 'Reserva y comprobante registrados con éxito',
            reservation: newReservation,
            payment: newPayment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al procesar la reserva y el pago.' });
    }
};

module.exports = { createReservationAndPayment };