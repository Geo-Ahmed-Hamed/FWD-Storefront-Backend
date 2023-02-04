"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../../models/user");
var store = new user_1.UserStore();
describe("User Model", function () {
    it('should have an index method', function () {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', function () {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', function () {
        expect(store.create).toBeDefined();
    });
    it('should have a showUserOrder method', function () {
        expect(store.showUserOrder).toBeDefined();
    });
    it('should have a authenticate method', function () {
        expect(store.authenticate).toBeDefined();
    });
});
