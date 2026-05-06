import { createRepoWrapper, createRepoWrapperWithDao } from "@/__mocks__/mockRepoProvider";
import { createMockStepTrackerDao } from "@/__mocks__/mockStepTrackerDAO";
import { useGetStepByDate, useGetSteps, useGetStepsInRange } from "@/hooks/stepHooks";
import { Step } from "@/models/step";
import { stepRepositoryFactory } from "@/repositories/stepRepository";
import { renderHook, waitFor } from "@testing-library/react-native";

export const mockSteps: Step[] = [
  { date: new Date('2026-01-01'), steps: 5234 },
  { date: new Date('2026-01-02'), steps: 8123 },
  { date: new Date('2026-01-03'), steps: 10456 },
];

const mockRepository = {
    getSteps: jest.fn(),
    getStepByDate: jest.fn(),
    addOrUpdateStep: jest.fn(),
    getStepsInRange: jest.fn(),
};

describe("StepHook", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    it("should return the mocked values for stepTrackers", () => {
        mockRepository.getSteps.mockResolvedValue(mockSteps);
        
        
        const { Wrapper } = createRepoWrapper(mockRepository);
        const { result } = renderHook(() => useGetSteps(), {
            wrapper: Wrapper,
        });

        waitFor(() => {
            expect(result.current.stepTrackers).toEqual(mockSteps);
        });

    })

    it("should return mocked data by date", () => {
        mockRepository.getStepByDate.mockResolvedValue(mockSteps[0])
        const { Wrapper } = createRepoWrapper(mockRepository);
        const { result } = renderHook(() => useGetStepByDate(new Date), {
            wrapper: Wrapper,
        });
        waitFor(() => {
            expect(result.current).toEqual(mockSteps[0])
        })
    })

    it("Should return mocked data withint range",() => {
        mockRepository.getStepsInRange.mockResolvedValue(mockSteps)
        const { Wrapper } = createRepoWrapper(mockRepository);
        const { result } = renderHook(() => useGetStepsInRange(new Date,new Date), {
            wrapper: Wrapper,
        });
        waitFor(() => {
            expect(result.current).toEqual(mockSteps)
        })
    })
});