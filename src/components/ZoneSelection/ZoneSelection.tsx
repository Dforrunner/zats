import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Button, Typography } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import { Zone, ZoneStatus } from '@/models/Zone';
import { ZoneContext } from '@/context/ZoneContext/ZoneContext';
import { useContext } from "react";
import { Team, TeamType } from "@/models/Team";

const zones: Zone[] = [
  {
    Id: 1,
    Name: 'Zone 1',
    Status: ZoneStatus.Active
  },
  {
    Id: 2,
    Name: 'Zone 2',
    Status: ZoneStatus.Active
  },
  {
    Id: 3,
    Name: 'Zone 3',
    Status: ZoneStatus.Active
  }
]

const teams: Team[] = [
  {
    Id: 1,
    Name: 'Group 1',
    Type: TeamType.Support,
    Zones: zones
  },
  {
    Id: 2,
    Name: 'Zone Team',
    Type: TeamType.Zone,
    Zone: zones[0]
  },
  {
    Id: 3,
    Name: 'Zone Team',
    Type: TeamType.Zone,
    Zone: zones[1]
  },
  {
    Id: 4,
    Name: 'Zone Team',
    Type: TeamType.Zone,
    Zone: zones[2]
  },
  {
    Id: 2,
    Name: 'Group 2',
    Type: TeamType.Support,
    Zones: zones
  },
];

interface Props {
  teamType: TeamType,
  handleSelection: (zone: Zone) => void
}
export default function ZoneSelection({ teamType, handleSelection }: Props) {
    const handleZoneChange = (zone: Zone) => {
      handleSelection(zone);
    } 
    
    return (
        <div className='p-5 w-full flex flex-col gap-3 items-center'>
          {/* <FormControl fullWidth>
              <InputLabel id="zone-select-label">Zone Selection</InputLabel>
              <Select
                  labelId="zone-select-label"
                  value={zone?.Id ? zone.Id.toString() : ''}
                  label="Zone Selection"
                  onChange={handleZoneChange}
              >
                  {zones.map(zone => <MenuItem key={uuidv4()} value={zone.Id}>{zone.Name}</MenuItem>)}
              </Select>
          </FormControl> */}
        <Typography variant="h4" className="text-gray-700">
          Select Zone { teamType === TeamType.Support && 'Group'}
        </Typography>
        {zones.map(zone =>
          <Button
            key={uuidv4()}
            variant="contained"
            className='bg-blue-500 w-full h-[60px]'
            onClick={() => handleZoneChange(zone)}
          >
            {zone.Name}
          </Button>)
        }
        </div>
    )
}
