
import { syncSteps10Days } from "@/app/services/sync";
import { Pedometer } from "expo-sensors";

jest.mock("expo-sensors", () => ({
  Pedometer: {
    isAvailableAsync: jest.fn(),
    getStepCountAsync: jest.fn(),
  },
}));

describe("syncSteps10Days", () => {
  const repository = {
    addOrUpdateStep: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("does nothing when pedometer is not available", async () => {
    (Pedometer.isAvailableAsync as jest.Mock).mockResolvedValue(false);

    await syncSteps10Days(repository as any);

    expect(Pedometer.getStepCountAsync).not.toHaveBeenCalled();
    expect(repository.addOrUpdateStep).not.toHaveBeenCalled();
  });

  it("syncs 10 days of steps when pedometer is available", async () => {
    (Pedometer.isAvailableAsync as jest.Mock).mockResolvedValue(true);

    (Pedometer.getStepCountAsync as jest.Mock).mockImplementation(
      async (_start: Date, _end: Date) => ({
        steps: 100,
      })
    );

    const mockDate = new Date("2024-01-10T12:00:00Z");
    jest.useFakeTimers().setSystemTime(mockDate);

    await syncSteps10Days(repository as any);

    expect(Pedometer.getStepCountAsync).toHaveBeenCalledTimes(10);

    expect(repository.addOrUpdateStep).toHaveBeenCalledTimes(10);

    const firstCall = repository.addOrUpdateStep.mock.calls[0][0];

    expect(firstCall).toHaveProperty("date");
    expect(firstCall).toHaveProperty("steps", 100);

    expect(repository.addOrUpdateStep.mock.calls[0][1]).toBe(true);
  });

  it("passes correct date ranges to pedometer", async () => {
    (Pedometer.isAvailableAsync as jest.Mock).mockResolvedValue(true);
    (Pedometer.getStepCountAsync as jest.Mock).mockResolvedValue({ steps: 1 });

    jest.useFakeTimers().setSystemTime(new Date("2024-01-10T00:00:00Z"));

    await syncSteps10Days(repository as any);

    const calls = (Pedometer.getStepCountAsync as jest.Mock).mock.calls;

    expect(calls.length).toBe(10);

    for (let i = 0; i < 10; i++) {
      const [start, end] = calls[i];

      expect(end.getTime() - start.getTime()).toBe(24 * 60 * 60 * 1000);
    }
  });
});