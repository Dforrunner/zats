"use client";

import { useState } from "react";
import { Ticket, TicketStatus } from "@/models/Ticket";
import { Button } from "@mui/material";
import TicketBase from "./TicketBase";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "@/context/TanStackContext";
import { RequestQueue } from "@/models/RequestQueue";
import { POST } from "@/models/Endpoints";

interface Props {
  ticket: Ticket;
  queue: RequestQueue;
}
export default function FulfillerTicket({ ticket, queue }: Props) {

  const mutation = useMutation({
    mutationFn: (ticket: Ticket) => {
      return axios.put(POST.Ticket, ticket);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["requestQueue"]
      });
    },
  });
  const handleStatusChange = (status: TicketStatus) => {
    mutation.mutate({
      ...ticket,
      Status: status,
    });
  };

  const ActionButton = ({
    status,
    name,
  }: {
    status: TicketStatus;
    name: string;
  }) => (
    <Button
      variant="outlined"
      onClick={() => handleStatusChange(status)}
      className={'w-[150px] '+name}
    >
      {name}
    </Button>
  );

  return (
    <TicketBase
      title={`${ticket.Requester.Name} ${
        ticket.Requester.Description ? " - " + ticket.Requester.Description : ''
      }`}
      subtitle={queue.Name}
      ticket={ticket}
    >
      <div className="flex gap-2">
        {(() => {
          switch (ticket.Status) {
            case TicketStatus.Open:
              return (
                <ActionButton status={TicketStatus.Assigned} name="Accept" />
              );
            case TicketStatus.Assigned:
              return (
                <ActionButton status={TicketStatus.InProgress} name="Start" />
              );
            case TicketStatus.InProgress:
              return (
                <ActionButton status={TicketStatus.Completed} name="Complete" />
              );
            default:
              return;
          }
        })()}
      </div>
    </TicketBase>
  );
}
