"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientServices_1 = __importDefault(require("../services/patientServices"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientServices_1.default.getNonSensitivePatientsData());
});
router.get('/:id', (req, res) => {
    res.send(patientServices_1.default.getPatientById(req.params.id));
});
router.post('/', utils_1.bodyParserForPatient, (req, res) => {
    const addedEntry = patientServices_1.default.addPatient(req.body);
    res.status(200).json(addedEntry);
});
router.post('/:id/entries', (req, res) => {
    try {
        //find the given patient by its ID
        const patient = patientServices_1.default.getPatientById(req.params.id);
        //Read the entry from the req body, identify its type, parse the fields. The type dont have ID yet..
        const addedEntry = patientServices_1.default.adddEntry(patient, req.body);
        //Send back the response with the correct data
        res.status(201).send(addedEntry);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});
router.use(utils_1.errorHandler);
exports.default = router;
