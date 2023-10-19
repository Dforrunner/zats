"use client";

import { Ticket, TicketStatus } from "@/models/Ticket";
import { Button } from "@mui/material";
import TicketBase from "./TicketBase";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "@/context/TanStackContext";
import { RequestArea } from "@/models/RequestArea";
import { POST } from "@/models/Endpoints";

interface Props {
  ticket: Ticket;
  area: RequestArea;
}
export default function RequesterTicket({ ticket, area }: Props) {
  const mutation = useMutation({
    mutationFn: (ticket: Ticket) => {
      return axios.put(POST.Ticket, ticket);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["requesterArea"]
      });
    },
  });

  const handleStatusChange = (status: TicketStatus) => {
    const updatedTicket = {
      ...ticket,
      Status: status,
    };

    mutation.mutate(updatedTicket);
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
      className={name.replace(" ", "")}
    >
      {name}
    </Button>
  );

  return (
    <TicketBase
      title={ticket.RequestQueue.Name}
      subtitle={`${area.Name}${area.Description && " - " + area.Description}`}
      ticket={ticket}
    >
      <div className="flex gap-2">
        {ticket.Status === TicketStatus.Completed && (
          <ActionButton
            status={TicketStatus.Confirmed}
            name="Confirm Completion"
          />
        )}

        {ticket.Status !== TicketStatus.Confirmed &&
          ticket.Status !== TicketStatus.Completed && (
            <ActionButton status={TicketStatus.Canceled} name="Close Request" />
          )}
      </div>
    </TicketBase>
  );
}
