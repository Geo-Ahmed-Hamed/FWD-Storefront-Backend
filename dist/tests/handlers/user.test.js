"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
(0, supertest_1.default)('http://localhost:3000')
    .get('/users')
    .expect(200)
    .expect('Content-Type', 'application/json')
    .end(function (err, res) {
    if (err)
        throw err;
});
