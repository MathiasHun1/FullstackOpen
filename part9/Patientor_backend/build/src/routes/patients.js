"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientServices_1 = __importDefault(require("../services/patientServices"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send(patientServices_1.default.getNonSensitivePatientsData());
});
router.post("/", (req, res) => {
    try {
        const newPatientEntry = (0, utils_1.toNewPatientEntry)(req.body);
        const addedEntry = patientServices_1.default.addPatient(newPatientEntry);
        res.status(200).json({ addedEntry });
    }
    catch (error) {
        let errorMessage = "Error: ";
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        res.status(400).json(errorMessage);
    }
});
exports.default = router;
