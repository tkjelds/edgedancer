import { Step } from "./step"
import { StepRow } from "./stepRow"

export function toDomain(stepRow: StepRow): Step{
    return {
        date: new Date(stepRow.date),
        steps: stepRow.steps,
    }
}
export function toRow(step: Step, finished: boolean): StepRow{
    step.date.setHours(0,0,0,0);
    return {
        date: step.date.toISOString(),
        steps: step.steps,
        lastUpdated: new Date().toISOString(),
        finished: finished
    }
}