"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (function (req, res, next) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new Error('No token provided');
    }
    var _a = authHeader.split(' '), token = _a[1];
    try {
        var decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        var id = decoded.id;
        req.userId = id;
        return next();
    }
    catch (_b) {
        throw new Error('Invalid token');
    }
});
