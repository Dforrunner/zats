"use client"
import React, { createContext, useReducer, ReactNode  } from 'react';
import TicketQueueReducer from './TicketQueueReducer';
import { Ticket, TicketStatus } from '@/models/Ticket';

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
    ticketList: [],
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