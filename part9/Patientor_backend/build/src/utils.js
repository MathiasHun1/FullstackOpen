"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.bodyParser = exports.newPatientSchema = exports.toNewPatientEntry = void 0;
const types_1 = require("./types");
const zod_1 = require("zod");
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object &&
        'dateOfBirth' in object &&
        'ssn' in object &&
        'gender' in object &&
        'occupation' in object) {
        const newEntry = {
            name: zod_1.z.string().parse(object.name),
            dateOfBirth: parseStringProperty(object.dateOfBirth, 'date of birth'),
            ssn: parseStringProperty(object.ssn, 'ssn'),
            gender: parseGender(object.gender),
            occupation: parseStringProperty(object.occupation, 'occupation'),
            entries: [],
        };
        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};
exports.toNewPatientEntry = toNewPatientEntry;
const parseStringProperty = (text, filedName) => {
    if (!text || !isString(text)) {
        throw new Error(`Incorrect or missing ${filedName}`);
    }
    return text;
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseGender = (text) => {
    if (!text || !isString(text) || !isGender(text)) {
        throw new Error('Incorrect or missing gender');
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
exports.newPatientSchema = zod_1.z.object({
    name: zod_1.z.string(),
    dateOfBirth: zod_1.z.string(),
    ssn: zod_1.z.string(),
    gender: zod_1.z.nativeEnum(types_1.Gender),
    occupation: zod_1.z.string(),
});
const bodyParser = (req, _res, next) => {
    try {
        exports.newPatientSchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.bodyParser = bodyParser;
const errorHandler = (error, _req, res, next) => {
    if (error instanceof zod_1.z.ZodError) {
        res.status(400).send({ error: error.issues });
    }
    else {
        next(error);
    }
};
exports.errorHandler = errorHandler;
