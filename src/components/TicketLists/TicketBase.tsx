"use client";

import { ReactNode } from "react";
import { Ticket } from "@/models/Ticket";
import { formatDate, timeDiff } from "@/helpers/datetime-format";
import Brightness1Icon from "@mui/icons-material/Brightness1";

interface Props {
  title: string;
  subtitle?: string;
  ticket: Ticket;
  children?: ReactNode;
}
export default function TicketBase({
  title,
  subtitle,
  ticket,
  children,
}: Props) {
  return (
    <div className="w-full h-[200px] border-[1px] border-slate-400 border-solid rounded bg-white flex flex-col justify-between p-3 my-3">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="text-2xl">{title}</div>
          <div className="text-muted">{subtitle}</div>
        </div>
        <div className={ "flex items-start justify-end relative gap-1 " + ticket.Status.replace(" ", "")}>
          <Brightness1Icon className={ticket.Status} />
          {ticket.Status}
        </div>
      </div>

      <div className="flex justify-between gap-3 ">
        <div className="text-sm text-gray-700">
          <div>Created On: {formatDate(ticket.CreatedOn)}</div>
          <div>
            Started On:
            <span className="pl-1">
              {ticket.StartedOn ? formatDate(ticket.StartedOn) : "waiting"}
            </span>
          </div>
          <div>
            Wait Duration: {timeDiff(ticket.CreatedOn, ticket.CompletedOn)}
          </div>
        </div>
        <div className="flex gap-2">{children}</div>
      </div>
    </div>
  );
}
