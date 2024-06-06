import { describe} from "node:test";
const request = require("supertest");
import app from "../src/app";

describe("Base test", () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(1+2).toBe(3);
    });
})

describe("GET: /", () => {
    it("should return Crop pro", async () => {
        const response = await request(app).get("/")
        expect(response.status).toEqual(200)
        expect(response.text).toEqual("Crop pro")
    })
})

describe("POST: /predict", () => {
    it("should return prediction info", async () => {
        const response = await request(app).post("/predict")
            .send({
                "temperature":23,
                "humidity":4.54,
                "country": "NG",
                "ph": 7,
                "waterAvailability": 78,
                "selectedCrop": "rice"
            })
        expect(response.status).toEqual(200)
        console.log(response.body)
        expect(response.body).toEqual("Crop pro")
    })
})