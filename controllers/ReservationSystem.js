"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Reservations = require("../models/index");
module.exports = {
    createReserve(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fullname, email, phone, date, } = req.body;
            const formattedDate = new Date(date);
            if (isNaN(formattedDate.getTime())) {
                return res.status(400).json({ message: "Data inválida." });
            }
            const formatPhoneNumber = (phone) => {
                const cleaned = ('' + phone).replace(/\D/g, '');
                const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
                if (match) {
                    return `(${match[1]}) ${match[2]}-${match[3]}`;
                }
                return phone;
            };
            const formattedPhone = formatPhoneNumber(phone);
            const created = yield Reservations.create({
                fullname,
                email,
                phone: formattedPhone,
                date: formattedDate,
            });
            return res.json(created);
        });
    },
    getReservations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const reserve = yield Reservations.findById(id);
            if (!reserve) {
                return res.status(404).json({ message: "Reserva não encontrada" });
            }
            return res.json(reserve);
        });
    },
    getAllReserves(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reserves = yield Reservations.find(); // Busca todas as reservas
                return res.json(reserves);
            }
            catch (error) {
                return res.status(500).json({ message: "Erro ao buscar reservas", error });
            }
        });
    },
    deleteReserve(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const reserve = yield Reservations.findByIdAndDelete(id);
                if (!reserve) {
                    return res.status(404).json({ message: "Reserva não encontrada" });
                }
                return res.status(200).json({ message: "Reserva deletada com sucesso" });
            }
            catch (error) {
                return res.status(500).json({ message: "Erro ao deletar a reserva", error });
            }
        });
    }
};
