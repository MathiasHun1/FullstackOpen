"use strict";
// Omit with unions - workaround solution
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheckRating = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["Female"] = "female";
    Gender["Male"] = "male";
    Gender["Other"] = "other";
})(Gender || (exports.Gender = Gender = {}));
var HealthCheckRating;
(function (HealthCheckRating) {
    HealthCheckRating["Healthy"] = "0";
    HealthCheckRating["Lowrisk"] = "1";
    HealthCheckRating["HighRisk"] = "2";
    HealthCheckRating["CriticalRisk"] = "3";
})(HealthCheckRating || (exports.HealthCheckRating = HealthCheckRating = {}));
