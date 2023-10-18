import { Button } from '@mui/material'
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

import ZoneSelection from '@/components/ZoneSelection';
import { TeamContext } from '@/context/TeamContext/TeamContext';
import { Team, TeamType } from '@/models/Team';
import BackButton from '@/components/BackButton';
import { cookies } from 'next/headers'

export function getData() {
  const cookieStore = cookies()
  const ip = cookieStore.get('reqData')
  return ip
}

export default async function Home() {
  // const [teamType, setTeamType] = useState<TeamType>();
  // const { changeTeam } = useContext(TeamContext);
  // const router = useRouter();

  // const handleZoneSelection = (team: Team) => {
  //   changeTeam(team);
  //   teamType === TeamType.Zone
  //     ? router.push('/zones')
  //     : router.push('/board');
  // }
  const ip = await getData()
  console.log({ip})

  return (
    <main className="flex w-screen h-screen gap-10 flex-col items-center">
      <h1 className='text-3xl'>
        {ip?.value}
      </h1>
   
      {/* {teamType && 
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
      </div>} */}
    </main>
  )
}
