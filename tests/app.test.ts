import { describe} from "node:test";
// import app from "../src/app";


describe("Base test", () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(1+2).toBe(3);
    });
})

// describe("GET: /", () => {
//     it("should return Crop Pro", () => {
//         expect("").toBe("");
//     })
// })