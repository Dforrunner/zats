import { FormEvent, ReactElement, Ref, forwardRef, useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { TicketType } from '@/models/RequestQueue';
import { ZoneContext } from '@/context/ZoneContext/ZoneContext';
import { Zone } from '@/models/RequestArea';
import { Ticket, TicketStatus } from '@/models/Ticket';
import { TicketQueueContext } from '@/context/TicketQueueContext/TicketQueueContext';
import { TeamContext } from '@/context/TeamContext/TeamContext';
import { TeamType } from '@/models/Team';

const ticketTypes: TicketType[] = [
  {
    Id: 1,
    Text: 'Fork Lift',
  },
  {
    Id: 2,
    Text: 'Maintenance',
  },
  {
    Id: 3,
    Text: 'Supervisor',
  },
  {
    Id: 4,
    Text: 'Other',
  },
];
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function CreateTicketDialog({ open = false, handleClose = () => {} }) {
  const [ticketType, setTicketType] = useState<string>('');
  const { ticketList, addTicket } = useContext(TicketQueueContext);
  const [error, setError] = useState('');

  const handleTicketTypeChange = (event: SelectChangeEvent) => {
    setTicketType(event.target.value as string);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as any;
    const type = ticketTypes.find((t) => t.Id.toString() === form.type.value);
    //TODO: add zone guard clause
    const ticket: Ticket = {
      Type: type,
      Description: form.description.value,
      Title: form.title.value,
      CreatedOn: new Date(),
      Status: TicketStatus.Active,
    } as Ticket;

    const ticketExists = ticketList.some(
      (t) =>
        t.Type.Id === ticket.Type.Id &&
        t.Status !== TicketStatus.Canceled &&
        t.Status !== TicketStatus.Completed
    );

    if (ticketExists) {
      setError(`There is already an active ticket for ${ticket.Type.Text} in this zone`);
      return;
    }
    setError('');
    addTicket(ticket);
    setTicketType('');
    handleClose();
  };

  return (
    <Dialog fullScreen open={open} TransitionComponent={Transition}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
            Create New Request Ticket
          </Typography>
        </Toolbar>
      </AppBar>

      <form className='flex flex-col p-5 gap-5' onSubmit={handleSubmit}>
        <FormControl required>
          <InputLabel id='type-select-label'>Request Type</InputLabel>
          <Select
            labelId='type-select-label'
            value={ticketType}
            label='Request Type'
            name='type'
            onChange={handleTicketTypeChange}
          >
            {ticketTypes.map((type) => (
              <MenuItem key={uuidv4()} value={type.Id}>
                {type.Text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField label='Title' name='title' variant='outlined' />

        <TextField label='Description' name='description' variant='outlined' />

        <div className='flex gap-3 justify-center'>
          <Button className='bg-gray-600' variant='contained' type='button' onClick={handleClose}>
            Cancel
          </Button>

          <Button className='bg-blue-500' variant='contained' type='submit'>
            Submit
          </Button>
        </div>
      </form>

      <div className='text-red-500 text-center'>{error}</div>
    </Dialog>
  );
}
