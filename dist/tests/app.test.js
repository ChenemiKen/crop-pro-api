"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
// import {expect, test} from '@jest/globals';
// import app from "../src/app";
(0, node_test_1.describe)("Base test", () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(1 + 2).toBe(3);
    });
});
// describe("GET: /", () => {
//     it("should return Crop Pro", () => {
//         expect("").toBe("");
//     })
// })
