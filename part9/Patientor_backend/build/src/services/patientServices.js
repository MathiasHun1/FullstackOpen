"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const utils_1 = require("../utils");
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
    const patient = Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, entry), { entries: [] });
    patients_1.default.push(patient);
    const patientNonSensitive = {
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation,
    };
    return patientNonSensitive;
};
const adddEntry = (patient, entry) => {
    try {
        const parsedObject = (0, utils_1.toNewEntry)(entry);
        const newEntry = Object.assign(Object.assign({}, parsedObject), { id: (0, uuid_1.v4)() });
        patient.entries.push(newEntry);
        return newEntry;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('unknown error');
    }
};
exports.default = {
    getNonSensitivePatientsData,
    addPatient,
    getPatientById,
    adddEntry,
};
