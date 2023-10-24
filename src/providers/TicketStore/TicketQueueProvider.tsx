'use client';

import React, { createContext, useReducer, ReactNode } from 'react';
import TicketQueueReducer from './TicketQueueReducers';
import { Ticket, TicketStatus } from '@/models/Ticket';
import { POST, PUT } from '@/lip/endpoints';
import { TicketPostBody } from '@/models/RequestDataModels';

interface TicketQueueContext {
  ticketList: Ticket[];
  addTicket: (ticket: TicketPostBody) => void;
  updateTicket: (ticket: Ticket) => void;
}

const initialState: TicketQueueContext = {
  ticketList: [],
  addTicket: (ticket: TicketPostBody) => {},
  updateTicket: (ticket: Ticket) => {},
};
export const TicketQueueContext =
  createContext<TicketQueueContext>(initialState);

interface Props {
  children?: ReactNode;
  initialData?: Ticket[];
}
export default function TicketQueueProvider({
  children,
  initialData = [],
}: Props) {
  const [state, dispatch] = useReducer(TicketQueueReducer, initialData);

  const addTicket = async (ticketBody: TicketPostBody) => {
    console.log({ state, ticketBody });
    if (
      state.some(
        (ticket) =>
          ticket.RequesterId === ticketBody.RequesterId &&
          ticket.PlantId === ticketBody.PlantId &&
          ticket.RequestQueueId === ticketBody.RequestQueueId &&
          ![
            TicketStatus.Confirmed,
            TicketStatus.Completed,
            TicketStatus.Canceled,
          ].includes(ticket.Status)
      )
    ) {
      return;
    }

    const res = await fetch(POST.Ticket(), {
      method: 'POST',
      body: JSON.stringify(ticketBody),
    });

    const addedTicket = await res.json();

    dispatch({
      Type: 'ADD',
      Payload: addedTicket,
    });
  };

  const updateTicket = async (ticket: Ticket) => {
    const res = await fetch(PUT.Ticket(), {
      method: 'PUT',
      body: JSON.stringify(ticket),
    });

    const updatedTicket = await res.json();

    console.log(updatedTicket);
    dispatch({
      Type: 'UPDATE',
      Payload: updatedTicket,
    });
  };
  return (
    <TicketQueueContext.Provider
      value={{ ticketList: state, addTicket, updateTicket }}
    >
      {children}
    </TicketQueueContext.Provider>
  );
}
