"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getNonSensitivePatientsData = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        gender,
        dateOfBirth,
        occupation,
    }));
};
const getPatientById = (id) => {
    const patient = patients_1.default.find((p) => p.id === id);
    if (patient) {
        return patient;
    }
    else {
        throw new Error('No patient found with the given id');
    }
};
const addPatient = (entry) => {
    const patient = Object.assign({ id: (0, uuid_1.v4)() }, entry);
    patients_1.default.push(patient);
    const patientSensitive = {
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation,
    };
    return patientSensitive;
};
exports.default = { getNonSensitivePatientsData, addPatient, getPatientById };
