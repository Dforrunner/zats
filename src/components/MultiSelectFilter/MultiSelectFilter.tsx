'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@mui/material';
import { TicketStatus } from '@/models/Ticket';
import { v4 as uuidv4 } from 'uuid';
import { TicketFilters } from '@/models/TicketFilters';


interface Props {
  items: string[];
  onSelect: (filters: TicketFilters) => void;
}
export default function MultiSelectFilter({ items, onSelect }: Props) {
  const [selectedAreas, setSelectedArea] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatus] = useState<string[]>([]);

  const filters = useMemo(
    () => ({
      Areas: selectedAreas,
      Statuses: selectedStatuses,
    }),
    [selectedAreas, selectedStatuses]
  );

  useEffect(() => {
    onSelect(filters);
  }, [filters]);

  const handleAreaFilterChange = (
    event: SelectChangeEvent<typeof selectedAreas>
  ) => {
    const {
      target: { value },
    } = event;
    const selectedItems = typeof value === 'string' ? value.split(',') : value;
    setSelectedArea(selectedItems);
  };

  const handleStatusFilterChange = (
    event: SelectChangeEvent<typeof selectedStatuses>
  ) => {
    const {
      target: { value },
    } = event;
    const selectedItems = typeof value === 'string' ? value.split(',') : value;
    setSelectedStatus(selectedItems);
  };

  const reset = () => {
    setSelectedStatus([]);
    setSelectedArea([]);
  };

  return (
    <div className='w-full flex gap-4 my-5'>
      <FormControl className='w-full'>
        <InputLabel id='demo-multiple-chip-label'>
          Filter by requester
        </InputLabel>
        <Select
          labelId='demo-multiple-chip-label'
          id='demo-multiple-chip'
          multiple
          value={selectedAreas}
          onChange={handleAreaFilterChange}
          input={
            <OutlinedInput
              id='select-multiple-chip'
              label='Filter by requester'
            />
          }
          renderValue={(selected) => (
            <Box className='flex flex-wrap gap-1'>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {items.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className='w-full'>
        <InputLabel id='demo-multiple-chip-label'>Filter by status</InputLabel>
        <Select
          labelId='demo-multiple-chip-label'
          id='demo-multiple-chip'
          multiple
          value={selectedStatuses}
          onChange={handleStatusFilterChange}
          input={
            <OutlinedInput
              id='select-multiple-chip'
              label='Filter by requester'
            />
          }
          renderValue={(selected) => (
            <Box className='flex flex-wrap gap-1'>
              {selected.map((value) => (
                <Chip key={uuidv4()} label={value} />
              ))}
            </Box>
          )}
        >
          {Object.values(TicketStatus).map((name) => (
            <MenuItem key={uuidv4()} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant='outlined' onClick={reset}>
        Reset
      </Button>
    </div>
  );
}
