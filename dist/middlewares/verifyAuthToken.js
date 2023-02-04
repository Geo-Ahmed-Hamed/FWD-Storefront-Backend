"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyAuthToken = function (req, res, next) {
    try {
        var token = req.headers.authorization;
        if (token !== undefined) {
            jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
            next();
        }
        else
            throw new Error();
    }
    catch (error) {
        res.status(401);
        res.json('Access denied, invalid token');
    }
};
exports.default = verifyAuthToken;
