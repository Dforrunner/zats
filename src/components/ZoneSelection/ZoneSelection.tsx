import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  Typography,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { Zone, ZoneStatus } from '@/models/RequestArea';
import { ZoneContext } from '@/context/ZoneContext/ZoneContext';
import { useContext } from 'react';
import { Team, TeamType } from '@/models/Team';
import { TeamContext } from '@/context/TeamContext/TeamContext';

const zones: Zone[] = [
  {
    Id: 1,
    Name: 'Zone 1',
    Status: ZoneStatus.Active,
  },
  {
    Id: 2,
    Name: 'Zone 2',
    Status: ZoneStatus.Active,
  },
  {
    Id: 3,
    Name: 'Zone 3',
    Status: ZoneStatus.Active,
  },
];

const teams: Team[] = [
  {
    Id: 11,
    Name: 'All Tickets',
    Type: TeamType.Support,
    Zones: zones,
  },
  {
    Id: 1,
    Name: 'Zone Group 1',
    Type: TeamType.Support,
    Zones: zones,
  },
  {
    Id: 2,
    Name: 'Zone Group 2',
    Type: TeamType.Support,
    Zones: [zones[0], zones[1]],
  },
  {
    Id: 3,
    Name: 'Zone Team',
    Type: TeamType.Zone,
    Zone: zones[0],
  },
  {
    Id: 4,
    Name: 'Zone Team',
    Type: TeamType.Zone,
    Zone: zones[1],
  },
  {
    Id: 5,
    Name: 'Zone Team',
    Type: TeamType.Zone,
    Zone: zones[2],
  },
];

interface Props {
  teamType: TeamType;
  handleSelection: (team: Team) => void;
}
export default function ZoneSelection({ teamType, handleSelection }: Props) {
  const { team } = useContext(TeamContext);

  const handleZoneChange = (team: Team) => {
    handleSelection(team);
  };

  return (
    <div className='p-5 w-full flex flex-col gap-3 items-center'>
      <Typography variant='h4' className='text-gray-700'>
        Select Zone {teamType === TeamType.Support && 'Group'}
      </Typography>
      {teams.map(
        (t) =>
          t.Type === teamType && (
            <Button
              key={uuidv4()}
              variant='contained'
              className='bg-blue-500 w-full h-[60px]'
              onClick={() => handleZoneChange(t)}
            >
              {t.Type === TeamType.Zone ? t.Zone.Name : t.Name}
            </Button>
          )
      )}
    </div>
  );
}
