"use client"
import React, { createContext, useReducer, ReactNode  } from 'react';
import TicketQueueReducer from './TicketQueueReducer';
import { Ticket, TicketStatus } from '@/models/Ticket';
import { ZoneStatus } from '@/models/Zone';

interface PropTypes {
    children?: ReactNode
}

interface TicketQueueContext {
    ticketList: Ticket[],
    addTicket: (ticket: Ticket) => void,
    removeTicket: (ticket: Ticket) => void,
    updateTicket: (ticket: Ticket) => void
}

const initialState: TicketQueueContext = {
    ticketList: [
        {
            Id: 1,
            Type: {
                Id: 1,
                Text: 'Fork Lift'
            },
            Description: 'Need product moved',
            Zone: {
                Id: 1,
                Name: 'Zone 1',
                Status: ZoneStatus.NeedsAssistance
            },
            CreatedOn: new Date(),
            Status: TicketStatus.Accepted
        },
        {
            Id: 5,
            Type: {
                Id: 2,
                Text: 'Supervisor'
            },
            Description: 'Super requested',
            Zone: {
                Id: 1,
                Name: 'Zone 1',
                Status: ZoneStatus.NeedsAssistance
            },
            CreatedOn: new Date(),
            Status: TicketStatus.Active
        },
        {
            Id: 2,
            Type: {
                Id: 2,
                Text: 'Supervisor'
            },
            Description: 'Super requested',
            Zone: {
                Id: 2,
                Name: 'Zone 2',
                Status: ZoneStatus.Active
            },
            CreatedOn: new Date(),
            Status: TicketStatus.Active
        },
        {
            Id: 3,
            Type: {
                Id: 3,
                Text: 'Maintenance'
            },
            Description: 'Need repair done',
            Zone: {
                Id: 3,
                Name: 'Zone 3',
                Status: ZoneStatus.Inactive
            },
            CreatedOn: new Date(),
            Status: TicketStatus.Active
        }
    ],
    addTicket: (ticket: Ticket) => {},
    removeTicket: (ticket: Ticket) => {},
    updateTicket: (ticket: Ticket) => {}
}
export const TicketQueueContext = createContext<TicketQueueContext>(initialState);

export const TicketQueueProvider = ({ children }: PropTypes) => {
   const [state, dispatch] = useReducer(TicketQueueReducer, initialState.ticketList);

   const addTicket = (item: Ticket) => {
       dispatch({
           Type: 'ADD',
           Payload: item
       });
    }
    
   const removeTicket = (item: Ticket) => {
       dispatch({
           Type: 'REMOVE',
           Payload: item
       });
   }

    const updateTicket = (item: Ticket) => {
        dispatch({
            Type: 'UPDATE',
            Payload: item
        })
    }
    return(
        <TicketQueueContext.Provider value={{ticketList: state, addTicket, removeTicket, updateTicket}}> 
            {children} 
        </TicketQueueContext.Provider>
    )
}