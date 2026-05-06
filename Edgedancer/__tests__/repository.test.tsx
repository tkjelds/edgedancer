import { IStepDao } from "@/data/datasource/IStepDao";
import { StepRow } from "@/models/stepRow";
import { stepRepositoryFactory } from "@/repositories/stepRepository";
import { waitFor } from "@testing-library/react-native";

const mockDao : jest.Mocked<IStepDao>  = {
    getAll: jest.fn(),
    getByDate: jest.fn(),
    insert: jest.fn(),
    update: jest.fn(),
    exists: jest.fn(),
    getBetweenDates: jest.fn()
}
export const mockStepRows : StepRow[] = [
  {
    date: new Date('2026-01-01').toISOString(),
    steps: 5234,
    lastUpdated: new Date('2026-01-01T10:00:00Z').toISOString(),
    finished: false,
  },
  {
    date: new Date('2026-01-02').toISOString(),
    steps: 8123,
    lastUpdated: new Date('2026-01-02T12:30:00Z').toISOString(),
    finished: true,
  },
  {
    date: new Date('2026-01-03').toISOString(),
    steps: 10456,
    lastUpdated: new Date('2026-01-03T09:15:00Z').toISOString(),
    finished: false,
  },
  {
    date: new Date('2026-01-04').toISOString(),
    steps: 3000,
    lastUpdated: new Date('2026-01-04T18:45:00Z').toISOString(),
    finished: false,
  },
  {
    date: new Date('2026-01-05').toISOString(),
    steps: 12650,
    lastUpdated: new Date('2026-01-05T20:10:00Z').toISOString(),
    finished: true,
  },
];

describe("Repository", () => {

    beforeEach(() => {
        jest.resetAllMocks()

    });

    it("getSteps should return mocked data", async () => {
        mockDao.getAll.mockResolvedValue(
            new Promise((resolve) => resolve(mockStepRows))
        )

        const repository = stepRepositoryFactory(mockDao);

        const steps = await repository.getSteps();

        waitFor(() => {
            expect(steps).toEqual(mockStepRows.map(row => ({
                date: new Date(row.date),
                steps: row.steps,
            })));
        });
    })

    it("getSteps should return empty array", async () => {
        mockDao.getAll.mockResolvedValue(
            new Promise((resolve) => resolve([]))
        )

        const repository = stepRepositoryFactory(mockDao);

        const steps = await repository.getSteps();

        waitFor(() => {
            expect(steps).toEqual([]);
        });
    })

    it("getStepsByDate should return mocked data", async () => {
        mockDao.getByDate.mockResolvedValue(
            new Promise((resolve) => resolve(mockStepRows[0]))
        )

        const repository = stepRepositoryFactory(mockDao);

        const steps = await repository.getStepByDate(new Date());

        waitFor(() => {
            expect(steps).toEqual({
                date: new Date(mockStepRows[0].date),
                steps: mockStepRows[0].steps,
            });
        });
    })

    it("getStepsByDate should return empty", async () => {
        mockDao.getByDate.mockResolvedValue(
            new Promise((resolve) => resolve(null))
        )

        const repository = stepRepositoryFactory(mockDao);

        const steps = await repository.getStepByDate(new Date());

        waitFor(() => {
            expect(steps).toEqual(null);
        });
    })

    it("getStepsInRange should return mocked data", async () => {
        mockDao.getBetweenDates.mockResolvedValue(
            new Promise((resolve) => resolve(mockStepRows.slice(0, 2)))
        )

        const repository = stepRepositoryFactory(mockDao);

        const steps = await repository.getStepsInRange(new Date(), new Date());

        waitFor(() => {
            expect(steps).toEqual(mockStepRows.slice(0, 2).map(row => ({
                date: new Date(row.date),
                steps: row.steps,
            })));
        });
    })
    
    it("AddOrUpdateStep - Step exists", () => {
        mockDao.exists.mockResolvedValue(new Promise((resolve) => resolve(true)));


        const repository = stepRepositoryFactory(mockDao);

        repository.addOrUpdateStep({
            date: new Date(),
            steps: 5000,
        }, false);

        waitFor(() => {
            expect(mockDao.insert).not.toHaveBeenCalled();
            expect(mockDao.update).toHaveBeenCalled();
            expect(mockDao.exists).toHaveBeenCalled();
        });
    });

    it("AddOrUpdateStep - Step does not exist", () => {
        mockDao.exists.mockResolvedValue(new Promise((resolve) => resolve(false)));


        const repository = stepRepositoryFactory(mockDao);

        repository.addOrUpdateStep({
            date: new Date(),
            steps: 5000,
        }, false);

        waitFor(() => {
            expect(mockDao.update).not.toHaveBeenCalled();
            expect(mockDao.insert).toHaveBeenCalled();
            expect(mockDao.exists).toHaveBeenCalled();
        });
    });
});