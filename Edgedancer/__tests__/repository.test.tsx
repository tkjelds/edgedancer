import { IStepDao } from "@/data/datasource/IStepDao";
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

describe("Repository", () => {

    beforeEach(() => {
        jest.clearAllMocks()

    });

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