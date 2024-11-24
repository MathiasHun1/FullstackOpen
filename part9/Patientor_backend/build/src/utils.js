"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.errorHandler = exports.bodyParserForPatient = exports.newPatientSchema = exports.toNewPatientEntry = void 0;
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
        'occupation' in object &&
        'entries' in object) {
        const newEntry = {
            name: zod_1.z.string().parse(object.name),
            dateOfBirth: parseStringProperty(object.dateOfBirth, 'date of birth'),
            ssn: parseStringProperty(object.ssn, 'ssn'),
            gender: parseGender(object.gender),
            occupation: parseStringProperty(object.occupation, 'occupation'),
            //PROVISIONALLY assert the type
            entries: object.entries,
        };
        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};
exports.toNewPatientEntry = toNewPatientEntry;
const parseStringProperty = (text, fieldName) => {
    if (!text || !isString(text)) {
        throw new Error(`Incorrect or missing ${fieldName}`);
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
const bodyParserForPatient = (req, _res, next) => {
    try {
        exports.newPatientSchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.bodyParserForPatient = bodyParserForPatient;
const errorHandler = (error, _req, res, next) => {
    if (error instanceof zod_1.z.ZodError) {
        res.status(400).send({ error: error.issues });
    }
    else {
        next(error);
    }
};
exports.errorHandler = errorHandler;
// TASK Work
/* function for parsing a new entry to one of the possible types*/
const toNewEntry = (object) => {
    if (!isObjectWithCorrectType(object) || !isBaseEntry(object)) {
        console.log('Booooooo');
        throw new Error('Ivalid/missing base entry porperties or invalid type');
    }
    const base = {
        description: zod_1.z.string().parse(object.description),
        date: zod_1.z.string().parse(object.date),
        specialist: zod_1.z.string().parse(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    };
    if (object.type === 'HealthCheck' && 'healthCheckRating' in object) {
        const entry = Object.assign({ type: object.type, healthCheckRating: parseHealthCheckRating(object.healthCheckRating) }, base);
        return entry;
    }
    else if (object.type === 'Hospital' && 'discharge' in object) {
        const entry = Object.assign({ type: object.type, discharge: parseDiascharge(object.discharge) }, base);
        return entry;
    }
    else if (object.type === 'OccupationalHealthcare' &&
        'employerName' in object) {
        const entry = Object.assign({ type: object.type, employerName: zod_1.z.string().parse(object.employerName) }, base);
        if (!('sickLeave' in object)) {
            return entry;
        }
        else {
            entry.sickLeave = parseSickLeave(object.sickLeave);
            return entry;
        }
    }
    throw new Error('Missing or invalid data');
};
exports.toNewEntry = toNewEntry;
const isObjectWithCorrectType = (object) => {
    return (object !== null &&
        typeof object === 'object' &&
        'type' in object &&
        isString(object.type) &&
        ['HealthCheck', 'OccupationalHealthcare', 'Hospital'].includes(object.type));
};
const isBaseEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Invalid or missing entry object');
    }
    return (('description' in object &&
        'date' in object &&
        'specialist' in object &&
        !('diagnosisCodes' in object)) ||
        ('description' in object &&
            'date' in object &&
            'specialist' in object &&
            'diagnosisCodes' in object));
};
const parseDiascharge = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('dishacrge is not object');
    }
    if (!('date' in object && 'criteria' in object)) {
        throw new Error('Invalid or missing properties in hospitalEntry/discharge');
    }
    const parsedObject = {
        date: zod_1.z.string().parse(object.date),
        criteria: zod_1.z.string().parse(object.criteria),
    };
    return parsedObject;
};
const parseSickLeave = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('sickLeave is not object');
    }
    if (!('startDate' in object && 'endDate' in object)) {
        throw new Error('Invalid or missing sickLeave property in occupation entry');
    }
    const parsedObject = {
        startDate: zod_1.z.string().parse(object.startDate),
        endDate: zod_1.z.string().parse(object.endDate),
    };
    return parsedObject;
};
// const isNumber = (value: unknown): value is number => {
//   return typeof value === 'number' || value instanceof Number;
// };
const isHealthCheckRating = (param) => {
    return Object.values(types_1.HealthCheckRating)
        .map((v) => v.toString())
        .includes(param);
};
const parseHealthCheckRating = (value) => {
    if (!value || !isString(value) || !isHealthCheckRating(value)) {
        throw new Error(`Incorrect Healtcheck-rating: ${value}`);
    }
    return value;
};
const parseDiagnosisCodes = (object) => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        // we will just trust the data to be in correct form
        return [];
    }
    return object.diagnosisCodes;
};
