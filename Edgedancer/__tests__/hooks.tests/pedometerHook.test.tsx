import { usePedometer } from "@/hooks/pedometerHook";
import { renderHook, waitFor } from "@testing-library/react-native";
import { Pedometer } from "expo-sensors";
import { act } from "react";

jest.mock('expo-sensors', () => ({
  Pedometer: {
    isAvailableAsync: jest.fn(),
    getStepCountAsync: jest.fn(),
    watchStepCount: jest.fn(),
  },
}));


describe("Init_pedometer with no data", () => {
  it("should return the initial values for isAvailable and stepCount", async () => {
    // let stepCountTest = -1;
    // let isAvailableTest = "test";
    const { result } = renderHook(() => usePedometer());


    await waitFor(() => {
        expect(result.current.isAvailable).toBe("checking");
        expect(result.current.stepCount).toBe(0);
    })
  });
});

describe("Pedometer with mocked sensor data", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const mockedPedometer = jest.mocked(Pedometer)
    mockedPedometer.getStepCountAsync.mockResolvedValue({
        steps: 1500,
    });
    mockedPedometer.isAvailableAsync.mockResolvedValue(
        new Promise(((resolve) => {resolve(true)}))
    );
    });

  it("returns mocked step count", async () => {
    const { result } = renderHook(() => usePedometer());


    await waitFor(() => {
        expect(result.current.isAvailable).toBe("true");
        expect(result.current.stepCount).toBe(1500);
    })
  });
});
