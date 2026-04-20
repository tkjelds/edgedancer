import { stepTracker } from "./stepTracker"
import { stepTrackerRow } from "./stepTrackerRow"

export function toDomain(DAO: stepTrackerRow): stepTracker{
    return {
        date: new Date(DAO.date),
        steps: DAO.steps,
    }
}
export function toRow(stepTracker: stepTracker, finished: boolean): stepTrackerRow{
    stepTracker.date.setHours(0,0,0,0);
    return {
        date: stepTracker.date.toISOString(),
        steps: stepTracker.steps,
        lastUpdated: new Date().toISOString(),
        finished: finished
    }
}