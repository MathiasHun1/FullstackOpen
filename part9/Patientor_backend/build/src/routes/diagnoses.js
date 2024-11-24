"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnosesService_1 = __importDefault(require("../services/diagnosesService"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    const allDiagnoses = diagnosesService_1.default.getDiagnosesEntries();
    res.send(allDiagnoses);
});
router.get('/:code', (req, res) => {
    const specificDiagnose = diagnosesService_1.default.findByCode(req.params.code);
    res.send(specificDiagnose);
});
exports.default = router;
