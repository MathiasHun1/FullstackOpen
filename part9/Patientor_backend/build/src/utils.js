"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatientEntry = void 0;
const types_1 = require("./types");
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if ("name" in object &&
        "dateOfBirth" in object &&
        "ssn" in object &&
        "gender" in object &&
        "occupation" in object) {
        const newEntry = {
            name: parseStringProperty(object.name, "name"),
            dateOfBirth: parseStringProperty(object.dateOfBirth, "date of birth"),
            ssn: parseStringProperty(object.ssn, "ssn"),
            gender: parseGender(object.gender),
            occupation: parseStringProperty(object.occupation, "occupation"),
        };
        return newEntry;
    }
    throw new Error("Incorrect data: some fields are missing");
};
exports.toNewPatientEntry = toNewPatientEntry;
const parseStringProperty = (text, filedName) => {
    if (!text || !isString(text)) {
        throw new Error(`Incorrect or missing ${filedName}`);
    }
    return text;
};
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const parseGender = (text) => {
    if (!text || !isString(text) || !isGender(text)) {
        throw new Error("Incorrect or missing gender");
    }
    return text;
};
const isGender = (text) => {
    return Object.values(types_1.Gender)
        .map((v) => {
        return v.toString();
    })
        .includes(text);
};
