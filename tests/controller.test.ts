import { getPlanting } from "../src/controller";

describe("Test getPlanting", () => {
    it("test the getPlantingSeason function", async () => {
        expect(getPlanting("winter", "rice")).toBeDefined()
    })
})