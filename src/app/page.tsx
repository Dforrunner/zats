"use client"

import { Button } from '@mui/material'
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

import ZoneSelection from '@/components/ZoneSelection';
import { TeamContext } from '@/context/TeamContext/TeamContext';
import { Team, TeamType } from '@/models/Team';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Zone } from '@/models/Zone';
import BackButton from '@/components/BackButton';

export default function Home() {
  const [teamType, setTeamType] = useState<TeamType>();
  const { changeTeam } = useContext(TeamContext);
  const router = useRouter();

  const handleZoneSelection = (zone: Zone) => {
    if (teamType === TeamType.Zone) {
      const selectedTeam: Team = {
        Type: teamType,
        Zone: zone,
        Name: 'Zone Team'
      }

      changeTeam(selectedTeam);
      router.push('/zones');
    } else if (teamType === TeamType.Support) {
      const selectedTeam: Team = {
        Type: teamType,
        Zones: [zone],
        Name: 'Support Team'
      }

      changeTeam(selectedTeam);
      router.push('/board');
    }
  }

  return (
    <main className="flex w-screen h-screen gap-10 flex-col items-center">
      {teamType && 
        <>
        <BackButton onClick={() => setTeamType(undefined)} />
        <ZoneSelection teamType={teamType} handleSelection={handleZoneSelection} />
      </>
      }

      {!teamType &&
      <div className='w-full h-full px-5 flex flex-col items-center justify-center gap-5'>
        <Button className='bg-blue-500 w-full h-[200px] text-4xl' variant='contained' onClick={() => setTeamType(TeamType.Zone)}>
          Zone Team
        </Button>

        <Button className='bg-blue-500 w-full h-[200px] text-4xl' variant='contained' onClick={() => setTeamType(TeamType.Support)}>
          Support Team
        </Button>
      </div>}
    </main>
  )
}
