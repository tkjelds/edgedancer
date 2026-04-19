import { stepTracker } from "./stepTracker"
import { stepTrackerRow } from "./stepTrackerRow"

export function toDomain(DAO: stepTrackerRow): stepTracker{
    return {
        date: new Date(DAO.date),
        steps: DAO.steps,
        finished: DAO.finished
    }
}
export function toRow(stepTracker: stepTracker): stepTrackerRow{
    return {
        date: stepTracker.date.setHours(0,0,0,0),
        steps: stepTracker.steps,
        lastUpdated: new Date().getTime(),
        finished: stepTracker.finished
    }
}