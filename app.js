"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
require('dotenv').config({ debug: true });
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const uri = process.env.CONNECTION_STRING;
const app = (0, express_1.default)();
const routes = require("./routes/routes");
mongoose_1.default.set("strictQuery", true);
mongoose_1.default.connect(uri)
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((e) => {
    console.error(`Error connecting to MongoDB: ${e}`);
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)('tiny'));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(routes);
exports.default = app;
