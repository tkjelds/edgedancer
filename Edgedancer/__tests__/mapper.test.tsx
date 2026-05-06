import { Step } from "@/models/step";
import { toDomain, toRow } from "@/models/stepMapper";
import { StepRow } from "@/models/stepRow";


describe("step mappers", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-01-01T12:00:00Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("toDomain", () => {
    it("converts StepRow to Step correctly", () => {
      const row: StepRow = {
        date: "2024-01-10T00:00:00.000Z",
        steps: 1234,
        lastUpdated: "2024-01-01T00:00:00.000Z",
        finished: true,
      };

      const result = toDomain(row);

      expect(result.steps).toBe(1234);
      expect(result.date).toBeInstanceOf(Date);
      expect(result.date.toISOString()).toBe("2024-01-10T00:00:00.000Z");
    });

    it("creates a new Date instance (does not share reference)", () => {
      const row: StepRow = {
        date: "2024-01-10T00:00:00.000Z",
        steps: 0,
        lastUpdated: "",
        finished: false,
      };

      const result = toDomain(row);

      expect(result.date).not.toBe(row.date as any);
    });
  });

  describe("toRow", () => {
    it("converts Step to StepRow correctly", () => {
      const step: Step = {
        date: new Date(),
        steps: 2000,
      };

      const result = toRow(step, true);


      const expectedDate = new Date();
      expectedDate.setHours(0, 0, 0, 0);
      const expectedLastUpdated = new Date();

      expect(result.steps).toBe(2000);
      expect(result.finished).toBe(true);
      expect(result.date).toBe(expectedDate.toISOString());
      expect(result.lastUpdated).toBe(expectedLastUpdated.toISOString());
    });

    it("Correctly sets the date to midnight", () => {
      const stepDate = new Date("2024-01-10T15:30:00.000Z");

      const step: Step = {
        date: stepDate,
        steps: 100,
      };

      toRow(step, false);

      expect(stepDate.getHours()).toBe(0);
      expect(stepDate.getMinutes()).toBe(0);
      expect(stepDate.getSeconds()).toBe(0);
    });

    it("does not change step reference but modifies its date", () => {
      const step: Step = {
        date: new Date("2024-01-10T10:00:00.000Z"),
        steps: 1,
      };

      const originalDateRef = step.date;

      toRow(step, false);

      expect(step.date).toBe(originalDateRef);
    });
  });
});