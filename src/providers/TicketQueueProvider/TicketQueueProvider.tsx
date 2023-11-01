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
import { POST, PUT } from '@/lip/endpoints';
import { TicketPostBody } from '@/models/RequestDataModels';
import { View } from '@/models/View';
import { getRequestArea, getRequestQueue } from '@/lip/requests';
import { LinearProgress } from '@mui/material';

interface TicketQueueContext {
  ticketList: Ticket[];
  addTicket: (ticket: TicketPostBody) => any;
  updateTicket: (ticket: Ticket) => any;
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
  revalidate = 10000,
}: Props) {
  const [state, dispatch] = useReducer(TicketQueueReducer, initialData);
  const [progress, setProgress] = useState(0);
  let timer: NodeJS.Timeout;
  let progressBarTimer: NodeJS.Timeout;

  const fetchFulfillerTickets = async () => {
    const { Tickets } = await getRequestQueue(viewId);
    return Tickets as Ticket[];
  };

  const fetchRequesterTickets = async () => {
    const { Tickets } = await getRequestArea(viewId);
    return Tickets as Ticket[];
  };

  const fetchFunction =
    viewType === View.Requestor ? fetchRequesterTickets : fetchFulfillerTickets;

  const startDataValidationInterval = () => {
    timer = setTimeout(() => {
      fetchFunction().then((res: Ticket[]) => {
        dispatch({
          Type: 'RESET_STATE',
          Payload: res,
        });
        setProgress(() => 100); //complete progress to restart
        clearTimeout(timer);
        startDataValidationInterval();
      });
    }, revalidate);
  };

  const startProgressBar = () => {
    clearInterval(progressBarTimer);
    const timeInterval = 500;
    const progressIncrement = 100 / (revalidate / timeInterval);
    progressBarTimer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) return 0;
        return oldProgress + progressIncrement;
      });
    }, timeInterval);
  };

  useEffect(() => {
    startDataValidationInterval();
    startProgressBar();
    return () => {
      clearTimeout(timer);
      clearInterval(progressBarTimer);
    };
  }, []);

  const addTicket = async (ticketBody: TicketPostBody) => {
    if (
      state.some(
        (ticket) =>
          ticket.RequesterId === ticketBody.RequesterId &&
          ticket.RequestQueueId === ticketBody.RequestQueueId &&
          ![TicketStatus.Confirmed, TicketStatus.Canceled].includes(
            ticket.Status
          )
      )
    ) {
      return 'This request has been created already';
    }

    const res = await fetch(POST.Ticket(), {
      method: 'POST',
      body: JSON.stringify(ticketBody),
    });

    const addedTicket = await res.json();

    if (addedTicket.message) return addedTicket.message;

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
      <LinearProgress
        variant='determinate'
        value={progress}
        style={{
          position: 'fixed',
          top: 0,
          width: '100vw',
        }}
      />

      {children}
    </TicketQueueContext.Provider>
  );
}
