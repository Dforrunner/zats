import { Status } from "./Status"

export enum ZoneStatus {
    Active = 'Active',
    Inactive = 'Inactive',
    NeedsAssistance = 'Needs Assistance'
}
export interface Zone {
    Id: number,
    Name: string,
    Type?: string,
    GroupIds?: number[],
    Status?: ZoneStatus
}
