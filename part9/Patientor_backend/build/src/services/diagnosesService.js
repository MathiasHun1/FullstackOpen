"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnoses_1 = __importDefault(require("../../data/diagnoses"));
const getDiagnosesEntries = () => {
    return diagnoses_1.default;
};
const findByCode = (code) => {
    const result = diagnoses_1.default.find((d) => d.code === code);
    if (!result) {
        throw new Error('no diagnosis found with the given code');
    }
    return result;
};
exports.default = { getDiagnosesEntries, findByCode };
