const request = require("supertest");
import app from "../src/app";

describe("GET: /", () => {
    it("should return Crop pro", async () => {
        const response = await request(app).get("/")
        expect(response.status).toEqual(200)
        expect(response.text).toEqual("Crop pro")
    })
})

describe("POST: /predict - success", () => {
    it("should return prediction info", async () => {
        const crop = "rice";
        const response = await request(app).post("/predict")
            .send({
                "temperature":23,
                "humidity":4.54,
                "country": "NG",
                "ph": 7,
                "waterAvailability": 78,
                "selectedCrop": crop
            })
        expect(response.status).toEqual(200)
        expect(response.body.data).toBeDefined()
        expect(response.body.data.crop).toEqual(crop)
    })
})

describe("POST: /predict - fail", () => {
    it("should fail input validation", async () => {
        const crop = "rice";
        const response = await request(app).post("/predict")
            .send({
                "temperature":23,
                "ph": 7,
                "waterAvailability": 78,
                "selectedCrop": crop
            })
        expect(response.status).toEqual(400)
        expect(response.body.success).toBeFalsy()
    })
})

describe("POST: /predict - fail", () => {
    it("should fail invalid crop input", async () => {
        const crop = "unknown";
        const response = await request(app).post("/predict")
            .send({
                "temperature":23,
                "ph": 7,
                "waterAvailability": 78,
                "selectedCrop": crop
            })
        expect(response.status).toEqual(400)
        expect(response.body.success).toBeFalsy()
    })
})