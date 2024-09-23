"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const reservationController = require("../controllers/ReservationSystem");
const loginController = require("../controllers/Login");
const authMiddleware_1 = require("../middleware/authMiddleware");
router.post("/", reservationController.createReserve);
router.get("/:id", authMiddleware_1.authMiddleware, reservationController.getReservations);
router.get("/", authMiddleware_1.authMiddleware, reservationController.getAllReserves);
router.delete("/:id", reservationController.deleteReserve);
router.post("/register", loginController.createUser);
router.post("/login", loginController.login);
module.exports = router;
