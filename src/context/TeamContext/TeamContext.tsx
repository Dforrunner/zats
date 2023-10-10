
"use client"
import { createContext, ReactNode, useState } from 'react';
import { Team } from '@/models/Team';

interface Props {
    children?: ReactNode
}

interface TeamContextType {
    team: Team ,
    changeTeam: (team: Team ) => void
}

const initialZone: TeamContextType = {
    team: {Id: 1} as Team,
    changeTeam: (team: Team ) => { }
}

export const TeamContext = createContext<TeamContextType>(initialZone);

export const TeamProvider = (props: Props) => {
    const [team, setTeam] = useState(initialZone.team);

    const changeTeam = (team: Team ) => {
        setTeam(team);
    }

    return(
        <TeamContext.Provider value={{ team, changeTeam }}> 
            {props.children} 
        </TeamContext.Provider>
    )
}