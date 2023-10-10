import { Status } from "./Status"
import { Zone } from "./Zone"

export enum TeamType {
    Zone = 'Zone',
    Support = 'Support'
}
interface ZoneTeam {
    Type: TeamType.Zone,
    Zone: Zone
}
interface SupportTeam {
    Type: TeamType.Support,
    Zones: Zone[]
}
export type Team = {
    Id?: number,
    Status?: Status,
    Name?: string
} & (ZoneTeam | SupportTeam)