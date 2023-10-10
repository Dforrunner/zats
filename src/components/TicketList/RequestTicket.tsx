import { useContext, useState } from 'react';
import { Ticket, TicketStatus } from "@/models/Ticket"
import { Button, IconButton } from "@mui/material"
import { v4 as uuidv4 } from 'uuid';
import { TicketQueueContext } from '@/context/TicketQueueContext/TicketQueueContext';
import { formatDate } from '@/helpers/datetime-format';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import Brightness1Icon from '@mui/icons-material/Brightness1';


export default function RequestTicket({ ticket }: { ticket: Ticket }) {
    const { removeTicket, updateTicket } = useContext(TicketQueueContext);
    const [startDeletion, setStartDeletion] = useState(false);
    const [openTicketStatus, setOpenTicketStatus] = useState(false);

    const handleDelete = () => {
        removeTicket(ticket);
        setStartDeletion(false)
    }
    
    const handleTicketStatusChange = (status: TicketStatus) => {
        updateTicket({
            ...ticket,
            Status: status
        })
        setOpenTicketStatus(false);
    }

    return (
    <div className='w-[90%] h-[200px] border-[1px] border-slate-400 border-solid rounded bg-white flex flex-col justify-between p-3'>
        <div className='flex justify-between'>
            <div className='flex flex-col'>
                <div className='text-2xl'>{ticket.Title ? ticket.Title : ticket.Type.Text}</div>
                <div className='text-muted'>{ticket.Type.Text} needed at {ticket.Zone.Name}</div>
            </div>
            <div className='flex flex-col items-end relative'>
                <Button
                    className={`w-[130px] ${ticket.Status}`} 
                    startIcon={<Brightness1Icon className={ticket.Status} />}
                    onClick={() => setOpenTicketStatus(!openTicketStatus)}
                >
                    {ticket.Status}
                </Button>
                
                {openTicketStatus && 
                <div className='flex border-[1px] border-solid border-gray-200 bg-gray-100 rounded absolute top-9'>
                    {Object.values(TicketStatus).map(status =>
                        <Button
                            key={uuidv4()}
                            className={`w-[130px] ${status}`}
                            startIcon={<Brightness1Icon className={status} />}
                            onClick={() => handleTicketStatusChange(status)}
                        >
                            {status}
                        </Button>
                    )}
                </div>
                }
                
            </div>
        </div>
        <div className='text-gray-600 text-lg'>
            {ticket.Description}
        </div>
        <div className='flex justify-between gap-3 '>
            <div className='text-sm text-gray-700' >
                {ticket.PlaceInQueue && <div>Place In Queue: {ticket.PlaceInQueue}</div>}
                {ticket.EstimatedWaitTime && <div>Estimated Wait Time: {ticket.EstimatedWaitTime}</div>}
            
                <div>Created On: {formatDate(ticket.CreatedOn)}</div>
                <div>
                    Accepted On: 
                    <span className='pl-1'>
                    {ticket.AcceptedOn
                        ? formatDate(ticket.AcceptedOn) 
                        : 'Waiting'
                    }
                    </span>
                </div>
            </div>
            <div className='flex gap-2'>
                {!startDeletion && 
                <>
                    <IconButton onClick={() => setStartDeletion(true)}>
                        <DeleteIcon fontSize="large"/>
                    </IconButton>
                    <IconButton>
                        <EditIcon fontSize="large"/>
                    </IconButton>
                </>
                }
                
                {startDeletion &&
                <div className='flex items-center gap-3'>
                    <div className='text-2xl'>Confirm Deletion:</div>
                    <IconButton className='bg-gray-400' onClick={() => setStartDeletion(false)}>
                        <CloseIcon fontSize="large"/>
                    </IconButton>
                    <IconButton className='bg-blue-500' onClick={() => handleDelete()}>
                        <CheckIcon fontSize="large"/>
                    </IconButton>
                </div>
                }
            </div>
            
            {/* 
            <div className='hidden'>
                {Object.values(TicketStatus).map(s => 
                    <Button key={uuidv4()} variant='outlined'>{s}</Button>
                )}
            </div> */}
            
        </div>
    </div>
    )
}