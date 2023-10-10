import { Typography, Button } from "@mui/material";
import { QuickRequest } from '@/models/QuickRequest';
import { v4 as uuidv4 } from 'uuid';
import { TicketQueueContext } from "@/context/TicketQueueContext/TicketQueueContext";
import { ZoneContext } from "@/context/ZoneContext/ZoneContext";
import { useContext } from "react";
import { TicketStatus } from "@/models/Ticket";
import { ZoneStatus } from "@/models/Zone";

const quickRequests: QuickRequest[] = [
    {
        Id: 1,
        Name: 'Fork Lift',
        ZoneIds: [1],
        Ticket: {
            Id: 10,
            Type: {
                Id: 1,
                Text: 'Fork Lift'
            },
            Zone: {
                Id: 1,
                Name: 'Zone 1'
            },
            CreatedOn: new Date(),
            Status: TicketStatus.Active
        }
    },
    {
        Id: 2,
        Name: 'Maintenance',
        ZoneIds: [1],
        Ticket: {
            Id: 10,
            Type: {
                Id: 2,
                Text: 'Maintenance'
            },
            Zone: {
                Id: 1,
                Name: 'Zone 1'
            },
            CreatedOn: new Date(),
            Status: TicketStatus.Canceled
        }
    },
    {
        Id: 3,
        Name: 'Supervisor',
        ZoneIds: [1],
        Ticket: {
            Id: 10,
            Type: {
                Id: 3,
                Text: 'Supervisor'
            },
            Zone: {
                Id: 1,
                Name: 'Zone 1'
            },
            CreatedOn: new Date(),
            Status: TicketStatus.Active
        }
    },
    {
        Id: 4,
        Name: 'Maintenance 2',
        ZoneIds: [3],
        Ticket: {
            Id: 10,
            Type: {
                Id: 1,
                Text: 'Fork Lift'
            },
            Zone: {
                Id: 1,
                Name: 'Zone 1',
                Status: ZoneStatus.NeedsAssistance
            },
            CreatedOn: new Date(),
            Status: TicketStatus.Canceled
        }
    },
]
  
export default function QuickRequest() {
    const { zone } = useContext(ZoneContext);
    const { addTicket } = useContext(TicketQueueContext);

    const handleQuickRequest = (request: QuickRequest) => {
        request.Ticket && addTicket(request.Ticket)
    }

    return (
    <div className='flex flex-col items-center bg-gray-200 w-full py-5'>
        <Typography sx={{ ml: 2, flex: 0 }} variant="h5" component="div">
            Quick Request
        </Typography>

        <div className='flex gap-5 p-5 justify-center w-full'>
          {quickRequests
                .map(request => request.ZoneIds.includes(zone.Id) &&
                    <Button
                        className='bg-blue-500 w-[30%] h-[60px]'
                        variant='contained'
                        key={uuidv4()}
                        onClick={() => handleQuickRequest(request)}
                    >
                        {request.Name}
                    </Button>
                )
          }
        </div>
      </div>
    )
}