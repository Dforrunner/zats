'use client';

import React, {
  createContext,
  useReducer,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import TicketQueueReducer from './TicketQueueReducers';
import { Ticket, TicketStatus } from '@/models/Ticket';
import { GET, POST, PUT } from '@/lip/endpoints';
import { TicketPostBody } from '@/models/RequestDataModels';
import { View } from '@/models/View';
import { RequestQueue } from '@/models/RequestQueue';
import { getRequestArea, getRequestQueue } from '@/lip/requests';

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
  viewId: string;
  viewType: View;
  revalidate?: number;
}
export default function TicketQueueProvider({
  children,
  initialData = [],
  viewId,
  viewType,
  revalidate = 3000,
}: Props) {
  const [state, dispatch] = useReducer(TicketQueueReducer, initialData);
  const [progress, setProgress] = useState(0);

  const fetchFulfillerTickets = async () => {
    const { Tickets } = await getRequestQueue(viewId);
    return Tickets as Ticket[];
  };

  const fetchRequesterTickets = async () => {
    const { Tickets } = await getRequestArea(viewId);
    return Tickets as Ticket[];
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const fetchFunction = viewType === View.Requestor
      ? fetchRequesterTickets
      : fetchFulfillerTickets;
    
    const startDataValidationInterval = () => {
      setProgress(0);
      timer = setTimeout(() => {
        fetchFunction().then((res: Ticket[]) => {
          dispatch({
            Type: 'RESET_STATE',
            Payload: res,
          });
          setProgress(100);
          clearTimeout(timer);
          startDataValidationInterval();
        });
      }, revalidate);
    };
    startDataValidationInterval();

    return () => {
      if (timer) clearTimeout(timer);
    };
  });

  const addTicket = async (ticketBody: TicketPostBody) => {
    if (
      state.some(
        (ticket) =>
          ticket.RequesterId === ticketBody.RequesterId &&
          ticket.RequestQueueId === ticketBody.RequestQueueId &&
          ![
            TicketStatus.Confirmed,
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
